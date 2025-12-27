<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [App\Http\Controllers\LoginController::class, 'login']);
Route::post('/register-student', [App\Http\Controllers\LoginController::class, 'registerStudent']);
Route::get('/kompanije', [App\Http\Controllers\KompanijaController::class, 'index']);
Route::get('/kompanije/{id}', [App\Http\Controllers\KompanijaController::class, 'show']);
Route::get('/tip-oglasa', [App\Http\Controllers\TipoviOglasaController::class, 'index']);
Route::get('/tip-oglasa/{id}', [App\Http\Controllers\TipoviOglasaController::class, 'show']);
Route::get('/tagovi', [App\Http\Controllers\TagoviController::class, 'index']);
Route::get('/statusi', [App\Http\Controllers\OglasController::class, 'statusi']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [App\Http\Controllers\LoginController::class, 'logout']);
    Route::get('/oglasi', [App\Http\Controllers\OglasController::class, 'index']);
    Route::get('/oglasi/{id}', [App\Http\Controllers\OglasController::class, 'show']);
    Route::get('/pretraga-tagovi/{tag}', [App\Http\Controllers\TagoviController::class, 'pretraziPoTagu']);
    Route::get('/moje-prijave/{userId}', [App\Http\Controllers\PrijavaController::class, 'mojePrijave']);
    Route::get('/oglasi-kompanije/{kompanijaId}', [App\Http\Controllers\OglasController::class, 'pretraziPoKomapniji']);
    Route::get('/oglasi-tipa/{tipOglasaId}', [App\Http\Controllers\OglasController::class, 'pretraziPoTipuOglasa']);
    Route::post('/prijave', [App\Http\Controllers\PrijavaController::class, 'store']);
    Route::delete('/prijave/{id}', [App\Http\Controllers\PrijavaController::class, 'destroy']);
});

Route::middleware(['auth:sanctum', 'role:admin,kompanija'] )->group(function () {
    Route::post('/oglasi', [App\Http\Controllers\OglasController::class, 'store']);
    Route::put('/oglasi/{id}', [App\Http\Controllers\OglasController::class, 'update']);
    Route::delete('/oglasi/{id}', [App\Http\Controllers\OglasController::class, 'destroy']);
    Route::resource('/prijave', App\Http\Controllers\PrijavaController::class)->only([
        'index', 'show', 'update'
    ]);
});

Route::middleware(['auth:sanctum', 'role:admin'] )->group(function () {
    Route::post('/kompanije', [App\Http\Controllers\KompanijaController::class, 'store']);
    Route::put('/kompanije/{id}', [App\Http\Controllers\KompanijaController::class, 'update']);
    Route::delete('/kompanije/{id}', [App\Http\Controllers\KompanijaController::class, 'destroy']);
    Route::post('/register-kompanija', [App\Http\Controllers\LoginController::class, 'registerKompanija']);
    Route::get('/grafikon-podaci-status', [App\Http\Controllers\OglasController::class, 'grupisiPoStatusu']);
    Route::get('/grafikon-podaci-tipovi', [App\Http\Controllers\OglasController::class, 'grupisiPoTipuOglasa']);
});
