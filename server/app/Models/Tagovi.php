<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tagovi extends Model
{
    public const TABLE = 'tagovi';

    protected $table = self::TABLE;

    protected $fillable = [
        'tag',
        'oglasId'
    ];

    public function oglas()
    {
        return $this->belongsTo(Oglas::class, 'oglasId');
    }
}
