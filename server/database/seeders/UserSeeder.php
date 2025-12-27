<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tipoviKorisnika = [
            'admin',
            'student',
            'kompanija'
        ];

        $faker = \Faker\Factory::create('sr_RS');

        $admin = \App\Models\User::create([
            'name' => 'Admin User',
            'email' => 'ivanovicsanja01@gmail.com',
            'password' => bcrypt('admin'),
            'tipKorisnika' => 'admin'
        ]);

        $kompanija = \App\Models\User::create([
            'name' => 'Kompanija User',
            'email' => 'ivaalazovic@gmail.com',
            'password' => bcrypt('kompanija'),
            'tipKorisnika' => 'kompanija'
        ]);

        $student = \App\Models\User::create([
            'name' => 'Student User',
            'email' => 'marija.djikanovic1@gmail.com',
            'password' => bcrypt('student'),
            'tipKorisnika' => 'student'
        ]);

        for ($i = 0; $i < 30; $i++) {
            \App\Models\User::create([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'password' => bcrypt('password'), // Default password
                'tipKorisnika' => $faker->randomElement($tipoviKorisnika)
            ]);
        }
    }
}
