<?php

namespace App\Enums;

enum RentalStatus: string
{
    case PENDING = 'Pending';
    case ONGOING = 'Ongoing';
    case COMPLETED = 'Completed';
    case CANCELLED = 'Cancelled';

    public static function options(): array
    {
        return collect(self::cases())->map(fn($item) => [
            'value' => $item->value,
            'label' => $item->name,
        ])->values()->toArray();
    }
}
