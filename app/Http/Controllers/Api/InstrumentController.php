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


    /**
 *    @OA\Get(
 *       path="/instrument/search",
 *       tags={"Instrument"},
 *       summary="Search Instruments",
 *       description="Search instruments by name or description",
 *       @OA\Parameter(
 *         name="query",
 *         in="query",
 *         description="Keyword to search for instruments",
 *         required=true,
 *         @OA\Schema(type="string")
 *       ),
 *       @OA\Response(
 *           response="200",
 *           description="Search results",
 *           @OA\JsonContent(
 *               example={
 *                   "status": true,
 *                   "data": {
 *                       {
 *                           "id": 1,
 *                           "name": "Gitar",
 *                           "slug": "gitar-Rt5g3",
 *                           "description": "Instrumen musik petik",
 *                           "cover": null,
 *                           "created_at": "2024-12-10T09:34:20.000000Z",
 *                           "updated_at": "2024-12-20T11:25:36.000000Z"
 *                       },
 *                       {
 *                           "id": 2,
 *                           "name": "Piano",
 *                           "slug": "piano-Lv7d2",
 *                           "description": "Instrumen musik tekan",
 *                           "cover": null,
 *                           "created_at": "2024-12-11T10:20:15.000000Z",
 *                           "updated_at": "2024-12-21T12:45:30.000000Z"
 *                       }
 *                   }
 *               }
 *           )
 *       ),
 *       @OA\Response(
 *           response="400",
 *           description="Invalid query parameter"
 *       ),
 *       @OA\Response(
 *           response="404",
 *           description="No instruments found"
 *       )
 *    )
 */

    public function search(Request $request)
    {
        $query = $request->input('query');
        $results = Instrument::where('name', 'like', "%$query%")
            ->orWhere('description', 'like', "%$query%")
            ->get();

        return response()->json([
            'status' => true,
            'data' => $results,
        ]);
    }

}
