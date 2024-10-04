<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;


use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
   // Función para el registro de usuario
   public function signup(Request $request)
   {
       // Validar los datos de entrada
       $validator = Validator::make($request->all(), [
           'name' => 'required|string|max:255',
           'email' => 'required|string|email|max:255|unique:users',
           'password' => 'required|string|min:6|confirmed',
       ]);

       // Si la validación falla, devuelve los errores
       if ($validator->fails()) {
           return response()->json([
               'errors' => $validator->errors()
           ], 422);
       }

       // Crear un nuevo usuario
       $user = User::create([
           'name' => $request->name,
           'email' => $request->email,
           'password' => Hash::make($request->password),
       ]);

       // Crear un token para el usuario
       $token = $user->createToken('auth_token')->plainTextToken;

       // Devolver la respuesta con el token y los datos del usuario
       return response()->json([
           'user' => $user,
           'token' => $token,
       ]);
   }


    // Función para el inicio de sesión
    public function login(Request $request)
    {
        // Validar los datos de entrada (email y password)
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Buscar el usuario por email
        $user = User::where('email', $request->email)->first();

        // Verificar si el usuario existe y la contraseña es correcta
        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Generar un token de autenticación para el usuario
        $token = $user->createToken('auth_token')->plainTextToken;

        // Devolver la respuesta con el token y los datos del usuario
        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }




    public function logout(Request $request)
    {
        // Elimina el token actual del usuario autenticado
        $request->user()->currentAccessToken()->delete();

        // Devuelve una respuesta de éxito
        return response()->json([
            'message' => 'Has cerrado sesión correctamente',
        ]);
    }
}
