# Sistema de Autenticación - Guía de Configuración

## 📋 Archivos Creados

### Backend PHP (`/backend/`)
- **config.php**: Configuración de base de datos y entorno
- **database.php**: Clase de conexión PDO con patrón Singleton
- **login.php**: Endpoint de autenticación
- **logout.php**: Endpoint de cierre de sesión
- **check_session.php**: Middleware de verificación de sesión
- **init_db.sql**: Script SQL para inicializar las tablas
- **create_admin.php**: Script para crear el primer usuario administrador

### Frontend
- **login.html**: Página de inicio de sesión (actualizada con AJAX)
- **dashboard.php**: Panel de cliente protegido

## 🚀 Pasos de Instalación

### 1. Configurar la Base de Datos

#### En IONOS (Producción Actual):

1. Accede a phpMyAdmin desde tu panel de IONOS
2. Selecciona tu base de datos: `dbs15231506`
3. Ve a la pestaña "SQL"
4. Copia y pega el contenido de `backend/init_db.sql`
5. Ejecuta el script (esto creará las tablas necesarias)

### 2. Configurar Credenciales

Edita `backend/config.php`:

```php
// Línea 14: Agrega tu contraseña de IONOS
define('DB_PROD_PASS', 'TU_CONTRASEÑA_AQUI');

// Línea 19: Agrega tu contraseña local (para Debian)
define('DB_DEV_PASS', 'TU_CONTRASEÑA_LOCAL_AQUI');

// Línea 39: Actualiza con tu dominio real
define('BASE_URL', 'https://www.nouweb.es');
```

### 3. Crear el Primer Usuario

1. Edita `backend/create_admin.php`:
   ```php
   $adminEmail = 'tu@email.com';
   $adminPassword = 'TuContraseñaSegura123!';
   $adminName = 'Tu Nombre';
   ```

2. Accede a: `https://tudominio.com/backend/create_admin.php`

3. **IMPORTANTE**: Una vez creado el usuario, **ELIMINA** el archivo `create_admin.php` por seguridad:
   ```bash
   rm backend/create_admin.php
   ```

### 4. Verificar Funcionamiento

1. Visita `login.html`
2. Inicia sesión con las credenciales que configuraste
3. Deberías ser redirigido a `dashboard.php`

## 🔐 Seguridad Implementada

✅ **Contraseñas**:
- Hashing con bcrypt (cost 12)
- No se almacenan en texto plano

✅ **SQL Injection**:
- Prepared statements en todas las consultas
- Parámetros vinculados

✅ **Sesiones**:
- Regeneración de ID en cada login
- Timeout de 30 minutos
- Cookies httponly y secure

✅ **Validación**:
- Sanitización de emails
- Validación de formato
- Verificación de usuario activo

## 🔄 Migración a Debian 13

Cuando estés listo para migrar tu base de datos al servidor Debian:

### 1. Exportar Datos desde IONOS

```bash
# Desde phpMyAdmin, exporta tu base de datos
# O usa mysqldump si tienes acceso SSH:
mysqldump -h db5019468107.hosting-data.io -P 3306 -u dbu3909925 -p dbs15231506 > backup.sql
```

### 2. Configurar MariaDB en Debian

```bash
# Instalar MariaDB
sudo apt update
sudo apt install mariadb-server

# Secure installation
sudo mysql_secure_installation

# Crear base de datos
sudo mysql
CREATE DATABASE dbs15231506 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'dbu3909925'@'localhost' IDENTIFIED BY 'tu_contraseña';
GRANT ALL PRIVILEGES ON dbs15231506.* TO 'dbu3909925'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 3. Importar Datos

```bash
mysql -u dbu3909925 -p dbs15231506 < backup.sql
```

### 4. Actualizar Configuración

Edita `backend/config.php`:

```php
// Línea 6: Cambiar a modo desarrollo
define('ENVIRONMENT', 'development');
```

## 📁 Estructura de Archivos

```
Proyecto NouWeb/
├── backend/
│   ├── config.php           ← Configurar aquí
│   ├── database.php
│   ├── login.php
│   ├── logout.php
│   ├── check_session.php
│   ├── init_db.sql          ← Ejecutar en phpMyAdmin
│   └── create_admin.php     ← Ejecutar una vez y elminar
├── Imagenes/
│   └── iconoweb.png
├── login.html               ← Login actualizado
├── dashboard.php            ← Panel de cliente
├── index.html
└── styles.css
```

## ⚠️ Checklist de Seguridad

Antes de poner en producción:

- [ ] Agregar contraseña en `config.php`
- [ ] Ejecutar `init_db.sql` en la base de datos
- [ ] Crear usuario admin con `create_admin.php`
- [ ] **ELIMINAR** `create_admin.php` después de usar
- [ ] Agregar `config.php` a `.gitignore`
- [ ] Cambiar `session.cookie_secure` a `1` si usas HTTPS
- [ ] Actualizar `BASE_URL` con tu dominio real
- [ ] Verificar permisos de archivos en el servidor (644 para PHP)

## 🆘 Solución de Problemas

### Error: "Error de conexión a la base de datos"
- Verifica las credenciales en `config.php`
- Verifica que el host y puerto sean correctos
- Verifica que el usuario tenga permisos

### Error: "Credenciales incorrectas"
- Asegúrate de haber creado el usuario con `create_admin.php`
- Verifica que el email sea correcto
- Verifica que la tabla `users` existe

### No redirige al dashboard
- Verifica que `dashboard.php` existe en la raíz
- Revisa la consola del navegador para errores JavaScript
- Verifica que la ruta en `login.php` línea 79 sea correcta

## 📞 Soporte

Si tienes problemas con la configuración, verifica:
1. Los logs de errores de PHP (`error_log`)
2. La consola del navegador (F12)
3. Los permisos de archivos en el servidor

---

**¡Listo!** Tu sistema de autenticación está configurado y listo para usar.
