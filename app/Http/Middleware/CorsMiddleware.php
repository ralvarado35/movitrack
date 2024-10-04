<?php

namespace App\Http\Middleware;

use Closure;

class CorsMiddleware
{
    /**
     * Maneja una solicitud entrante.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        $response->headers->set('Access-Control-Allow-Origin', '*'); // Permitir cualquier origen
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Métodos permitidos
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Authorization, Origin'); // Cabeceras permitidas

        // Si es una solicitud OPTIONS, devolver una respuesta vacía
        if ($request->getMethod() === "OPTIONS") {
            $response->setStatusCode(200);
        }

        return $response;
    }
}
