<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OglasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //'naslov',
        //        'opis',
        //        'rokZaPrijavu',
        //        'kompanijaId',
        //        'tipOglasaId',
        //        'status'

        $faker = \Faker\Factory::create('sr_RS');
        $kompanijaIds = \App\Models\Kompanija::pluck('id')->toArray();
        $tipOglasaIds = \App\Models\TipOglasa::pluck('id')->toArray();
        $statusi = [
            \App\Models\Oglas::STATUS_AKTIVAN,
            \App\Models\Oglas::STATUS_NEAKTIVAN,
            \App\Models\Oglas::STATUS_DRAFT
        ];

        for ($i = 0; $i < 50; $i++) {

            \App\Models\Oglas::create([
                'naslov' => $faker->sentence(6, true),
                'opis' => $faker->paragraphs(3, true),
                'rokZaPrijavu' => $faker->dateTimeBetween('now', '+3 months'),
                'kompanijaId' => $faker->randomElement($kompanijaIds),
                'tipOglasaId' => $faker->randomElement($tipOglasaIds),
                'status' => $faker->randomElement($statusi)
            ]);

        }
    }
}
