<?php

namespace Database\Seeders;

use App\Models\Tagovi;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TagoviSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            'PHP',
            'JavaScript',
            'Laravel',
            'React',
            'Vue.js',
            'MySQL',
            'PostgreSQL',
            'HTML',
            'CSS',
            'DevOps',
            'AWS',
            'Docker',
            'Kubernetes',
            'Python',
            'Django',
            'Machine Learning',
            'Data Science',
            'Agile',
            'Scrum',
            'Project Management'
        ];
        $oglasi = \App\Models\Oglas::all();
        $faker = \Faker\Factory::create('sr_RS');

        foreach ($oglasi as $oglas) {
            $randomBrojTagova = rand(2, 5);

            for ($i = 0; $i < $randomBrojTagova; $i++) {
                $tagNaziv = $faker->randomElement($tags);
                Tagovi::create([
                    'tag' => $tagNaziv,
                    'oglasId' => $oglas->id
                ]);
            }
        }
    }
}
