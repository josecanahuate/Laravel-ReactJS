<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $response = ["success" => false];

        // Validación
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required',
        ]);

        // Si la validación falla
        if ($validator->fails()) {
            $response = ["error" => $validator->errors()];
            return response()->json($response, 200);
        }

        // Crear usuario
        $input = $request->all();
        $input["password"] = bcrypt($input['password']);

        $user = User::create($input);
        $user->assignRole('client'); // Se le asigna el rol

        $user->save(); // Add this line
        
        $response["success"] = true;
        return response()->json($response, 200);
    }

    // LOGIN
    public function login(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    if (Auth::attempt($request->only('email', 'password'))) {
        $user = Auth::user();
        $token = $user->createToken('authToken')->plainTextToken;
        $role = $user->role;

        return response()->json([
            'user' => $user,
            'token' => $token,
            'role' => $role,
            'success' => true,
        ]);
    }

    return response()->json([
        'message' => 'Credenciales incorrectas',
        'success' => false,
    ], 401);
}


    //LOGOUT
    public function logout()
    {
        $response = ["success" => false];
    
        // Revoke all tokens...
        Auth::user()->tokens->each(function ($token) {
            $token->delete();
        });
    
        $response = [
            "success" => true,
            "message" => "Sesión cerrada"
        ];
        return response()->json($response, 200);
    }
}
