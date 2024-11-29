<?php

namespace App\Enums;

enum UserGender: string
{
    case MALE = 'Laki-Laki';
    case Female = 'Perempuan';

    public static function options(): array
    {
        return collect(self::cases())->map(fn($item) => [
            'value' => $item->value,
            'label' => $item->name,
        ])->values()->toArray();
    }
}
