<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReturnInstrumentFrontSingleResource;
use App\Models\Loan;
use Carbon\Carbon;
use Inertia\Response;
use App\Models\Instrument;
use Illuminate\Http\Request;
use App\Models\ReturnInstrument;
use Illuminate\Http\RedirectResponse;
use App\Http\Resources\ReturnInstrumentFrontResource;

class ReturnInstrumentFrontController extends Controller
{
    public function index():Response
    {
        $return_instrument = ReturnInstrument::query()
        ->select(['id', 'return_instrument_code', 'status', 'loan_id', 'user_id', 'instrument_id', 'return_date', 'created_at'])
        ->where('user_id', auth()->user()->id)
        ->filter(request()->only(['search']))
        ->sorting(request()->only(['field', 'direction']))
        ->with(['instrument', 'fine', 'loan', 'user', 'returnInstrumentCheck'])
        ->latest('created_at')
        ->paginate(request()->load ?? 10)
        ->withQueryString();

        return inertia('Front/ReturnInstruments/Index', [
            'page_settings' => [
                'title' => 'Pengembalian',
                'subtitle' => 'Menampilkan semua data pengembalian anda yang tersedia pada platform ini.',
            ],
            'return_instruments' => ReturnInstrumentFrontResource::collection($return_instrument)->additional([
                'meta' => [
                    'has_pages' => $return_instrument->hasPages(),
                ],
            ]),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => 10
            ],
            'page_data' => [
                'returned' => ReturnInstrument::query()->member(auth()->user()->id)->returned()->count(),
                'fine' => ReturnInstrument::query()->member(auth()->user()->id)->fine()->count(),
                'checked' => ReturnInstrument::query()->member(auth()->user()->id)->checked()->count(),
            ],
        ]);
    }

    public function show(ReturnInstrument $returnInstrument): Response
    {
        return inertia('Front/ReturnInstruments/Show', [
            'page_settings' =>[
                'title' => 'Detail Pengembalian Alat Musik',
                'subtitle' => 'Dapat melihat informasi detail buku yang anda kembalikan',
            ],
            'return_instrument' => new ReturnInstrumentFrontSingleResource($returnInstrument->load(['instrument', 'user', 'loan','fine', 'returnInstrumentCheck']
            ))
        ]);
    }

    public function store(Instrument $instrument, Loan $loan): RedirectResponse
    {
        $return_instrument = $loan->returnInstrument()->create([
            'return_instrument_code' => str()->lower(str()->random(10)),
            'instrument_id' => $instrument->id,
            'user_id' => auth()->user()->id,
            'return_date' => Carbon::today(),
        ]);

        flashMessage('Alat musik anda sedang dilakukan pengecekan oleh petugas kami');
        return to_route('front.return_instruments.show', [$return_instrument->return_instrument_code]);
    }
}
