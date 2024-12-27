<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Instrument;
use Illuminate\Http\Request;

class InstrumentController extends Controller
{
    /**
    *    @OA\Get(
    *       path="/instrument",
    *       tags={"Instrument"},
    *       summary="Instrument List",
    *       description="Mengambil Data List Instrumen",
    *       @OA\Response(
    *           response="200",
    *           description="Ok",
    *           @OA\JsonContent
    *           (example={
    *"status": true,
    *"message": "Success",
    *"data": {
    *  {
    *    "id": 1,
    *    "name": "Gitar",
    *    "slug": "gitar-Rt5g3",
    *    "description": "Instrumen musik petik",
    *    "cover": null,
    *    "created_at": "2024-12-10T09:34:20.000000Z",
    *    "updated_at": "2024-12-20T11:25:36.000000Z"
    *  }
    *}
    *}),
    *      ),
    *  )
    */
    public function index() {
        $data = Instrument::get();

        $result['status'] = true;
        $result['message'] = 'Success';
        $result['data'] = $data;

        return $result;
    }

    /**
    *    @OA\Get(
    *       path="/instrument/{id}",
    *       tags={"Instrument"},
    *       summary="Instrument Detail",
    *       description="Mengambil Data Detail Instrumen",
    *       @OA\Parameter(
    *         name="id",
    *         in="path",
    *         description="ID of the instrument",
    *         required=true,
    *         @OA\Schema(type="integer")
    *       ),
    *       @OA\Response(
    *           response="200",
    *           description="Ok",
    *           @OA\JsonContent
    *           (example={
    *"status": true,
    *"message": "Success",
    *"data": {
    *"list":
    *  {
    *    "id": 1,
    *    "name": "Gitar",
    *    "slug": "gitar-Rt5g3",
    *    "description": "Instrumen musik petik",
    *    "cover": null,
    *    "created_at": "2024-12-10T09:34:20.000000Z",
    *    "updated_at": "2024-12-20T11:25:36.000000Z"
    *  }
    *}
    *}),
    *      ),
    *  )
    */
    public function detail($id) {
        $getData = Instrument::find($id);

        $result['status'] = true;
        $result['message'] = 'Success';
        $result['data'] = $getData;

        return $result;
    }
}
