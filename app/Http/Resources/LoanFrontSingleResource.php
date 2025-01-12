<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LoanFrontSingleResource extends JsonResource
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
            'loan_code' => $this->loan_code,
            'loan_date' => Carbon::parse($this->loan_date)->format('d M Y'),
            'due_date' => Carbon::parse($this->due_date)->format('d M Y'),
            'created_at' => $this->created_at->format('d M Y'), 
            'instrument' => $this->whenLoaded('instrument', [
                'id' => $this->instrument?->id,
                'name' => $this->instrument?->name,
                'slug' => $this->instrument?->slug,
                'image' => $this->instrument?->image,
                'description' => $this->instrument?->description,
            ]),
            'return_instrument' => $this->whenLoaded('returnInstrument', [
                'status' => $this->returnInstrument?->status,
            ]),
            'user' => $this->whenLoaded('user', [
                'id' => $this->user?->id,
                'name' => $this->user?->name,
            ]),
        ];
    }
}
