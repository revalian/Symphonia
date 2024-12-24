<?php

namespace App\Models;

use App\Models\Fine;
use App\Models\Loan;
use App\Models\Instrument;
use App\Enums\ReturnInstrumentStatus;
use App\Models\ReturnInstrumentCheck;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReturnInstrument extends Model
{
    protected $fillable = [
        'return_instrument_code',
        'loan_id',
        'user_id',
        'instrument_id',
        'return_date',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'return_date' => 'date',
            'status' => ReturnInstrumentStatus::class,
        ];
    }

    public function loan():BelongsTo
    {
        return $this->belongsTo(Loan::class);
    }

    public function instrument():BelongsTo {
        return $this->belongsTo(Instrument::class);
    }

    public function fine():HasOne {
        return $this->hasOne(Fine::class);
    }

    public function returnInstrumentCheck():HasOne 
    {
        return $this->hasOne(ReturnInstrumentCheck::class);
    }
    
}
