<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    use HasFactory;
    protected $guarded = [];


    //relacion de empresas a categoria
    public function categoria()
    {
        return $this->hasMany(Categoria::class);
    }


    //relacion de empresas a user
    public function user()
    {
        return $this->hasMany(User::class);
    }
    
}
