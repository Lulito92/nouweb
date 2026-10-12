<?php
/**
 * Login Endpoint
 * 
 * Handles user authentication
 */

session_start();
require_once 'config.php';
require_once 'database.php';

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die(json_encode(['success' => false, 'message' => 'Método no permitido']));
}

// Set JSON header
header('Content-Type: application/json');

try {
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);

    // Validate input
    if (empty($input['email']) || empty($input['password'])) {
        throw new Exception('Por favor, completa todos los campos');
    }

    $email = filter_var($input['email'], FILTER_SANITIZE_EMAIL);
    $password = $input['password'];

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Email no válido');
    }

    // Get database connection
    $db = Database::getInstance()->getConnection();

    // Prepare query to get user
    $stmt = $db->prepare("
        SELECT id, email, password_hash, name, active 
        FROM users 
        WHERE email = ? 
        LIMIT 1
    ");

    $stmt->execute([$email]);
    $user = $stmt->fetch();

    // Check if user exists
    if (!$user) {
        throw new Exception('Credenciales incorrectas');
    }

    // Check if user is active
    if (!$user['active']) {
        throw new Exception('Tu cuenta está desactivada. Contacta con soporte.');
    }

    // Verify password
    if (!password_verify($password, $user['password_hash'])) {
        throw new Exception('Credenciales incorrectas');
    }

    // Regenerate session ID to prevent session fixation
    session_regenerate_id(true);

    // Set session variables
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_email'] = $user['email'];
    $_SESSION['user_name'] = $user['name'];
    $_SESSION['logged_in'] = true;
    $_SESSION['last_activity'] = time();

    // Update last login time
    $updateStmt = $db->prepare("
        UPDATE users 
        SET last_login = NOW() 
        WHERE id = ?
    ");
    $updateStmt->execute([$user['id']]);

    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'Login exitoso',
        'redirect' => '../dashboard.php',
        'user' => [
            'name' => $user['name'],
            'email' => $user['email']
        ]
    ]);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>