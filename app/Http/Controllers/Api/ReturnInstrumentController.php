<?php

namespace App\Http\Controllers\Api;

use App\Models\ReturnInstrument;
use App\Http\Controllers\Controller;

class ReturnInstrumentController extends Controller
{
    /**
    *    @OA\Get(
    *       path="/return-instruments",
    *       tags={"Return Instrument"},
    *       summary="Return Instrument List",
    *       description="Mengambil Data List Return Instrument",
    *       @OA\Response(
    *           response="200",
    *           description="Ok",
    *           @OA\JsonContent(
    *               example={
    *                   "status": true,
    *                   "message": "Success",
    *                   "data": {
    *                       {
    *                           "id": 2,
    *                           "return_instrument_code": "RI002",
    *                           "status": "Pending",
    *                           "loan_id": 102,
    *                           "user_id": 202,
    *                           "instrument_id": 302,
    *                           "return_date": "2023-12-25",
    *                           "created_at": "2023-12-05"
    *                       }
    *                   }
    *               }
    *           )
    *       )
    *    )
    */
    public function index()
    {
        $data = ReturnInstrument::all();

        return [
            'status' => true,
            'message' => 'Success',
            'data' => $data,
        ];
    }

    /**
    *    @OA\Get(
    *       path="/return-instruments/{id}",
    *       tags={"Return Instrument"},
    *       summary="Return Instrument Detail",
    *       description="Mengambil Data Detail Return Instrument",
    *       @OA\Parameter(
    *         name="id",
    *         in="path",
    *         description="ID of the Return Instrument",
    *         required=true,
    *         @OA\Schema(type="integer")
    *       ),
    *       @OA\Response(
    *           response="200",
    *           description="Ok",
    *           @OA\JsonContent(
    *               example={
    *                   "status": true,
    *                   "message": "Success",
    *                   "data": {
    *                       "id": 2,
    *                       "return_instrument_code": "RI002",
    *                       "status": "Pending",
    *                       "loan_id": 102,
    *                       "user_id": 202,
    *                       "instrument_id": 302,
    *                       "return_date": "2023-12-25",
    *                       "created_at": "2023-12-05"
    *                   }
    *               }
    *           )
    *       )
    *    )
    */
    public function show($id)
    {
        $data = ReturnInstrument::findOrFail($id);

        return [
            'status' => true,
            'message' => 'Success',
            'data' => $data,
        ];
    }
}
