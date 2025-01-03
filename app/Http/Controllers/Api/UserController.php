<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
    *    @OA\Get(
    *       path="/users",
    *       tags={"User"},
    *       summary="User List",
    *       description="Mengambil Data List User",
    *       @OA\Response(
    *           response="200",
    *           description="Ok",
    *           @OA\JsonContent(
    *               example={
    *                   "status": true,
    *                   "message": "Success",
    *                   "data": {
    *                       {
    *                           "id": 1,
    *                           "username": "johndoe",
    *                           "name": "John Doe",
    *                           "email": "john.doe@example.com",
    *                           "created_at": "2023-11-25",
    *                           "updated_at": "2023-12-05"
    *                       },
    *                       {
    *                           "id": 2,
    *                           "username": "janesmith",
    *                           "name": "Jane Smith",
    *                           "email": "jane.smith@example.com",
    *                           "created_at": "2023-11-26",
    *                           "updated_at": "2023-12-06"
    *                       }
    *                   }
    *               }
    *           )
    *       )
    *    )
    */
    public function index()
    {
        $data = User::all();

        return [
            'status' => true,
            'message' => 'Success',
            'data' => $data,
        ];
    }

    /**
    *    @OA\Get(
    *       path="/users/{id}",
    *       tags={"User"},
    *       summary="User Detail",
    *       description="Mengambil Data Detail User",
    *       @OA\Parameter(
    *         name="id",
    *         in="path",
    *         description="ID of the User",
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
    *                       "id": 1,
    *                       "username": "johndoe",
    *                       "name": "John Doe",
    *                       "email": "john.doe@example.com",
    *                       "created_at": "2023-11-25",
    *                       "updated_at": "2023-12-05"
    *                   }
    *               }
    *           )
    *       )
    *    )
    */
    public function show($id)
    {
        $data = User::findOrFail($id);

        return [
            'status' => true,
            'message' => 'Success',
            'data' => $data,
        ];
    }
}
