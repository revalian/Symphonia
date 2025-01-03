<?php

namespace App\Models;

use App\Models\Loan;
use App\Models\Stock;
use App\Models\Category;
use App\Models\Supplier;
use App\Models\RentalItem;
use App\Enums\InstrumentOrigin;
use App\Enums\InstrumentStatus;
use App\Observers\InstrumentObserver;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;


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

    public function updateStock($columnToDecrement, $columnToIncrement)
    {
        if($this->stock->$columnToDecrement>0){
            return $this->stock()->update([
                $columnToDecrement => $this->stock->$columnToDecrement - 1,
                $columnToIncrement => $this->stock->$columnToIncrement + 1,
            ]);
        }

        return false;
    }

    public function stock_loan(){
        return $this->updateStock('available', 'loan');
    }

    public function stock_lost()
    {
        return $this->updateStock('loan', 'lost');
    }

    public function stock_damaged()
    {
        return $this->updateStock('loan', 'damaged');
    }

    public function stock_loan_return()
    {
        return $this->updateStock('loan','available');
    }

    public static function leastLoanInstruments($limit = 5) 
    {
        return self::query()
        ->select(['id', 'name', 'brand'])
        ->withCount('loans')
        ->orderBy('loans_count')
        ->limit($limit)
        ->get();
    }

    public static function mostLoanInstruments($limit = 5)
    {
        return self::query()
        ->select(['id', 'name', 'brand'])
        ->withCount('loans')
        ->orderByDesc('loans_count')
        ->limit($limit)
        ->get();
    }
    
}
