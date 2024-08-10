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
    protected $connection = 'mysql2'; // Add this line to set the connection explicitly
    public $timestamps = false;
}
