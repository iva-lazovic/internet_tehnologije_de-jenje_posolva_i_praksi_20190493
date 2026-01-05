<?php

namespace App\Http\Controllers;

use App\Models\Oglas;
use App\Models\Tagovi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OglasController extends OdgovorController
{
    public function index()
    {
        $oglasi = Oglas::all()->load(['kompanija', 'tipOglasa', 'tagovi']);
        return $this->uspesno(\App\Http\Resources\OglasResurs::collection($oglasi), 'Lista svih oglasa');
    }

    public function show($id)
    {
        $oglas = Oglas::with(['kompanija', 'tipOglasa', 'tagovi'])->find($id);
        if (!$oglas) {
            return $this->neuspesno('Oglas nije pronadjen', [], 404);
        }
        return $this->uspesno(new \App\Http\Resources\OglasResurs($oglas), 'Detalji oglasa');
    }

    public function store(Request $request)
    {
        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
            'naslov' => 'required|string|max:255',
            'opis' => 'required|string',
            'rokZaPrijavu' => 'required|date',
            'kompanijaId' => 'required|numeric|exists:kompanije,id',
            'tipOglasaId' => 'required|numeric|exists:tipovi_oglasa,id',
            'tagovi' => 'array'
        ]);

        if ($validator->fails()) {
            return $this->neuspesno('Validacija nije uspela.', $validator->errors(), 422);
        }

        $oglas = Oglas::create([
            'naslov' => $request->naslov,
            'opis' => $request->opis,
            'rokZaPrijavu' => $request->rokZaPrijavu,
            'kompanijaId' => $request->kompanijaId,
            'tipOglasaId' => $request->tipOglasaId,
            'status' => Oglas::STATUS_DRAFT
        ]);

        if ($request->has('tagovi')) {
            foreach ($request->tagovi as $tag) {
                Tagovi::create([
                    'oglasId' => $oglas->id,
                    'tag' => $tag
                ]);
            }
        }

        return $this->uspesno(new \App\Http\Resources\OglasResurs($oglas->load('kompanija', 'tipOglasa', 'tagovi')), 'Oglas je uspesno kreiran.', 201);
    }

    public function update(Request $request, $id)
    {
        $oglas = Oglas::find($id);
        if (!$oglas) {
            return $this->neuspesno('Oglas sa datim ID-jem nije pronadjen.', [], 404);
        }

        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
            'status' => 'required|in:' . Oglas::STATUS_AKTIVAN . ',' . Oglas::STATUS_NEAKTIVAN . ',' . Oglas::STATUS_DRAFT,
        ]);

        if ($validator->fails()) {
            return $this->neuspesno('Validacija nije uspela.', $validator->errors(), 422);
        }

        $oglas->status = $request->status;
        $oglas->save();

        return $this->uspesno(new \App\Http\Resources\OglasResurs($oglas->load('kompanija', 'tipOglasa', 'tagovi')), 'Oglas je uspesno azuriran.');
    }

    public function destroy($id)
    {
        $oglas = Oglas::find($id);
        if (!$oglas) {
            return $this->neuspesno('Oglas sa datim ID-jem nije pronadjen.', [], 404);
        }

        $oglas->delete();

        return $this->uspesno([], 'Oglas je uspesno obrisan.');
    }

    public function pretraziPoKomapniji($idKompanije)
    {
        $oglasi = Oglas::where('kompanijaId', $idKompanije)->get()->load(['kompanija', 'tipOglasa', 'tagovi']);
        return $this->uspesno(\App\Http\Resources\OglasResurs::collection($oglasi), 'Lista oglasa za datu kompaniju');
    }

    public function pretraziPoTipu($idTipa)
    {
        $oglasi = Oglas::where('tipOglasaId', $idTipa)->get()->load(['kompanija', 'tipOglasa', 'tagovi']);
        return $this->uspesno(\App\Http\Resources\OglasResurs::collection($oglasi), 'Lista oglasa za dati tip');
    }

    public function grupisiPoStatusu(Request $request)
    {
        $oglasi = DB::table('oglasi')
            ->select('status', DB::raw('COUNT(*) as broj_oglasa'))
            ->groupBy('status')
            ->get();

        return $this->uspesno($oglasi, 'Oglasi grupisani po statusu.');
    }

    public function grupisiPoTipuOglasa(Request $request)
    {
        $oglasi = DB::table('oglasi')
            ->join('tipovi_oglasa', 'oglasi.tipOglasaId', '=', 'tipovi_oglasa.id')
            ->select('tipovi_oglasa.naziv as tip_oglasa', DB::raw('COUNT(*) as broj_oglasa'))
            ->groupBy('tipovi_oglasa.naziv')
            ->get();

        return $this->uspesno($oglasi, 'Oglasi grupisani po tipu oglasa.');
    }

    public function pretraziPoStatusu($status)
    {
        $oglasi = Oglas::where('status', $status)->get()->load(['kompanija', 'tipOglasa', 'tagovi']);
        return $this->uspesno(\App\Http\Resources\OglasResurs::collection($oglasi), 'Lista oglasa za dati status');
    }

    public function statusi()
    {
        $statusi = [
            Oglas::STATUS_AKTIVAN,
            Oglas::STATUS_NEAKTIVAN,
            Oglas::STATUS_DRAFT
        ];
        return $this->uspesno($statusi, 'Moguci statusi oglasa.');
    }

    public function paginateOglasi()
    {
        $poStrani = 5;

        $oglasi = Oglas::with(['kompanija', 'tipOglasa', 'tagovi'])->paginate($poStrani);

        return $this->uspesno($oglasi, 'Oglasi sa paginacijom.');
    }
}
