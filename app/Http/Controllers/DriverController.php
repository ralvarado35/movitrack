<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use Illuminate\Http\Request;

class DriverController extends Controller
{
    public function index()
    {
        // Obtener todos los conductores
        return Driver::all();
    }

    public function store(Request $request)
    {
        // Validar y crear un nuevo conductor
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'license' => 'required|string|max:50',
            'phone' => 'nullable|string|max:20',
        ]);

        $driver = Driver::create($validatedData);
        return response()->json($driver, 201);
    }

    public function show($id)
    {
        // Obtener un conductor por ID
        $driver = Driver::find($id);

        if ($driver) {
            return response()->json($driver);
        }

        return response()->json(['message' => 'Conductor no encontrado'], 404);
    }

    public function update(Request $request, $id)
    {
        // Actualizar un conductor existente
        $driver = Driver::find($id);

        if ($driver) {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'license' => 'required|string|max:50',
                'phone' => 'nullable|string|max:20',
            ]);

            $driver->update($validatedData);
            return response()->json($driver, 200);
        }

        return response()->json(['message' => 'Conductor no encontrado'], 404);
    }

    public function destroy($id)
    {
        // Eliminar un conductor
        $driver = Driver::find($id);

        if ($driver) {
            $driver->delete();
            return response()->json(['message' => 'Conductor eliminado'], 200);
        }

        return response()->json(['message' => 'Conductor no encontrado'], 404);
    }
}

