<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TipKorisnikaMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = auth()->user();

        if (!in_array($user->tipKorisnika, $roles)) {
            return response()->json(['poruka' => 'Nemaš dozvolu za ovu akciju.'], 403);
        }

        return $next($request);
    }
}
