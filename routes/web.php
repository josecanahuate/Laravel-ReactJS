<?php

use Illuminate\Support\Facades\Route;
//use Spatie\Permission\Models\Role;

//Creacion de Roles admin | clien
//$role = Role::create(['name' => 'admin']);
//$role = Role::create(['name' => 'client']);

Route::get('{any}', function () {
    return view('welcome');
})->where('any','.*');

/* Route::any('{path?}', function () {
    return view('app');
})->where('path', '.*');
 */
