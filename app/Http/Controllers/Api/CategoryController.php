<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
    *    @OA\Get(
    *       path="/category",
    *       tags={"Category"},
    *       summary="Category List",
    *       description="Mengambil Data List Kategori",
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
    *    "name": "Alat Musik Gesek",
    *    "slug": "alat-musik-gesekWdE0",
    *    "description": "gesek",
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
        $data = Category::get();

        $result['status'] = true;
        $result['message'] = 'Success';
        $result['data'] = $data;

        return $result;
    }

    /**
    *    @OA\Get(
    *       path="/category/{id}",
    *       tags={"Category"},
    *       summary="Category Detail",
    *       description="Mengambil Data Detail Kategori",
    *       @OA\Parameter(
    *         name="id",
    *         in="path",
    *         description="ID of the category",
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
    *    "name": "Alat Musik Gesek",
    *    "slug": "alat-musik-gesekWdE0",
    *    "description": "gesek",
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
        $getData = Category::find($id);

        $result['status'] = true;
        $result['message'] = 'Success';
        $result['data'] = $getData;

        return $result;
    }

    public function showBySlug($slug)
    {
        $category = Category::where('slug', $slug)->first();

        if ($category) {
            return response()->json([
                'status' => true,
                'data' => $category,
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'Category not found',
        ], 404);
    }

}
