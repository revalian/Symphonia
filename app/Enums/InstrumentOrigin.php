<?php

namespace App\Enums;

enum InstrumentOrigin: string
{
    case INDONESIA = 'Indonesia';
    case WESTERN = 'Western';
    case ASIAN = 'Asian';
    case AFRICAN = 'African';

    public static function options(): array
    {
        return collect(self::cases())->map(fn($item) => [
            'value' => $item->value,
            'label' => $item->name,
        ])->values()->toArray();
    }
}
