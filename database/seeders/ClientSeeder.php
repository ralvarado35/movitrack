<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Client;

class ClientSeeder extends Seeder
{
    public function run()
    {
        Client::create([
            'name' => 'Cliente 1',
            'address' => 'Dirección 1',
            'phone' => '123456789',
            'user_id' => 1,
        ]);

        Client::create([
            'name' => 'Cliente 2',
            'address' => 'Dirección 2',
            'phone' => '987654321',
            'user_id' => 2,
        ]);
    }
}
