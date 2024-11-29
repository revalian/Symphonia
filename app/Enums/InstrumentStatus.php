<?php

namespace App\Enums;

enum InstrumentStatus: string
{
    case AVAILABLE = 'Tersedia';
    case UNAVAILABLE = 'Tidak Tersedia';
    case LOAN = 'Dipinjam';
    case LOST = 'Hilang';
    case DAMAGE = 'Rusak';

    public static function options(): array
    {
        return collect(self::cases())->map(fn($item) => [
            'value' => $item->value,
            'label' => $item->name,
        ])->values()->toArray();
    }
}
