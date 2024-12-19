<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Resources\Json\JsonResource;


class InstrumentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'instrument_code' => $this->instrument_code,
            'name' => $this->name, 
            'slug' => $this->slug,
            'brand' => $this->brand, 
            'manufacture_year' => $this->manufacture_year, 
            'serial_number' => $this->serial_number, 
            'origin' => $this->origin, 
            'description' => $this->description, 
            'status' => $this->status, 
            'image' => $this->image ? Storage::url($this->image) : null, 
            'rental_price_per_day' => number_format($this->rental_price_per_day, 0,',','.'), 
            'category_id' => [
                'id' => $this->category?->id,
                'name' => $this->category?->name,
            ],
            'supplier_id' => [
                'id' => $this->supplier?->id,
                'name' => $this->supplier?->name,
            ],
            'stock' => [
                'total' => $this->stock?->total,
                'available' => $this->stock?->available,
                'borrow' => $this->stock?->borrow,
                'lost' => $this->stock?->lost,
                'damaged' => $this->stock?->damaged,
            ],
            'created_at' => $this->created_at->format('d M Y'), 
            'updated_at' => $this->updated_at, 
        ];
    }
    
}
