<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Pengguna  extends Authenticatable
{
    use HasFactory, Notifiable;
    protected $table = 'pengguna';
    protected $primaryKey = 'user_id';
    protected $connection = 'mysql2';
    public $timestamps = false;

    public function Departement()
    {
        return $this->belongsTo(Departement::class, 'id_departement', 'id');
    }

    public function Jabatan()
    {
        return $this->belongsTo(Jabatan::class, 'id_jabatan', 'id');
    }
}
