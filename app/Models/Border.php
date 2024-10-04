<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Border extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

    protected $fillable = ['name', 'country_id'];

    // Relación con País (Una frontera pertenece a un país)
    public function country()
    {
        return $this->belongsTo(Country::class, 'country_id', 'id');
    }
}
