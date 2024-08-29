<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solum extends Model
{
    use HasFactory;
    protected $table = 'solum';
    public $timestamps = false;
    public function Solum()
    {
        return $this->hasMany(Laporanrr::class, 'solum', 'id');
    }
}
