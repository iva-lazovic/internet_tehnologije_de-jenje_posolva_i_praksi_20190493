<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Prijava extends Model
{
    public const TABLE = 'prijave';

    protected $table = self::TABLE;

    protected $fillable = [
        'userId',
        'oglasId',
        'datumPrijave',
        'status',
        'cvLink',
        'feedback'
    ];

    public function oglas()
    {
        return $this->belongsTo(Oglas::class, 'oglasId');
    }

    public function user(){
        return $this->belongsTo(User::class, 'userId');
    }
}
