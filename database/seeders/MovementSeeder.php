<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Movement;

class MovementSeeder extends Seeder
{
    public function run()
    {
        Movement::create([
            'client_id' => 1,
            'driver_id' => 1,
            'country_id' => 1,
            'border_id' => 1,
            'date' => '2024-01-01',
            'departure_time_predio' => '08:00',
            'dispatch_time_client' => '09:00',
            'arrival_time_border' => '12:00',
            'exit_time_border' => '12:30',
            'arrival_time_warehouse' => '14:00',
            'unloading_time_warehouse' => '15:00',
            'observations' => 'Entrega completada sin contratiempos',
        ]);

        Movement::create([
            'client_id' => 2,
            'driver_id' => 2,
            'country_id' => 2,
            'border_id' => 2,
            'date' => '2024-01-05',
            'departure_time_predio' => '10:00',
            'dispatch_time_client' => '11:30',
            'arrival_time_border' => '14:00',
            'exit_time_border' => '14:30',
            'arrival_time_warehouse' => '16:00',
            'unloading_time_warehouse' => '17:00',
            'observations' => 'Demora en la frontera debido a inspección adicional',
        ]);
    }
}
