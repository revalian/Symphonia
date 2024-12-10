<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $name = $this->faker->unique()->randomElement([
                'Alat Musik Petik',
                'Alat Musik Tiup',
                'Alat Musik Pukul',
                'Alat Musik Gesek',
                'Alat Musik Tekan',
                'Alat Musik Elektronik',
                'Alat Musik Tradisional',
                
            ]),
            'slug' => str($name)->slug()->lower()->append(str()->random(4)),
        ];
        
    }
}
