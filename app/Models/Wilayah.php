<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wilayah extends Model
{
    use HasFactory;
    protected $table = 'wil';
    protected $connection = 'mysql3';

    public function Regional()
    {
        return $this->belongsTo(Regional::class, 'id', 'regional');
    }

    public function Estate()
    {
        return $this->hasMany(Estate::class, 'wil', 'id');
    }
}
