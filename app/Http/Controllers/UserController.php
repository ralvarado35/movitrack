<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::all(), 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        return response()->json($user, 201);
    }

    public function show($id)
    {
        $user = User::find($id);

        if ($user) {
            return response()->json($user, 200);
        }

        return response()->json(['message' => 'Usuario no encontrado'], 404);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if ($user) {
            $user->update($request->all());
            return response()->json($user, 200);
        }

        return response()->json(['message' => 'Usuario no encontrado'], 404);
    }

    public function destroy($id)
    {
        $user = User::find($id);

        if ($user) {
            $user->delete();
            return response()->json(['message' => 'Usuario eliminado'], 200);
        }

        return response()->json(['message' => 'Usuario no encontrado'], 404);
    }
}
