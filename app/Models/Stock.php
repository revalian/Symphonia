<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Stock extends Model
{
    protected $fillable = [
        'instrument_id',
        'total',
        'available',
        'loan',
        'lost',
        'damaged',
    ];

    public function instrument(): BelongsTo
    {
        return $this->belongsTo(Instrument::class); 
    }
}
