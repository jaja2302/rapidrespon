<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rekomendasi extends Model
{
    use HasFactory;
    protected $table = 'rekomendasi';
    public $timestamps = false;
    public function Rekomendasi()
    {
        return $this->hasMany(Laporanrr::class, 'rekomendasi', 'id');
    }
}
