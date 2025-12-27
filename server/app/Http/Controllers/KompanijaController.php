<?php

namespace App\Http\Controllers;

use App\Http\Resources\KompanijaResurs;
use App\Models\Kompanija;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class KompanijaController extends OdgovorController
{
    public function index()
    {
        $sveKomanije = Kompanija::all();
        return $this->uspesno(KompanijaResurs::collection($sveKomanije), 'Lista kompanija je uspesno ucitana.');
    }

    public function show($id)
    {
        $kompanija = Kompanija::find($id);
        if (!$kompanija) {
            return $this->neuspesno('Kompanija sa datim ID-jem nije pronadjena.', [], 404);
        }
        return $this->uspesno(new KompanijaResurs($kompanija), 'Podaci o kompaniji su uspesno ucitani.');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'naziv' => 'required|string|max:255',
            'adresa' => 'required|string|max:255',
            'telefon' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'opis' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return $this->neuspesno('Validacija nije uspela.', $validator->errors(), 422);
        }

        $kompanija = Kompanija::create($request->all());

        return $this->uspesno(new KompanijaResurs($kompanija), 'Kompanija je uspesno kreirana.', 201);
    }

    public function update(Request $request, $id)
    {
        $kompanija = Kompanija::find($id);
        if (!$kompanija) {
            return $this->neuspesno('Kompanija sa datim ID-jem nije pronadjena.', [], 404);
        }

        $validator = Validator::make($request->all(), [
            'naziv' => 'sometimes|required|string|max:255',
            'adresa' => 'sometimes|required|string|max:255',
            'telefon' => 'sometimes|required|string|max:20',
            'email' => 'sometimes|required|email|max:255',
            'opis' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return $this->neuspesno('Validacija nije uspela.', $validator->errors(), 422);
        }

        $kompanija->update($request->all());

        return $this->uspesno(new KompanijaResurs($kompanija), 'Kompanija je uspesno azurirana.');
    }

    public function destroy($id)
    {
        $kompanija = Kompanija::find($id);
        if (!$kompanija) {
            return $this->neuspesno('Kompanija sa datim ID-jem nije pronadjena.', [], 404);
        }

        $kompanija->delete();

        return $this->uspesno([], 'Kompanija je uspesno obrisana.');
    }
}
