<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Requests\Admin\LoanRequest;
use App\Models\Instrument;
use App\Models\Loan;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\LoanResource;
use Throwable;

class LoanController extends Controller
{
    public function index():Response
    {
        $loans = Loan::query()
            ->select(['id', 'loan_code', 'user_id', 'instrument_id', 'loan_date', 'due_date', 'created_at'])
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->with(['instrument', 'user', 'returnInstrument'])
            ->latest('created_at')
            ->paginate(request()->load ?? 10)
            ->withQueryString();

            return inertia('Admin/Loans/Index', [
                'page_settings' => [
                    'title' => 'Peminjaman',
                    'subtitle' => 'Menampilkan semua data peminjaman yang tersedia pada platform ini',
                ],
                'loans' => LoanResource::collection($loans)->additional([
                    'meta' => [
                        'has_pages' => $loans->hasPages(),
                    ],
                ]),
                'state' => [
                    'page' => request()->page ?? 1,
                    'search' => request()->search ?? '',
                    'load' => 10
                ],
            ]);
    }

    public function create(): Response 
    {
        return inertia('Admin/Loans/Create', [
            'page_settings' => [
                'title' => 'Tambah Peminjaman',
                'subtitle' => 'Buat peminjaman alat musik disini. Klik simpan setelah selesai',
                'method' => 'POST',
                'action' => route('admin.loans.store'),
            ],
            'page_data' => [
                'date' => [
                    'loan_date' => Carbon::now()->toDateString(),
                    'due_date' => Carbon::now()->addDays(7)->toDateString(),
                ],
                'instruments' => Instrument::query()
                    ->select(['id', 'name'])
                    ->whereHas('stock', fn($query) => $query->where('available', '>', 0))
                    ->get()
                    ->map(fn($item) => [
                        'value' => $item->name,
                        'label' => $item->name,                    
                ]),
                'users' => User::query()
                    ->select(['id', 'name'])
                    ->get()
                    ->map(fn($item) => [
                        'value' => $item->name,
                        'label' => $item->name,
                ]),
            ],
        ]);
    }

    public function store(LoanRequest $request): RedirectResponse
    {
        try {
            $instrument = Instrument::query()
                ->where('name', $request->instrument)
                ->firstOrFail();
    
            $user = User::query()
                ->where('name', $request->user)
                ->firstOrFail();
    
            if (Loan::checkLoanInstrument($user->id, $instrument->id)) {
                flashMessage('Pengguna sudah meminjam alat musik ini', 'error');
                return to_route('admin.loans.index');
            }
    
            if ($instrument->stock->available > 0) {
                tap(Loan::create([
                    'loan_code' => str()->lower(str()->random(10)),
                    'user_id' => $user->id,
                    'instrument_id' => $instrument->id,
                    'loan_date' => $request->loan_date,
                    'due_date' => $request->due_date,
                ]), function ($loan) {
                    $loan->instrument->stock_loan();
                    flashMessage('Berhasil menambahkan peminjaman');
                });
            } else {
                flashMessage('Stok alat musik tidak tersedia', 'error');
            }
    
            return to_route('admin.loans.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');
            return to_route('admin.loans.index');
        }
    }
    
    public function edit(Loan $loan): Response
    {
        return inertia('Admin/Loans/Edit', [
            'page_settings' => [
                'title' => 'Edit Peminjaman',
                'subtitle' => 'Edit peminjaman alat musik disini. Klik simpan setelah selesai',
                'method' => 'PUT',
                'action' => route('admin.loans.update', $loan),
            ],
            'page_data' => [
                'date' => [
                    'loan_date' => $loan->loan_date,
                    'due_date' => $loan->due_date,
                ],
                'instruments' => Instrument::query()
                    ->select(['id', 'name'])
                    ->whereHas('stock', fn($query) => $query->where('available', '>', 0))
                    ->get()
                    ->map(fn($item) => [
                        'value' => $item->name,
                        'label' => $item->name,                    
                    ]),
                'users' => User::query()
                    ->select(['id', 'name'])
                    ->get()
                    ->map(fn($item) => [
                        'value' => $item->name,
                        'label' => $item->name,
                    ]),
                'loan' => $loan->load('user', 'instrument'),
            ],
        ]);
    }
    

    public function update(Loan $loan, LoanRequest $request): RedirectResponse
    {
        try {

            $instrument = Instrument::query()
                ->where('name', $request->instrument)
                ->firstOrFail();

                $user = User::query()
                ->where('name', $request->user)
                ->firstOrFail();

                if(Loan::checkLoanInstrument($user->id, $instrument->id)){
                    flashMessage('Pengguna sudah meminjam alat musik ini', 'error');
                    return to_route('admin.loans.index');
                }

                $loan->update([
                    'user_id' => $user->id,
                    'instrument_id' => $instrument->id,
                ]);

                flashMessage(MessageType::UPDATED->message('Peminjaman'));
                return to_route('admin.loans.index');

        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error:$e->getMessage()), 'error');
            return to_route('admin.loans.index');
        }
    }

    public function destroy(Loan $loan): RedirectResponse
    {
        try {

            $loan->delete();

            flashMessage(MessageType::DELETED->message('peminjaman'));
            return to_route('admin.loans.index');

        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error:$e->getMessage()), 'error');
            return to_route('admin.loans.index');
        }
    }
}
