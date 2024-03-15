<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;


class CategoriaController extends Controller
{
    
    //listado de usuarios
    public function index(){
        $data = Categoria::all();
        /* $data = Categoria::orderBy(['id','nombre']); */
        return response()->json($data, 200);
    }

    public function store(Request $request){
        //validacion

        //almacenar imagen en folder y nombre de imagen en BD
        $data = new Categoria($request->all());
        //upload image base64
        if($request->urlfoto){
            $img = $request->urlfoto;
            //process
            $folderPath = "/img/categoria"; //ubicacion: public\img\categoria
            $image_parts = explode(";base64", $img);
            $image_type_aux = explode( "image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $file = $folderPath . Str::slug($request->nombre) . '.'.$image_type;
            file_put_contents(public_path($file), $image_base64);
            $data->urlfoto = Str::slug($request->nombre).'.'.$image_type; //almacena el nombre de la imagen

        }
        $data->slug = Str::slug($request->nombre);

        $data->save();
        return response()->json($data, 200);   
    }


    public function show($id){
        $data = Categoria::find($id);
        return response()->json($data, 200);   
    }

    public function update(Request $request, $id){
        //validacion


        $data = Categoria::find($id);
        $data->fill($request->all());
        if($request->urlfoto){
            $img = $request->urlfoto;
            //process
            $folderPath = "/img/categoria"; //ubicacion: public\img\categoria
            $image_parts = explode(";base64", $img);
            $image_type_aux = explode( "image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $file = $folderPath . Str::slug($request->nombre) . '.'.$image_type;
            file_put_contents(public_path($file), $image_base64);
            $data->urlfoto = Str::slug($request->nombre).'.'.$image_type; //almacena el nombre de la imagen

        }
        $data->slug = Str::slug($request->nombre); //si cambia el nombre de la img

        $data->save();
        return response()->json($data, 200);   
    }

    public function destroy($id){
        $data = Categoria::find($id);
        $data->delete();
        return response()->json("Categoria Eliminada", 200);   
    }
}
