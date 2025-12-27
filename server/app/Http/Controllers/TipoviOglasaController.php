<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TipoviOglasaController extends OdgovorController
{
    public function index()
    {
        $sviTipoviOglasa = \App\Models\TipOglasa::all();
        return $this->uspesno(\App\Http\Resources\TipOglasaResurs::collection($sviTipoviOglasa));
    }
}
