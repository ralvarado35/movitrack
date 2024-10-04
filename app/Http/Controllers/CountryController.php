<?php

namespace App\Http\Controllers;

use App\Models\Country;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    public function index()
    {
        return response()->json(Country::all(), 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $country = Country::create($validated);

        return response()->json($country, 201);
    }

    public function show($id)
    {
        $country = Country::find($id);

        if ($country) {
            return response()->json($country, 200);
        }

        return response()->json(['message' => 'País no encontrado'], 404);
    }

    public function update(Request $request, $id)
    {
        $country = Country::find($id);

        if ($country) {
            $country->update($request->all());
            return response()->json($country, 200);
        }

        return response()->json(['message' => 'País no encontrado'], 404);
    }

    public function destroy($id)
    {
        $country = Country::find($id);

        if ($country) {
            $country->delete();
            return response()->json(['message' => 'País eliminado correctamente'], 200);
        }

        return response()->json(['message' => 'País no encontrado'], 404);
    }
}
