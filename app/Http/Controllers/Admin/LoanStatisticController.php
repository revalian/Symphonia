<?php

namespace App\Http\Controllers\Admin;

use App\Http\Resources\Admin\LoanStatisticResource;
use App\Models\Instrument;
use App\Models\Loan;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class LoanStatisticController extends Controller
{
    public function index(): Response
    {
        return inertia('Admin/LoanStatistic/Index', [
            'page_settings' => [
                'title' => 'Statistik Peminjaman',
                'subtitle' => 'Menampilkan statistik yang tersedia pada platform ini',
            ],
            'page_data' => [
                'least_loan_instruments' => LoanStatisticResource::collection(Instrument::leastLoanInstruments(5)),
                'most_loan_instruments' => LoanStatisticResource::collection(Instrument::mostLoanInstruments(5)),
                'total_loans' => Loan::totalLoanInstruments(),
            ],

        ]); 
    }
}
