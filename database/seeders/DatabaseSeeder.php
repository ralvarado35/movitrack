<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            // UserSeeder::class,
            // ClientSeeder::class,
            // CountrySeeder::class,
            // BorderSeeder::class,
            //DriverSeeder::class, // Llama al seeder de drivers
            MovementSeeder::class, // Seeder para movimientos

        ]);
    }
}
