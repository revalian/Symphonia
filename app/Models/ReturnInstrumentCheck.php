<?php

namespace App\Models;

use App\Enums\ReturnInstrumentCondition;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReturnInstrumentCheck extends Model
{
    protected $fillable = [
        'return_instrument_id',
        'codition',
        'notes',
    ];

    protected function casts(): array 
    {
        return[
            'condition' => ReturnInstrumentCondition::class,
        ];
    }

    public function returnBook(): BelongsTo
    {
        return $this-> belongsTo(ReturnInstrument::class);
    }
}
