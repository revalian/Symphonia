<?php

namespace App\Models;

use App\Models\User;
use App\Models\Instrument;
use App\Models\ReturnInstrument;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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

    public function instrument():BelongsTo
    {
        return $this->belongsTo(Instrument::class);
    }

    public function returnInstrument():HasOne
    {
        return $this->hasOne(ReturnInstrument::class);
    }

    public function scopeFilter(Builder $query, array $filters): void 
    {
        $query->when($filters['search'] ?? null, function($query, $search){
            $query->where(function($query) use($search){
                $query->whereAny([
                    'loan_code',
                    'loan_date',
                    'due_date',
                ], 'REGEXP', $search);
            });
        });
    }

    public function scopeSorting(Builder $query, array $sorts):void
    {
        $query->when($sorts['field'] ?? null && $sorts['direction'] ?? null, function ($query) use ($sorts) {
            $query->orderBy($sorts['field'], $sorts['direction']);
        });
    }

    public static function checkLoanInstrument(int $user_id, int $instrument_id): bool
    {
        return self::query()
            ->where('user_id', $user_id)
            ->where('instrument_id', $instrument_id)
            ->whereDoesntHave('returnInstrument', fn($query) => $query->where('instrument_id', $instrument_id)->where('user_id', $user_id))
            ->exists();
    }

    public static function totalLoanInstruments():array
    {
        return [
            'days' => self::whereDate('created_at', Carbon::now()->toDateString())->count(),
            'weeks' => self::whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])->count(),
            'months' => self::whereMonth('created_at', Carbon::now()->month)
                        ->whereYear('created_at', Carbon::now()->year)
                        ->count(),
            'years' => self::whereYear('created_at', Carbon::now()->year)->count(),
        ];
    }
}
