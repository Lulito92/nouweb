<?php
/**
 * Add New Client Script
 * 
 * Simple script to add new client users to the database
 * IMPORTANT: Protect this file or delete after use
 */

require_once 'config.php';
require_once 'database.php';

// ============================================
// CONFIGURE NEW USER HERE
// ============================================
$newUser = [
    'email' => 'cliente@ejemplo.com',      // CHANGE THIS
    'password' => 'ContraseñaTemporal123', // CHANGE THIS
    'name' => 'Nombre del Cliente',        // CHANGE THIS
    'active' => true                       // true = activo, false = desactivado
];
// ============================================

?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agregar Cliente - Nouweb</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .container {
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            max-width: 600px;
            width: 100%;
        }

        h1 {
            color: #333;
            margin-bottom: 30px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            font-weight: 600;
            margin-bottom: 8px;
            color: #555;
        }

        input,
        select {
            width: 100%;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 16px;
        }

        input:focus {
            outline: none;
            border-color: #667eea;
        }

        .btn {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            margin-top: 20px;
        }

        .btn:hover {
            opacity: 0.9;
        }

        .success {
            background: #10b981;
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
        }

        .error {
            background: #ef4444;
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
        }

        .warning {
            background: #f59e0b;
            color: white;
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
            font-size: 14px;
        }

        .info-box {
            background: #f0f9ff;
            border-left: 4px solid #3b82f6;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 4px;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>➕ Agregar Nuevo Cliente</h1>

        <?php
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            try {
                $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
                $password = $_POST['password'];
                $name = htmlspecialchars($_POST['name']);
                $active = isset($_POST['active']) ? 1 : 0;

                // Validate
                if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    throw new Exception('Email no válido');
                }

                if (strlen($password) < 6) {
                    throw new Exception('La contraseña debe tener al menos 6 caracteres');
                }

                $db = Database::getInstance()->getConnection();

                // Check if user exists
                $stmt = $db->prepare("SELECT id FROM users WHERE email = ?");
                $stmt->execute([$email]);

                if ($stmt->fetch()) {
                    throw new Exception('Ya existe un usuario con este email');
                }

                // Hash password
                $passwordHash = password_hash($password, PASSWORD_BCRYPT, ['cost' => PASSWORD_COST]);

                // Insert user
                $stmt = $db->prepare("
                    INSERT INTO users (email, password_hash, name, active) 
                    VALUES (?, ?, ?, ?)
                ");

                $stmt->execute([$email, $passwordHash, $name, $active]);

                echo '<div class="success">';
                echo '✅ <strong>Usuario creado exitosamente!</strong><br><br>';
                echo '<strong>Email:</strong> ' . htmlspecialchars($email) . '<br>';
                echo '<strong>Nombre:</strong> ' . htmlspecialchars($name) . '<br>';
                echo '<strong>Contraseña:</strong> ' . htmlspecialchars($password) . '<br>';
                echo '<strong>Estado:</strong> ' . ($active ? 'Activo' : 'Desactivado');
                echo '</div>';

                echo '<div class="warning">';
                echo '⚠️ <strong>Importante:</strong><br>';
                echo '1. Envía estas credenciales al cliente de forma segura<br>';
                echo '2. Recomienda que cambie la contraseña en su primer login<br>';
                echo '3. Puedes crear otro usuario rellenando el formulario nuevamente';
                echo '</div>';

            } catch (Exception $e) {
                echo '<div class="error">❌ Error: ' . htmlspecialchars($e->getMessage()) . '</div>';
            }
        }
        ?>

        <div class="info-box">
            <strong>ℹ️ Información:</strong><br>
            Rellena el formulario para crear un nuevo cliente. El cliente recibirá un email y contraseña para acceder a
            su panel.
        </div>

        <form method="POST">
            <div class="form-group">
                <label for="email">📧 Email del Cliente</label>
                <input type="email" id="email" name="email" required placeholder="cliente@ejemplo.com"
                    value="<?php echo isset($_POST['email']) ? htmlspecialchars($_POST['email']) : ''; ?>">
            </div>

            <div class="form-group">
                <label for="name">👤 Nombre Completo</label>
                <input type="text" id="name" name="name" required placeholder="Juan Pérez"
                    value="<?php echo isset($_POST['name']) ? htmlspecialchars($_POST['name']) : ''; ?>">
            </div>

            <div class="form-group">
                <label for="password">🔐 Contraseña Temporal</label>
                <input type="text" id="password" name="password" required placeholder="ContraseñaSegura123"
                    value="<?php echo isset($_POST['password']) ? htmlspecialchars($_POST['password']) : ''; ?>">
                <small style="color: #666;">Mínimo 6 caracteres. El cliente debería cambiarla después.</small>
            </div>

            <div class="form-group">
                <label>
                    <input type="checkbox" name="active" checked>
                    Cuenta activa (desmarcar para crear cuenta desactivada)
                </label>
            </div>

            <button type="submit" class="btn">➕ Crear Cliente</button>
        </form>

        <div class="warning" style="margin-top: 30px;">
            🔒 <strong>Seguridad:</strong> Este archivo permite crear usuarios. Considera eliminarlo o protegerlo con
            una contraseña adicional cuando no lo estés usando.
        </div>
    </div>
</body>

</html>