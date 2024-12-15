<?php 

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

trait HasFile
{
    public function upload_file(Request $request, string $column, string $folder): ?string
    {
        return $request->hasFile($column) 
            ? $request->file($column)->store($folder) 
            : null;
    }

    public function update_file(Request $request, Model $model, string $column, string $folder): ?string
    {
        if ($request->hasFile($column)) {
            // Hapus file lama jika ada
            if ($model->$column) {
                Storage::delete($model->$column);
            }
            // Simpan file baru
            $thumbnail = $request->file($column)->store($folder);
        } else {
            // Gunakan file lama jika tidak ada upload
            $thumbnail = $model->$column;
        }

        return $thumbnail;
    }

    public function delete_file(Model $model, string $column): void
    {
        if ($model->$column) {
            Storage::delete($model->$column);
        }
    }
}