<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Departement extends Model
{
    use HasFactory;

    protected $table = 'departement';
    protected $connection = 'mysql2';
    protected $guarded = ['id'];

    public function Departement()
    {
        return $this->hasMany(Pengguna::class, 'id_departement', 'id');
    }


    public $timestamps = false;
}
