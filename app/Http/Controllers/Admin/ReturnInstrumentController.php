<?php

namespace App\Http\Controllers\Admin;

use Throwable;
use Carbon\Carbon;
use App\Models\Fine;
use App\Models\Loan;
use Inertia\Response;
use App\Enums\MessageType;
use App\Models\FineSetting;
use Illuminate\Http\Request;
use App\Models\ReturnInstrument;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Enums\ReturnInstrumentStatus;
use App\Models\ReturnInstrumentCheck;
use Illuminate\Http\RedirectResponse;
use App\Enums\ReturnInstrumentCondition;
use App\Http\Requests\Admin\ReturnInstrumentRequest;
use App\Http\Resources\Admin\ReturnInstrumentResource;

class ReturnInstrumentController extends Controller
{
    public function index():Response
    {
        $return_instrument = ReturnInstrument::query()
            ->select(['id', 'return_instrument_code', 'status', 'loan_id', 'user_id', 'instrument_id', 'return_date', 'created_at'])
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->with(['instrument', 'fine', 'loan', 'user', 'returnInstrumentCheck'])
            ->latest('created_at')
            ->paginate(request()->load ?? 10)
            ->withQueryString();

            return inertia('Admin/ReturnInstruments/Index', [
                'page_settings' => [
                    'title' => 'Pengembalian',
                    'subtitle' => 'Menampilkan semua data pengembalian yang tersedia pada platform ini.',
                ],
                'return_instruments' => ReturnInstrumentResource::collection($return_instrument)->additional([
                    'meta' => [
                        'has_pages' => $return_instrument->hasPages(),
                    ],
                ]),
                'state' => [
                    'page' => request()->page ?? 1,
                    'search' => request()->search ?? '',
                    'load' => 10
                ],
            ]);
    }

    public function create(Loan $loan):Response|RedirectResponse
    {
        if($loan->returnInstrument()->exists()) {
            return to_route('admin.loans.index');
        }

        if(!FineSetting::first()){
            return to_route('admin.fine-settings.create'); 
        }

        return inertia('Admin/ReturnInstruments/Create', [
            'page_settings' => [
                'title' => 'Pengembalian alat musik',
                'subtitle' => 'Kembalikan buku yang dipinjam. Klik kembalikan setelah selesai.',
                'method' => 'POST',
                'action' => route('admin.return-instruments.store', $loan),
            ],
            'loan' => $loan->load([
                'user',
                'instrument' => fn($query) => $query->with('supplier'),
            ]),
            'date' => [
                'return_date' => Carbon::now()->toDateString(),
            ],
            'conditions' => ReturnInstrumentCondition::options(),
        ]);
    }

    public function report(): Response
{
    return inertia('Admin/ReturnInstruments/ReportPdf', [
        'page_settings' => [
            'title' => 'Laporan Pengembalian',
            'subtitle' => 'Laporan PDF semua data pengembalian.',
        ],
    ]);
}

    public function store(Loan $loan, ReturnInstrumentRequest $request): RedirectResponse
    {   
        try{

            DB::beginTransaction();
            $return_instrument = $loan->returnInstrument()->create([
                'return_instrument_code' => str()->lower(str()->random(10)),
                'instrument_id' => $loan->instrument_id,
                'user_id' => $loan->user_id,
                'return_date' => Carbon::today(),
            ]);

            $return_instrument_check = $return_instrument->returnInstrumentCheck()->create([
                'condition' => $request->condition,
                'notes' => $request->notes,
            ]);


            match ($return_instrument_check->condition->value){
                ReturnInstrumentCondition::GOOD->value => $return_instrument->instrument->stock_loan_return(),
                ReturnInstrumentCondition::LOST->value => $return_instrument->instrument->stock_lost(),
                ReturnInstrumentCondition::DAMAGE->value => $return_instrument->instrument->stock_damaged(),
            };

            $isOnTime = $return_instrument->isOnTime();
            $daysLate = $return_instrument->getDaysLate();
            $fineData = $this->calculateFine($return_instrument, $return_instrument_check, FineSetting::first(), $daysLate);

            DB::commit();
            if($isOnTime) {
                if($fineData){
                    flashMessage($fineData['message'], 'error');
                    return to_route('admin.fines.create', $return_instrument->return_instrument_code);
                }

                flashMessage('Berhasil mengembalikan alat musik');
                return to_route('admin.return-instruments.index');
            } else { 
                if($fineData) {
                    flashMessage($fineData['message'], 'error');
                    return to_route('admin.fines.create', $return_instrument->return_instrument_code);
                }
            }

            flashMessage('Berhasil mengembalikan alat musik');
            return to_route('admin.return-instruments.index');
        } catch (Throwable $e){
            DB::rollBack();
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');
            return to_route('admin.loans.index');
        }
    }

    private function createFine(ReturnInstrument $returnInstrument, float $lateFee, float $otherFee):Fine
    {
        return $returnInstrument->fine()->create([
            'user_id' => $returnInstrument->user_id,
            'late_fee' => $lateFee,
            'other_fee' => $otherFee,
            'total_fee' => $lateFee + $otherFee,
            'fine_date' => Carbon::today(),
        ]);
    }

    private function calculateFine(ReturnInstrument $returnInstrument, ReturnInstrumentCheck $returnInstrumentCheck, FineSetting $fineSetting, int $daysLate): ?array
    {

        $late_fee = $fineSetting-> late_fee_per_day * $daysLate;

        switch($returnInstrumentCheck->condition->value){
            case ReturnInstrumentCondition::DAMAGE->value:
                $other_fee = ($fineSetting->damage_fee_percentage / 100) * $returnInstrument->instrument->rental_price_per_day;
                $returnInstrument->update([
                    'status' => ReturnInstrumentStatus::FINE->value,
                ]);

                $this->createFine($returnInstrument, $late_fee, $other_fee); 

                return [
                    'message' => 'Kondisi alat musik rusak harus membayar denda kerusakan',
                ];

            case ReturnInstrumentCondition::LOST->value:
                $other_fee = ($fineSetting->lost_fee_percentage / 100) * 2 * $returnInstrument->instrument->rental_price_per_day;
                $returnInstrument->update([
                    'status' => ReturnInstrumentStatus::FINE->value,
                ]);

                $this->createFine($returnInstrument, $late_fee, $other_fee);

                return [
                    'message' => 'Kondisi alat musik hilang harus membayar denda kehilangan alat musik',
                ];
            default:
                if($daysLate > 0){
                    $returnInstrument->update([
                        'status' => ReturnInstrumentStatus::FINE->value,
                    ]);
                    $this->createFine($returnInstrument, $late_fee, 0);

                    return [
                        'message' => 'Terlambar mengembalikan alat musik dan harus membayar denda keterlambatan',
                    ];
                } else {
                    $returnInstrument->update([
                        'status' => ReturnInstrumentStatus::RETURNED->value,
                    ]);

                    return null;
                }
        }
    }
}
