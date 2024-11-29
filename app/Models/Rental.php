<?php

namespace App\Models;

use App\Enums\RentalStatus;
use Illuminate\Database\Eloquent\Model;

class Rental extends Model
{
    protected $fillable = [
        'rental_code',
        'user_id',
        'start_date',
        'end_date',
        'total_price',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
            'status' => RentalStatus::class,
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function rentalItems()
    {
        return $this->hasMany(RentalItem::class);
    }
    
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
    



}
