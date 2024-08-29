<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Topografi extends Model
{
    use HasFactory;
    protected $table = 'topografi';

    public function Topografi()
    {
        return $this->hasMany(Laporanrr::class, 'topografi', 'id');
    }
}
