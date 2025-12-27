<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PrijavaResurs extends JsonResource
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
            'user' => new UserResurs($this->whenLoaded('user')),
            'oglas' => new OglasResurs($this->whenLoaded('oglas')),
            'datumPrijave' => $this->datumPrijave,
            'status' => $this->status,
            'cvLink' => $this->cvLink,
            'feedback' => $this->feedback
        ];
    }
}
