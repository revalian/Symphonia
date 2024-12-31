<?php

namespace App\Models;

use App\Models\Instrument;
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
