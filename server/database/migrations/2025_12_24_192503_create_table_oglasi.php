<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create(\App\Models\Oglas::TABLE, function (Blueprint $table) {
            $table->id();
            $table->string('naslov');
            $table->binary('opis');
            $table->unsignedBigInteger('kompanijaId');
            $table->foreign('kompanijaId')->references('id')->on(\App\Models\Kompanija::TABLE)->onDelete('cascade');
            $table->unsignedBigInteger('tipOglasaId');
            $table->foreign('tipOglasaId')->references('id')->on(\App\Models\TipOglasa::TABLE)->onDelete('cascade');

            $table->date('rokZaPrijavu');
            $table->string('status')->default(\App\Models\Oglas::STATUS_DRAFT);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(\App\Models\Oglas::TABLE);
    }
};
