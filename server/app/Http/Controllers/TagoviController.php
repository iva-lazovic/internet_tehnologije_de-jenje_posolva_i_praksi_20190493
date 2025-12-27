<?php

namespace App\Http\Controllers;

use App\Http\Resources\OglasResurs;
use App\Models\Oglas;
use Illuminate\Http\Request;

class TagoviController extends OdgovorController
{
    public function index()
    {
        $sviTagovi = \App\Models\Tagovi::all();
        return $this->uspesno(\App\Http\Resources\TagoviResurs::collection($sviTagovi));
    }

    public function pretraziPoTagu($tag)
    {
        $oglasi = Oglas::whereHas('tagovi', function ($query) use ($tag) {
            $query->where('tag', 'like', '%' . $tag . '%');
        })->get();

        return $this->uspesno(OglasResurs::collection($oglasi->load('kompanija', 'tipOglasa', 'tagovi')));
    }
}
