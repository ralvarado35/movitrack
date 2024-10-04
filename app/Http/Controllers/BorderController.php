<?php

namespace App\Http\Controllers;

use App\Models\Border;
use Illuminate\Http\Request;

class BorderController extends Controller
{
    public function index()
    {
        return response()->json(Border::with('country')->get(), 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'country_id' => 'required|exists:countries,id',
        ]);

        $border = Border::create($validated);

        return response()->json($border, 201);
    }

    public function show($id)
    {
        $border = Border::with('country')->find($id);

        if ($border) {
            return response()->json($border, 200);
        }

        return response()->json(['message' => 'Frontera no encontrada'], 404);
    }

    public function update(Request $request, $id)
    {
        $border = Border::find($id);

        if ($border) {
            $border->update($request->all());
            return response()->json($border, 200);
        }

        return response()->json(['message' => 'Frontera no encontrada'], 404);
    }

    public function destroy($id)
    {
        $border = Border::find($id);

        if ($border) {
            $border->delete();
            return response()->json(['message' => 'Frontera eliminada correctamente'], 200);
        }

        return response()->json(['message' => 'Frontera no encontrada'], 404);
    }
}
