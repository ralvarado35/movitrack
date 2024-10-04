<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Driver;

class DriverSeeder extends Seeder
{
    public function run()
    {
        Driver::create([
            'name' => 'John Doe',
            'license' => 'A12345678',
            'user_id' => 1, // Asume que ya tienes un usuario con id 1
        ]);

        Driver::create([
            'name' => 'Jane Smith',
            'license' => 'B98765432',
            'user_id' => 2, // Asume que ya tienes un usuario con id 2
        ]);
    }
}
