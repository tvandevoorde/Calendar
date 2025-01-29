<?php

declare(strict_types=1);

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Firebase\JWT\JWT;
use GuzzleHttp\Client;

function getDB() {
    return new PDO($_ENV['DATABASE_URL'], $_ENV['DB_USERNAME'], $_ENV['DB_PASSWORD'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
}

function unauthorizedResponse(): Response {
    $response = new \Slim\Psr7\Response();
    $response->getBody()->write(json_encode(["error" => "Unauthorized"]));
    return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
}

return function (App $app) {
    $app->options('/{routes:.*}', function (Request $request, Response $response) {
        // CORS Pre-Flight OPTIONS Request Handler
        return $response;
    });

    $app->get('/', function (Request $request, Response $response) {
        $response->getBody()->write('Hello world!');
        return $response;
    });

    $app->post('/api/auth/google-login', function (Request $request, Response $response) {
        $body = json_decode($request->getBody()->getContents(), true);
        $googleToken = $body['token'] ?? '';
    
        if (!$googleToken) {
            $response->getBody()->write(json_encode(['error' => 'Token is required']));
            return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
        }
    
        // Google API Client instellen
        $client = new Client();
        $googleClientId = $_ENV['GOOGLE_CLIENT_ID'];
    
        try {
            // Stap 1: Valideer het Google Token via Google's API
            $googleResponse = $client->get("https://oauth2.googleapis.com/tokeninfo?id_token=" . $googleToken);
            $googleUser = json_decode($googleResponse->getBody()->getContents(), true);
    
            if ($googleUser['aud'] !== $googleClientId) {
                $response->getBody()->write(json_encode(['error' => 'Invalid Google token']));
                return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
            }
    
            // Stap 2: Maak een JWT-token voor onze eigen applicatie
            $jwtSecret = $_ENV['GOOGLE_CLIENT_SECRET'];
            $payload = [
                "sub" => $googleUser['sub'],
                "email" => $googleUser['email'],
                "name" => $googleUser['name'],
                "iat" => time(),
                "exp" => time() + 3600 // Token verloopt na 1 uur
            ];
    
            $jwt = JWT::encode($payload, $jwtSecret, 'HS256');
    
            $response->getBody()->write(json_encode(['jwt' => $jwt]));
            return $response->withHeader('Content-Type', 'application/json');
    
        } catch (\Exception $e) {
            $response->getBody()->write(json_encode(['error' => 'Failed to verify token']));
            return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
        }
    });


    // 🔹 **1. Endpoint om een profiel aan te maken**
    $app->post('/api/user', function (Request $request, Response $response) {
        $data = json_decode($request->getBody()->getContents(), true);
        $db = getDB();

        $stmt = $db->prepare("INSERT INTO users (google_id, email, name, avatar_url) VALUES (:google_id, :email, :name, :avatar_url)");
        $stmt->execute([
            'google_id' => $data['google_id'],
            'email' => $data['email'],
            'name' => $data['name'],
        ]);

        $response->getBody()->write(json_encode(["message" => "User created"]));
        return $response->withHeader('Content-Type', 'application/json');
    });

    // 🔹 **2. Endpoint om een profiel op te halen (voor de ingelogde gebruiker)**
    $app->get('/api/user', function (Request $request, Response $response) {
        $user = $request->getAttribute('user');
        $db = getDB();

        $stmt = $db->prepare("SELECT id, google_id, email, name, avatar_url, created_at FROM users WHERE google_id = :google_id");
        $stmt->execute(['google_id' => $user['sub']]);
        $userData = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$userData) {
            return unauthorizedResponse($response);
        }

        $response->getBody()->write(json_encode($userData));
        return $response->withHeader('Content-Type', 'application/json');
    })->add('authMiddleware');

    // 🔹 **3. Endpoint om een profiel te updaten**
    $app->put('/api/user', function (Request $request, Response $response) {
        $user = $request->getAttribute('user');
        $data = json_decode($request->getBody()->getContents(), true);
        $db = getDB();

        $stmt = $db->prepare("UPDATE users SET name = :name, avatar_url = :avatar_url WHERE google_id = :google_id");
        $stmt->execute([
            'name' => $data['name'],
            'avatar_url' => $data['avatar_url'],
            'google_id' => $user['sub']
        ]);

        $response->getBody()->write(json_encode(["message" => "User updated"]));
        return $response->withHeader('Content-Type', 'application/json');
    })->add('authMiddleware');

    // 🔹 **4. Endpoint om een profiel te verwijderen**
    $app->delete('/api/user', function (Request $request, Response $response) {
        $user = $request->getAttribute('user');
        $db = getDB();

        $stmt = $db->prepare("DELETE FROM users WHERE google_id = :google_id");
        $stmt->execute(['google_id' => $user['sub']]);

        $response->getBody()->write(json_encode(["message" => "User deleted"]));
        return $response->withHeader('Content-Type', 'application/json');
    })->add('authMiddleware');


};
?>