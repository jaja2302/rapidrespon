<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MutuTransport extends Model
{
    use HasFactory;
    protected $table = 'mutu_transport';
    protected $connection = 'mysql3';

    public function Estate()
    {
        return $this->belongsTo(Estate::class, 'est', 'estate');
    }
}
