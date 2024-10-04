<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movement extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id', 'driver_id', 'country_id', 'border_id', 'date',
        'departure_time_predio', 'dispatch_time_client', 'arrival_time_border',
        'exit_time_border', 'arrival_time_warehouse', 'unloading_time_warehouse',
        'observations'
    ];

    // Relación con el cliente
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    // Relación con el conductor
    public function driver()
    {
        return $this->belongsTo(Driver::class);
    }

    // Relación con el país
    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    // Relación con la frontera
    public function border()
    {
        return $this->belongsTo(Border::class);
    }
}
