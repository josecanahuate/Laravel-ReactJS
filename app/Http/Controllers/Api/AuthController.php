<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Traits\HasRoles;
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
        $user->assignRole('admin'); // Se le asigna el rol

        $user->save(); // Add this line
        
        $response["success"] = true;
        return response()->json($response, 200);
    }

    // LOGIN
    public function login(Request $request)
    {
        $response = ["success" => false];

        // Validación
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $credentials = request([ 'email', 'password' ]);
        if (!auth()->attempt($credentials)){
            return response()->json([
                'message' => 'Unauthorized',
                'error' => [
                    'password' => [
                        'Invalid Credentials'
                    ]
                ]
                    ], 422);
        }   
        
       $user = User::where('email', $request->email)->first();
        $authToken = $user->createToken('auth-token')->plainTextToken;
        $response['message'] = "Logged in";

        return response()->json([
            'access_token' => $authToken,
            'message' => $response['message']
        ]);
    }

    //LOGOUT
/*     public function logout(){
        // Revoke all tokens...
        $response=["success"=>false];
        auth()->user->tokens()->delete();
        $response=[
            "success"=>true,
            "message"=>"Sesion cerrada"
        ];
        return response()->json($response, 200);
    } */

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
