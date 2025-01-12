<?php

namespace App\Http\Controllers;

use App\Http\Resources\LoanFrontSingleResource;
use App\Models\Loan;
use Mpdf\Tag\Select;
use Inertia\Response;
use App\Models\Instrument;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\Admin\LoanRequest;
use App\Http\Resources\LoanFrontResource;

class LoanFrontController extends Controller
{
    public function index(): Response
    {
        $loans = Loan::query()
        ->select(['id', 'loan_code', 'user_id', 'instrument_id',  'loan_date', 'due_date', 'created_at'])
        ->where('user_id', auth()->user()->id)
        ->filter(request()->only(['search']))
        ->sorting(request()->only(['field', 'direction']))
        ->with(['instrument', 'user'])
        ->latest('created_at')
        ->paginate(request()->load ?? 10)
        ->withQueryString();

        return inertia('Front/Loans/Index', [
            'page_settings' => [
                'title' => 'Peminjaman',
                'subtitle' => 'Menampilkan semua data peminjaman anda yang tersedia dalam platform ini',
            ],
            'loans' => LoanFrontResource::collection($loans)->additional([
                'meta' => [
                    'has_pages' => $loans->hasPages(),
                ],
            ]),
            'state' => [
                'has_pages' => $loans->hasPages(),
                'search' => request()->search ?? '',
                'load' => 10,
            ],
        ]);
    }

    public function show(Loan $loan):Response {
        return inertia('Front/Loans/Show', [
            'page_settings' => [
                'title' => 'Detail Peminjaman Buku',
                'subtitle' => 'Dapat melihat informasi detail alat musik yang anda pinjam',
            ],
            'loan' => new LoanFrontSingleResource($loan->load(['instrument', 'user', 'returnInstrument'])),
        ]);
    }

    public function store(LoanRequest $request, Instrument $instrument): RedirectResponse
    {
        if(Loan::checkLoanInstrument(auth()->user()->id, $instrument->id)){
            flashMessage('Anda sudah meminjam alat musik ini, harap kembalikan terlebih dahulu', 'error');

            return to_route('front.loans.show', $instrument->slug);
        }

        if($instrument->stock->available <= 0){
            flashMessage('Stok alat musik tidak tersedia', 'error');
            return to_route('front.loans.show', $instrument->slug);
        }

        $loan = tap(Loan::create([
            'loan_code' => str()->lower(str()->random(10)),
            'user_id' => auth()->user()->id,
            'instrument_id' => $instrument->id,
            'loan_date' => $request->loan_date,
            'due_date' => $request->due_date,
        ]), function($loan){
            $loan->instrument->stock_loan();
            
        });
        flashMessage('Berhasil melakukan peminjaman');

        return to_route('front.loans.index');
    }
}