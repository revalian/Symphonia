<?php

namespace App\Http\Resources\Admin;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FineResource extends JsonResource
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
            'late_fee' => $this->late_fee,
            'other_fee' => $this->other_fee,
            'total_fee' => $this->total_fee,
            'payment_status' => $this->payment_status,
            'loan' => $this->whenLoaded('returnInstrument',[
                'id' => $this->returnInstrument->loan?->id,
                'loan_code' => $this->returnInstrument->loan?->loan_code,
                'loan_date' => Carbon::parse($this->returnInstrument?->loan->loan_date)->$request->format('d M Y'),
                'due_date' => Carbon::parse($this->returnInstrument?->loan->due_date)->$request->format('d M Y')
            ]),

            'return_instrument' => $this->whenLoaded('returnInstrument', [
                'return_instrument_code' => $this->returnInstrument?->return_book_code,
                'return_date' => Carbon::parse($this->returnInstrument?->return_date)->format('d M Y'),
            ]),
            'user' => [
                'id' => $this->user?->id,
                'name' => $this->user?->name,
            ],
        ];
    }
}
