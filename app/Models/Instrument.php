<?php

namespace App\Models;

use App\Enums\InstrumentOrigin;
use App\Enums\InstrumentStatus;
use App\Observers\InstrumentObserver;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;


#[ObservedBy(InstrumentObserver::class)]
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

    public function scopeFilter(Builder $query, array $filters):void
    {
        $query->when($filters['search'] ?? null, function($query, $search){
            $query->where(function($query) use($search){
                $query->whereAny([
                    'instrument_code',
                    'name',
                    'slug',
                    'brand',
                    'manufacture_year',
                    'serial_number',
                    'origin',
                    'description',
                    'status',
                ], 'REGEXP', $search);
            });
        });
    }

    public function scopeSorting(Builder $query, array $sorts): void
    {
        $query->when($sorts['field'] ?? null && $sorts['direction'] ?? null, function($query) use($sorts){
            $query->orderBy($sorts['field'], $sorts['direction']);
        });
    }
    
}
