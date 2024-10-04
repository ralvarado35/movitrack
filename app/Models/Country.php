<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

    protected $fillable = ['name'];

    // Relación con Fronteras (Un país tiene muchas fronteras)
    public function borders()
    {
        return $this->hasMany(Border::class, 'country_id', 'id');
    }
}
