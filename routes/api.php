<?php

use App\Http\Controllers\Api\Admin\CategoriaController;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Admin\EmpresaController;
use App\Http\Controllers\Api\Client\EmpresaController as EmpresaClient;
use App\Http\Controllers\Api\FrontController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//grupo de rutas con prefix v1
Route::prefix('v1')->group(function () {

    //RUTAS PUBLICAS NO NECESITAN AUTORIZACION ::public
//hacer busquedas
Route::get('/public/{slug}', [FrontController::class, 'categoria']);

    //::auth
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

    //extraer menu

    //entrar a un grupo de empresas mediante categoria

    //RUTAS PRIVADAS SI NECESITAN AUTORIZACION se hace referencia a SANCTUM (TOKEN)
Route::group(['middleware' => 'auth:sanctum' ], function () {
    //::auth
    Route::post('/auth/logout', [AuthController::class, 'logout']); //el logout debe tener autorizacion

    //Rutas ::Rol Cliente
    Route::apiResource('/client/empresa', EmpresaClient::class);  //Controller CLIENT

    //Rutas ::Rol Admin
    Route::apiResource('/admin/user', UserController::class); //Controller User ADMIN
    Route::apiResource('/admin/categoria', CategoriaController::class); //Controller Categoria ADMIN
    Route::apiResource('/admin/empresa', EmpresaController::class); //Controller ADMIN
});

}); 


/* Route::prefix('v2')->group(function () {
}); 
 */

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});