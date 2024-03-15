<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //listado de usuarios
    public function index(){
        /* $data = User::all(); */
        $data = User::all(['id','name', 'email']); //para que muestre solo estos campos
        return response()->json($data, 200);
    }

    public function show($id){
        $data = User::find($id);
        return response()->json($data, 200);   
    }

    public function update(Request $request, $id){
        //validacion


        $data = User::find($id);
        $data->fill($request->all());
        $data->save();
        return response()->json($data, 200);   
    }
}
