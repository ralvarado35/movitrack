<?php

namespace App\Http\Controllers;

use App\Models\Movement;
use App\Models\Client;
use App\Models\Driver;
use App\Models\Country;
use App\Models\Border;
use Illuminate\Http\Request;

class MovementController extends Controller
{
    public function index()
    {
        // Obtener movimientos con las relaciones respectivas y paginación
        return Movement::with(['client', 'driver', 'country', 'border'])->paginate(10);
    }

    public function store(Request $request)
    {
        // Validar los datos, incluyendo las relaciones
        $validatedData = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'driver_id' => 'required|exists:drivers,id',
            'country_id' => 'required|exists:countries,id',
            'border_id' => 'required|exists:borders,id',
            'date' => 'required|date',
            'departure_time_predio' => 'nullable|date_format:H:i',
            'dispatch_time_client' => 'nullable|date_format:H:i',
            'arrival_time_border' => 'nullable|date_format:H:i',
            'exit_time_border' => 'nullable|date_format:H:i',
            'arrival_time_warehouse' => 'nullable|date_format:H:i',
            'unloading_time_warehouse' => 'nullable|date_format:H:i',
            'observations' => 'nullable|string',
        ]);

        // Crear el movimiento con los datos validados
        $movement = Movement::create($validatedData);
        return response()->json($movement, 201);
    }

    public function show($id)
    {
        $movement = Movement::with(['client', 'driver', 'country', 'border'])->find($id);

        if ($movement) {
            return response()->json($movement);
        }

        return response()->json(['message' => 'Movimiento no encontrado'], 404);
    }

    public function update(Request $request, $id)
    {
        $movement = Movement::find($id);

        if ($movement) {
            // Validar los datos, incluyendo las relaciones
            $validatedData = $request->validate([
                'client_id' => 'required|exists:clients,id',
                'driver_id' => 'required|exists:drivers,id',
                'country_id' => 'required|exists:countries,id',
                'border_id' => 'required|exists:borders,id',
                'date' => 'required|date',
                'departure_time_predio' => 'nullable|date_format:H:i',
                'dispatch_time_client' => 'nullable|date_format:H:i',
                'arrival_time_border' => 'nullable|date_format:H:i',
                'exit_time_border' => 'nullable|date_format:H:i',
                'arrival_time_warehouse' => 'nullable|date_format:H:i',
                'unloading_time_warehouse' => 'nullable|date_format:H:i',
                'observations' => 'nullable|string',
            ]);

            // Actualizar el movimiento con los datos validados
            $movement->update($validatedData);
            return response()->json($movement, 200);
        }

        return response()->json(['message' => 'Movimiento no encontrado'], 404);
    }

    public function destroy($id)
    {
        $movement = Movement::find($id);

        if ($movement) {
            $movement->delete();
            return response()->json(['message' => 'Movimiento eliminado'], 200);
        }

        return response()->json(['message' => 'Movimiento no encontrado'], 404);
    }
}
