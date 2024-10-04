<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMovementsTable extends Migration
{
    public function up()
    {
        Schema::create('movements', function (Blueprint $table) {
            $table->id('movement_id');

            // Llaves foráneas: Asegúrate de que los tipos coincidan y las columnas existen
            $table->foreignId('client_id')->constrained('clients', 'client_id')->onDelete('cascade');
            $table->foreignId('driver_id')->constrained('drivers', 'driver_id')->onDelete('cascade');
            $table->foreignId('country_id')->constrained('countries', 'country_id')->onDelete('cascade');
            $table->foreignId('border_id')->constrained('borders', 'border_id')->onDelete('cascade');

            // Datos del movimiento
            $table->date('date');
            $table->time('departure_time_predio')->nullable();
            $table->time('dispatch_time_client')->nullable();
            $table->time('arrival_time_border')->nullable();
            $table->time('exit_time_border')->nullable();
            $table->time('arrival_time_warehouse')->nullable();
            $table->time('unloading_time_warehouse')->nullable();
            $table->text('observations')->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('movements');
    }
}
