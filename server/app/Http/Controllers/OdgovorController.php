<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class OdgovorController extends Controller
{
    public function uspesno($podaci, $poruka = "Uspesno izvrseno", $code = 200)
    {
        return response()->json([
            'uspesno' => true,
            'poruka' => $poruka,
            'podaci' => $podaci
        ], $code);
    }

    public function neuspesno($poruka = "Doslo je do greske", $greske = [], $code = 400)
    {
        return response()->json([
            'uspesno' => false,
            'greske' => $greske,
            'poruka' => $poruka
        ], $code);
    }
}
