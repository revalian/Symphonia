<?php

namespace App\Http\Requests\Admin;

use App\Enums\InstrumentOrigin;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Foundation\Http\FormRequest;

class InstrumentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'min:3',
                'max:255',
                'string',
            ],
            'brand' => [
                'required',
                'min:3',
                'max:255',
                'string',
            ],
            'manufacture_year' => [
                'required',
                'numeric',
                'integer',
            ],
            'serial_number' => [
                'required',
                'string',
                'max:255'
            ],
            'origin' => [
                'required',
                new Enum(InstrumentOrigin::class),
            ],
            'description' => [
                'nullable',
            ],
            'image' => [
                'nullable' , 
                'mimes:png,jpg,jpeg,webp',
                'max:2048', 
            ],
            'rental_price_per_day' => [
                'required',
                'numeric',
                'min:0',
            ],
            'category_id' => [
                'required',
                'exists:categories,id',
            ],
            'supplier_id' =>[
                'required',
                'exists:suppliers,id'
            ],
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'Nama',
            'brand' => 'Merek',
            'manufacture_year' => 'Tahun Pembuatan',
            'serial_number' => 'Serial_number',
            'origin' => 'Asal alat musik',
            'image' => 'Image',
            'category_id' => 'Kategori',
            'supplier_id' => 'Pemasok',

        ];
    }
}
