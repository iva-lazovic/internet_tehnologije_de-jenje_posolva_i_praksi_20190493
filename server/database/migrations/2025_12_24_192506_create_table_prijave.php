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
        Schema::create(\App\Models\Prijava::TABLE, function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('oglasId');
            $table->foreign('oglasId')->references('id')->on(\App\Models\Oglas::TABLE)->onDelete('cascade');
            $table->unsignedBigInteger('userId');
            $table->foreign('userId')->references('id')->on('users')->onDelete('cascade');

            $table->date('datumPrijave');
            $table->string('status')->default('pending');
            $table->string('cvLink');
            $table->text('feedback')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('table_prijave');
    }
};
