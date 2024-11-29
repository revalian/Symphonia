<?php

namespace App\Models;

use App\Enums\InstrumentOrigin;
use App\Enums\InstrumentStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Instrument extends Model
{
    protected $fillable = [
        'instrument_code',     
        'name',                
        'slug',                
        'brand',               
        'manufacture_year',    
        'serial_number',       
        'origin',   
        'description',         
        'status',              
        'image',               
        'rental_price_per_day',        
        'category_id',         
        'supplier_id',         
    ];

    protected function casts(): array
    {
        return [
            'origin' => InstrumentOrigin::class,
            'status' => InstrumentStatus::class,
        ];
    }

    public function category():BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function stock():HasOne
    {
        return $this->hasOne(Stock::class);
    }

    public function loans():HasMany
    {
        return $this->hasMany(Loan::class);
    }

    public function supplier():BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    public function rentalItems()
    {
        return $this->hasMany(RentalItem::class);
    }
    
}
