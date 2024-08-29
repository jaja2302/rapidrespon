<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jenistanah extends Model
{
    use HasFactory;
    protected $table = 'jenis_tanah';

    public function Jenistanah()
    {
        return $this->hasMany(Laporanrr::class, 'jenis_tanah', 'id');
    }
}
