<?php

namespace App\Observers;

use App\Models\Instrument;

class InstrumentObserver
{
    public function created(Instrument $instrument) {
        $instrument->stock()->create([
            'total' => $total = request()->total,
            'available' => $total
        ]); 
    }
}
