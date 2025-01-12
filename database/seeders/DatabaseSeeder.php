<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {


        User::factory()->create([
            'name' => $name = 'fadhil',
            'username' => usernameGenerator($name),
            'email' => 'rffadhil07@gmail.com',
        ])->assignRole(Role::create(['name' => 'admin']));

        User::factory()->create([
            'name' => $name = 'fahla',
            'username' => usernameGenerator($name),
            'email' => 'gedang@gmail.com',
        ])->assignRole(Role::create(['name' => 'operator']));

        User::factory()->create([
            'name' => $name = 'rivaldy',
            'username' => usernameGenerator($name),
            'email' => 'rivaldy@gmail.com',
        ])->assignRole(Role::create(['name' => 'member']));

        $this->call(CategorySeeder::class);
        $this->call(SupplierSeeder::class);
    }
}