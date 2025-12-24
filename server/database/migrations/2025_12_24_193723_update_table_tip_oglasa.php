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
        Schema::table(\App\Models\TipOglasa::TABLE, function (Blueprint $table) {
            $table->dropColumn('opis');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table(\App\Models\TipOglasa::TABLE, function (Blueprint $table) {
            $table->string('opis')->nullable();
        });
    }
};
