<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index()
    {
        // Obtener todos los clientes
        return Client::all();
    }

    public function store(Request $request)
    {
        // Validar y crear un nuevo cliente
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
        ]);

        $client = Client::create($validatedData);
        return response()->json($client, 201);
    }

    public function show($id)
    {
        // Obtener un cliente por ID
        $client = Client::find($id);

        if ($client) {
            return response()->json($client);
        }

        return response()->json(['message' => 'Cliente no encontrado'], 404);
    }

    public function update(Request $request, $id)
    {
        // Actualizar un cliente existente
        $client = Client::find($id);

        if ($client) {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email',
                'phone' => 'nullable|string|max:20',
                'address' => 'nullable|string',
            ]);

            $client->update($validatedData);
            return response()->json($client, 200);
        }

        return response()->json(['message' => 'Cliente no encontrado'], 404);
    }

    public function destroy($id)
    {
        // Eliminar un cliente
        $client = Client::find($id);

        if ($client) {
            $client->delete();
            return response()->json(['message' => 'Cliente eliminado'], 200);
        }

        return response()->json(['message' => 'Cliente no encontrado'], 404);
    }
}
