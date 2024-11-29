<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RentalItem extends Model
{
    protected $fillable = [
        'rental_id',
        'instrument_id',
        'quantity',
        'price_per_day',
        'subtotal',
    ];

    public function rental()
    {
        return $this->belongsTo(Rental::class);
    }

    public function instrument()
    {
        return $this->belongsTo(Instrument::class);
    }

}
