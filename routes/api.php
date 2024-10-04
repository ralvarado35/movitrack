<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\BorderController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\MovementController;

// Rutas públicas
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);



// Rutas protegidas (solo accesibles por usuarios autenticados con Sanctum)
// Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('users', UserController::class);

    Route::apiResource('clients', ClientController::class);

   
    Route::apiResource('countries', CountryController::class);
    Route::apiResource('borders', BorderController::class);
    Route::apiResource('drivers', DriverController::class);
    Route::apiResource('movements', MovementController::class);
// });
