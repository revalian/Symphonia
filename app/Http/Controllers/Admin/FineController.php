<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\ReturnFineSingleResource;
use App\Models\ReturnInstrument;
use Illuminate\Http\Request;
use Inertia\Response;

class FineController extends Controller
{
    public function create(ReturnInstrument $returnInstrument):Response
    {
        return inertia('Admin/Fines/Create', [
            'page_settings' => [
                'title' => 'Denda',
                'subtitle' => 'Selesaikan pembayaran denda terlebih dahulu.',
            ],
            'return_instrument' => new ReturnFineSingleResource($returnInstrument ->load([
                'instrument',
                'fine',
                'loan',
                'user',
                'returnInstrumentCheck',
            ])),
        ]);
    }
}
