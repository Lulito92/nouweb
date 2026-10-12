# Fase 1 — Base técnica

**Estado:** ✅ Hecha (2026-07-20)
**Bloqueada por:** nada
**Necesita de Luis:** nada
**Tamaño:** medio (cabe holgado en un chat)

### Arrancar con

```
Lee docs/ESTADO.md y ejecuta la Fase 1.
```

---

## Objetivo

Dejar montada la arquitectura nueva: la home real pasa a la raíz, con SEO multiidioma
correcto y assets unificados. El contenido va provisional — el copy es de la Fase 2.

Al terminar, el sitio debe **funcionar y ser publicable**, aunque los textos aún sean
de relleno.

---

## Tareas

- [x] **Copia de seguridad** completa en `Backup/20-07/` antes de tocar nada.
      No hay git: esta es la única red de seguridad.
- [x] Reescribir **`/index.html`**: deja de ser el selector de idioma y pasa a ser la
      home en español. Estructura de secciones completa, con contenido provisional
      marcado como `{{PENDIENTE FASE 2}}`.
- [x] Secciones a dejar maquetadas y vacías, en este orden:
      1. `#hero`
      2. `#problema` — "¿Te suena esto?" *(nueva)*
      3. `#servicios` — las 3 fases *(reutiliza el bloque actual y sus modales)*
      4. `#stack-crm` *(nueva, se llena en Fase 3)*
      5. `#migracion-ecommerce` *(nueva, se llena en Fase 3)*
      6. `#casos` *(reutiliza `casos-exito`, se llena en Fase 4)*
      7. `#nosotros`
      8. `#auditoria` *(sustituye a `precios`, se llena en Fase 5)*
      9. `#contacto`
      10. `footer`
- [x] **`/es/index.html` → redirección 301 a `/`** (vía `.htaccess`). La raíz pasa a
      ser la canónica en español; hay que evitar contenido duplicado.
- [x] **`hreflang`** en el `<head>`: `x-default` → `/`, `es` → `/`, `en` → `/en/`,
      `de` → `/de/`. Más `<link rel="canonical">` apuntando a sí misma.
- [x] **Banner de idioma**: si `navigator.language` no es español, aparece una barra
      superior discreta ofreciendo EN/DE. Se guarda la elección en cookie.
      ⚠️ **Sin redirección automática** — rompe el rastreo de Google.
- [x] La home nueva enlaza a **un solo** `/styles.css` y `/script.js`.
      Los estilos nuevos se añaden ahí, no en copias por idioma.
- [x] Comprobar que el sitio se ve bien en móvil (el cliente peruano navega en celular).

## No hacer en esta fase

- Escribir copy definitivo → Fase 2
- Tocar `/en` y `/de` → congelados hasta la Fase 6
- Tocar `backend/` → fuera de alcance
- Borrar `test-idiomas.html` / `test-selector.html` → higiene, va al backlog

---

## Criterio de terminado

1. `https://nouweb.es/` carga la home nueva, no el selector de idioma.
2. `/es/` redirige a `/` con un 301.
3. `/en/` y `/de/` siguen funcionando exactamente igual que antes.
4. El `hreflang` valida sin errores.
5. Nada roto en móvil.

---

## Al terminar

- [x] Marcar la Fase 1 como ✅ en `docs/ESTADO.md`
- [x] Anotar el avance en el registro
- [x] Dejar escrita la frase de arranque de la Fase 2
