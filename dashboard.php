<?php
/**
 * Client Dashboard
 * 
 * Protected page for authenticated users
 */

require_once 'backend/check_session.php';
requireAuth();

$user = getCurrentUser();
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Cliente - Nouweb</title>

    <!-- Favicon -->
    <link rel="icon" type="image/png" sizes="32x32" href="Imagenes/iconoweb.png">
    <link rel="icon" type="image/png" sizes="16x16" href="Imagenes/iconoweb.png">
    <link rel="apple-touch-icon" href="Imagenes/iconoweb.png">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <!-- Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Main Styles -->
    <link rel="stylesheet" href="styles.css">

    <style>
        .dashboard-header {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding: 20px 0;
            margin-bottom: 40px;
        }

        .dashboard-header .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .user-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            color: white;
        }

        .user-details h3 {
            margin: 0;
            font-size: 1.1rem;
        }

        .user-details p {
            margin: 5px 0 0 0;
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.6);
        }

        .dashboard-content {
            padding: 40px 0;
        }

        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }

        .dashboard-card {
            background: rgba(255, 255, 255, 0.03);
            padding: 30px;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: var(--transition);
        }

        .dashboard-card:hover {
            border-color: var(--primary-color);
            transform: translateY(-5px);
        }

        .dashboard-card i {
            font-size: 2.5rem;
            background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 15px;
        }

        .dashboard-card h3 {
            margin-bottom: 10px;
        }

        .dashboard-card p {
            color: rgba(255, 255, 255, 0.7);
            font-size: 0.95rem;
        }

        .btn-logout {
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.3);
            color: #f87171;
            padding: 10px 20px;
            border-radius: 10px;
            text-decoration: none;
            transition: var(--transition);
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .btn-logout:hover {
            background: rgba(239, 68, 68, 0.2);
            border-color: rgba(239, 68, 68, 0.5);
        }

        @media (max-width: 768px) {
            .dashboard-header .container {
                flex-direction: column;
                gap: 20px;
                text-align: center;
            }

            .dashboard-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>

<body>
    <!-- Dashboard Header -->
    <div class="dashboard-header">
        <div class="container">
            <div class="user-info">
                <div class="user-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="user-details">
                    <h3>Bienvenido/a,
                        <?php echo htmlspecialchars($user['name']); ?>
                    </h3>
                    <p>
                        <?php echo htmlspecialchars($user['email']); ?>
                    </p>
                </div>
            </div>
            <a href="backend/logout.php" class="btn-logout">
                <i class="fas fa-sign-out-alt"></i>
                Cerrar Sesión
            </a>
        </div>
    </div>

    <!-- Dashboard Content -->
    <section class="dashboard-content">
        <div class="container">
            <div class="section-header text-center fade-in-up">
                <h2>Panel de Cliente</h2>
                <p>Gestiona tus proyectos y servicios</p>
            </div>

            <div class="dashboard-grid">
                <div class="dashboard-card fade-in-up">
                    <i class="fas fa-project-diagram"></i>
                    <h3>Mis Proyectos</h3>
                    <p>Consulta el estado de tus proyectos activos y finalizados</p>
                    <a href="#" class="btn btn-primary" style="margin-top: 15px;">Ver Proyectos</a>
                </div>

                <div class="dashboard-card fade-in-up">
                    <i class="fas fa-file-invoice"></i>
                    <h3>Facturas</h3>
                    <p>Accede a todas tus facturas y documentación fiscal</p>
                    <a href="#" class="btn btn-primary" style="margin-top: 15px;">Ver Facturas</a>
                </div>

                <div class="dashboard-card fade-in-up">
                    <i class="fas fa-headset"></i>
                    <h3>Soporte Técnico</h3>
                    <p>Crea tickets y consulta el estado de tus solicitudes</p>
                    <a href="#" class="btn btn-primary" style="margin-top: 15px;">Contactar Soporte</a>
                </div>

                <div class="dashboard-card fade-in-up">
                    <i class="fas fa-user-cog"></i>
                    <h3>Mi Cuenta</h3>
                    <p>Actualiza tu información personal y preferencias</p>
                    <a href="#" class="btn btn-primary" style="margin-top: 15px;">Configuración</a>
                </div>

                <div class="dashboard-card fade-in-up">
                    <i class="fas fa-chart-line"></i>
                    <h3>Estadísticas</h3>
                    <p>Visualiza métricas y estadísticas de tu sitio web</p>
                    <a href="#" class="btn btn-primary" style="margin-top: 15px;">Ver Estadísticas</a>
                </div>

                <div class="dashboard-card fade-in-up">
                    <i class="fas fa-book"></i>
                    <h3>Documentación</h3>
                    <p>Accede a guías y recursos útiles para tu proyecto</p>
                    <a href="#" class="btn btn-primary" style="margin-top: 15px;">Ver Recursos</a>
                </div>
            </div>

            <div class="text-center" style="margin-top: 60px;">
                <a href="index.html" class="btn btn-outline">
                    <i class="fas fa-home"></i> Volver a la Página Principal
                </a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>&copy; 2025 Nouweb. Todos los derechos reservados.</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>

</html>