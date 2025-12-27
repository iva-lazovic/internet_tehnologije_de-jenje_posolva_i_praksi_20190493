<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TipOglasaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tipovi = [
            'Praksa',
            'Stalni posao',
            'Honorarni posao',
            'Sezonski posao',
            'Rad od kuće'
        ];

        foreach ($tipovi as $tip) {
            \App\Models\TipOglasa::create([
                'naziv' => $tip
            ]);
        }
    }
}
