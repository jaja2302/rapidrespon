<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Laporanrr extends Model
{
    use HasFactory;
    protected $table = 'laporan_rr';
    public $timestamps = false;

    public function Jenistanah()
    {
        return $this->belongsTo(Jenistanah::class, 'jenis_tanah', 'id');
    }
    public function Topografi()
    {
        return $this->belongsTo(Topografi::class, 'topografi', 'id');
    }

    public function Solum()
    {
        return $this->belongsTo(Solum::class, 'solum', 'id');
    }

    public function Masalah()
    {
        return $this->belongsTo(Masalah::class, 'masalah', 'id');
    }
    public function Rekomendasi()
    {
        return $this->belongsTo(Rekomendasi::class, 'rekomendasi', 'id');
    }
}
