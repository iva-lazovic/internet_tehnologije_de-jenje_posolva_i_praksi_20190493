<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipOglasa extends Model
{
    public const TABLE = 'tipovi_oglasa';

    protected $table = self::TABLE;

    protected $fillable = [
        'naziv'
    ];

    public function oglasi()
    {
        return $this->hasMany(Oglas::class, 'tipOglasaId');
    }
}
