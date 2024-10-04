<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Border;

class BorderSeeder extends Seeder
{
    public function run()
    {
        Border::create(['name' => 'Amatillo', 'country_id' => 1]);
        Border::create(['name' => 'San Cristobal', 'country_id' => 2]);
    }
}
