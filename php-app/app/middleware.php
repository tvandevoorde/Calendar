<?php

declare(strict_types=1);

use App\Application\Middleware\SessionMiddleware;
use Slim\App;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

function authMiddleware(Request $request, Response $response, callable $next) {
    $headers = $request->getHeader('Authorization');

    if (!$headers) {
        return unauthorizedResponse($response);
    }

    $token = str_replace('Bearer ', '', $headers[0]);

    try {
        $decoded = JWT::decode($token, new Key($_ENV['GOOGLE_CLIENT_SECRET'], 'HS256'));
        
        $request = $request->withAttribute('user', (array)$decoded);
        return $next($request, $response);
    } catch (Exception $e) {
        return unauthorizedResponse($response);
    }
}

return function (App $app) {
    $app
    ->add(SessionMiddleware::class);
}
?>