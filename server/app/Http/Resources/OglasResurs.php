<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OglasResurs extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'naslov' => $this->naslov,
            'opis' => $this->opis,
            'rokZaPrijavu' => $this->rokZaPrijavu,
            'kompanija' => new KompanijaResurs($this->whenLoaded('kompanija')),
            'tipOglasa' => new TipOglasaResurs($this->whenLoaded('tipOglasa')),
            'status' => $this->status,
            'tagovi' => TagoviResurs::collection($this->whenLoaded('tagovi')),
        ];
    }
}
