<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PrijavaController extends OdgovorController
{
    public function index()
    {
        $svePrijave = \App\Models\Prijava::all();
        return $this->uspesno(\App\Http\Resources\PrijavaResurs::collection($svePrijave));
    }

    public function show($id)
    {

        $prijava = \App\Models\Prijava::find($id);
        if (!$prijava) {
            return $this->neuspesno('Prijava nije pronadjena', [], 404);
        }
        return $this->uspesno(new \App\Http\Resources\PrijavaResurs($prijava), 'Detalji prijave');
    }

    public function store(Request $request)
    {
        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
            'userId' => 'required|numeric|exists:users,id',
            'oglasId' => 'required|numeric|exists:oglasi,id',
            'cv' => 'required|file'
        ]);

        if ($validator->fails()) {
            return $this->neuspesno('Validacija nije uspela.', $validator->errors(), 422);
        }

        // Upload CV file
        $cv = $request->file('cv');
        $filename = time() . '_' . $cv->getClientOriginalName();
        $cv->move(public_path('uploads/'), $filename);
        $cvLink = url('uploads/' . $filename);

        $prijava = \App\Models\Prijava::create([
            'userId' => $request->userId,
            'oglasId' => $request->oglasId,
            'datumPrijave' => now(),
            'status' => 'pending',
            'cvLink' => $cvLink,
            'feedback' => null
        ]);

        return $this->uspesno(new \App\Http\Resources\PrijavaResurs($prijava), 'Prijava je uspesno kreirana.', 201);
    }

    public function update(Request $request, $id)
    {
        $prijava = \App\Models\Prijava::find($id);
        if (!$prijava) {
            return $this->neuspesno('Prijava nije pronadjena', [], 404);
        }

        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
            'status' => 'required|string',
            'feedback' => 'required|string'
        ]);

        if ($validator->fails()) {
            return $this->neuspesno('Validacija nije uspela.', $validator->errors(), 422);
        }

        $prijava->status = $request->status;
        $prijava->feedback = $request->feedback;
        $prijava->save();

        return $this->uspesno(new \App\Http\Resources\PrijavaResurs($prijava), 'Prijava je uspesno azurirana.');
    }

    public function destroy($id)
    {
        $prijava = \App\Models\Prijava::find($id);
        if (!$prijava) {
            return $this->neuspesno('Prijava nije pronadjena', [], 404);
        }

        $prijava->delete();
        return $this->uspesno([], 'Prijava je uspesno obrisana.');
    }

    public function mojePrijave($userId)
    {
        $prijave = \App\Models\Prijava::where('userId', $userId)->get()->load(['oglas', 'user']);
        return $this->uspesno(\App\Http\Resources\PrijavaResurs::collection($prijave), 'Moje prijave');
    }

    public function prijaveZaOglas($oglasId)
    {
        $prijave = \App\Models\Prijava::where('oglasId', $oglasId)->get()->load(['oglas', 'user']);
        return $this->uspesno(\App\Http\Resources\PrijavaResurs::collection($prijave), 'Prijave za oglas');
    }
}
