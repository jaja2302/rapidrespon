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

    public function Masalah_tanah()
    {
        return $this->belongsTo(Masalah::class, 'masalah', 'id');
    }
    public function Rekomendasi()
    {
        return $this->belongsTo(Rekomendasi::class, 'rekomendasi', 'id');
    }

    public function nama_rekomendator()
    {
        return $this->belongsTo(Pengguna::class, 'rekomendator', 'user_id');
    }

    public function nama_verifikator1()
    {
        return $this->belongsTo(Pengguna::class, 'verifikator1', 'user_id');
    }

    public function nama_verifikator2()
    {
        return $this->belongsTo(Pengguna::class, 'verifikator2', 'user_id');
    }
}
