<?php
/**
 * Session Check Middleware
 * 
 * Include this file at the top of protected pages to verify user authentication
 */

session_start();
require_once 'config.php';

/**
 * Check if user is logged in
 */
function isLoggedIn()
{
    return isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true;
}

/**
 * Check session timeout
 */
function checkSessionTimeout()
{
    if (isset($_SESSION['last_activity'])) {
        $elapsed = time() - $_SESSION['last_activity'];

        if ($elapsed > SESSION_TIMEOUT) {
            // Session expired
            session_unset();
            session_destroy();
            return false;
        }
    }

    // Update last activity time
    $_SESSION['last_activity'] = time();
    return true;
}

/**
 * Require authentication - redirect if not logged in
 */
function requireAuth()
{
    if (!isLoggedIn()) {
        header('Location: login.html');
        exit();
    }

    if (!checkSessionTimeout()) {
        header('Location: login.html?timeout=1');
        exit();
    }

    // Regenerate session ID periodically (every 30 minutes)
    if (!isset($_SESSION['last_regeneration'])) {
        $_SESSION['last_regeneration'] = time();
    } elseif (time() - $_SESSION['last_regeneration'] > 1800) {
        session_regenerate_id(true);
        $_SESSION['last_regeneration'] = time();
    }
}

/**
 * Get current user data
 */
function getCurrentUser()
{
    if (!isLoggedIn()) {
        return null;
    }

    return [
        'id' => $_SESSION['user_id'] ?? null,
        'email' => $_SESSION['user_email'] ?? null,
        'name' => $_SESSION['user_name'] ?? null
    ];
}
?>