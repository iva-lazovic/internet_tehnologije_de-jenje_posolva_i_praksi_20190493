<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Oglas extends Model
{
    public const TABLE = 'oglasi';
    public const STATUS_AKTIVAN = 'aktivan';
    public const STATUS_NEAKTIVAN = 'neaktivan';
    public const STATUS_DRAFT = 'draft';

    protected $table = self::TABLE;

    protected $fillable = [
        'naslov',
        'opis',
        'rokZaPrijavu',
        'kompanijaId',
        'tipOglasaId',
        'status'
    ];

    public function kompanija()
    {
        return $this->belongsTo(Kompanija::class, 'kompanijaId');
    }

    public function tipOglasa()
    {
        return $this->belongsTo(TipOglasa::class, 'tipOglasaId');
    }

    public function tagovi()
    {
        return $this->hasMany(Tagovi::class, 'oglasId');
    }

    public function prijave()
    {
        return $this->hasMany(Prijava::class, 'oglasId');
    }
}
