<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kompanija extends Model
{
    public const TABLE = 'kompanije';

    protected $table = self::TABLE;

    protected $fillable = [
        'naziv',
        'adresa',
        'telefon',
        'email',
        'opis',
    ];


    public function oglasi()
    {
        return $this->hasMany(Oglas::class, 'kompanijaId');
    }

}
