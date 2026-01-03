<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResurs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LoginController extends OdgovorController
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (auth()->attempt($credentials)) {
            $user = auth()->user();
            $token = $user->createToken('token')->plainTextToken;

            return $this->uspesno([
                'user' => new UserResurs($user),
                'token' => $token
            ], "Uspesno prijavljivanje");
        } else {
            return $this->neuspesno("Neispravni kredencijali", [], 401);
        }
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->tokens()->delete();

        return $this->uspesno([], "Uspesno odjavljivanje");
    }

    public function registerStudent()
    {
        return $this->register('student');
    }

    public function registerKompanija()
    {
        return $this->register('kompanija');
    }

    private function register($tipKorisnika = 'student')
    {
        $validator = Validator::make(request()->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return $this->neuspesno('Validacija nije uspela.', $validator->errors(), 422);
        }

        $user = \App\Models\User::create([
            'name' => request('name'),
            'email' => request('email'),
            'password' => bcrypt(request('password')),
            'tipKorisnika' => $tipKorisnika
        ]);

        return $this->uspesno(new UserResurs($user), 'Korisnik je uspesno registrovan.', 201);
    }
}
