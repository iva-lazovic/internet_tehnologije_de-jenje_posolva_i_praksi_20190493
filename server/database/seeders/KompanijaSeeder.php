<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KompanijaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $names = [
            'Tech Solutions',
            'Innovatech',
            'Global Dynamics',
            'NextGen Software',
            'CyberWorks',
            'DataStream Inc.',
            'Quantum Labs',
            'FutureTech',
            'Alpha Systems',
            'Nexus Corp'
        ];

        $faker = \Faker\Factory::create('sr_RS');

        foreach ($names as $name) {
            \App\Models\Kompanija::create([
                'naziv' => $name,
                'adresa' => $faker->address,
                'telefon' => $faker->phoneNumber,
                'email' => $faker->unique()->companyEmail,
                'opis' => $faker->paragraph,
            ]);
        }
    }
}
