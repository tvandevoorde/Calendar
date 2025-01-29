<?php

declare(strict_types=1);

use App\Application\Actions\User\ListUsersAction;
use App\Application\Actions\User\ViewUserAction;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;
use League\OAuth2\Client\Provider\Google;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use GuzzleHttp\Client;



function saveUserToDatabase($userData) {
    $pdo = new PDO($_ENV['DATABASE_URL'], $_ENV['DB_USERNAME'], $_ENV['DB_PASSWORD']);

    $stmt = $pdo->prepare('INSERT INTO users (google_id, email, name)
                           VALUES (:google_id, :email, :name)
                           ON DUPLICATE KEY UPDATE email = :email, name = :name');

    $stmt->execute([
        ':google_id' => $userData['id'],
        ':email' => $userData['email'],
        ':name' => $userData['name'],
    ]);
};

function validateUserData($data) {
    if (empty($data['name']) || strlen($data['name']) > 255) {
        throw new Exception('Invalid name: must be non-empty and less than 255 characters');
    }

    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email address');
    }
};

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
}
?>