<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estate extends Model
{
    use HasFactory;
    protected $table = 'estate';
    protected $connection = 'mysql3';

    public function Wilayah()
    {
        return $this->belongsTo(Wilayah::class, 'id', 'wil');
    }
}
