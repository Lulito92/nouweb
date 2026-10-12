# Fase 10 — Blog

**Estado:** ✅ **Hecha el 2026-07-22**
**Bloqueada por:** ~~Fase 9~~
**Necesita de Luis:** ~~el tema del primer artículo~~ → **aprobó el propuesto en esta ficha**
(2026-07-22). El artículo está escrito y publicable.
**Tamaño:** grande

> Detalle de lo que se hizo, lo medido y lo aprendido:
> [`ESTADO.md` § Detalle de la Fase 10](../ESTADO.md).

---

## Objetivo

Dejar montada la **infraestructura** del blog para que Luis publique sin ayuda. El
trabajo de esta fase es la maquinaria y un artículo de ejemplo, no el contenido.

---

## ⚠️ Lo que hay que entender antes de empezar

El sitio **no tiene build ni CMS**: es HTML plano subido por FTP. Eso condiciona todo.

| Opción | Coste | Veredicto |
|---|---|---|
| **HTML por artículo + índice desde array** | Ninguno. Encaja con lo que ya existe | ✅ **la elegida** |
| Generador estático (11ty, Astro) | Mete Node y un paso de build en un proyecto que no lo tiene | ❌ ahora no |
| CMS (WordPress en `/blog`) | Otra instalación que mantener y actualizar | ❌ |

**Publicar un artículo será:** copiar la plantilla, escribir dentro, añadir un objeto al
array y subir dos archivos por FTP. Es manual, y hay que decirlo claro: no es un panel
de administración. A cambio, no hay nada que se rompa ni que actualizar.

> Si el blog llega a 20-30 artículos, toca reevaluar el generador estático. Anotarlo
> entonces en el backlog.

---

## Tareas

- [x] **`/blog/index.html`** — listado, montado desde el array `ARTICULOS` de
      `/blog/blog.js`. Sin artículos, muestra un estado vacío digno, nunca una rejilla rota.
- [x] **`/blog/_plantilla.html`** — plantilla que Luis copia para cada artículo.
      Con comentarios dentro indicando qué cambiar. El guion bajo evita que se confunda
      con un artículo real.
- [x] **Primer artículo de ejemplo**, completo y publicable. Tema propuesto —el que más
      busca su cliente objetivo—:
      > *"Tus pedidos entran por WhatsApp: cómo dejar de perderlos sin cambiar de forma
      > de vender"*
      Conecta con el gancho del hero y con la Fase 1 del servicio.
- [x] **Enlace "Blog" en el menú** de la home y en el pie.
- [x] **SEO por artículo**: `<title>`, meta description, canonical, Open Graph y
      **JSON-LD `Article`**. La home ya lleva `ProfessionalService`; esto lo complementa.
- [x] **`/sitemap.xml`** en la raíz — el sitio no tiene. Incluir home, legales y
      artículos. Y `robots.txt` apuntando al sitemap.
- [x] **`hreflang`**: los artículos nacen solo en español. `x-default` → el propio
      artículo. **No** enlazar a `/en/blog` ni `/de/blog`, que no existen.
- [x] **`README.md` dentro de `/blog/`** con las instrucciones de publicación en 4 pasos,
      escritas para Luis, no para un programador.

## No hacer

- No inventar artículos de relleno. **Uno real y bien escrito** vale más que cinco flojos.
- No meter comentarios, suscripción por correo ni analítica de terceros. Si algún día se
  quiere una newsletter, se decide aparte.
- No tocar `/en` ni `/de`.

---

## Criterio de terminado

1. Luis puede publicar un artículo siguiendo el README, sin ayuda.
2. El índice sale del array; añadir un artículo no obliga a tocar el HTML del índice.
3. El artículo de ejemplo valida como JSON-LD `Article`.
4. `sitemap.xml` accesible y bien formado.
5. Sin scroll horizontal a 375 px en índice y artículo.

---

## Al terminar

- [x] Marcar el avance en `docs/ESTADO.md`
- [x] Añadir al backlog: **reevaluar generador estático a partir de ~20 artículos**
- [x] Dejar escrita la frase de arranque de la **Fase 12** (la 11 ya estaba hecha cuando
      se escribió esta ficha: el orden real es **10 → 12 → 6 → 7**)
