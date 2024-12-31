<?php

namespace App\Http\Resources\Admin;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'username' => $this->username,
            'email' => $this->email,
            'phone' => $this->phone,
            'avatar' => $this->avatar ? Storage::url($this->avatar) : null,
            'gender' => $this->gender,
            'date_of_birth' => $this->date_of_birth ? $this->date_of_birth->format('d M Y') : null,
            'address' => $this->address,
            'created_at' => $this->created_at->format('d M Y'),
        ];
    }
}
