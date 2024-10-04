<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Country;

class CountrySeeder extends Seeder
{
    public function run()
    {
        Country::create(['name' => 'El Salvador']);
        Country::create(['name' => 'Guatemala']);
        Country::create(['name' => 'Honduras']);
    }
}
