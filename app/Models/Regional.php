<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Regional extends Model
{
    use HasFactory;
    protected $table = 'reg';
    protected $connection = 'mysql3';

    public function Wilayah()
    {
        return $this->hasMany(Wilayah::class, 'regional', 'id');
    }
}
