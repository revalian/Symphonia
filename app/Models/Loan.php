<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Loan extends Model
{
    protected $fillable = [
        'loan_code',
        'user_id',
        'instrument_id',
        'loan_date',
        'due_date',
    ];

    protected function casts() : array {
        return [
        'loan_date' => 'date',
        'due_date' => 'date',
        ];
    }

    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function instrument():HasOne
    {
        return $this->hasOne(Instrument::class);
    }

    public function returnInstrument():HasOne
    {
        return $this->hasOne(ReturnInstrument::class);
    }
}
