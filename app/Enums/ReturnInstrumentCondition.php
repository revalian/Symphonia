<?php

namespace App\Enums;

enum ReturnInstrumentCondition: string
{
    case GOOD = 'Sesuai';
    case DAMAGE = 'Rusak';
    case LOST = 'Hilang';

    public static function options(): array
    {
        return collect(self::cases())->map(fn($item) => [
            'value' => $item->value,
            'label' => $item->value,
        ])->values()->toArray();
    }
}
