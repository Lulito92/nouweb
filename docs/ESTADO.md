# Tablero de estado — Proyecto NouWeb

**Última actualización:** 2026-10-12
**Fases 1, 2, 4, 5, 8, 9, 10, 11, 12, 13 y 14 cerradas.** La 3 quedó publicable (logos
propios). **La Fase 14 terminó sus 4 sesiones: `/es-es/` está construida, verificada y
técnicamente lista.** El backlog nº 22 (legales sin RGPD) **está cerrado**.
✅ **Pendiente nº 21 cerrado (2026-10-12): Luis revisó su contrato y publica `/es-es/`.**
**No queda ningún `{{PENDIENTE}}` visible.** WhatsApp activo con el número español.

## 🚚 2026-10-12 — El proyecto pasa a GitHub + Vercel (adiós FTP)

**Repositorio privado `github.com/Lulito92/nouweb`, rama `main`.** Vercel lo publica solo
con cada `git push`. **Todos los avisos de "subir por FTP" de abajo quedan obsoletos**:
se conservan por historial.

**Por qué ahora:** al empezar, **nouweb-es.com no servía nada**: IONOS respondía
`404 · Web space not ready` en todas las rutas, home incluida. O sea que Vercel no es una
mudanza de una web viva: es su primera publicación real.

**Lo que se hizo (y lo que se dejó fuera a propósito):**

- **`.gitignore` reescrito.** Fuera del repo: `hostinger-recovery-codes.txt`,
  `backend/config.php` y `create_admin.php` (contraseña en claro), **`Backup/`** (444 MB),
  **`Proceso de Contacto clientes/`** (prospección con datos de personas reales: RGPD, y no
  es la web) y **los ~200 MB de vídeos que ninguna página carga** (entran solo los 7 que sí).
  Repo resultante: **99 archivos, ~31 MB**.
- **`.vercelignore` como lista blanca.** Vercel sirve como descarga todo lo que recibe y no
  lee el `.htaccess`; sin esto, `CLAUDE.md`, `docs/` y el código PHP serían públicos.
  **Publica 64 archivos**; medido con el motor de exclusión de git: ningún `.php`, `.md`
  ni `docs/` entre ellos.
- **`vercel.json`** traduce el `.htaccess`: los 301 de `/es/` y `/es-pe/`, la caché de un
  año para CSS/JS/imágenes/vídeo y las cuatro cabeceras de seguridad. HTTPS y gzip/brotli
  los pone Vercel solo. **Nuevo:** 301 de `/en`, `/de`, `/blog` y `/es-es` (sin barra) a su
  versión con barra — Apache lo hacía solo y Vercel no, y `/en/` usa rutas relativas
  (`../styles.css`) que sin la barra se resuelven mal.
- **HTML sin caché propia** (en IONOS eran 10 min): Vercel revalida el HTML en cada visita y
  purga su CDN en cada despliegue, que es justo lo que pedía el `?v=`.

**Lo aprendido:**

- **Mudarse de hosting también es una auditoría de lo público.** El `.htaccess` era lo único
  que impedía descargar `docs/` y los `.md`; en otro servidor esa protección desaparece en
  silencio. **La pregunta no es «¿qué subo?» sino «¿qué sirve el servidor nuevo por
  defecto?»** — la misma pregunta que la del navegador y las cookies (`CLAUDE.md` § 8).
- **Lista blanca, no lista negra**, para todo lo que decide qué es público. Una lista negra
  falla abierta: el día que alguien deje un archivo nuevo de prospección en la raíz, se
  publica. La lista blanca falla cerrada: una página nueva da 404, que se ve al momento.

## ⏸️ 2026-07-22 (2ª sesión) — La Fase 6 se abrió y se paró antes de empezar

**Luis decidió hacer primero la parada de validación.** La Fase 6 queda **planificada y
pausada**; **no se tocó ni un archivo del sitio**. Solo cambiaron dos documentos:
[`FASE-6-ingles.md`](fases/FASE-6-ingles.md), que ya lleva el plan entero, y este.

**Lo que la planificación destapó, y no estaba en ningún sitio:** `/en/` no declara
`canonical` **ni `hreflang`**, así que el grupo de idiomas **no es recíproco y Google lo
ignora entero**; y tiene un **404 vivo** en su modal de consentimiento. Detalle en los
avisos **19, 20 y 21** del backlog.

**Para levantar la pausa:** enseñar la home a 3-4 conocidos del sector en Perú (las
cuatro preguntas están abajo, § Parada recomendada).

## 🚀 2026-07-23 — Fase 13: rendimiento, SEO y seguimiento para publicidad

Luis va a hacer **publicidad de pago** (Google Ads, Facebook/Instagram, TikTok). Esta
fase deja la web lista para eso: **ligera** (se paga por cada clic, y una web lenta
encarece el clic y espanta a la gente), **medible** (sin eventos, una campaña solo
optimiza clics baratos que no compran) y **legal** (los píxeles no pueden cargar sin
consentimiento, porque la web promete RGPD y Ley 29733).

**El resultado, en una cifra:** lo que **bloquea el primer pintado** pasó de **~430 KB
sin comprimir** (CSS + JS + Font Awesome + fuentes, todos bloqueantes) a **~26 KB con
gzip** (solo el CSS). El vídeo del hero (1,78 MB) ya no entra en la primera pantalla y no
se carga en conexiones lentas. Detalle completo en § Detalle de la Fase 13.

> ⚠️ **LUIS: PARA ENCENDER LOS ANUNCIOS, LEE LA GUÍA DE ABAJO** (§ Encender el
> seguimiento). Hasta que pongas tus identificadores, la web **no carga ningún píxel y no
> muestra el aviso de cookies** — está así a propósito y es publicable tal cual.

---

## 🎉 2026-07-22 — La versión española está cerrada

**La Fase 12 (pulido final) terminó hoy, y con ella el español.** Quedan solo las dos
traducciones: **6 (inglés) → 7 (alemán)**.

**La Fase 5 también se cerró hoy:** Luis probó el CTA de WhatsApp desde un celular y
funciona. Era el único punto que le faltaba (pendiente nº 4b).

Lo que la Fase 12 destapó, que no estaba en su propia ficha y pesaba más que lo que sí
estaba: **el botón secundario era una copia exacta del primario**, **el sitio no tenía ni
un estilo de foco de teclado** y **el menú móvil cerrado seguía siendo tabulable**. Los
tres, detalle abajo.

⚠️ **A partir de acá el blog lo alimentas tú.** La maquinaria está montada y las
instrucciones están en [`blog/README.md`](../blog/README.md), escritas para que publiques
sin ayuda: copiar la plantilla, escribir, añadir un bloque al array y subir por FTP.

---

## Cómo usar esto

Cada fase se hace **en un chat distinto**. Para arrancar uno nuevo, abre Claude Code en
esta carpeta y escribe la frase que aparece en "Siguiente paso". El contexto se carga
solo desde `CLAUDE.md`.

---

## Estado de las fases

| # | Fase | Estado | Archivo | Bloqueada por |
|---|---|---|---|---|
| 1 | Base técnica | ✅ Hecha | [FASE-1](fases/FASE-1-base-tecnica.md) | — |
| 2 | Mensaje y copy | ✅ Hecha | [FASE-2](fases/FASE-2-mensaje-copy.md) | — |
| 3 | Stack técnico | 🟢 Publicable | [FASE-3](fases/FASE-3-stack-tecnico.md) | logos ya puestos (Clearbit + fallback); self-host recomendado |
| 4 | Prueba social | ✅ Hecha | [FASE-4](fases/FASE-4-prueba-social.md) | — (datos de Misako aportados) |
| 5 | Conversión | ✅ Hecha | [FASE-5](fases/FASE-5-conversion.md) | — (**Luis probó el CTA de WhatsApp desde el celular el 2026-07-22 y funciona**) |
| 11 | **Sistema de diseño** (tipografía y tokens) | ✅ Hecha | [FASE-11](fases/FASE-11-sistema-diseno.md) | — |
| 8 | Proceso 6 pasos + credenciales + orden | ✅ Hecha | [FASE-8](fases/FASE-8-proceso-credenciales.md) | — |
| 9 | Migraciones + Shopify Partner | ✅ Hecha | [FASE-9](fases/FASE-9-migraciones.md) | — |
| 10 | Blog | ✅ Hecha | [FASE-10](fases/FASE-10-blog.md) | — |
| 12 | Pulido final | ✅ Hecha | [FASE-12](fases/FASE-12-pulido-final.md) | — |
| 13 | **Rendimiento, SEO y seguimiento (publicidad)** | ✅ Hecha (2026-07-23) | — (documentada en este archivo) | — |
| 14 | **Mercados: nace `/es-es/`** (España) | ✅ **Hecha** (2026-08-10, las 4 sesiones) | [FASE-14](fases/FASE-14-mercados.md) | — para construir · 🔴 **pendiente nº 21 (tu contrato) para publicar `/es-es/`** |
| 6 | Inglés | ⏸️ **Pausada** (planificada, sin tocar el sitio) | [FASE-6](fases/FASE-6-ingles.md) | **la parada de validación** (pendiente nº 18) |
| 7 | Alemán | ⬜ Pendiente | [FASE-7](fases/FASE-7-aleman.md) | Fase 6 |

Leyenda: ⬜ Pendiente · 🟡 En curso · ✅ Hecha · ⏸️ Pausada

> ⚠️ **Los números son identificadores, no el orden.** Se ejecutan
> **11 → 8 → 9 → 10 → 12 → 6 → 7**.
>
> - La **11 va la primera** desde el 2026-07-21: si los tokens de diseño se fijan antes,
>   las fases 8, 9 y 10 nacen ya con el acabado bueno en vez de haber que repasarlas.
> - Las **6 y 7** (traducciones) van al final porque traducir una home que todavía va a
>   cambiar obliga a traducirla dos veces.
> - La antigua `FASE-11-pulido-visual.md` **se dividió** en la 11 (tokens, primero) y la
>   12 (ajuste fino, último). El archivo viejo ya no existe.

---

## Siguiente paso

> 🎉 **2026-08-10 — LA FASE 14 ESTÁ TERMINADA.** Las 4 sesiones hechas. `/es-es/` existe,
> se dibuja entera, el banner de país funciona en las dos direcciones, `/es-pe/` redirige,
> `/es-es/` está en el `sitemap.xml` y **las tres legales ya nombran el RGPD** (backlog
> nº 22 cerrado). `?v=33`.
>
> 🔴 **AHORA TE TOCA A TI, Y SON DOS COSAS DISTINTAS:**
>
> **1. Mirar tu contrato antes de subir `es-es/`** (pendiente nº 21). Es lo único que
> queda entre esa carpeta y la web. Vender a pymes **españolas** es competencia directa
> con tu empleador y es justo lo que suele cubrir una cláusula de no competencia; encima,
> el caso que sostiene la página es **Misako, una marca española**. Nadie más puede
> comprobar esto. **El resto de archivos de esta tanda se pueden subir ya** (§ abajo).
>
> **2. La parada de validación**, que es lo que desbloquea la Fase 6. Sigue igual.

**El siguiente paso de trabajo, y ese NO es de Claude sino tuyo: la parada de validación.**

Enseña la home a 3-4 conocidos del sector en Perú y hazles las cuatro preguntas de la
sección de abajo. **Con sus respuestas en la mano**, el chat siguiente arranca con:

```
Lee docs/ESTADO.md. Ya hice la parada de validación, esto es lo que me dijeron: [...]
```

> Ese chat **no empieza traduciendo**: empieza decidiendo si el copy español se toca. Si
> el hero hay que reescribirlo, se reescribe **antes** de la Fase 6. Después de retocar
> el español, se sigue con:
>
> ```
> Ejecuta la Fase 6.
> ```

**Si decides saltarte la validación** y traducir igual, el plan está completo y se puede
ejecutar tal cual con `Lee docs/ESTADO.md y ejecuta la Fase 6.` — pero es tu decisión
tomada dos veces, no un descuido.

---

## 🔑 Encender el seguimiento de publicidad (guía para Luis)

> 📘 **La guía completa, paso a paso, está en
> [`docs/GUIA-PUBLICIDAD.md`](GUIA-PUBLICIDAD.md)** (creada el 2026-07-23). Incluye
> dónde sacar cada identificador en los cuatro paneles, cómo comprobar en incógnito
> que nada carga antes del «Acepto», y **cómo marcar la conversión en Google Ads,
> Meta y TikTok** — que es el paso que no estaba escrito en ningún sitio y tiene
> trampa en Google. Lo de abajo es el resumen.

Todo el seguimiento está montado y **apagado**. Para encenderlo, un solo sitio:
**el objeto `MARKETING` al principio del bloque de consentimiento en `script.js`**
(busca `👉 LUIS`). Pega tus identificadores y sube el archivo con el `?v=` subido. Nada más.

```js
const MARKETING = {
    googleAds: null,   // 'AW-XXXXXXXXX'  → Google Ads › Herramientas › Etiqueta
    ga4:       null,   // 'G-XXXXXXXXXX'  → Google Analytics 4 › Admin › Flujos de datos
    metaPixel: null,   // '1234567890'    → Meta Events Manager › Orígenes de datos
    tiktok:    null    // 'XXXXXXXXXXXX'  → TikTok Ads › Herramientas › Eventos
};
```

**Lo que pasa solo, sin tocar nada más:**

- En cuanto **un** identificador deja de ser `null`, aparece el **aviso de cookies**. Sin
  ninguno, no aparece (no tendría nada que consentir, y pedir permiso para nada entrena a
  la gente a aceptar sin leer).
- **Ningún píxel carga hasta que el visitante pulsa «Aceptar».** Si pulsa «Rechazar» o
  ignora el aviso, no se carga nada. Esto es lo que hace la web coherente con lo que
  promete (RGPD y Ley 29733); saltárselo sería incumplir en la propia web.
- Ya se mandan **dos conversiones** a las tres plataformas a la vez: **clic en cualquier
  botón de WhatsApp** (`contacto_whatsapp`) y **envío del formulario**
  (`formulario_enviado`, con el plazo y el volumen de pedidos para que las plataformas
  aprendan a buscar clientes buenos, no curiosos).

**⚠️ Si añades una plataforma nueva en el futuro, NÓMBRALA en `politica-cookies.html`.**
Un píxel que no está declarado en la política es exactamente el problema que este sistema
viene a evitar. Hoy están declarados Google, Meta y TikTok.

**Cómo marcar la conversión en las plataformas** (cuando ya tengas datos): en Google Ads
y en Meta, la conversión a optimizar es **`formulario_enviado`**, no el clic de WhatsApp.
El formulario es intención real; el clic de WhatsApp a veces es curiosidad. El evento de
WhatsApp vale para *ver* qué secciones mueven, no para optimizar la campaña.

> **Probado de verdad** (2026-07-23), como se prueba todo en este proyecto: se pusieron
> IDs falsos, se recargó y se comprobó que **antes de aceptar no se carga nada**, que al
> **rechazar** sigue sin cargar (y se guarda la decisión), y que al **aceptar** cargan
> Google y Meta y el Consent Mode sube a `granted`. Revertido a `null`.

> ✅ **Las dos decisiones que la Fase 6 necesitaba ya están tomadas** (2026-07-22, Luis),
> y están escritas en su ficha: **el blog se queda solo en español** (cierra el aviso 17
> del backlog) y el **CTA de `/en/` es formulario + email**, sin WhatsApp.
>
> ⚠️ **La Fase 6 hereda un enlace roto conocido**: `de/index.html:786` manda "English" a
> `../index.html`, que desde la Fase 1 es la home **en español** (backlog nº 12).
>
> ⚠️ **El interruptor de Shopify Partner** sigue siendo el objeto **`SHOPIFY_PARTNER`** de
> `script.js` (Fase 9), y de él beben la casilla de la banda, el badge del destino Shopify
> y la frase de independencia. Si el alta resultara no estar activa (pendiente nº 8), se
> pone `activo: false` **ahí y solo ahí**. **Probado apagándolo de verdad.**
>
> ⚠️ **Lo que sigue sin poder hacer Claude y más sube el acabado**: las capturas reales de
> proyecto (pendiente nº 10) y los 4 logos de cliente (nº 11). No se sustituyen con CSS.
> **No bloquean la Fase 6.**

**En paralelo, lo que sigue siendo material tuyo y no trabajo de Claude:**

| Dato | Dónde se escribe | Qué enciende |
|---|---|---|
| ~~Número de WhatsApp~~ | ✅ `CONTACTO.whatsapp` = el +34 del pie | ya activo: 3 CTA + flotante |
| ~~Precio "desde"~~ | ❌ anulado: no se publican precios | — |
| ~~Problema y dato duro de Misako~~ | ✅ aportados | ya no hay marcadores |
| ~~Logos de los CRM~~ | ✅ `Imagenes/crm/`, 9 archivos propios | ya activo: logos reales |

> ⚠️ **Cache busting ahora en `?v=33`** (subido en la Fase 14, sesión 4). Si al abrir la
> web ves algo viejo —titular centrado, colores mezclados, iconos que faltan— es caché:
> fuerza la recarga.
>
> ⚠️ **PARA PUBLICAR LA FASE 14 · SESIÓN 4, subir por FTP.** Esta tanda **incluye y
> sustituye** a la de la sesión 3: si aún no habías subido aquella, sube solo esta.
>
> **A) Todo esto se puede subir YA, y conviene:**
> - **`.htaccess`** ← lleva el 301 de `/es-pe/`. **Es el único archivo de esta tanda que,
>   si algo va mal, podría tumbar la web**: después de subirlo, ABRE LA WEB Y COMPRUEBA QUE
>   CARGA. Si diera error, renómbralo a `.htaccess-off` por FTP y vuelves al instante a
>   como estabas.
> - **`script.js`** ← el banner de país y la lógica unificada de las dos barras
> - **`index.html`** ← el banner nuevo, el `aria-label` del modal y los `rel="noopener"`
> - **`aviso-legal.html`**, **`politica-cookies.html`** y **`politica-privacidad.html`** ←
>   el RGPD y las dos cookies propias declaradas (backlog nº 22) **y el pie nuevo**: las
>   tres dejan de ofrecer «Diseño Web · Desarrollo a Medida · Ecommerce» (backlog nº 29)
> - la **carpeta `blog/`** (solo le cambia el `?v=33`)
> - **`sitemap.xml`** ← declara `/es-es/`
>
> **B) La carpeta `es-es/` — NO la subas hasta mirar tu contrato:**
> - 🔴 **pendiente nº 21.** Es lo único que queda. La carpeta es **un solo archivo**
>   (`es-es/index.html`), no hay assets nuevos.
> - ⚠️ **`sitemap.xml` ya declara `/es-es/`.** Si subes el sitemap y no la carpeta, le
>   estarás dando a Google una URL que da 404. **Sube los dos o ninguno de los dos**: si
>   decides esperar, deja también el `sitemap.xml` para después.
>
> **DESPUÉS DE SUBIR, dos comprobaciones de 10 segundos** que no se pueden hacer desde
> aquí porque el servidor de pruebas no lee `.htaccess`:
> 1. Abre `nouweb-es.com/es-pe/` → tiene que llevarte a la home.
> 2. Abre `nouweb-es.com/es/` → tiene que seguir llevándote a la home (que no se rompió).
>
> ⚠️ **PARA PUBLICAR LA FASE 14 · SESIÓN 3, subir por FTP** *(ya incluido en la tanda de
> arriba; se conserva por historial)*:
>
> **A) Lo de la home peruana — se puede subir YA, y conviene:**
> - **`script.js`** ← lleva el arreglo del modal de servicios, que era **un defecto vivo**
> - **`index.html`** ← `lang="es-PE"`, el `hreflang` nuevo y el `<noscript>` de CRM al día
> - las **tres legales de la raíz** y la **carpeta `blog/`** (solo les cambia el `?v=32`)
>
> **De lo que se ve en la home peruana no cambia nada**: está medido elemento a elemento.
> Lo que cambia es lo que Google lee (`lang` y `hreflang`) y el texto de los tres modales
> de servicio, que ahora es el correcto en cada mercado.
>
> **B) La carpeta `es-es/` — NO la subas todavía:**
> - 🔴 **pendiente nº 21**: mira tu contrato (no competencia). El caso que sostiene la
>   página es Misako, una marca **española**.
> - 🟠 **backlog nº 22**: las legales no nombran el RGPD ni la LSSI-CE. Lo cierra la sesión 4.
> - Y le falta la sesión 4 entera: banner de país, el 301 de `/es-pe/` y el `sitemap.xml`.
>
> Subir `es-es/` antes de eso publicaría una página que capta clientes españoles **sin que
> hayas mirado tu contrato**, que es justo lo que este tablero lleva avisando desde el
> 2026-08-09. La carpeta es **un solo archivo** (`es-es/index.html`): no hay assets nuevos.
>
> ⚠️ **PARA PUBLICAR LA FASE 14 · SESIÓN 2, subir por FTP:**
> - **`script.js`** ← es el cambio de verdad (objeto `MERCADOS`, filtrado de las 7
>   rejillas, Klaviyo y los logos propios)
> - **`Imagenes/crm/` entera** (9 archivos, 61 KB) ← **si falta, los logos de CRM salen
>   como texto.** Es la carpeta nueva de esta tanda; no te la dejes.
> - `index.html` ← lleva además el `<script>` de mercado en el `<head>`
> - las **tres legales de la raíz** y la **carpeta `blog/`** (solo les cambia el `?v=31`)
>
> **De la home peruana solo cambia la rejilla de CRM** (9 logos de verdad en vez de 8
> wordmarks, y Klaviyo nuevo). El resto está medido: 0 diferencias. Si tras subirlo notas
> algo más, **es caché**: recarga forzada (Ctrl+F5). No hay que subir `styles.css`.
>
> ⚠️ **PARA PUBLICAR LA FASE 13, subir por FTP:**
> - **`.htaccess`** ← es lo que activa la compresión y la caché. **Sin esto, la mitad de la
>   optimización no existe.** Es el archivo más importante de esta tanda.
> - `index.html`, `styles.css`, `script.js`
> - las **tres legales de la raíz** y la **carpeta `blog/` entera** (todas ganaron `?v=27`)
> - **`Imagenes/og-nouweb.png`** (imagen social nueva) y **`Imagenes/LogoAlta-2x.png`**
>   (logo ligero nuevo). **Si faltan, el logo del header y la tarjeta al compartir salen
>   rotos.**
> - `sitemap.xml`
>
> ⚠️ **Después de subir `.htaccess`, ABRE LA WEB Y COMPRUEBA QUE CARGA.** Es el único
> archivo de la fase que, si el hosting de IONOS no soporta algún módulo, *podría* dar un
> error 500. Está escrito con `<IfModule>` en cada bloque justamente para que eso no pase
> (Apache se salta lo que no entiende), pero **míralo tú una vez**: si la web diera error,
> renombra `.htaccess` a `.htaccess-off` por FTP y vuelve a estar como antes al instante.
>
> **No subir `Backup/` ni `docs/`** (el nuevo `.htaccess` ya los bloquea si se suben por
> error, pero mejor no subirlos). Tras subir, **recarga forzada** (Ctrl+F5).
>
> ⚠️ **La paleta cambió** (negro puro → navy). Si al abrir la web ves los colores viejos
> mezclados con los nuevos, es caché, no un fallo: fuerza la recarga antes de dar nada
> por roto.
>
> ✅ **Los `{{PENDIENTE}}` del caso Misako ya se rellenaron** con los datos reales que
> dio Luis (2026-07-20). No queda ningún marcador visible en la página.
>
> ✅ **Los logos de CRM ya son propios**, en `Imagenes/crm/` (2026-08-10). Salían de
> `logo.clearbit.com`, **que se apagó**: el host ni resuelve, así que en la web publicada
> las 8 fichas llevaban tiempo cayendo al wordmark. Ahora son 9 archivos nuestros, 61 KB
> en total. Cierra el pendiente nº 1.

---

## ⛔ Parada de validación — **es lo que bloquea la Fase 6**

**Dejó de ser una recomendación el 2026-07-22: Luis decidió pararse aquí.** Se recomendó
tras la Fase 2 y se fue postergando fase a fase; al abrir el chat de la Fase 6 se planteó
como decisión y Luis eligió **validar antes de traducir**. La Fase 6 queda pausada hasta
que esto se haga.

El motivo es de coste, no de perfeccionismo: **lo siguiente es traducir**, y traducir un
copy que todavía puede cambiar significa traducirlo dos veces (y tres, contando el alemán).

Enseña la home a 3-4 conocidos del sector en Perú y escucha qué entienden. Si el copy va
a cambiar, que cambie **antes** de la Fase 6, no después.

**Qué preguntar** (sin explicarles nada antes, dejarlos leer solos):

1. Después de leer solo la primera pantalla: ¿a qué se dedica esta empresa?
2. ¿Cuál de los seis problemas de "¿Te suena esto?" te pasa a ti?
3. ¿Qué crees que cuesta esto? (revela si el posicionamiento se lee caro o barato)
4. ¿Hay algo que suene raro, forzado o "de España"?

La respuesta a la 1 es la que decide si la Fase 2 funcionó. Si nadie sabe decir qué
vende Nouweb, se reescribe el hero antes de seguir.

---

## Pendientes de Luis (bloquean fases concretas)

| # | Qué | Para la fase | Estado |
|---|---|---|---|
| 1 | ~~Logos de los CRM en `Imagenes/crm/` (PNG/SVG)~~ | 3 | ✅ **RESUELTO el 2026-08-10.** Los 9 logos son archivos propios en `Imagenes/crm/`. Se hizo porque **`logo.clearbit.com` se apagó** y los logos estaban rotos en producción, cayendo al wordmark |
| 2 | Logo de Misako | 4 | ⬜ opcional: el caso ya funciona sin él |
| 3 | ~~Dato duro del caso Misako~~ | 4 | ✅ aportado: 9/10 UX, 9,5/10 responsive |
| 3b | ~~Qué motivó la migración de Misako~~ | 4 | ✅ aportado: headless con bugs e inventario descuadrado |
| 4 | ~~Número de WhatsApp para el CTA~~ | 5 | ✅ **resuelto**: se usa el español `+34 614 94 27 32`, el mismo del pie. Provisional, ver abajo |
| 4b | ~~Probar el CTA de WhatsApp desde un celular~~ | 5 | ✅ **hecho por Luis el 2026-07-22: funciona.** Con esto **la Fase 5 queda cerrada** |
| 5 | ~~Precio de entrada para el "desde"~~ | 5 | ❌ **anulado**: Luis decidió no publicar precios (2026-07-20) |
| 6 | Alta en programas de partner (HubSpot, Zoho, Kommo) | — | ⬜ |
| 7 | Confirmación escrita de permiso de logo de Misako | 4 | ⬜ |
| 8 | **Confirmar que el alta de Shopify Partner está activa** en `partners.shopify.com` (declarada el 2026-07-21). Es verificable en el directorio público | 9 | ⬜ **sigue abierto y ahora pesa más**: se publica en DOS sitios (banda + destino Shopify). Se apaga con `SHOPIFY_PARTNER.activo = false` en `script.js` |
| 9 | ~~Tema del primer artículo del blog~~ | 10 | ✅ **aprobado el propuesto** (2026-07-22): *"Tus pedidos entran por WhatsApp: cómo dejar de perderlos"*. Escrito y publicable |
| 10 | **Capturas reales de proyectos** (tienda de Misako, panel de CRM). Es lo que más sube el acabado visual y no se sustituye con CSS | 12 | ⬜ |
| 11 | 4 logos de cliente reales, para poder dibujar la rejilla de logos | 12 | ⬜ **el hueco ya está reservado**: puesto 3 de la home, entre la banda de credenciales y `#problema`. Hoy es solo un comentario en el HTML; no se dibuja nada hasta que existan los 4 |
| 12 | ~~Decidir: Outfit + Inter, o solo Outfit~~ | 11 | ✅ **decidido: solo Outfit** (2026-07-21) |
| 13 | ~~Decidir: 3 servicios o 6~~ | 8 | ✅ **decidido: 3** (2026-07-21). Anotado en un comentario de `index.html` para que no se añadan tarjetas sin decisión suya |
| 14 | *(opcional)* La tipografía exacta de Cluster, si la quieres: Chrome → clic derecho en un titular → Inspeccionar → Computed → `font-family` | — | ⬜ sigue abierto: si la traes, es **una línea** de `DISENO.md` y se propaga sola |
| 15 | ~~Decidir qué pasa con el azul/morado de los botones~~ | 12 | ✅ **decidido el 2026-07-22: fuera el morado**, los botones degradan azul → cian. `--secondary-color` apunta ahora a `--accent` (`DISENO.md` §§ 8 y 11) |
| 16 | **El segundo artículo del blog.** La maquinaria está montada y documentada (`blog/README.md`): a partir de acá publicas tú sin ayuda. Con un solo artículo la sección se sostiene, pero un blog que no crece envejece a la vista | — | ⬜ |
| 17 | **Pulsar Tab una vez en la web publicada** y comprobar que se ve el anillo de foco cian claro y que el primer tabulador ofrece "Saltar al contenido". **10 segundos.** Es lo único de la Fase 12 que no se pudo verificar aquí: el panel de vista previa nunca tiene el foco a nivel de navegador (`document.hasFocus()` es siempre `false`), así que `:focus` no llega a aplicar nunca | 12 | ⬜ |
| 18 | 🔴 **La parada de validación: enseñar la home a 3-4 conocidos del sector en Perú** y traer sus respuestas a las cuatro preguntas de arriba. **Es lo que bloquea la Fase 6**, por decisión tuya del 2026-07-22 | **6** | ⬜ **es el siguiente paso del proyecto** |
| 19 | ~~Decidir qué pasa con `/blog/` en los otros idiomas~~ | 6 | ✅ **decidido el 2026-07-22: se queda solo en español**, sin enlazar desde `/en/` y sin `hreflang`. Cierra el aviso 17 del backlog |
| 20 | ~~Decidir el CTA principal de `/en/`~~ | 6 | ✅ **decidido el 2026-07-22: formulario + email**, sin WhatsApp. El +34 se queda solo en el pie |
| 21 | ~~Mirar tu contrato con la agencia (no competencia / exclusividad) antes de publicar `/es-es/`~~ | **14** | ✅ **resuelto el 2026-10-12: Luis confirma que lo revisó** y decide publicar `/es-es/` |
| 22 | **Verifactu: fechas de entrada en vigor verificadas** | 14 | 🟡 **resuelto por ahora: se escribe SIN fechas** (decisión del 2026-08-09). Sigue abierto solo si algún día quieres añadirlas |
| 23 | ~~¿Hay algún caso español publicable?~~ | 14 | ✅ **sí, y ya lo tenías: Misako ES una marca española** (`script.js:338`). Se reusa tal cual en `/es-es/`. **Se descubrió midiendo, se creía peruana** |
| 24 | ~~CTA de `/es-es/`~~ | 14 | ✅ **decidido el 2026-08-09: formulario + teléfono.** El +34 acá es número local. WhatsApp baja a secundario |
| 25 | ~~¿Precios en euros?~~ | 14 | ✅ **decidido el 2026-08-09: no se publican**, igual que en Perú |
| 27 | ~~¿Kommo sigue destacado en la versión española?~~ | 14 | ✅ **decidido el 2026-08-10: fuera el destacado de Kommo en España**, y entra **Klaviyo** en su lugar. Hecho |
| 26 | **La home PERUANA se queda sin prueba social local.** Si Misako es el caso fuerte de España, en `/` es un caso extranjero. No lo crea esta fase, pero ahora está medido: un caso peruano real es lo que más subiría la home de `/` | 4 / 14 | ⬜ **relacionado con el nº 11** |
| 28 | **¿`/es-es/` enlaza al blog?** Hoy **no**: ni menú, ni pie, ni sección. El blog está escrito en español **peruano** y su único artículo se apoya en el gancho de WhatsApp que § 4bis descarta para España, así que mandar allí a un visitante español es mandarlo a la web del otro mercado. Se dejó fuera porque **quitarlo es reversible en dos líneas y ponerlo mal no se ve**. Tus opciones: (a) dejarlo así, (b) enlazarlo igual asumiendo el tono peruano, (c) escribir un artículo español y abrir blog propio | 14 | ⬜ **decisión tuya, no bloquea nada** |
| 29 | **Comprobar los dos 301 después de subir el `.htaccess`.** Abre `nouweb-es.com/es-pe/` (tiene que llevarte a la home) y `nouweb-es.com/es/` (tiene que seguir llevándote). **20 segundos.** No se pudo probar aquí: el servidor de pruebas es un estático de Python y no lee `.htaccess` | 14 | ⬜ |
| 30 | 🟠 **El NIF/CIF sigue como «En trámite»** en `aviso-legal.html` y en `politica-privacidad.html`. El artículo 10 de la LSSI-CE —el que abre el aviso legal— obliga a publicar los datos identificativos de quien vende desde España, y **es lo primero que mira un comprador que verifica**. Con la web mirando a Perú pasaba; con `/es-es/` captando clientes españoles, un CIF «en trámite» resta justo donde la página promete rigor. **No se puede inventar** (§ 6.3): en cuanto lo tengas, son dos líneas | 14 | ⬜ **no bloquea, pero es barato y sube credibilidad** |
| 32 | 🔴 **Conectar el repo en Vercel**: vercel.com → Add New → Project → importar `Lulito92/nouweb`, preset **Other**, sin build, **sin tocar nada más** (la configuración ya va en `vercel.json` y `.vercelignore`). Lo tienes que autorizar tú: es darle a Vercel acceso a tu GitHub | — | ⬜ |
| 33 | 🔴 **Plan de Vercel: Hobby no vale para esta web.** Sus normas dicen que Hobby es *solo para uso personal no comercial*, y ponen de ejemplo *anunciar la venta de un producto o servicio*, que es justo lo que hace Nouweb. Hace falta **Pro** (de pago, por usuario y mes) | — | ⬜ |
| 34 | **Apuntar el dominio `nouweb-es.com` a Vercel**: en Vercel → Settings → Domains, añadirlo; Vercel te dice qué registros DNS poner, y eso se cambia en el panel de IONOS (donde está el dominio). Hasta entonces la web vive en `nouweb-xxx.vercel.app` | — | ⬜ |
| 35 | **¿Qué pasa con el login de clientes?** Vercel no ejecuta PHP: el botón de acceso de la cabecera lleva a `login.html`, que se ve pero no puede iniciar sesión. Opciones: quitar el botón, dejar el backend en otro hosting o rehacerlo. `backend/` sigue fuera de alcance (`CLAUDE.md` § 9.4) | — | ⬜ **decisión tuya** |
| 36 | **Formspree: dominios permitidos.** Si en Formspree restringiste los dominios del formulario `xqeeevyv`, añade el de Vercel (y `nouweb-es.com`), o los envíos se rechazarán. Prueba un envío real tras el primer despliegue | 5 | ⬜ |
| 31 | 🟡 **Tu URL real de LinkedIn** (o la decisión de no tenerla). El icono social apunta a `href="#"` en las 5 páginas: la home, `/es-es/` y las tres legales. Con la URL se arregla en una pasada; si prefieres no tener perfil público, **lo correcto es quitar el icono**, no dejarlo muerto. **No se inventa** | 12 / 14 | ⬜ |

> El nº 3 es el de mayor impacto por esfuerzo: un solo dato real multiplica la
> credibilidad de toda la sección de casos.
>
> ⚠️ **Los números de esta tabla y los del backlog son dos series distintas.** El "nº 17"
> de aquí es la prueba del tabulador; el "nº 17" del backlog es el blog sin traducir.

---

## Registro de avance

| Fecha | Fase | Qué se hizo |
|---|---|---|
| 2026-07-20 | — | Análisis inicial del proyecto. Definición de posicionamiento, mercado y arquitectura. Creación del arnés de trabajo. |
| 2026-07-20 | 1 | Base técnica cerrada. Ver detalle abajo. |
| 2026-07-20 | 2 | Mensaje y copy cerrados. Ver detalle abajo. |
| 2026-07-20 | 3 | Stack técnico montado al 90%. Falta solo soltar los logos. Ver detalle abajo. |
| 2026-07-20 | 4 | Prueba social montada al 90%. Falta el material de Misako. Ver detalle abajo. |
| 2026-07-20 | 5 | Conversión montada al 90%. Faltan el WhatsApp y el precio. Ver detalle abajo. |
| 2026-07-20 | 3·4·5 | Ronda de cambios pedidos por Luis: logos CRM + accesos directos, migración (fuera Woo, entra Shopify headless), moneda a soles, caso Misako con datos reales (es de España), enlace Contacto y SEO. Ver detalle abajo. |
| 2026-07-20 | header | Cabecera: sin precios en la web (fuera el "desde"), logo ajustado al header (estaba a 200px en un header de 100px y se salía), hamburguesa adelantada a ≤992px para que logo y menú no choquen, y "Precios" fuera del menú de `/es`. Ver detalle abajo. |
| 2026-07-21 | header | Ajuste fino: header de 124→**108px** (logo 80px, letras del menú intactas a 1,05rem) y **el header se esconde al bajar el scroll y reaparece al subir** (clase `header-hidden` desde `script.js`, con variante para el banner de idioma). `?v=14`. |
| 2026-07-21 | 8-11 | **Backup en `Backup/21-07/`.** Localizado el competidor directo (Cluster) y creada su ficha. Planificado el bloque de fases 8 a 11. Ningún archivo del sitio tocado. Ver detalle abajo. |
| 2026-07-21 | **11** | **Sistema de diseño aplicado.** 62 tokens en `:root`, escala tipográfica fluida, ritmo vertical único, paleta navy y `prefers-reduced-motion`. `?v=15`. Ver detalle abajo. |
| 2026-07-21 | **8** | **Banda de credenciales, proceso de 6 pasos y home reordenada.** Dos arrays nuevos, 12 secciones en el orden del competidor, hueco de blog reservado. `?v=16`. Ver detalle abajo. |
| 2026-07-21 | **9** | **Migraciones ampliadas y Shopify Partner.** Matriz de 12 orígenes + 4 destinos desde dos arrays, un solo interruptor de partner para toda la página. `?v=17`. Ver detalle abajo. |
| 2026-07-22 | hero | **Titular que se escribe solo**, a petición de Luis. Cuatro frases rotando, hero alineado a la izquierda. `?v=18`. Ver detalle abajo. ⚠️ **Se perdió el backup previo a la Fase 9**, ver la nota al final de esa entrada. |
| 2026-07-22 | **10** | **Blog montado.** Carpeta `/blog/` con índice desde array, plantilla, README para Luis y el primer artículo. `sitemap.xml` y `robots.txt` creados (el sitio no tenía). Hamburguesa subida a 1260px. `?v=21`. Ver detalle abajo. |
| 2026-07-22 | **5** | **Cerrada.** Luis probó el CTA de WhatsApp desde el celular y funciona (pendiente nº 4b). No hizo falta tocar código. |
| 2026-07-22 | **12** | **Pulido final: el español queda cerrado.** Foco de teclado (no existía), enlace de salto en las 7 páginas, menú móvil ya no tabulable, botón secundario que por fin es secundario, morado retirado y vídeo de `#nosotros` diferido. `?v=22`. Ver detalle abajo. |
| 2026-08-09 | **14 · sesión 1** | **Decisiones cerradas y copy de `/es-es/` redactado.** 4 decisiones (CTA, precios, caso, Verifactu) y el borrador completo en el Anexo A de la ficha. Dos hallazgos: **Misako es española** y **el tuteo se conserva**. Sin tocar el sitio. Ver detalle abajo. |
| 2026-08-09 | **14 · sesión 2** | **Cimientos: el objeto `MERCADOS`.** Las 7 rejillas de la home se filtran por mercado desde un solo interruptor. La home peruana sale **idéntica** (medido, 0 diferencias) y la española ya se dibuja entera con la misma `script.js`. Ver detalle abajo. |
| 2026-08-10 | **14 · sesión 2** | **CRM y logos, a petición de Luis.** Fuera el destacado de Kommo en España, entra **Klaviyo**, y **los 9 logos pasan a ser propios**: se descubrió que `logo.clearbit.com` está apagado y las fichas llevaban tiempo cayendo al wordmark en producción. `?v=31`. |
| 2026-08-10 | **14 · sesión 3** | **Nace `/es-es/`.** La página española existe, con `hreflang` recíproco por fin y la raíz en `lang="es-PE"`. Se destapó y arregló una fuga que no estaba en la ficha: **el modal de `#servicios` llevaba copy peruano sin filtrar** y `/es-es/` habría enseñado «WhatsApp Business API» y «OSE/PSE». `?v=32`. Ver detalle abajo. |
| 2026-08-11 | legales | **El pie de las tres legales, a petición de Luis.** Dejan de ofrecer «Diseño Web · Desarrollo a Medida · Ecommerce» y llevan el mismo pie que la home (backlog nº 29). Salió además **un ancla muerta viva desde la Fase 1**: el «Inicio» del menú apuntaba a `#inicio`, que no existe en ninguna de las dos home. **Sin subir el `?v=`**: no cambian ni `styles.css` ni `script.js`. |
| 2026-10-12 | hosting | **Paso a GitHub (repo privado `Lulito92/nouweb`) + Vercel.** `.gitignore` sin secretos, sin prospección y sin `Backup/`; `.vercelignore` como lista blanca (64 archivos públicos); `vercel.json` con los 301 y las cabeceras del `.htaccess`. Pendiente nº 21 cerrado. Ver § 2026-10-12 arriba. Backup en `Backup/12-10-github/`. |
| 2026-08-10 | **14 · sesión 4** | **La Fase 14 se cierra.** Banner de país por zona horaria en las dos direcciones (12 combinaciones probadas), 301 de `/es-pe/`, `/es-es/` en el `sitemap.xml` y **backlog nº 22 cerrado**. Tres hallazgos: **`nw_lang_banner` llevaba sin declararse desde la Fase 1**, **medio aviso del backlog nº 22 era falso** y **el botón de cerrar del modal no tiene nombre accesible**. `?v=33`. Ver detalle abajo. |
| 2026-08-09 | **14** + arnés | **Mercado España abierto y Fase 14 planificada, sin tocar el sitio.** `CLAUDE.md` actualizado (§ 3 mercados, § 4bis España, § 5 aviso de contrato, § 7 URLs y hreflang, § 9 regla 7, § 10 mapa) y creados `docs/SESIONES.md` (arnés de sesiones) y `docs/fases/FASE-14-mercados.md`. Backup en `Backup/09-08-fase14-plan/`. |
| 2026-07-22 | **6** | ⏸️ **Planificada y pausada, sin tocar el sitio.** Luis eligió hacer antes la parada de validación. Se dejaron tomadas las dos decisiones que la fase necesitaba y escrito el plan entero. Se destaparon dos defectos vivos en `/en/`. Ver detalle abajo. |

### Detalle de la Fase 14, sesión 4 — banner de país y publicación (2026-08-10) ✅

**Backup previo:** `Backup/10-08-fase14-s4/` — `index.html`, `es-es/index.html`,
`script.js`, `.htaccess`, `sitemap.xml`, las tres legales, la carpeta `blog/` y los dos
documentos que se editan. Carpeta **nueva y vacía**.

**Qué se hizo.** Los seis puntos de la ficha, y ninguno más:

- **Banner de país por zona horaria.** El plan decía reusar `#lang-banner`; se hizo
  distinto y mejor: un **`#pais-banner` hermano con la misma clase `.lang-banner`**, y las
  dos barras gobernadas por un solo bloque de `script.js`. **No se tocó `styles.css`.**
  El idioma tiene prioridad, nunca salen las dos, y **se ofrece, jamás se redirige**.
- **`.htaccess`**: `^es-pe/?$` → 301 a `/`, al lado de las de `/es/`.
- **`sitemap.xml`**: entra `/es-es/` (prioridad 0.9); `/es-pe/` se apunta en la lista de lo
  que **no** se declara, junto a `/es/`.
- **Backlog nº 22 cerrado.** `aviso-legal.html` y `politica-cookies.html` nombran ya el
  RGPD, la LOPDGDD y la AEPD, y la política de cookies abre con el marco legal (art. 22.2
  de la LSSI-CE + RGPD). **Ni un dato inventado: todo estaba ya en
  `politica-privacidad.html`.**
- **Dos arreglos de accesibilidad** en las dos home a la vez (ver abajo).

#### 🔴 Los tres hallazgos, y ninguno estaba en la ficha

**1. `nw_lang_banner` lleva sin declararse desde la Fase 1.** Se descubrió al ir a declarar
la cookie nueva del banner de país. Es una cookie **propia**, técnica, de 180 días, y la
política de cookies —la página que sostiene el muro de consentimiento de la Fase 13— no la
menciona. La regla de `CLAUDE.md` § 8 se había leído siempre como «declara los píxeles de
terceros», y no dice eso. **Declaradas las dos.**

**2. Medio aviso del backlog nº 22 era falso.** Decía que `aviso-legal.html` «tampoco cita
la LSSI-CE». **La cita tres veces**: el artículo 10 en el apartado 1, los artículos 11 y 16
en el apartado 5, y el acrónimo en el 2. Lo que sí faltaba —y era cierto— era el RGPD. El
aviso se escribió midiendo, el 2026-08-09, y aun así media frase no se sostenía.

**3. El botón de cerrar del modal de servicios no tiene nombre accesible**, en las dos
páginas. Dentro solo hay un icono de Font Awesome (`<i class="fas fa-times">`), que además
la Fase 13 dejó cargando diferido: un lector de pantalla anuncia «botón» a secas y, durante
un instante, el botón se ve vacío. Corregido con `aria-label="Cerrar"` en las dos a la vez.
De paso, `rel="noopener"` en los dos `target="_blank"` que no lo llevaban.

#### Cómo se verificó

**El interruptor tenía 12 posiciones, no 2:** mercado × idioma del navegador × zona horaria
× «ya elegí». Se generaron **dos copias temporales de las páginas reales** con un stub en el
`<head>` que falsea `navigator.language` y la zona horaria por query string, y se cargaron
las 12 en iframes del mismo origen. Las copias se borraron al terminar.

| | Perú (`/`) | España (`/es-es/`) |
|---|---|---|
| Zona del propio mercado | ninguna barra ✅ | ninguna barra ✅ |
| Zona del otro mercado | **país** → España ✅ | **país** → Perú ✅ |
| `Atlantic/Canary` y `Africa/Ceuta` | **país** ✅ (son España y no están en `Europe/`) | — |
| Navegador en inglés | **idioma**, no país ✅ | **idioma**, no país ✅ |
| Con la cookie ya puesta | ninguna barra ✅ | ninguna barra ✅ |
| Sin zona horaria disponible | ninguna barra ✅ | ninguna barra ✅ |

Y además: las **dos formas de cerrar guardan la elección** (la X y el enlace) y devuelven
el `header` de `top: 44px` a `0`; **las dos cookies son independientes** —cerrar el de
idioma y volver en español enseña el de país, medido—; las páginas sin barras (las tres
legales y el blog) siguen limpias; y la barra **no desborda sus 44 px** a 320, 375, 414,
768 ni 1280 px.

**La regresión, que es lo que protege el trabajo de las sesiones anteriores:**

- **Los tres modales de servicio, reabiertos en los dos mercados**, comprobando que **de
  verdad se abren** (588/562/589 caracteres en Perú, 584/553/717 en España) antes de contar
  fugas: **0 y 0**. Contar «0 fugas» sin comprobar la apertura habría dado el mismo
  resultado con el modal roto.
- **Barrido del DOM entero** contra las dos listas de palabras del otro mercado: **0 y 0**.
- **`hreflang` recíproco intacto**, `canonical` correcto, **3 JSON-LD que parsean** en cada
  página y **69 / 64 `.fade-in-up`** — exactamente los mismos que dejó la sesión 3.
- **47 rutas propias pedidas con `fetch(HEAD)`**: todas 200. **Sin errores de consola.**
- **Scroll horizontal 0 px a 375, 768, 1024 y 1440 px** en las dos páginas.

⚠️ **El 301 de `/es-pe/` NO se pudo probar aquí**: el servidor de pruebas es un estático de
Python y no lee `.htaccess`. Lo comprueba Luis al subirlo (§ aviso de publicación).

#### Lo aprendido

- **La regla «ninguna pieza entra sin nombrarse» se estaba aplicando solo a los terceros**,
  y no dice eso. La pregunta correcta no es *«¿esto es un tercero?»* sino **«¿el navegador
  guarda algo?»**. Una cookie propia y técnica sigue siendo una cookie, y una política
  incompleta se detecta igual de rápido que un badge de partner falso — que es el motivo
  entero de `CLAUDE.md` § 6.1.
- **Un aviso del backlog puede estar equivocado y sobrevivir porque nadie vuelve a
  medirlo.** El nº 22 se escribió midiendo y aun así media frase era falsa. **Cerrar un
  punto del backlog empieza por volver a medirlo**, no por dar por bueno lo que escribió la
  sesión anterior. Un backlog que no se remide se convierte en folclore.
- **El plan decía «reusa la cookie que ya existe» y era la decisión equivocada**, por algo
  que solo se ve al escribirla: son dos preguntas distintas. Con una sola cookie, alguien
  en Madrid con el navegador en inglés cerraba la barra de idioma y **no veía nunca la de
  país** — justo la que le interesaba. **Reusar una pieza no es reusar su estado.**
- **El copy de un banner puede romper la prueba que protege al proyecto.** La versión
  atractiva era *«Ver la versión con IVA y Verifactu»*, y eso mete vocabulario español en
  el DOM de la raíz, donde la comprobación de fugas es literalmente «no hay ni una palabra
  española». Habría dejado un **falso positivo permanente** en la prueba más importante de
  la fase. La barra señaliza; no vende.
- **Un repaso de accesibilidad encuentra lo que doce sesiones de trabajo no.** El botón sin
  nombre llevaba ahí desde el principio y no se ve leyendo el código ni mirando la pantalla:
  solo sale al preguntarle a cada elemento cómo se llama.
- **Medir el ancho dentro de un iframe miente 18 px.** El primer barrido dio «20 px de
  scroll horizontal a 320 px» y parte era la barra de scroll del iframe. La medición buena
  es pedir el ancho **+18** y leer `clientWidth`. Hecho así, 375 px está limpio y el
  desbordamiento de 320 px es real pero preexistente → backlog nº 28.

### Detalle de la Fase 14, sesión 3 — nace `/es-es/` (2026-08-10) ✅

**Backup previo:** `Backup/10-08-fase14-s3/` — `index.html`, `script.js`, las tres legales
de la raíz, la carpeta `blog/` y los dos documentos que se editan. Carpeta **nueva y
vacía**.

**Qué se hizo.** España deja de ser un plan y pasa a ser una carpeta:

- **`/es-es/index.html`, un solo archivo.** Reusa `/styles.css` y `/script.js` con **ruta
  absoluta**, como hizo el blog en la Fase 10. **No se copió ni un asset**: no hay una
  cuarta hoja de estilos ni un cuarto `script.js`. La triplicación de `/en`, `/de` y `/es`
  es la deuda que este proyecto paga desde la Fase 1, y no se le añadió otra copia.
- **Los bloques escritos a mano**, que eran los caros: SEO y los tres JSON-LD (con la
  pregunta de la SUNAT sustituida por la de Verifactu, **sin ninguna fecha**), las 6
  tarjetas de `#problema` (dos **sustituidas**, no traducidas), `#servicios`, el sello
  fiscal, las pasarelas españolas, `#nosotros`, `#auditoria`, `#contacto` con el bloque de
  teléfono nuevo, y las legales con RGPD + LOPDGDD + AEPD.
- **`hreflang` recíproco.** Las dos páginas declaran ahora **el mismo grupo de cinco
  líneas, cada una incluida a sí misma**. La raíz pasó de `hreflang="es"` a `es-PE` + `es-ES`.
- **`<html lang="es">` → `es-PE`** en la raíz, en la misma pasada. **Cierra el backlog nº 24.**
- **El CTA de España es formulario + teléfono**: los botones del hero y de `#auditoria`
  **no llevan `data-cta="whatsapp"`**, no hay botón flotante, y WhatsApp queda como una
  línea secundaria en `#contacto`.

#### 🔴 El hallazgo: el modal de `#servicios` iba a hablar peruano en España

**No estaba en la ficha de la sesión, y era una fuga de verdad.** El texto de las tres
tarjetas de servicio no vive en `index.html` ni en ninguna de las 7 rejillas que la sesión
2 filtró: vive en `serviceData`, dentro de `script.js` — **el mismo archivo que carga
`/es-es/`**. Sin tocarlo, un visitante español que pulsara «Integración» leía:

> «…lo conectamos con tu web, **tu WhatsApp** y tu facturación electrónica»
> «**WhatsApp Business API**: las conversaciones quedan registradas donde toca»
> «Facturación electrónica: flujo contemplado desde el inicio, **vía OSE/PSE**»

O sea **la SUNAT con otro nombre**, dentro de la página que presume de no nombrarla nunca.
Y «Migración» decía *celular* dos veces.

**Y la verificación que pedía la ficha no lo cazaba.** Decía: *"se comprueba buscando en el
HTML servido, no leyendo"*. Buscar «SUNAT» en el HTML servido de `/es-es/` **no encuentra
nada**, porque ese texto llega por JS y solo existe en el DOM **después de pulsar la
tarjeta**. Es exactamente la misma lección que la Fase 13 ya había dejado escrita sobre
este mismo modal: *"lo caza abrir las tres y mirar la consola, no leer el diff"*.

Arreglado con la convención de la sesión 2: `serviceData` se construye ahora desde el array
**`SERVICIOS_MODAL`**, con campo `mercado` y **filtrado ANTES** de armar el diccionario. El
orden importa: filtrando después, la clave `'diagnostico'` la escribiría la última pareja
del array y **ganaría siempre España**.

#### Cómo se verificó

Todo con el DOM montado, no leyendo el archivo, y **en las dos posiciones del interruptor**:

| Comprobación | Perú (`/`) | España (`/es-es/`) |
|---|---|---|
| `lang` → mercado | `es-PE` → `pe` ✅ | `es-ES` → `es` ✅ |
| Credenciales | `España · Perú` · `SUNAT e IGV` | `Basado en España` · `Verifactu` |
| CRM (destacados) | 9 · Kommo + HubSpot | 9 · **Klaviyo** + HubSpot |
| Proceso | 6 → `01,02,03,04,05,06` | 6 → `01,02,03,04,05,06` |
| Migraciones | 12 | **10** · destacadas Magento 1, Magento 2, PrestaShop, marketplace |
| Destinos | 4 (con VTEX) | **3** (sin VTEX) |
| Léxico del otro mercado | 0 palabras españolas | 0 palabras peruanas |
| Los 3 modales de servicio | siguen en peruano ✅ | **0 fugas** ✅ |
| Scroll horizontal (1280 y 375 px) | 0 px | 0 px |
| Errores de consola | ninguno | ninguno |

Además: **los 3 bloques JSON-LD parsean**, y **las 20 rutas propias de `/es-es/` devuelven
200** —comprobadas con `fetch(HEAD)`, no mirando la pantalla—, que es lo que descarta el
fallo más probable de una página que vive en una subcarpeta: una ruta relativa que se
resuelve contra `/es-es/` y da un 404 silencioso.

**La prueba de regresión buena fue contar `.fade-in-up` por sección en las dos páginas a la
vez**, cargando `/es-es/` en un iframe junto a la home. Salen **69 en Perú y 64 en España**,
y las 5 de diferencia son **exactamente las previstas y ninguna más**: el bloque de blog (2)
y la sección de migración (3 = dos orígenes y un destino menos). Cualquier bloque olvidado
al escribir la página nueva habría salido aquí como una sección descuadrada.

#### Lo aprendido

- **Una lista de "lo que hay que tocar" hecha leyendo un archivo solo encuentra lo que está
  en ese archivo.** La ficha enumeró 10 bloques de `index.html` con su número de línea, y
  estaba bien: el problema es que la pregunta correcta no era *"¿qué hay que cambiar en
  `index.html`?"* sino **"¿qué texto va a leer un español?"**. El copy del modal llevaba
  meses a dos carpetas de distancia de donde nadie lo buscó. **Al abrir un mercado, el
  inventario se hace sobre el TEXTO RENDERIZADO, no sobre los archivos.**
- **Una verificación puede estar equivocada de la misma forma que el trabajo que verifica.**
  "Buscar SUNAT en el HTML servido" y "escribir el HTML de `/es-es/`" comparten el mismo
  punto ciego: los dos miran el archivo. Una comprobación que solo mira donde ya miraste
  confirma tu trabajo, no lo prueba. **La versión buena es barrer `document.body.innerText`
  y, además, pulsar lo que solo existe tras un clic.**
- **Lo que se dibuja con JS necesita ruta absoluta y nadie avisa si no la tiene.** El
  `data-src` del vídeo lo consume `script.js` con `video.src = video.dataset.src`, y el
  navegador lo resuelve contra la página, no contra el script. Con `Videos/…` habría pedido
  `/es-es/Videos/…`: **404, cero errores en consola** (el vídeo es decorativo) y un
  degradado que se queda para siempre pareciendo una decisión de diseño. Es la misma
  familia que el `logo.clearbit.com` de la sesión anterior: **degradar en silencio es la
  forma que tienen estos fallos de durar meses.**
- **La caché del navegador de pruebas miente igual que la del visitante.** La primera
  medición de la raíz salió con `lang="es"` y 8 CRM —o sea, una página anterior a la sesión
  2— y por un momento pareció que el cambio no había entrado. No había ningún fallo: era
  una copia cacheada. **Antes de perseguir una diferencia, recargar saltándose la caché**,
  que es la versión de este panel del aviso que ya llevan escrito las fases 9, 13 y la
  sesión 2.
- **Un `<noscript>` es texto que nadie relee.** El de `#stack-crm` seguía listando 8 CRM
  sin Klaviyo desde el día anterior, y solo lo lee quien navega sin JS. Corregido de paso.

### Detalle de la Fase 14, sesión 2 — cimientos: el objeto `MERCADOS` (2026-08-09) ✅

**Backup previo:** `Backup/09-08-fase14-s2/` — `script.js`, las 7 páginas que lo cargan,
`blog/blog.js` y los dos documentos que se editan. Carpeta **nueva y vacía**.

**Qué se hizo.** Nouweb pasa a vender a dos mercados en el mismo idioma, y eso no es una
traducción: son dos marcos legales. Ahora hay **un solo interruptor**, con la misma
estética que `SHOPIFY_PARTNER` y `MARKETING`:

- **`<script>` en línea en el `<head>` de `index.html`**, antes del primer pintado, que
  escribe `data-mercado` a partir del `lang` de la página. Dos líneas.
- **Objeto `MERCADOS`** al principio de `script.js` con los dos países: impuesto, moneda,
  organismo, protección de datos, pasarelas y gancho. **Verifactu va sin ninguna fecha**
  (pendiente nº 22).
- **Campo `mercado` en las 7 rejillas** que se dibujan solas, con filtrado al renderizar,
  igual que `CREDENCIALES` ya filtraba por `activo`. Lo que vale para los dos países
  **no se duplica**: lleva `mercado: ['pe','es']`.

**Lo que sale en cada mercado, medido:**

| Rejilla | Perú | España | Qué cambia |
|---|---|---|---|
| Hero (frases) | 4 | 4 | Se **sustituyen** las de WhatsApp y SUNAT, no se traducen |
| CRM | 8 | 8 | Ninguno es exclusivo de un país |
| Casos | 1 | 1 | Misako, que en España **juega en casa** |
| Credenciales | 4 | 4 | `España · Perú` → `Basado en España`; `SUNAT e IGV` → `Facturación electrónica y Verifactu` |
| Proceso | 6 | 6 | Paso 4 (fiscal), y léxico: *costos→costes*, *capacitación→formación* |
| Migraciones | 12 | 10 | Fuera Tiendanube y Jumpseller; Amazon/eBay sustituyen a Mercado Libre/Falabella/Ripley; **destacados: marketplace en Perú, Magento y PrestaShop en España** |
| Destinos | 4 | 3 | **VTEX fuera de España** |

#### Cómo se verificó, que es lo que da valor a esta sesión

La prueba de la sesión era **que la home peruana no cambiara nada**, y eso no se mira: se
cuenta. Se cargó la **copia de seguridad del `index.html` y del `script.js` anteriores en
un iframe**, junto a la versión nueva, y se compararon en el navegador el texto, el número
de tarjetas, las clases de destacado, los badges y el conteo de `.fade-in-up`.

**Resultado: 0 diferencias.** 8 CRM, 1 caso, 4 credenciales, 6 pasos, 12 migraciones,
4 destinos, 68 `.fade-in-up` — antes y después.

Y como **un interruptor probado en una sola posición no está probado** (`SESIONES.md` § 3),
se montó la misma `script.js` contra un `index.html` con `lang="es-ES"`: dibuja las 10
migraciones españolas, los 3 destinos, la banda con Verifactu y el proceso numerado
**01…06 sin saltos**. Sin errores de consola y sin scroll horizontal.

#### Añadido después, a petición de Luis (2026-08-10): CRM y logos

Tres cambios pedidos por Luis al ver el resultado, y **uno de ellos destapó una avería
viva en producción**:

1. **Kommo deja de ir destacado en España** (`destacado: ['pe']`). Cierra el backlog nº 23
   y el pendiente nº 27 el mismo día en que se abrieron. Sigue en la rejilla de los dos
   mercados: cambia el realce, no la presencia.
2. **Entra Klaviyo**, y ocupa el hueco destacado de España. Son **9 CRM**, no 8.
   ⚠️ Klaviyo se vende a sí mismo como *«B2C CRM»*, así que cabe bajo el encabezado
   *«Integramos con las principales plataformas CRM»*. Si algún día se quiere hilar más
   fino, lo que habría que matizar es **el encabezado**, no quitar el logo.
3. 🔴 **Los logos pasan a ser propios, en `Imagenes/crm/`** — y no era una mejora
   opcional: **`logo.clearbit.com` está apagado.** Medido: el host **ni resuelve**,
   mientras que `clearbit.com` y `hubspot.com` responden 200 desde la misma máquina. O
   sea que en la web publicada **las 8 fichas llevaban tiempo saliendo como wordmark**,
   sin que nada fallara a la vista: el `onerror` hacía su trabajo y degradaba en silencio.

   Los 9 archivos: **3 SVG** (HubSpot, Zoho, Odoo — marca oficial en su color oficial) y
   **6 PNG** de 96 a 256 px, el icono que publica cada marca en su propio sitio. **61 KB
   en total**, con `loading="lazy"`. Cierra el **pendiente nº 1**, abierto desde la Fase 3.

**Verificado:** los 9 archivos cargan (`naturalWidth > 0`, medido forzando la carga), 0
chips en fallo, y los destacados salen **Kommo + HubSpot en Perú** y **Klaviyo + HubSpot
en España**. Las otras seis rejillas siguen intactas. `?v=31`.

> ⚠️ **Trampa del entorno, otra vez, y esta era nueva.** Las imágenes llevan
> `loading="lazy"` y `#stack-crm` está muy por debajo del pliegue: como el panel de vista
> previa **no hace scroll**, los 9 `<img>` daban `naturalWidth = 0` y parecían rotos
> estando bien. La medición buena es **forzar la carga con `new Image()`**, no leer el
> `<img>` de la página. Es la misma familia que el `IntersectionObserver` de la Fase 4 y
> el autoplay de la 13.

#### Lo aprendido

- **Una dependencia de un tercero no avisa cuando se muere: degrada.** El `onerror` que
  se puso en la Fase 3 para que «la ficha nunca quede rota» funcionó demasiado bien —
  convirtió una avería total en algo que se lee como una decisión de diseño. **Un
  respaldo silencioso necesita, al lado, algo que haga ruido**; si no, la avería vive
  meses. Y el aviso estaba escrito: el pendiente nº 1 describía este riesgo exacto
  **veinte días** antes de que ocurriera.
- **El índice del `map` era el riesgo real, no el filtro.** Cuatro de las siete rejillas
  usan el índice para algo que se ve: el proceso pinta con él el número del paso, y las
  demás las clases `delay-1/2/3` del escalonado. Filtrar *después* del `map` habría dado
  una versión española numerada **01, 03, 04, 06, 07, 09** — un fallo que no revienta
  nada, no sale en consola y solo se ve leyendo los números en la pantalla correcta.
- **Un filtro nuevo puede desincronizar un umbral que estaba bien.** El carrusel de
  `#casos` se enciende a partir de 3 casos y contaba `CASOS.length`, o sea el array
  entero. El día que un caso sea de un solo mercado, esa cuenta incluiría casos que no
  están en la página: flechas sin nada que desplazar, exactamente el fallo que la Fase 12
  ya arregló una vez midiendo. **Al meter un filtro hay que buscar quién más contaba ese
  array**, no solo quién lo dibujaba.
- **Comparar contra el backup dentro del navegador es una prueba de regresión de verdad,
  y cuesta un minuto.** No hay git en este proyecto, así que el backup es el único "antes"
  que existe; servirlo desde el mismo `localhost` y diffear los dos DOM es lo más parecido
  a un test que este proyecto puede tener hoy. **Cuidado con una trampa:** la copia no
  incluía `styles.css` (no se modificaba), así que salía sin estilos — **sirve para
  comparar contenido y estructura, no medidas**. Las alturas se compararon aparte, con el
  `script.js` viejo montado sobre la página y el CSS actuales: **168 px los dos**.
- **Una medida sola no dice nada si no se sabe cuándo se tomó.** La altura reservada del
  hero se midió en 324 px al empezar y 168 px al terminar, y **no lo causó el cambio**: la
  primera lectura fue en la carga inicial de la sesión, con Outfit todavía sin llegar, así
  que la tipografía de reserva partía las frases en más líneas. Es la misma familia de
  trampas que ya tenían anotadas las fases 9 y 13 con este panel. **Antes de perseguir una
  diferencia, repetir la medición en las mismas condiciones.**

### Detalle de la Fase 14, sesión 1 — decidir y redactar (2026-08-09) ✅

**Backup previo:** `Backup/09-08-fase14-plan/` (`CLAUDE.md` y `ESTADO.md`), creado con la
apertura de la fase. **Ningún archivo del sitio se tocó**, así que no hay nada que subir.

**Las 4 decisiones de Luis:** CTA de `/es-es/` = **formulario + teléfono** · **sin precios**
· **Misako se reusa** · **Verifactu sin fechas**. Detalle y motivos en la ficha.

**El entregable:** el **Anexo A** de [`FASE-14-mercados.md`](fases/FASE-14-mercados.md), con
el copy de las 10 zonas de la página listo para pegar en la sesión 3.

#### Los dos hallazgos, que no estaban en la ficha

**1. 🔴 Misako es una marca ESPAÑOLA, no peruana.** `script.js:338` la describe como *"Moda
y complementos · España"* y *"una de las marcas líderes en España"*, y `CREDENCIALES`
(script.js:523) ya lo publica en la banda. La fase se abrió asumiendo lo contrario, y al
preguntárselo a Luis se le ofreció la opción describiéndola mal.

Da la vuelta a dos cosas a la vez:

- **`/es-es/` no necesita prueba social nueva**: ya tiene la buena, con dato duro aportado
  y una marca que el visitante español reconoce. La sesión 3 se abarata.
- **La home peruana es la que se queda coja**, porque su único caso es extranjero. No lo
  causa esta fase, pero ahora está medido → **pendiente nº 26**.
- **Y sube el riesgo del pendiente nº 21.** Si esa migración se ejecutó dentro de la
  agencia donde Luis trabaja, publicarla en una página que capta clientes **españoles** es
  exactamente el escenario de `CLAUDE.md` § 5. Mirando a Perú casi no rozaba; mirando a
  España, sí.

**2. El copy peruano está en «tú» singular, no en «ustedes».** *"Migramos tu eCommerce"*,
*"¿Te suena esto?"*, *"Te llevas"*. El tuteo singular es idéntico en los dos países, así
que **la estructura de frase se conserva entera**: lo que cambia es vocabulario suelto
(celular→móvil, costo→coste, acá→aquí, boleta→factura, capacitación→formación) y el
contenido fiscal. La sesión 3 es bastante más barata de lo que decía su propia ficha.

#### Lo aprendido

- **Un dato del propio código desmintió la premisa de la fase.** «Misako es peruana» no
  estaba escrito en ningún sitio: se dedujo de que el proyecto es peruano. Bastaron 30
  líneas de `script.js` para verlo, y se leyeron **después** de haberle preguntado a Luis
  con la descripción equivocada. **Las preguntas al cliente se preparan leyendo el código,
  no la memoria de la conversación.**
- **Al abrir un mercado, lo primero que hay que auditar es qué activos ya lo apuntan.**
  Nouweb llevaba meses con una credencial en la banda que decía «marca líder en España» y
  nadie la contó como activo de España, porque estaba archivada mentalmente como «el caso».
- **Una regla de idioma puede ser más barata de lo que parece si se mira la persona
  gramatical.** El aviso de `CLAUDE.md` § 4 («ustedes, nunca vosotros») hacía temer una
  reescritura, y resultó no aplicar: la página nunca usa la segunda del plural.
- **Un riesgo legal no es constante: cambia de tamaño con el mercado al que apuntas.** La
  misma frase («trabajo en una agencia digital española») y el mismo caso son inocuos en
  `/` y delicados en `/es-es/`. El pendiente nº 21 no se movió, pero pesa el doble.

### Detalle de la Fase 6 — planificada y pausada (2026-07-22) ⏸️

**Ningún archivo del sitio se tocó.** Solo cambiaron `docs/ESTADO.md` y
`docs/fases/FASE-6-ingles.md`. Backup previo de los dos en `Backup/22-07-fase6-plan/`,
carpeta creada vacía y con nombre nuevo.

**La decisión de Luis: parar y validar primero.** Es lo que la propia ficha de la Fase 6
pedía en su § "Antes de empezar" y lo que este tablero recomendaba desde la Fase 2. Se
planteó como decisión suya en vez de arrancar a traducir, y eligió parar.

**Las otras dos decisiones, tomadas para que el chat que ejecute no se bloquee:**

- **El blog se queda solo en español.** `/en/` no lo enlaza y `/blog/` sigue sin declarar
  `hreflang` a rutas que no existen. Cierra el aviso 17 del backlog.
- **El CTA de `/en/` es formulario + email**, sin WhatsApp ni botón flotante. En EE.UU.
  WhatsApp no es canal de venta y el único número de Luis es el +34, que allá es una
  llamada internacional. El +34 se queda en el pie como dato de ubicación.

#### Lo que se descubrió midiendo `/en/`, y no estaba en ningún sitio

`/en/index.html` sigue siendo **la web de agencia vieja** —`<title>` *"Web Design and
Development in Alicante"*—, cosa que ya se sabía. Lo que no se sabía:

1. 🔴 **No declara `canonical` ni `hreflang`. Ninguno de los dos.** La raíz sí apunta a
   `hreflang="en" → /en/`, pero `/en/` no devuelve el apunte. **`hreflang` sin
   reciprocidad se ignora**, así que hoy Google no está viendo un grupo de idiomas: está
   viendo tres sitios sueltos, uno de los cuales contradice a los otros. `/es/` y `/de/`
   tampoco declaran nada (a `/es/` no le hace falta: el `.htaccess` lo manda con 301 a `/`).
2. 🔴 **Un 404 vivo**: el modal de consentimiento de `/en/` sigue en español y enlaza
   `politica-privacidad.html`, que dentro de `/en/` **no existe** (allí se llama
   `privacy-policy.html`). Es el mismo tipo de fallo que el 404 del blog en la Fase 10:
   **no se ve leyendo el código ni mirando la página, solo pulsando.**
3. **`/en/` es la única de las tres carpetas sin hoja propia**: carga `../styles.css`, o
   sea la de la raíz, **la que rehicieron las fases 11 y 12** — y sin `?v=`. Medido: el
   fondo ya sale navy (`rgb(10,15,26)`) y la tipografía ya es Outfit, y no desborda
   (scroll horizontal 0 px). O sea que **la página vieja lleva puesto el sistema de
   diseño nuevo**: no se lee como rota, se lee como incoherente, que es peor de detectar.

Los tres van al backlog (avisos 19, 20 y 21) y a la lista de tareas de la ficha.

#### La arquitectura que queda decidida

**`/en/` no trae una cuarta copia de nada.** Reusa `/styles.css` y `/script.js` con ruta
absoluta, como hizo el blog en la Fase 10, y `en/script.js` (68 KB) se borra. El contenido
se reparte en **datos neutros + copy por idioma unidos por un `id`**, no por posición en el
array, y el idioma sale de `document.documentElement.lang`.

En la misma pasada muere el **sistema de traducción viejo** (`script.js` 1513-2270, ~760
líneas cuyo diccionario es el copy de la agencia de Alicante) y con él el
`console.error('lang-toggle-btn not found!')` de la línea 1979, que arrastran todas las
fases desde la 8. Cierra el aviso 13 del backlog.

#### Lo aprendido

- **Una fase se puede "ejecutar" decidiendo no ejecutarla.** El aviso de no traducir sin
  validar llevaba escrito desde la Fase 2 y se había postergado cinco veces seguidas,
  cada vez por una razón buena. Un aviso que solo se lee no frena nada: hay que
  convertirlo en una pregunta con dos opciones y una fecha.
- **Planificar a fondo sin tocar código encontró dos defectos que llevan meses publicados.**
  El `hreflang` sin reciprocidad y el 404 del modal no los habría visto la fase al
  ejecutarse: se habría reescrito `/en/index.html` entero y los dos habrían desaparecido
  **por accidente**, sin quedar anotados y sin que nadie aprendiera a buscarlos.
- **El `hreflang` es recíproco o no existe.** Declararlo solo desde la raíz se siente como
  medio trabajo hecho y vale exactamente lo mismo que cero. Es comprobable en tres
  peticiones y está en la lista de verificación de la fase.

### Detalle de la Fase 13 — rendimiento, SEO y seguimiento (2026-07-23) ✅

**Backup previo:** `Backup/22-07-fase13/` — las 7 páginas, `styles.css`, `script.js`,
`.htaccess`, `sitemap.xml`, y los dos PNG nuevos. Los residuos retirados se guardaron en
`Backup/22-07-fase13/residuos-retirados/`.

**Qué la originó.** Luis va a hacer publicidad de pago (Google, Meta, TikTok). Eso cambia
las prioridades: en tráfico orgánico una web pesada es una molestia; en tráfico de pago es
dinero, porque cada kilobyte se paga en la factura del anuncio y en la gente que se va
antes de que cargue, y además Google Ads mete la velocidad en el Nivel de calidad, que
encarece el clic.

**Medición de partida:** la primera visita cargaba **~2,7 MB**, y lo que **bloqueaba el
primer pintado** eran ~430 KB sin comprimir (CSS + JS + Font Awesome + Google Fonts, los
cuatro bloqueantes). **Medición final: lo que bloquea el pintado son ~26 KB con gzip**
(solo el CSS). El resto o se comprime, o carga sin bloquear, o no carga hasta después.

#### 1. Compresión y caché (`.htaccess`) — el mayor ahorro por el menor riesgo

El sitio **no tenía ni gzip ni cabeceras de caché**. Se añadió compresión (gzip + brotli
si está), caché de un año para CSS/JS/imágenes/fuentes (seguro **solo** porque hay cache
busting) y de 10 min para el HTML, más cuatro cabeceras de seguridad. Medido: `styles.css`
117 KB → **26 KB gzip**, `script.js` → **23 KB gzip**.

> ⚠️ **Todo va entre `<IfModule>`**, y no es cosmético: si IONOS no tuviera un módulo,
> Apache se salta el bloque en vez de tumbar la web con un 500. Los `Require`/`Deny` de
> las dos versiones de Apache están cada uno en su `<IfModule>` por lo mismo. **La regla
> nueva: nada en un `.htaccess` de hosting compartido fuera de un `<IfModule>`.**

#### 2. Código muerto de `script.js`: 115 KB → 61 KB

Se retiraron el objeto `translations` (21 KB del sistema de idiomas viejo), el modal de
idioma (que era el que imprimía los `lang-toggle-btn not found!` del backlog nº 13 —
**resuelto de paso**), **6 de los 9 servicios** de `serviceData` (los de la agencia vieja,
que además apuntaban a vídeos de 8 y 20 MB) y el carrusel de precios (que consultaba una
sección que no existe desde que Luis quitó los precios).

> **El fallo que enseñó algo:** la lógica del modal de servicio seguía leyendo de
> `translations`. Era **código muerto apoyado en código muerto**: no cambiaba nada de lo
> que se veía, pero al borrar `translations` habría reventado con un `ReferenceError` **al
> abrir cualquiera de las tres tarjetas de servicio**, que son puntos de entrada de la
> home. Lo caza abrir las tres y mirar la consola, no leer el diff. Verificado en el
> navegador: las tres abren, con su título y su descripción.

#### 3. Fuentes e iconos fuera de la ruta crítica

- **Font Awesome entero (~300 KB para 29 iconos)** y **Google Fonts** bloqueaban el
  pintado. Ahora cargan con `media="print" onload` (no bloquean) y con `<noscript>` de
  respaldo. Se retiró el **peso 300** de la fuente, que se cargaba y no lo usa ni un
  selector.
- Los **3 iconos de encima del pliegue** (menú, acceso de clientes, X del banner) pasaron
  a **SVG en línea**, para que la cabecera no espere a Font Awesome. La hamburguesa lleva
  ahora los dos iconos dentro y se cambian por CSS, con `aria-expanded` que antes no
  existía.
- **El hero vuelve a medir su altura en `document.fonts.ready`.** Sin esto, con la fuente
  cargando en diferido, la altura del titular que se teclea (Fase 12) se calculaba con la
  letra del sistema y el hero pegaba el salto que la Fase 12 quitó.
- **La zona táctil de la hamburguesa era 24×27 px; ahora es 44×44** (el mínimo cómodo). En
  tráfico de anuncios, casi todo celular, eso son toques fallidos menos.

#### 4. El vídeo del hero (1,78 MB) y el logo (277 KB)

- **El logo del header** era un PNG de 1130×340 y 277 KB dibujado a 80 px de alto. Se
  generó `LogoAlta-2x.png` (532×160, **63 KB** — 214 KB menos) y se usa en el `<img>` de
  las 7 páginas. El `LogoAlta.png` grande **se queda**: lo usan el `og:image` y el JSON-LD.
- **El vídeo del hero** ya no tiene `src` en el HTML: lo pone `script.js` **después del
  evento `load`** (o sea, lo último) y **solo si la conexión da** (`navigator.connection`:
  se salta con `saveData` o `2g/3g`, y con `prefers-reduced-motion`). Mientras tanto se ve
  un **degradado CSS** cuyos colores salen de **muestrear el propio fotograma del vídeo**,
  así que el relevo no se nota. Cuesta 0 bytes; un poster JPEG habría pesado ~32 KB.

#### 5. Consentimiento de cookies que bloquea de verdad + píxeles — lo legal

**El banner NO bloqueaba nada**: guardaba el clic y escribía en la consola "aquí puedes
activar las cookies de terceros". Con píxeles de por medio eso incumple lo que la web
promete (RGPD, Ley 29733, "no cedemos a terceros"). Se montó el sistema completo:

- Un solo objeto `MARKETING` con 4 identificadores (Google Ads, GA4, Meta, TikTok), todos
  en `null` hoy. La guía para encenderlo está arriba (§ Encender el seguimiento).
- **Google Consent Mode v2** en `denied` por defecto, antes de cargar nada de Google.
- **Nada carga hasta el «Acepto».** El banner solo aparece si hay algún identificador
  puesto. Con todo en `null`, el sitio no pone ni una cookie de tercero y no muestra
  banner.
- **Dos conversiones** cableadas a las tres plataformas por una sola función `nwEvento`:
  clic de WhatsApp y envío de formulario (con plazo y volumen, sin datos personales).
- `politica-cookies.html` reescrita: nombra Google, Meta y TikTok, con su duración y su
  enlace de privacidad, y un botón para **revocar el consentimiento** (que el RGPD exige
  tan fácil como darlo).

> **Probado apagándolo y encendiéndolo de verdad**, como el badge de la Fase 3 y el
> partner de la Fase 9: con IDs falsos, **antes de aceptar no carga nada**; al **rechazar**
> sigue sin cargar y guarda la decisión; al **aceptar** cargan Google y Meta y el Consent
> Mode sube a `granted`. Revertido a `null`.

#### 6. SEO

- **Imagen social nueva** `og-nouweb.png` **1200×630** (la proporción que piden Facebook,
  WhatsApp y LinkedIn). Antes el `og:image` era el logo apaisado, que sale con franjas o
  recortado. Open Graph y Twitter Card completados (`width`, `height`, `alt`, `twitter:*`).
- **Dos bloques JSON-LD nuevos**: `ItemList` con los tres servicios enlazados al negocio,
  y **`FAQPage`** con 4 preguntas reales (independencia, SUNAT, a qué plataforma se migra,
  costo de la auditoría) — Google puede mostrarlas desplegables bajo el resultado. Los tres
  bloques parsean, verificado en el navegador.
- `sitemap.xml`: `lastmod` de la home y de la política de cookies a **2026-07-23** (solo
  las que cambiaron de verdad; la nota del propio archivo avisa de no tocarlas todas).

#### 6b. El hero en móvil "no teclea" — qué era y qué se hizo (2026-07-23)

Luis reportó desde su iPhone (batería al 26%) que el titular **no teclea ni borra**: se
queda una frase fija. Medido en local a **390 px y 768 px**, el tecleo **sí funciona**
—escribe letra a letra, pausa, borra y cambia de frase—, y **sobrevive a la lluvia de
`resize` que iOS dispara al esconder la barra de URL en cada scroll** (24 pulsos de
`resize` seguidos y el tecleo no se congeló). O sea, **el código actual no tiene el bug**.

Dos causas posibles de lo que vio Luis, y las dos se atienden:

1. **La web publicada va por detrás.** `nouweb-es.com` sirve una versión anterior (no se
   ha subido lo de las fases 12/13). No se pudo comparar con producción —este entorno no
   tiene red externa— pero el local demuestra que al subir la versión nueva teclea.
2. **"Reducir movimiento" activo en el iPhone.** iOS lo enciende con ese ajuste de
   accesibilidad, y la web **respeta** ese ajuste no tecleando (el tecleo puede marear).
   **El fallo real que esto destapó:** hasta ahora, con "reducir movimiento" el titular se
   **congelaba en la primera frase para siempre**, así que ese visitante no veía nunca los
   otros tres dolores. **Corregido:** ahora las cuatro frases **rotan con un fundido de
   opacidad** (que no es "movimiento" —es la alternativa que recomienda Apple bajo ese
   ajuste—, así que sigue siendo accesible). Verificada la rotación: recorre las cuatro en
   orden.

> ⚠️ **Para que Luis lo vea arreglado hay que SUBIR la versión nueva (`?v=28`).** Mientras
> no se suba, su móvil sigue con la de antes. Y si en su iPhone tiene "Reducir movimiento"
> encendido, verá las frases **rotar con fundido** en vez de teclearse — es lo correcto,
> no un fallo. Para ver el tecleo, apagar Ajustes › Accesibilidad › Reducir movimiento.

#### 7. Residuos retirados

`styles.css.bak`, `test-idiomas.html` y `test-selector.html` (backlog nº 9), movidos al
backup. Ninguno estaba enlazado. El nuevo `.htaccess` además bloquea `.bak`/`.sql`/`.md` y
los códigos de recuperación por si se suben por error — **red de seguridad, no sustituto
de borrarlos del servidor** (los 🔴 del backlog siguen abiertos).

#### Lo aprendido

- **El código muerto se apoya en código muerto.** Borrar `translations` habría reventado
  el modal de servicio, que parecía no tener nada que ver. Al limpiar, hay que **ejercitar
  lo que queda**, no solo mirar que el diff cuadre.
- **El panel de vista previa tiene una limitación más:** nunca tiene el foco del navegador
  (`document.hasFocus()` siempre `false`), así que bloquea el autoplay de vídeo por
  política — `play()` resuelve pero el vídeo no arranca. Es la misma familia de trampas que
  el no-scroll (Fase 4) y el recálculo atrasado (Fase 9): **para verificar carga de vídeo,
  medir `readyState` y el `src`, no si se ve moverse.**
- **Lo que de verdad importa en velocidad no es el peso total, es qué BLOQUEA el pintado.**
  El vídeo pesa 1,78 MB y no importa, porque carga el último; Font Awesome pesa 300 KB y no
  importa, porque no bloquea. Bajar los 26 KB de CSS bloqueante vale más que cualquier otra
  cosa de la fase.
- **`<IfModule>` no es opcional en hosting compartido.** Un `.htaccess` que asume módulos
  tumba la web entera con un 500 el día que cambia el servidor. Envolver cada bloque
  cuesta nada y es la diferencia entre "no se aplicó una optimización" y "la web está
  caída con dinero corriendo en anuncios".

### Detalle de la Fase 12 — pulido final (2026-07-22) ✅

**Backup previo:** `Backup/22-07-fase12/` (`index.html`, `styles.css`, `script.js`,
`.htaccess`, `sitemap.xml`, `robots.txt` y la carpeta `blog/` entera). Carpeta **creada
vacía y con nombre nuevo**, siguiendo la regla que dejó el accidente de la Fase 9.

**La decisión de Luis:** **fuera el morado** (pendiente nº 15, cerrado). Ver abajo.

---

#### Lo que no estaba en la ficha y era lo más grave

La ficha de la Fase 12 pedía "repaso sección por sección". Ese repaso encontró **tres
cosas que ninguna lista de tareas mencionaba** y que pesaban más que casi todo lo que sí
estaba escrito.

**1. El botón secundario era el botón primario.**

`.btn-outline` era una **copia byte a byte de `.btn-primary`**: mismo degradado, mismo
texto blanco, misma sombra. O sea que en el hero *"Quiero mi auditoría gratuita"* y
*"Ver cómo trabajamos"* se veían **exactamente igual**, y el visitante no tenía ninguna
pista de cuál era la acción principal. Lo mismo en el modal de servicio, en el blog y en
el modal de consentimiento.

No es un detalle estético: **la jerarquía del hero es la conversión** (`CLAUDE.md` § 8),
que es de lo que va la Fase 5 entera. Ahora es un botón perfilado de verdad —fondo
transparente, borde y texto en cian— que se rellena al pasar por encima.

> ⚠️ Es un fallo que **no se ve leyendo la página**: dos botones bonitos uno al lado del
> otro no parecen un error. Solo canta al preguntarse *"¿cuál es el principal?"* y no
> saber contestar.

**2. El sitio no tenía NI UN estilo de foco de teclado.**

En 4.456 líneas de CSS no había un solo `:focus` visible, y encima el formulario llevaba
**dos `outline: none`** que apagaban el del navegador sin poner nada en su lugar. Quien
navega con el tabulador —por discapacidad motora, por costumbre, o porque se le rompió el
ratón— **no podía saber dónde estaba**. Era el criterio 3 de la fase, incumplido de raíz.

**3. El menú móvil cerrado seguía siendo tabulable.**

El desplegable se esconde con `translateY(-150%)`, que lo saca de la pantalla pero **lo
deja enfocable**. Por debajo de 1260 px —o sea, en todos los celulares y en muchas
laptops— el visitante de teclado se comía **9 enlaces invisibles** antes de llegar a
nada: pulsaba Tab, no veía moverse nada, y la página parecía rota.

Medido antes y después: **cerrado 0 de 9 enlaces tabulables, abierto 9 de 9.**

> La propiedad que lo arregla es `visibility: hidden`, **y solo esa**: saca del orden de
> tabulación y además es animable, así que la transición del desplegable no cambia. Es la
> misma propiedad, elegida por el mismo motivo, que en el titular que se teclea del hero.
> Ya van dos veces que en este proyecto la respuesta es `visibility`.

---

#### El resto de lo que se hizo

- **Anillo de foco propio** con `:focus-visible`, no con `:focus`. El navegador solo
  aplica `:focus-visible` cuando el foco viene del **teclado**: con `:focus` a secas cada
  clic del ratón dejaría un anillo pegado al botón y alguien acabaría borrando el estilo
  entero por feo, que es exactamente cómo desaparecen estos arreglos. Tres tokens nuevos
  en `DISENO.md` § 10.
- **El anillo es un cian MÁS CLARO (`#7dd3fc`), no el `--accent`.** Un anillo cian sobre
  un botón cian no se distingue. Medido: **11,5:1 sobre el fondo navy**, pero solo
  **1,46:1 contra el propio cian** — por eso el `outline-offset: 3px` no es decorativo:
  es lo que mete una franja de fondo entre el botón y el anillo. Anotado en el documento
  para que nadie lo quite "para que quede más pegado".
- **Enlace de salto ("Saltar al contenido") en las 7 páginas.** Sin él hay que pasar por
  las **9 entradas del menú** para llegar al contenido, en cada página y cada vez. El
  destino lleva `tabindex="-1"`: sin eso varios navegadores mueven el scroll pero **dejan
  el foco donde estaba**, y el siguiente tabulador vuelve al menú — o sea, el atajo no
  atajaría nada.
- **Carrusel de `#casos`**, con el umbral que pedía la ficha: **a partir de 3 casos**. Hoy
  hay uno, así que no se activa y la sección sigue siendo la rejilla de la Fase 4.
- **El morado se retiró** (decisión de Luis). `--secondary-color` **no se borró: apunta a
  `--accent`**, igual que la capa de alias de la Fase 11, así que los 13 usos heredados se
  convirtieron solos sin tocar un selector. Los botones pasaron de degradar azul → morado
  a **azul → cian, la misma rampa que ya tenía el titular del hero**. Ese era el problema
  real: no eran tres colores, eran **dos rampas distintas saliendo del mismo azul**.
- **El vídeo de `#nosotros` (3,79 MB) iba diferido.** Está muy por debajo del pliegue y se
  descargaba entero en cada visita aunque nadie bajara hasta allí, compitiendo por el
  ancho de banda con el vídeo del hero **justo mientras se pinta la primera pantalla**.
  Ahora `preload="none"` + `IntersectionObserver` con `rootMargin: 300px`, así que empieza
  a cargar *antes* de verse y para el visitante no hay diferencia.
- **Dimensiones explícitas en el logo** (`width="1130" height="340"`, las naturales) para
  que el header no salte antes de que llegue el CSS, y `fetchpriority="high"`.
- **Migrado a variables** lo que quedaba suelto de las secciones tocadas: los
  `rgba(59,130,246,…)` a mano del formulario pasaron a `var(--accent-soft)`.
- **Cache busting a `?v=22`** en las 7 páginas.

---

#### El fallo que solo se ve midiendo: el carrusel que no tenía nada que desplazar

El carrusel se activa a partir de 3 casos, como pedía la ficha. Con 3 casos de prueba y a
**1027 px**, medido: el recorrido total era de **48 px** y un paso son **331 px**. O sea,
dos flechas que al pulsarlas mueven la fila un dedo y se apagan.

**Leyendo el código parece perfecto, porque el código es correcto.** Lo que falla es que
con exactamente 3 tarjetas en una pantalla ancha *casi caben*, y un carrusel sin recorrido
no se lee como un carrusel: se lee como un carrusel roto.

Ahora **las flechas solo aparecen si sobra al menos media tarjeta**, y se reevalúa en cada
cambio de ancho. El umbral se mide **en tarjetas, no en píxeles**, y eso importa: se probó
primero con un umbral fijo de 8 px y **dejaba pasar el caso malo** (48 > 8). En tarjetas la
regla se explica sola y se adapta si cambia el ancho de la tarjeta en el CSS.

Medido con 3 casos: **1440 px → caben, sin flechas** · **1024 px → sobran 50 px, sin
flechas** · **768 px → 288 px de recorrido, flechas** · **375 px → 613 px, dos pasos hasta
el final**. Revertido a 1 caso.

---

#### Verificado

- **375 / 768 / 1024 / 1440 px**: scroll horizontal **0 px** y **0 elementos desbordando**
  en los cuatro.
- **El menú, antes y después**: cerrado **0/9** enlaces tabulables, abierto **9/9**.
- **El carrusel, probado de verdad con 3 casos** y revertido, como el badge de la Fase 3,
  el WhatsApp de la Fase 5 y el partner de la Fase 9. Con el array real (1 caso) la
  sección sale en **rejilla y sin flechas**.
- **No queda ni un `outline: none` en toda la hoja**, comprobado recorriendo el CSSOM (y
  comprobando `r instanceof CSSMediaRule`, no `if (r.cssRules)` — la trampa de la Fase 9).
- **Contraste AA** componiendo el alfa sobre el fondo real: botón perfilado **7,89:1**,
  enlace de salto **7,89:1**, campos del formulario **17,74:1**, anillo de foco sobre el
  fondo **11,49:1**.
- **El vídeo diferido**: nace con `preload="none"` y el `src` sin poner; ejecutando su ruta
  de carga llega a **readyState 4**, 1920×1080, y `data-src` se retira.
- Sin errores de consola nuevos (siguen los `lang-toggle-btn not found!` del backlog nº 13).

#### Lo que NO se pudo probar aquí, y lo cierra Luis en 10 segundos

**El anillo de foco dibujándose.** El panel de vista previa **nunca tiene el foco a nivel
de navegador**: `document.hasFocus()` devuelve `false` siempre, así que **ni `:focus` ni
`:focus-visible` llegan a aplicar nunca**, ni con el tabulador real (el panel se queda el
Tab) ni con `.focus()` por consola. Lo que sí se comprobó es que el navegador **parsea las
reglas** (están en el CSSOM con sus variables sin resolver), que **soporta
`:focus-visible`** y que **no queda ningún `outline: none`**.

→ **Pendiente nº 17**: pulsar Tab una vez en la web publicada.

#### Lo aprendido

- **Una lista de tareas describe lo que sabías cuando la escribiste.** Las tres cosas más
  graves de esta fase —el botón secundario clonado, el foco inexistente y el menú
  tabulable— **no estaban en la ficha**, y la ficha la escribió este mismo proyecto hace
  dos días. La tarea que las encontró fue la más vaga de todas: "repaso sección por
  sección". Conviene dejarla siempre, y hacerla de verdad.
- **Los fallos de accesibilidad no se ven mirando la página, porque se ven no mirándola.**
  El menú tabulable y el foco ausente son invisibles para quien usa el ratón, que es quien
  revisa. Hay que **medir el estado**, no mirar la pantalla: contar cuántos elementos son
  enfocables y comprobar si existe la regla.
- **`outline: none` es casi siempre un fallo, y el CSSOM lo caza en una pasada.** Recorrer
  la hoja buscándolo es una comprobación de tres líneas que conviene repetir en cada fase
  que toque CSS.
- **Un umbral en píxeles envejece; un umbral en unidades del propio contenido, no.** El
  primer intento del carrusel usó 8 px y dejó pasar el caso de 48 px. "Media tarjeta"
  acierta hoy y seguirá acertando si mañana cambia el ancho de la tarjeta.
- **`visibility` vuelve a ser la respuesta.** Segunda vez en dos fases: es la única
  propiedad que a la vez saca del orden de tabulación (o del cálculo de línea) y **sigue
  ocupando/animando**. `display: none` y `opacity: 0` fallan cada una por un lado distinto.
- **El panel tiene una limitación más de las ya anotadas, y es nueva:** además de no hacer
  scroll (Fase 4), no disparar `IntersectionObserver`, y devolver estilos un recálculo por
  detrás (Fase 9), **nunca tiene el foco del navegador**. Cualquier verificación de
  `:focus`, `:focus-visible` o de tabulación hay que hacerla contando elementos
  enfocables, no mirando si se pinta el anillo.

### Detalle de la Fase 10 — blog (2026-07-22) ✅

**Backup previo:** `Backup/22-07-fase10/` (`index.html`, `script.js`, `styles.css`,
`.htaccess`). Carpeta **creada vacía** y nombre nuevo, siguiendo la regla que dejó el
accidente de la Fase 9.

**La decisión de Luis:** aprobó el tema propuesto en la ficha (pendiente nº 9, cerrado).

**Qué se hizo**

- **Carpeta `/blog/` nueva**, con cuatro piezas: el índice, la plantilla, el primer
  artículo y `blog.js`.
- **Un solo array `ARTICULOS`, en `blog/blog.js`, del que beben las dos páginas**: el
  índice (todos) y la home (los 3 últimos). Es la decisión estructural de la fase. Con el
  array duplicado, la home habría acabado anunciando artículos que el índice ya no lista;
  con uno solo, **publicar es tocar un archivo**.
- **`blog/README.md`**: las instrucciones en 4 pasos, escritas para Luis y no para un
  programador, con las preguntas que van a salir (qué pasa si rompo algo, cómo
  despublico, dónde van las imágenes) ya contestadas.
- **`/sitemap.xml` y `/robots.txt`, que el sitio no tenía.** El sitemap declara 6 URLs y
  **deja fuera a propósito** `/es/` (redirige 301), `/en/` y `/de/` (congeladas y hoy
  contradicen a la home) y la plantilla.
- **`robots.txt` no lista el backend, y es deliberado.** El archivo es público: escribir
  ahí las rutas del backend —que tiene incidencias abiertas en este mismo backlog— sería
  publicar un índice de lo que conviene mirar. Queda anotado dentro del propio archivo
  que esto no es una medida de seguridad.
- **La sección de la home se revela sola.** Sigue naciendo con `hidden` desde la Fase 8 y
  lo quita `blog.js` **solo si hay artículos**: misma degradación honesta que el bloque de
  WhatsApp de la Fase 5. El botón "ver todos" aparece **a partir del cuarto** artículo,
  porque con uno lleva a una página que enseña lo mismo.
- **El artículo lleva JSON-LD `Article` y `BreadcrumbList`**, canónica, Open Graph y
  `hreflang` solo en español. **La plantilla nace con `noindex`** y con un aviso de
  borrarlo: si se sube por error, no se indexa.
- **Cache busting a `?v=21`** en la home, las tres legales y las páginas del blog.

**El fallo que solo se ve haciendo clic: el 404 de la home**

El array guarda el nombre del archivo a secas (`pedidos-por-whatsapp-….html`), que es lo
cómodo para quien publica. **La misma tarjeta se dibuja en dos páginas a distinta
profundidad**, así que ese enlace relativo resolvía bien en `/blog/` y **desde la home
apuntaba a `nouweb.es/pedidos-….html`**. Medido con un `HEAD` desde la home: **404**.

Es un fallo que **no se ve leyendo el código ni mirando la página**: la tarjeta se dibuja
perfecta y solo revienta al pulsarla. Ahora el prefijo `/blog/` lo pone el render, en un
solo sitio, y el array se queda simple. Verificado: **200 desde las dos páginas.**

**El otro fallo medido: el menú se quedó sin aire**

Añadir "Blog" ensancha la fila **63 px**, y el hueco entre el logo y el menú a 1201-1220 px
pasó a ser **0 px**: se tocan. **No llegaba a solapar** —el logo lleva `flex-shrink: 0`—
y por eso era peligroso: no se lee como un fallo, se lee como un diseño descuidado, y eso
nadie lo reporta. **La hamburguesa subió de 1200 a 1260 px**, con la tabla de medidas
anotada en `DISENO.md` § 9.

> ⚠️ **Cada entrada del menú cuesta ~63 px.** Añadir otra obliga a volver a medir ese
> corte. **No se quitó "Nosotros"** para hacer sitio: eso es decisión de Luis, no de
> maquetación.

**La palabra que faltaba: `auto-fill`**

El índice nace con **un artículo**. Con el `auto-fit` de siempre, esa única tarjeta se
estira a los **1160 px** del contenedor y se lee como un error de maquetación. `auto-fill`
conserva las pistas vacías y la deja en **365 px**, arriba a la izquierda, que es como se
ve un blog que acaba de empezar. Es el **tercer caso** en que `auto-fit` no vale, y el
primero que se arregla cambiando la palabra en vez de declarando columnas
(`DISENO.md` § 9).

**Verificado** (midiendo el DOM, que en esta página es más fiable que la captura)

- **375 / 768 / 1024 / 1280 / 1440 px** en índice y artículo: scroll horizontal **0 px** y
  **0 elementos desbordando** en todos.
- **El menú, medido en 10 anchos:** con el corte nuevo, el menú horizontal **nunca**
  aparece con menos de **42 px** de hueco (1261 px → 42, 1280 → 61, 1440 → 221).
- **El enlace del artículo devuelve 200 desde la home y desde el índice**, comprobado con
  `HEAD` sobre la URL que resuelve el navegador — no leyendo el atributo.
- **El array vaciado de verdad** (no leyendo el código): la sección de la home
  **desaparece entera** y el índice enseña el estado vacío **sin rejilla rota**. Revertido.
- **Las tarjetas del blog salen de `opacity: 0`**: llevan la clase `.visible`, o sea el
  observer de `script.js` sí las recogió. Es lo que verifica que el orden de los dos
  `<script>` es el correcto.
- **JSON-LD**: los dos bloques del artículo parsean (`Article` y `BreadcrumbList`).
  **`sitemap.xml` bien formado**, 6 URLs, y `robots.txt` apunta a él.
- **Un solo `<h1>`** y jerarquía de títulos sin saltos (nunca un `h3` sin su `h2`).
- **1.555 palabras**, que son los **8 min** declarados en el array a 200 palabras/minuto.
- **Contraste AA** componiendo el alfa sobre el fondo real: los **19 textos nuevos pasan**,
  el más bajo a **6,19:1**.
- **Cero `{{` sin rellenar** en el artículo publicado.
- Sin errores de consola nuevos (siguen los `lang-toggle-btn not found!` del backlog nº 13,
  que en las páginas del blog salen 4 veces en vez de 2 — es el mismo defecto, no uno nuevo).

**Lo que no se probó**

- **`prefers-reduced-motion`**: las tarjetas usan `.fade-in-up`, que la regla global de la
  Fase 11 ya fuerza a visible, así que está cubierto **por construcción**. No se probó con
  la preferencia activada de verdad.
- **La captura de pantalla del panel no funcionó** en esta sesión (el panel no compone
  fotogramas si no está a la vista). Todo lo de arriba está medido sobre el DOM, que es lo
  que este proyecto viene recomendando desde la Fase 4.

**Lo aprendido**

- **Un enlace relativo deja de ser un detalle en cuanto el mismo HTML se dibuja en dos
  profundidades distintas.** Es exactamente lo que pasa al compartir un render entre la
  home y una subcarpeta, y no lo caza ninguna revisión visual: hay que pedir la URL que
  resuelve el navegador y comprobar el código de estado.
- **`auto-fit` y `auto-fill` solo se distinguen cuando sobran pistas.** Con la rejilla
  llena son idénticos, así que el fallo aparece justo cuando el sitio está más vacío —el
  día del estreno— y desaparece solo al añadir contenido. Merece la pena elegirlo a
  conciencia y no por costumbre.
- **Un menú tiene presupuesto de anchura, y nadie lo lleva escrito.** Añadir una entrada
  parece gratis y cuesta ~63 px; el síntoma no es que algo se rompa, es que el header
  pierde el aire en una franja estrecha de anchos que casi nadie mira. Ahora el número
  está en `DISENO.md`.
- **El estado vacío se prueba vaciando.** Se puede razonar perfectamente sobre un `if` y
  aun así tener mal el selector. Es la misma pauta con la que se probaron el badge de la
  Fase 3, el WhatsApp de la Fase 5 y el partner de la Fase 9, y sigue pagando.
- **La deuda de la triplicación no creció.** El blog no tiene CSS ni JS propios de
  presentación: reusa `/styles.css` y `/script.js` con ruta absoluta. Era la tentación
  fácil —una hoja pequeña solo para el blog— y habría sido la cuarta copia.

### Hero que se escribe solo (2026-07-22, petición de Luis)

Luis mandó la home de [Cluster](https://cluster.global/) pidiendo el efecto de máquina de
escribir de su titular (`ECOMMERCE / IS THE NEW / RETAIL_`) y, textualmente, **su misma
frase**.

**Se montó el efecto, no la frase.** El efecto es una idea de interacción y no se protege.
"Ecommerce is the new retail" sí es copy suyo (`CLAUDE.md` § 11.1), está en inglés en una
home en español peruano y, sobre todo, **describe el negocio de Cluster** —agencia de
ecommerce Shopify— **no el de Nouweb**, que es consultoría e integración. Luis eligió entre
tres alternativas propuestas y se quedó con la de los dolores.

**Qué quedó**

- **El titular es solo la frase que rota**, desde el array `HERO_FRASES`: los pedidos en
  WhatsApp · el stock en un Excel que no cuadra · la facturación SUNAT por su lado · los
  sistemas que no se hablan. Son **cuatro de los seis dolores de `#problema`**, así que el
  hero pregunta cuatro veces "¿te suena esto?" antes de que el visitante baje.
- ⚠️ **La línea fija *"Tu tienda online se quedó atrás."* se retiró**, a petición de Luis
  en el segundo lote del 2026-07-22. Era la aprobada en la Fase 2. **No devolverla sin
  decisión suya.** Sigue viva en el `og:title` y en la meta description, que no se tocaron.
- Ritmo: escribir 55 ms/carácter, borrar 30 (más rápido: releer aburre), 2,4 s de lectura.
  La primera frase se queda quieta ese tiempo antes de borrarse, porque es la que ve quien
  entra y se va a los tres segundos.

**La letra que bajaba y volvía a subir — el arreglo de fondo (segundo lote)**

Luis lo describió exacto: *"que no baje y luego suba la letra, por ejemplo SUNAT"*. La
primera versión cortaba la frase con `slice()` y la metía en el elemento. **El problema no
era del código, era de maquetación:** mientras se teclea "SUNAT", la `S` suelta **sí cabe**
al final de la línea, así que el navegador la deja arriba; al completarse la palabra ya no
cabe y la baja de golpe. Al borrar, sube. El titular se descuadraba solo.

**Medir mejor no arregla nada.** Lo que hay que conseguir es que el navegador **no calcule
nunca la maqueta de una frase a medias**. Ahora se pintan **todas** las letras de la frase
desde el primer instante, cada una en su `<span>`, y escribir consiste en pasarlas de
invisibles a visibles.

La pieza que lo hace funcionar es **`visibility: hidden`, y solo esa**:

| Propiedad | Qué pasa |
|---|---|
| `visibility: hidden` | ✅ La letra **sigue ocupando su hueco**, así que los saltos de línea se calculan con la frase entera. Es la buena. |
| `display: none` | ❌ Quita el hueco: el texto se recalcula y el problema vuelve idéntico. |
| `opacity: 0` | ⚠️ La maqueta aguanta, pero el texto sigue siendo seleccionable y aparece al buscar en la página. |

**El cursor también estaba en el ajo.** Un `<span>` de cursor moviéndose entre las letras
desplaza la maqueta un carácter en cada paso, que es el mismo problema en pequeño. Ahora
**no existe como elemento**: lo dibuja el `::after` de la última letra visible (o el
`::before` de la primera, cuando aún no hay ninguna), en `position: absolute`, ocupando
cero.

**Lo que el efecto obligó a cambiar, y que no es cosmético**

- **El hero pasó de centrado a alineado a la izquierda.** No es preferencia estética: con
  el texto centrado, **cada letra que entra recentra la línea** y el titular se desplaza de
  lado en cada pulsación —15-25 px por carácter a este tamaño de tipo—. Alineado a la
  izquierda el punto de partida no se mueve nunca. Es además como está la referencia que
  mandó Luis. Está escrito en el CSS: si algún día se quita el tecleo, se puede devolver a
  `center`; mientras exista, no.
- **La altura de la línea rotativa la reserva `script.js`**, midiendo la frase más alta al
  cargar y en cada *resize*. Sin eso el hero entero da un salto en cada cambio: a 375 px
  estas frases ocupan **entre 3 y 5 líneas** de titular y no todas las mismas, así que el
  botón de la auditoría se movería solo bajo el dedo del visitante.
- Se midió sobre el elemento **real**, oculto un instante, en vez de clonar un nodo: así
  **no queda texto duplicado en el DOM** que Google pueda leer como parte del `<h1>`.

**Accesibilidad y SEO, que es donde este efecto suele romper cosas**

- El `<h1>` lleva **`aria-label` con la frase canónica entera**. Sin él, un lector de
  pantalla leería el titular a medio teclear.
- **La primera frase va escrita en el HTML**, no la inyecta el JS: sin JavaScript el
  titular sigue completo y con sentido, y Google lee texto real.
- **`prefers-reduced-motion`**: no se teclea nada, se queda la primera frase quieta y el
  CSS esconde el cursor (un guion bajo inmóvil se lee como una errata, no como un cursor).

**El fallo que solo apareció al redimensionar**

`reservarAltura()` mide escribiendo texto plano en el contenedor, y eso **destruye los
`<span>` de las letras**. La primera versión los daba por buenos: el bucle de tecleo seguía
encendiendo y apagando clases sobre **nodos que ya no estaban en la página**, así que **al
primer cambio de ancho el titular se congelaba a medio escribir** y no volvía. Se veía
igual que si el JS hubiera petado, pero sin ningún error en consola.

Ahora `reservarAltura()` termina reconstruyendo la frase actual y **volviendo a apuntar
`letras` a los nodos nuevos**. Lo caza esta prueba y ninguna otra: **redimensionar y
comprobar que sigue escribiendo.**

**Verificado**

- **375 / 768 / 900 / 1280 / 1440 px**: registrando la posición vertical de **cada letra en
  cada muestra, 200 muestras (20 s) por ancho**, con las cuatro frases de por medio
  —incluida la de SUNAT—: **ninguna letra cambió nunca de línea**. Es la prueba directa de
  lo que pedía Luis.
- **La caja no cambia de altura** (un solo valor por ancho) y **el botón de la auditoría no
  se mueve ni un píxel** en ninguna muestra.
- **Sigue tecleando después de dos cambios de ancho seguidos**, que es lo que fallaba.
- Sin scroll horizontal ni desbordes. Sin errores de consola nuevos.

⚠️ **Si se añade una frase a `HERO_FRASES`, mirar el hero a 375 px**: la caja reserva la
altura de la más alta, así que una frase larga suelta empuja hacia abajo todo el hero en
**todos** los anchos, no solo en el suyo.

⚠️ **La captura del panel no sirve para verificar esto.** Devolvió el titular en blanco
tres veces seguidas mientras el DOM decía que había 24 letras visibles. Vale la medición,
no la foto — como ya estaba anotado desde la Fase 4.

### Detalle de la Fase 9 — migraciones y Shopify Partner (2026-07-21) ✅

> 🔴 **El backup previo de esta fase se perdió el 2026-07-22.** Se creó bien en
> `Backup/21-07-fase9/`, pero al preparar el cambio del hero un `cp` mal escrito lo
> **sobrescribió con los archivos ya modificados**. La carpeta se renombró a
> `Backup/22-07-estado-actual/` y lleva dentro un `LEEME.txt`, para que nadie la restaure
> creyendo que vuelve atrás: **su contenido es el estado actual, no el anterior.**
>
> **Para deshacer la Fase 9 si hiciera falta:** historial de versiones de OneDrive sobre
> `index.html`, `script.js` y `styles.css` (versión del 2026-07-21 anterior a las 23:44).
> `Backup/21-07-fase8/` sigue intacto, pero guarda el estado anterior a la **Fase 8**:
> restaurar desde ahí se llevaría por delante también la banda de credenciales y el
> proceso de 6 pasos. La lista completa de lo que cambió la Fase 9 está aquí abajo.
>
> **Regla para no repetirlo:** copiar **a** una carpeta de backup solo con la carpeta
> recién creada y vacía, y nunca reutilizar el nombre de un backup que ya existe.

**Qué se hizo**

- **`#migracion-ecommerce` reescrita entera.** Las dos columnas cortas (Desde / Hacia,
  4+3 viñetas) se sustituyeron por **una matriz de 12 orígenes reales**, cada uno con el
  problema que empuja a migrar y el destino que suele tocarle, más **una fila de 4
  destinos** explicados. Todo desde dos arrays nuevos, `MIGRACIONES` y `DESTINOS`:
  **el HTML de la sección ya no contiene el nombre de ninguna plataforma.**
- **Los 5 orígenes nuevos entraron**: Tiendanube/Nuvemshop, Jumpseller, Wix/Squarespace,
  BigCommerce y **solo-marketplace** (Mercado Libre, Falabella, Ripley). Este último es el
  único con `destacado: true` —borde y fondo de acento— porque es el de mayor mercado en
  Perú: marcas que venden bien pero no tienen canal propio ni el dato del cliente.
- **El origen "headless mal implementado" enlaza al caso Misako**, que es exactamente ese
  origen ya ejecutado. Es el único con el campo `caso`; no hay enlaces genéricos.
- **La frase de posicionamiento va arriba del todo**, antes de la matriz, con el mismo
  tratamiento visual que la frase que filtra de `#auditoria`: *"No toda migración termina
  en la misma plataforma."* Puesta ahí condiciona cómo se lee lo que viene debajo.
- **WooCommerce vuelve como destino**, por decisión de Luis del 2026-07-21. El ida y
  vuelta está anotado en el propio array para que nadie lo "corrija".
- **Un solo interruptor de Shopify Partner: el objeto `SHOPIFY_PARTNER`.** Antes el flag
  vivía suelto dentro de `CREDENCIALES`. Con la Fase 9 la afiliación se publica en **dos**
  sitios (la casilla de la banda y el badge del destino Shopify) y además condiciona una
  frase: con dos flags sueltos, la web habría acabado diciendo una cosa arriba y otra
  abajo. Ahora los tres beben del mismo objeto.
- **La frase que hace convivir el badge con la independencia**, que era el riesgo real de
  la fase: *"Somos Shopify Partner y aun así, si tu operación no lo pide, te vamos a decir
  que no migres a Shopify."* La escribe `script.js`, no el HTML, porque **depende del
  flag**: apagado, se reescribe sola sin mencionar un programa que no existe.
- **El sello SUNAT y la fila de pasarelas no se tocaron.** Siguen cerrando la sección.
- **Cache busting a `?v=17`** en `index.html` y en las tres páginas legales de la raíz.

**El fallo que solo se ve midiendo: la cuarta tarjeta que sobra**

Los 4 destinos nacieron con el `auto-fit` de siempre. Medido: en un contenedor de 1240 px
**no caben cuatro columnas de 280** (4×280 + 3×32 = 1216 > 1160 útiles), así que a 1440 px
salían **tres** y el cuarto destino caía solo en una segunda fila. No dibujaba ninguna raya
huérfana —el fallo de la Fase 8— pero se leía como si sobrara. Se declararon las columnas
**1 / 2 / 4** con los mismos cortes que la banda de credenciales (640 y 1200 px). La regla
de `DISENO.md` § 9 se amplió: **si el número de tarjetas es fijo y conocido, declarar las
columnas sale más barato que pelearse con el `minmax`.**

La matriz de 12, en cambio, se quedó con `auto-fit` y está bien: 12 es divisible por 1, 2,
3 y 4, que son las únicas cuentas de columna que ese `minmax` puede dar. **Nunca deja fila
incompleta.**

**Verificado** (midiendo el DOM, que en esta página es más fiable que la captura)

- **375 / 768 / 1024 / 1200 / 1440 px**: scroll horizontal **0 px** en los cinco y **0
  elementos desbordando**.
- **Matriz**: 1 / 2 / 3 columnas según ancho, **siempre en filas completas**, con altura
  idéntica dentro de cada fila en los cinco anchos. **Destinos**: 1 / 2 / 4, una sola fila
  desde 1200 px.
- **El interruptor, probado apagándolo de verdad** (como el badge de la Fase 3 y el
  WhatsApp de la Fase 5): con `activo: false` los badges de destino pasan a **0**, la banda
  baja de **4 casillas a 3**, la frase de independencia se reescribe sola y **"Shopify
  Partner" desaparece de toda la página**. Revertido a `true`.
- **Cero apariciones de "Plus Partner" y "Select Partner"** en la página con el flag
  encendido.
- **Contraste AA** calculado componiendo el alfa sobre el fondo real: los **16 textos
  nuevos pasan**, el más bajo a 6,04:1 (el badge cian sobre `--accent-soft`).
- Sin errores de consola nuevos (siguen los `lang-toggle-btn not found!` del backlog nº 13).

**Lo aprendido**

- **`getComputedStyle` en el panel va un recálculo por detrás cuando se recarga el CSS en
  caliente.** Al reescribir el `href` del `<link>` para saltarse la caché, las lecturas de
  color siguieron devolviendo los valores *anteriores*: `.migracion-caso` salía en blanco
  con fondo transparente y parecía que `var(--accent)` no resolvía. Se persiguió durante
  varias sondas un fallo de CSS **que no existía**. Lo delató una prueba tonta: poner
  `color: red` en línea y leer **cian**. La regla: **para medir color hay que recargar el
  documento de verdad, no solo la hoja.** Es la quinta variante de la trampa de caché de
  las fases 1, 3, 5, 8 y 11.
- **Recargar con `location.href = …?bust=` tampoco basta en este panel**: devuelve el DOM
  que ya estaba, mutaciones de consola incluidas. Hay que navegar con la herramienta y
  `force`. Y `script.js` se sirve cacheado aunque el documento se recargue: para probar un
  cambio de JS hay que **cambiarle el `?v=` en el HTML**.
- **Un recorrido de reglas CSS que use `if (r.cssRules)` para detectar `@media` no
  encuentra nada.** Chrome soporta anidamiento, así que **toda** `CSSStyleRule` tiene un
  `cssRules` vacío y la condición se traga todas las reglas normales. Hay que comprobar
  `r instanceof CSSMediaRule`. Dos sondas de este chat devolvieron listas vacías por eso y
  parecía que las reglas no estaban en la hoja.
- **La honestidad tenía aquí un riesgo de diseño, no de copy.** Lo fácil era poner
  "Shopify" como destino de los 12 orígenes: es la plataforma que Luis domina y donde tiene
  el partner. Habría contradicho la frase de cabecera de la propia sección y borrado la
  única diferencia con el competidor. Los destinos se escribieron **condicionales a
  propósito** ("Shopify o WooCommerce, según cuánto SEO haya que conservar"), y el caso de
  WooCommerce lento dice directamente que **muchas veces no hay que cambiar de plataforma**.

### Detalle de la Fase 8 — proceso y credenciales (2026-07-21) ✅

**Backup previo:** `Backup/21-07-fase8/` (`index.html`, `script.js`, `styles.css`).

**La decisión de Luis:** **3 servicios, no 6** (pendiente nº 13, cerrado). `#servicios` no
se tocó. Queda un comentario en el HTML avisando de que no se añadan tarjetas sin decisión
suya, porque la tentación de igualar las 6 del competidor va a volver.

**Qué se hizo**

- **Banda de credenciales** (`#credenciales`), pegada al hero, desde el array
  `CREDENCIALES`. Las cuatro casillas son **capacidades verificables desde fuera**, no
  resultados de negocio: Shopify Partner · migración headless → Shopify OS 2.0 ·
  España · Perú · SUNAT e IGV integrados. **Ni un porcentaje, ni una facturación, ni un
  número de clientes, ni años de trayectoria** (CLAUDE.md § 6.3). Cada entrada lleva un
  campo `verificable` que no se dibuja: es la nota de por qué esa casilla es honesta,
  para quien edite el array dentro de seis meses.
- **Interruptor de apagado**, igual que el badge de partner de la Fase 3: la casilla de
  Shopify lleva `activo: true`. Si el alta resultara no estar activa (pendiente nº 8), se
  pone en `false` y **la casilla desaparece sola**, sin tocar HTML.
- **`#proceso`, seis pasos** desde el array `PROCESO`. Cada uno con título, qué pasa y el
  entregable. Reordenar o añadir un paso es tocar el array; el HTML no contiene ni un
  texto del proceso. La numeración `01…06` la escribe el render con `padStart` y va
  `aria-hidden`: el orden real lo da el `<ol>`.
- **El puente entre los 6 pasos y las 3 fases.** Los pasos 1, 3 y 4 dibujan un chip cian
  ("Fase 1/2/3 de servicios") que **enlaza a `#servicios`**; los otros tres no llevan
  nada. Es lo que evita el riesgo real de la fase: que se lean como dos ofertas
  distintas. Refuerzo en el pie de la sección, en una línea.
- **Las redirecciones 301 se nombran explícitamente en el paso 3.** Perder el SEO es el
  miedo número uno de quien migra y casi ninguna agencia lo dice.
- **Home reordenada a 12 secciones**, según la tabla de la Parte C: hero → credenciales →
  problema → proceso → servicios → casos → stack-crm → migración → blog → nosotros →
  auditoría → contacto. **`#casos` subió por delante de `#stack-crm`**: la prueba de que
  el trabajo está hecho pesa más que el catálogo de herramientas.
- **Hueco del blog reservado y oculto** con `hidden`. Funciona porque la Fase 5 dejó la
  regla global `[hidden]{display:none!important}`. La Fase 10 solo tiene que quitar el
  atributo y llenar `#blog-grid`.
- **Rejilla de logos de clientes: no se dibuja.** Ocupa el puesto 3 en forma de comentario
  y nada más. Con un logo real y tres huecos se lee peor que sin rejilla (§ 6.2).
- **Menú actualizado** al orden real de la página. Entró "Proceso" y **salió "Inicio"**,
  que repetía el destino del logo. El intercambio es neutro de ancho: el hueco entre logo
  y menú a 1280 px pasó de 120 a **124 px**, así que la hamburguesa sigue apareciendo
  donde ya aparecía (≤1200 px) y no hizo falta tocar ese corte.
- **El botón "Ver cómo trabajamos" del hero** ya no baja a `#servicios` sino a `#proceso`,
  que es literalmente la sección "Cómo trabajamos".
- El `scroll-margin-top` **no hubo que tocarlo**: la Fase 11 lo dejó en un selector
  global `section[id]`, así que las dos secciones nuevas lo heredaron.
- **Cache busting a `?v=16`** en `index.html` y en las tres páginas legales de la raíz.

**El fallo que solo se ve midiendo: la raya huérfana de la banda**

La banda separa sus casillas con un borde vertical, y nació con el `auto-fit` que usa el
resto del sitio. **A 768 px `auto-fit` da tres columnas para cuatro casillas**: la cuarta
queda huérfana abajo y **la tercera dibuja una raya vertical suelta contra el margen**,
porque abre fila y no tiene nada a su izquierda. Se corrigió declarando las columnas
(**1 / 2 / 4, nunca 3**) y haciendo los separadores exactos con `:nth-child`. La regla
general quedó escrita en `DISENO.md` § 9:

> **Si la sección separa con `gap`, `auto-fit`. Si separa con borde, columnas explícitas.**

**Verificado** (midiendo el DOM, que en esta página es más fiable que la captura)

- **375 / 768 / 1024 / 1199 / 1200 / 1280 / 1440 px**: scroll horizontal **0 px** en los
  siete y **0 elementos desbordando**.
- **Banda**: 1 columna a 375, 2×2 de 640 a 1199, 4 en fila desde 1200. Bordes dibujados
  por casilla en cada ancho: `- T T T` · `- L T LT` · `- L L L`. **Ninguna raya huérfana.**
  Alturas idénticas dentro de cada fila en los siete anchos.
- **Proceso**: 3 columnas × 2 filas en escritorio, 2×3 a 768, 1×6 a 375. Las tarjetas de
  una misma fila, con altura idéntica en todos los anchos.
- **Orden de las 12 secciones** leído del DOM: coincide con la tabla de la Parte C.
- **Blog**: `offsetParent === null`, o sea oculto de verdad, no solo transparente.
- **Contraste AA** calculado sobre el fondo real compuesto de cada elemento: los **10
  textos nuevos pasan**, el más bajo a 6,19:1 (el chip cian sobre `--accent-soft`).
- Sin errores de consola nuevos (siguen los `lang-toggle-btn not found!` del backlog nº 13).

**Lo aprendido**

- **La ficha de la fase se contradecía a sí misma.** La Parte A decía poner `#proceso`
  "entre `#servicios` y `#stack-crm`" y la tabla de la Parte C lo pone en el puesto 5,
  **antes** de `#servicios`. Se hizo según la Parte C —es la tabla de orden y la que cita
  el criterio de terminado— y además se lee mejor: primero cómo se trabaja, después qué
  se compra. **Anotado en la ficha para que nadie lo "corrija".**
- **Un medidor de contraste que no compone el alfa miente, y miente hacia el lado
  tranquilizador.** Las tarjetas del proceso usan `--bg-subtle`, que es blanco al 3 %.
  La primera sonda lo leyó como blanco opaco y devolvió ratios de **1,00** para media
  sección: parecía un fallo grave de accesibilidad y no lo era. Hay que componer **todas**
  las capas semitransparentes hasta el fondo opaco antes de calcular nada.
- **El panel de vista previa no recarga el CSS al renavegar con `?bust=`.** El `?v=` del
  `<link>` no había cambiado dentro de la misma sesión, así que siguió sirviendo la hoja
  vieja y la corrección de la banda "no hacía efecto". Se fuerza reescribiendo el `href`
  del `<link>` con un parámetro nuevo. Es la trampa de caché de las fases 1, 3, 5 y 11,
  ahora en su cuarta variante.
- Sigue valiendo lo de siempre: **el panel no hace scroll**, así que los `.fade-in-up`
  salen en `opacity: 0` y la página parece rota. Forzar `.visible` por consola antes de
  medir nada.

### Detalle de la Fase 11 — sistema de diseño (2026-07-21) ✅

**Backup previo:** `Backup/21-07-fase11/` (`styles.css`, `index.html` y las tres
páginas legales de la raíz).

**Las dos decisiones de Luis**

1. **Una sola familia: Outfit.** Inter queda descartada. `--font-body` existe igual y
   apunta a `--font-display`, así que meterla algún día es cambiar una línea.
2. **Fondo navy `#0a0f1a`** en lugar del negro puro `#0a0a0a`, como decía `DISENO.md`.

**Qué se hizo**

- **62 variables en `:root`**, en el orden del documento (tipografía → color →
  espaciado → formas → movimiento). Verificado en el navegador: **ninguna resuelve
  vacía**.
- **La jugada que hizo barato el cambio: una capa de alias.** Los nombres viejos
  (`--bg-color`, `--surface-color`, `--text-color`, `--border-color`, `--accent-color`,
  `--font-main`, `--container-width`) **no se renombraron**: ahora apuntan a los tokens
  nuevos. Con eso **las ~3.400 líneas heredadas adoptaron la paleta sin tocar un solo
  selector**, incluidas las páginas legales. Documentado en `DISENO.md` § 8.
- **Escala tipográfica fluida** aplicada con `clamp()`. Medido: el h1 va de **44 px a
  375 px** hasta **80 px a 1440 px**, solo, sin *media queries*.
- **Se retiraron los `font-size` fijos de las `@media`** que congelaban el h1 en
  2,5 rem y el h3 de las tarjetas en 1,3 rem: peleaban contra `clamp()`.
- **Tracking e interlínea** por nivel. Medido: h1 `-2,4px`, h2 `-0,8px`, h3 `-0,48px`,
  rótulos `+0,96px`. Es lo que más se nota de toda la fase.
- **Párrafos a `--text-muted` (66 %), no a blanco puro.** Contraste medido **8,6:1**.
  `--text-faint` (pies) da **4,5:1**: pasa AA, pero justo — avisado en `DISENO.md`.
- **Ritmo vertical único** con `--section-y`: 128 px en escritorio, 64 px en celular.
  Antes había `100px`, `80px` y `50px` sueltos.
- **Contenedor a 1240 px** (era 1200) con `--container-x` lateral fluido.
- **Ancho de lectura** a `--measure` (65ch) en los nueve sitios donde hay prosa.
- **`prefers-reduced-motion: reduce`** añadido, con el matiz que importa: además de
  anular transiciones, **fuerza `.fade-in-up` a visible**. Sin eso, quien tiene el
  ajuste activado se habría quedado con media home en `opacity: 0`.
- **`--transition` dejó de ser `all 0.3s ease`** y lista solo propiedades baratas.
  Y la etiqueta "👆 Click para ver más" de las tarjetas de servicio dejó de animar
  `bottom` (repintado) y pasó a `transform`. Se ve igual.
- **Cache busting a `?v=15`**, y **añadido por primera vez a las tres páginas legales
  de la raíz**, que enlazaban `styles.css` a pelo. Con el cambio de paleta, sin eso
  Luis habría visto una mezcla de colores viejos y nuevos.

**El duplicado que se cargó las primeras ediciones**

`styles.css` tenía el bloque de **pie + animaciones duplicado byte a byte** (líneas
~579-668 y ~802-891, deuda de la triplicación). Al ir después, **la copia de abajo
pisaba a la de arriba**: se migró el pie, se recargó y no cambiaba nada. Se retiró la
copia — las reglas eran idénticas, así que **no cambia nada de aspecto**.

⚠️ **Quedan otros duplicados sin tocar**: el modal de servicio y un `@media (768px)`.
Son inofensivos hoy, pero **la próxima vez que un cambio de CSS "no haga efecto",
buscar primero si el selector está duplicado más abajo.**

**Verificado** (midiendo el DOM, que en esta página es más fiable que la captura)

- **375 / 768 / 1024 / 1440 px**: scroll horizontal **0 px** en los cuatro y **0
  elementos desbordando**.
- **Tarjetas alineadas** en `#problema`, `#servicios` y `#auditoria` en los cuatro
  anchos: todas las de una misma fila con altura idéntica.
- Contraste AA calculado sobre el fondo real de cada elemento: **los 14 textos pasan**.
- Página legal (`politica-privacidad.html`): fondo navy, sin scroll horizontal.
- Sin errores de consola nuevos (siguen los dos `lang-toggle-btn not found!` del
  backlog nº 13).

**Lo aprendido**

- **El clamp() del hero asustaba y no era para tanto.** `--fs-display` sube a 5 rem y
  parecía que a 375 px el titular iba a comerse la pantalla. Medido: **4 líneas,
  185 px**. La regla útil es medir la altura del bloque, no el `font-size`.
- **`max-width: 65ch` sin `margin-inline: auto` descoloca los textos centrados**: la
  caja se queda a la izquierda dentro de una sección centrada. Los dos siempre juntos.
- **Un cambio de paleta obliga a mirar los `rgba()` escritos a mano.** El velo del
  vídeo del hero y el header translúcido llevaban `rgba(10,10,10,…)`: se habrían
  quedado en negro sobre un fondo navy. De ahí sale `--bg-rgb`.
- La lección de fases anteriores sigue valiendo: **el panel de vista previa no hace
  scroll**, así que los `.fade-in-up` salen en `opacity: 0` y la página parece rota.
  Hay que forzar `.visible` por consola antes de mirar nada.

### Bloque 8-11: rediseño a partir del competidor (2026-07-21)

**Backup previo:** `Backup/21-07/` — sitio completo, `docs/` y `CLAUDE.md`.
Se excluyeron a propósito: `Videos/` (sin cambios desde enero, ya está en
`Backup/18-03/`) y `hostinger-recovery-codes.txt` (backlog 🔴 2: no tiene sentido
propagar esos códigos a otra carpeta más).

**Qué originó el bloque.** Luis mandó https://cluster.global/ preguntando si la home de
Nouweb podía llegar a ese nivel. Resultó no ser solo una referencia estética: **es un
competidor directo** — agencia Shopify-exclusive, LatAm, especializada en migraciones
VTEX y Magento → Shopify Plus, con clientes peruanos (Incalpaca, Kuna, Dermotienda).
Ficha completa en [`COMPETENCIA.md`](COMPETENCIA.md).

**El hallazgo que condiciona todo el bloque.** La home de Cluster no gana por diseño,
gana por sus credenciales publicadas (2,88 % conversión · $48 M · 10 años · 10+ marcas).
Nouweb ya coincide en **7 de 9 secciones** y en el acabado oscuro. Lo que no tiene son
las cifras, y **no se inventan** (§ 6.3). Por eso la Fase 8 convierte la banda de
métricas en una banda de **capacidades verificables**: copiar el formato con los
casilleros vacíos sería peor que no ponerla.

**Decisiones nuevas de Luis (2026-07-21)**

- **Proceso de 6 pasos**, como Cluster. Las 3 fases de `#servicios` se quedan: son *qué
  se compra*; los 6 pasos son *cómo se trabaja*. Cluster tiene ambas cosas.
- **Blog**, que él irá alimentando. Sin build ni CMS: HTML por artículo + índice desde
  array. Ver el porqué en `FASE-10`.
- **Shopify Partner**, declarado por Luis. ⚠️ Se publica **"Shopify Partner"** a secas,
  nunca **"Shopify Plus Partner"** (programa distinto, selectivo, el que probablemente
  tiene Cluster). Pendiente nº 8: confirmar el alta.
- **WooCommerce vuelve como destino de migración.** Se había quitado el 2026-07-20 a
  petición suya y vuelve a entrar el 2026-07-21. **No es un error: es un ida y vuelta
  deliberado.** No "corregirlo" en un chat futuro.
- **5 orígenes de migración nuevos**: Tiendanube/Nuvemshop, Jumpseller, Wix/Squarespace,
  BigCommerce y **solo-marketplace** (Mercado Libre, Falabella, Ripley). El último es el
  más peruano y probablemente el de mayor mercado.

**Lo que no se hizo y por qué.** Ningún archivo del sitio se tocó: esto fue planificación
y arnés.

### Segundo encargo del 2026-07-21: tipografía y diseño

Luis pidió además **"casi la misma estructura, tipo de letra y diseño"**. Tres cosas:

1. **Creado [`DISENO.md`](DISENO.md)**, el sistema de diseño completo: familias, escala
   fluida con `clamp()`, tracking, interlínea, color, escala de espaciado, formas y
   movimiento. A partir de ahora **ningún valor de CSS se pone a ojo**.
2. **La antigua Fase 11 se dividió en dos**, y el orden de ejecución cambió a
   **11 → 8 → 9 → 10 → 12**. Fijar los tokens *antes* de montar las secciones nuevas
   evita tener que repasarlas después. El ajuste fino sigue yendo el último (Fase 12),
   porque eso sí depende del contenido definitivo.
3. **La Fase 8 gana una Parte C**: reordenar las secciones para que la home siga el mismo
   recorrido que Cluster. Casi todo el contenido ya existe — es mover bloques.

⚠️ **No se pudo leer el CSS de Cluster desde este entorno** (el panel del navegador sigue
sin red, igual que el 2026-07-20; el lector de páginas descarta las hojas de estilo). Los
valores de `DISENO.md` **no son los suyos**: son un sistema que produce el mismo efecto.
`DISENO.md` explica cómo sacar su tipografía exacta con las herramientas de Chrome, en 30
segundos, si Luis la quiere.

**Hallazgo lateral:** entre los assets de Cluster aparece `Badge_Select_wht_transp.svg`
— el badge de **Shopify Select Partner**, un nivel selectivo. Refuerza el aviso de la
Fase 9: Nouweb publica "Shopify Partner" a secas, nunca "Plus" ni "Select".

**Decisión abierta para Luis:** ¿3 servicios o 6? Cluster muestra 6. La recomendación es
quedarse en 3 (es la columna vertebral del posicionamiento y los 6 pasos del proceso ya
comunican amplitud). Está detallado en `FASE-8` § Parte C.

### Cabecera y precios (2026-07-20, segundo lote de Luis)

- **Sin precios en la web.** Luis pidió no publicar ningún precio. Se quitó el campo
  `precioDesde` de `CONTACTO`, el `<p id="auditoria-precio">` de `#auditoria` y el bloque
  que lo dibujaba en `script.js`. **Esto anula el último pendiente de la Fase 5** (ya no
  hace falta el precio "desde"). El sello SUNAT sí conserva "precios en soles (S/) e IGV
  18%", que describe cómo factura la tienda del cliente, no una tarifa de Nouweb.
- **"Precios" fuera del menú de `/es`.** Era el header de la captura que mandó Luis. Ojo:
  `/es/index.html` es la **página vieja de agencia** (Diseño Web, Proceso, Casos de Éxito…),
  congelada hasta las fases 6/7 y que **redirige 301 a la raíz**. La home real (la raíz) no
  tiene "Precios". Solo se quitó el enlace del menú; el resto de `/es` no se tocó.
- **Logo grande y dentro del header.** Primero estaba a `200px` en un header de `100px`
  y se salía 50px arriba y abajo. Luego Luis pidió agrandarlo (se veía pequeño) y **cambió
  el archivo del logo a uno apaisado** (natural 1130×340, ratio 3,3). Solución: se subió
  `--header-height` a **124px** y el logo a **90px de alto** (≈299px de ancho), con ~17px
  de aire arriba y abajo, y `flex-shrink: 0` para que **nunca se comprima**. En móvil
  (≤600px) el logo apaisado no cabía con el padding de 50px, así que ahí baja a **64px**
  (≈213px) y el padding lateral a **20px**. Letras del menú subidas a **1,05rem**.
- **Hamburguesa a ≤1200px.** Con el logo apaisado (299px) + el menú (~746px) la fila
  necesita ~1165px, así que por debajo de 1200 se montaría sobre el logo. El corte quedó
  alto **a propósito**: es el precio de un logo grande. Variante `has-lang-banner` incluida
  para que el desplegable caiga justo bajo el header. Las dos `@media(768px)` duplicadas
  (deuda del CSS triplicado) se quedan; redundantes pero inofensivas.
  ⚠️ **Tradeoff a saber:** con este logo, tablets y laptops estrechas (1024–1200px) ven la
  hamburguesa. Si Luis quiere el menú horizontal en más anchos, la única palanca es un logo
  más pequeño.
- Cache busting a **`?v=12`**.
- Verificado midiendo el DOM a 1280 / 700 / 375 px: logo dentro del header sin desbordar,
  horizontal a 1280 sin solape (logo acaba en 349, menú empieza en 469), hamburguesa desde
  1200, a 700 el logo grande no choca con la hamburguesa (280px de hueco), a 375 el logo
  baja a 213px y **no hay scroll horizontal**, sin precios en la página.

### Ronda de ajustes de Luis (2026-07-20, tras montar la Fase 5)

**Backup previo:** `Backup/20-07-fase5b/` (index.html, script.js, styles.css).

- **Logos de CRM + accesos directos.** Cada ficha de `#stack-crm` es ahora un enlace al
  sitio oficial del CRM (pestaña nueva, `rel="noopener nofollow"`) y muestra el logo de
  la marca sobre un chip blanco (los logos son de color y para fondo claro). El logo se
  sirve por dominio desde `logo.clearbit.com`. **Si un logo no carga, el `onerror` deja
  el nombre como wordmark**, así que la ficha nunca queda rota.
  ⚠️ **No verificable aquí:** el panel de vista previa y el Bash de este entorno están
  **sin red** (falla hasta el CDN de Font Awesome), así que en las pruebas los 8 salieron
  como wordmark. En producción cargarán los logos reales o caerán al wordmark, ficha por
  ficha. **Recomendación fuerte para un sitio de cliente:** self-hostear los logos en
  `Imagenes/crm/` (PNG/SVG) y apuntar ahí el campo `logo` del array. Ventajas: siempre
  cargan, sin depender de un tercero, y **sin filtrar la IP del visitante a Clearbit**
  (coherente con el énfasis en RGPD / Ley 29733). Es el plan original del pendiente nº 1.
  > ✅ **SUPERADO el 2026-08-10: se hizo exactamente eso, y no por elegancia.**
  > `logo.clearbit.com` **se apagó** y los 8 logos llevaban tiempo rotos en producción.
  > La recomendación de arriba estuvo escrita **veinte días** antes de que el riesgo que
  > describía se materializara tal cual. Ver § Detalle de la Fase 14, sesión 2.
- **Migración `#migracion-ecommerce`:** en la columna **Hacia** se quitó WooCommerce y
  entró *"Shopify headless y desarrollo a medida, cuando el proyecto lo amerita"*.
  WooCommerce se mantiene en la columna **Desde** (es un origen real de replatforming).
- **Moneda a soles (S/).** El sello SUNAT y el precio "desde" de la auditoría pasan de
  USD a soles. Se actualizó también `CLAUDE.md` §§ 4 y 8 para que no se revierta en un
  chat futuro. Decisión de Luis.
- **Caso Misako, con datos reales y corregido a España** (era "Perú"). Contexto: marca
  líder en España en bolsos, maletas, mochilas y complementos. Problema: tienda headless
  en otra plataforma con muchos bugs e inventario que no cuadraba. Qué se hizo: migración
  de ese headless a Shopify OS 2.0. Resultado: 9/10 en UX y 9,5/10 en responsive.
  **Se retiran los dos `{{PENDIENTE}}` del caso** → esto **cierra el bloqueo de la Fase 4**.
  ⚠️ Nota de honestidad (§ 6.3): la puntuación 9 / 9,5 la aportó Luis; **no dice quién la
  midió** (¿auditoría propia, herramienta, cliente?). Si un comprador lo pregunta, conviene
  poder respaldarlo. Si prefieres, se matiza el origen en una frase.
- **Enlace "Contacto" en el menú → `#contacto`** (el formulario). El root no tenía ninguno;
  el icono de persona sigue siendo **Acceso Clientes** (login), no lo toqué. ⚠️ Si lo que
  querías era que *ese icono* llevara al formulario, dímelo: es un cambio de una línea.
- **SEO:** añadido JSON-LD `ProfessionalService` (nombre, logo, contacto, `areaServed`
  PE+ES, idiomas, servicios). Verificado que el JSON parsea. Un solo `<h1>`, `title` y
  meta description ya estaban bien de la Fase 2.
- Cache busting a **`?v=9`**.
- Verificado (con la red bloqueada, midiendo el DOM): rejilla CRM 4 col escritorio / 2 col
  a 375 px, chip blanco bien dimensionado, sin scroll horizontal a 375 ni a 1012, JSON-LD
  válido, fichas convertidas en `<a>`, caso Misako sin marcadores, sin errores de consola
  nuevos.

### Detalle de la Fase 5 (parcial)

**Backup previo:** `Backup/20-07-fase5/` (index.html, script.js, styles.css).

**Qué se hizo**

- **`#auditoria` escrita entera.** Tres tarjetas de "qué incluye" concretas —revisión de
  la tienda (velocidad, checkout, celular, pasarelas), mapa de procesos (del pedido en
  WhatsApp a la boleta SUNAT) y recomendación de CRM con su costo mensual—, más el
  entregable ("una videollamada y un documento con los hallazgos priorizados").
  Se retiró el `stack-placeholder` de la Fase 1.
- **La frase que filtra** va destacada con borde de acento, no escondida en un párrafo:
  *"gratuita para negocios con intención real de implementar, ahora o a mediano plazo"*.
  Es la que evita que Luis acabe ahogado en curiosos.
- **Un solo interruptor para toda la conversión:** el objeto `CONTACTO` en `script.js`
  (`whatsapp`, `precioDesde`, `mensaje`). Rellenar esos dos campos enciende de golpe los
  tres CTA, el bloque de `#contacto` y el botón flotante. **No hay que tocar HTML ni CSS.**
- **Degradación honesta mientras falten los datos** (criterio 3 de la fase: ningún
  `{{PENDIENTE}}` en producción). Con `whatsapp: null` los CTA bajan al formulario, que
  sí funciona hoy, y el botón flotante y el bloque de WhatsApp no se dibujan. Con
  `precioDesde: null` no se publica ninguna cifra. La página es publicable así.
- **Probado de verdad**, igual que el badge de partner en la Fase 3: se puso
  `whatsapp: '51987654321'` y `precioDesde: 2500`, se recargó, y los tres CTA pasaron a
  `wa.me` con el mensaje prerrellenado y `target="_blank"`, el flotante y el bloque
  aparecieron y el precio se escribió solo. `precioDesde` se revirtió a `null`.

**Decisión sobre el número (Luis, 2026-07-20): se usa el español, de momento**

`CONTACTO.whatsapp = '34614942732'`, el mismo número que ya estaba en el pie. Los tres
CTA y el flotante están **activos en producción**.

Esto **no contradice** `CLAUDE.md` § 8, pero conviene entender por qué. Lo que esa regla
prohíbe es poner el +34 como CTA **de teléfono**: la llamada internacional le cuesta
dinero al cliente peruano. Por WhatsApp ese costo no existe, es gratis desde cualquier
país. El único inconveniente que queda es de percepción —el número se ve extranjero— y
se compensa de dos formas: el pitch de "peruano radicado en España" y una línea en
`#contacto` que lo dice antes de que el cliente lo piense (*"el número es español porque
Luis vive allá, pero por WhatsApp no te cuesta nada escribir desde Perú"*).

Cuando el volumen lo justifique, un número virtual de Lima cuesta ~5 USD/mes: se cambia
esa línea de `CONTACTO` y se propaga solo a los cuatro sitios.
- **Formulario de calificación**: dos `<select>` obligatorios, `plazo` (Ahora / En 3-6
  meses / Solo explorando) y `pedidos` (<100 / 100-500 / +500). Van antes del mensaje
  para que se respondan, y viajan en el correo de Formspree.
- **Ley 29733** peruana añadida junto al RGPD, en el modal de consentimiento y en una
  nota corta bajo el formulario. El RGPD sigue aplicando porque Luis está establecido
  en España; la 29733 se suma por el mercado.
- El **+34 se queda solo en el pie**, como estaba. No sube a ningún CTA.
- Cache busting subido a **`?v=6`** en `styles.css` y `script.js`.
- Verificado en navegador: 3 tarjetas, 0 `{{PENDIENTE}}` en `#auditoria` y `#contacto`,
  sin scroll horizontal a 375 px ni a 1012 px, el borde de la frase filtro resuelve a
  `rgb(6,182,212)` (la variable, no un valor a ojo) y sin errores de consola nuevos.

**Lo que falta para cerrar la fase**

Los dos datos de Luis, pendientes nº 4 y nº 5. Se escriben en `CONTACTO` y la fase
cierra. El criterio 1 ("el CTA de WhatsApp funciona desde móvil") **solo se puede
comprobar de verdad con el número real**: hay que abrirlo desde un celular una vez.

**Lo aprendido**

- **El panel de vista previa no recarga con `location.reload()`**: siguió sirviendo
  `styles.css?v=5` y el CSS nuevo parecía no existir. Hay que renavegar con un
  parámetro distinto (`index.html?bust=N`). Es la misma trampa de caché de las fases 1
  y 3, ahora también en la herramienta.
- **`window.innerWidth` vale 0** en el panel hasta que se fija el tamaño con
  `resize_window`. Cualquier medida de desbordamiento antes de eso es basura: da
  "hay scroll horizontal" en una página que no lo tiene.
- Se añadió una regla global `[hidden] { display: none !important }` al final de
  `styles.css`. Sin ella, cualquier `display: flex` de una clase le gana al atributo
  `hidden` y los bloques de WhatsApp se verían aunque no haya número.
- **El flotante de WhatsApp chocaba con el banner de cookies a 375 px.** El banner tiene
  `z-index: 10000` y en celular ocupa toda la franja de abajo: el flotante quedaba
  atrapado detrás, sin poder pulsarse, y justo en la **primera visita**, que es cuando
  llega un cliente nuevo. Se arregló **sin tocar la lógica de cookies**: el flotante se
  movió en el HTML a *después* del banner y una regla de hermano
  (`#cookie-banner.show ~ .whatsapp-float`) lo esconde mientras el banner está arriba.
  ⚠️ **Si alguien vuelve a subir el flotante en el HTML, el bug reaparece.** Está
  avisado en un comentario junto al elemento.
- Solo se ve midiendo el solape con `getBoundingClientRect()`; a simple vista y sin
  banner el flotante parece perfecto. Vale la pena repetir esa medición cada vez que se
  añada algo fijo abajo.

### Detalle de la Fase 4 (parcial)

**Backup previo:** `Backup/20-07-fase4/` (index.html, script.js, styles.css).

**Qué se hizo**

- **`#casos`** se monta entero desde el array `CASOS` de `script.js`, igual que
  `#stack-crm`. El HTML ya no contiene ninguna marca ni el placeholder de la Fase 1.
  Añadir un caso nuevo = añadir un objeto al array.
- **Caso Misako** con el formato acordado **contexto → problema → qué se hizo →
  resultado**, en una `<dl>` con los cuatro rótulos en cian.
- **Huecos vacíos: no se renderizan.** El array tiene un solo objeto y sale una sola
  tarjeta. Nada de "próximamente" ni tarjetas fantasma. La rejilla usa
  `auto-fit` con `minmax(320px, 1fr)`, así que con un caso único la tarjeta ocupa el
  ancho completo en vez de dejar dos huecos al lado.
- **Dos campos quedan como marcador visible** `{{PENDIENTE}}`, con la clase
  `.caso-pendiente` (monoespaciada y con borde discontinuo) para que canten si alguien
  publica sin rellenarlos: el **problema** que motivó la migración y el **dato duro**
  del resultado. Ninguna cifra inventada, según `CLAUDE.md` § 6.3.
- **Logo de Misako:** `logo: null`, así que se dibuja el nombre en texto igual que en
  los CRM. El archivo se pone en el array cuando exista **y** Luis confirme el permiso
  por escrito (pendiente nº 7).
- Cache busting subido a **`?v=5`** en `styles.css` y `script.js`.
- Verificado en navegador: 1 tarjeta, 0 tarjetas fantasma, 2 marcadores pendientes
  visibles, sin scroll horizontal a 375 px ni a 1012 px, y el color de los rótulos
  resuelve a `rgb(6,182,212)` (la variable de acento, no un valor a ojo).

**Lo que falta para cerrar la fase**

Los puntos 1 y 3 del criterio de terminado dependen de Luis: el **dato duro** y el
**problema** del caso. Con eso se rellenan dos campos del array y la fase cierra. **No
hay que tocar HTML ni CSS.** El logo es opcional: el caso funciona sin él.

**Lo aprendido**

- **El panel de vista previa no hace scroll** (`window.scrollY` se queda en 0), así que
  el IntersectionObserver no dispara y **los 31 elementos `.fade-in-up` salen con
  `opacity: 0`**, incluido el hero. Parece que la página está rota y no lo está. Para
  inspeccionar hay que forzar `.visible` por consola. No confundirlo con el bug real de
  ordenación del observer que se anotó en la Fase 3.
- El `screenshot` del panel agota el tiempo de espera en esta página. Medir el DOM por
  `javascript_tool` es más fiable y más rápido para verificar maquetación.

### Detalle de la Fase 3 (parcial)

**Backup previo:** `Backup/20-07-fase3/` (index.html, script.js, styles.css).

**Qué se hizo**

- **`#stack-crm`** se monta entero desde el array `CRMS` de `script.js`. El HTML no
  contiene ninguna marca. Los 8 CRM en el orden acordado, con **Kommo y HubSpot
  destacados** y una nota corta bajo cada uno ("WhatsApp primero" / "El estándar del
  mercado").
- **Badge de Partner**: solo se dibuja con `partner: true`. **Probado de verdad**: se
  puso Kommo en `true`, se recargó, apareció exactamente 1 badge en la ficha de Kommo
  sin tocar el HTML, y se revirtió. Hoy los 8 están en `false` y no hay ningún badge
  visible. El único texto con la palabra es el puente del pie, que dice "en proceso".
- **`#migracion-ecommerce`** escrito completo: columna **Desde** (Magento 1 y 2,
  PrestaShop antiguo, WooCommerce lento, desarrollos a medida huérfanos) → columna
  **Hacia** (Shopify con OS 2.0 nombrado explícitamente, VTEX, WooCommerce actual).
- **Sello SUNAT** destacado, con IGV 18% y USD. Y la fila de pasarelas locales:
  Niubiz, Izipay, Culqi, Mercado Pago, Yape y Plin.
- Verificado: 8 fichas, 0 badges, sin scroll horizontal a 375 px ni a 1012 px, rejilla
  a 4 columnas en escritorio y 2 en celular, flecha de migración rotada en vertical.

**Lo que falta para cerrar la fase**

Solo el punto 3 del criterio de terminado: **los archivos de logo**. Mientras `logo`
sea `null`, cada ficha dibuja el nombre de la marca como wordmark. Es un estado digno
y publicable, no un placeholder roto. Para cerrarla: dejar los PNG/SVG en
`Imagenes/crm/` y poner la ruta en el campo `logo` de cada entrada del array. **No hay
que tocar HTML ni CSS.**

**Lo aprendido**

- **Se añadió cache busting**: `styles.css?v=4` y `script.js?v=4`. Durante esta fase el
  navegador sirvió un `script.js` viejo y la rejilla salía vacía sin ningún error en
  consola — costó un rato entender que no era un bug del código. Es el mismo problema
  que ya estaba anotado en la Fase 1, ahora resuelto de raíz.
  ⚠️ **Subir el número de `?v=` en cada publicación por FTP.**
- El acento del sistema de diseño es **cian `#06b6d4`**, no morado. Al escribir CSS
  nuevo, usar `var(--accent-color)` y no inventar un rgba a ojo.
- El render de CRM va **antes** del IntersectionObserver en `script.js`: las fichas se
  inyectan con `.fade-in-up` y tienen que existir en el DOM para que el observer las
  capte. Si se mueve, dejan de animarse.

### Detalle de la Fase 2

**Backup previo:** `Backup/20-07-fase2/` (index.html y script.js). Se usó carpeta
aparte porque `Backup/20-07/` guarda los originales **anteriores a la Fase 1** y no
debía sobrescribirse el mismo día.

**Qué se hizo**

- **Hero** reescrito con la dirección aprobada: *"Tu tienda online se quedó atrás. Tus
  pedidos viven en WhatsApp."* El gradiente cae sobre "viven en WhatsApp". El segundo
  CTA pasa a "Ver cómo trabajamos".
- **`#problema`**: los seis dolores reescritos. Se cambió "Todo vive en hojas de
  cálculo" por **"El stock vive en un Excel que nunca cuadra"** y "No sabes qué pasó
  con el cliente" por **"Nadie sabe cuántos clientes repiten"**, ambos de la lista
  aprobada en `FASE-2`. El subtítulo ahora califica: *"Si reconoces tres o más, la
  conversación vale la pena."*
- **`#servicios`**: convertido en recorrido. Titular *"Un recorrido de tres fases, no
  tres productos sueltos"*, cada tarjeta con un rótulo de posición (`Fase 1 · El punto
  de partida`) y una línea nueva **"Te llevas:"** con el entregable concreto. Cierra
  con un puente a la auditoría. Clases CSS nuevas: `.fase-salida` y `.servicios-nota`.
- **`#nosotros`**: pitch aprobado, con el matiz de los dos mercados y un párrafo nuevo
  de trato directo. Sin nombrar a la agencia empleadora.
- **SEO**: `<title>` ahora encabeza con el servicio y no con la etiqueta genérica.
  Meta description con WhatsApp, SUNAT y auditoría. Añadidos `keywords` y Open Graph
  con `og:locale = es_PE`.
- **`script.js`**: los tres bloques de `serviceData` ya estaban bien redactados desde
  la Fase 1; solo se retiró el marcador `{{PENDIENTE FASE 2}}`.
- Verificado en navegador: sin scroll horizontal a 375 px ni a 1012 px, las tres
  tarjetas de fase alineadas y el hero legible en móvil.

**Lo aprendido**

- Los rótulos de fase van en versalitas por CSS: cualquier texto de más de ~4 palabras
  rompe a dos líneas y desalinea las tarjetas. Se acortaron después de verlo en
  pantalla. **Regla: rótulo de fase ≤ 4 palabras.**
- El copy provisional de la Fase 1 aguantó mejor de lo esperado; el trabajo real de
  esta fase fue **subir la especificidad** (Excel de stock, clientes que repiten,
  entregable por fase), no reescribir de cero.

**Enganches dejados para fases posteriores**

- `index.html` hero: comentario `{{PENDIENTE FASE 5}}` en el primer botón — pasa a
  "Auditoría gratuita por WhatsApp" y a un enlace `wa.me` cuando llegue el número.

### Detalle de la Fase 1

**Backup previo:** `Backup/20-07/` (index.html, styles.css, script.js, .htaccess y `es/` completo).

**Qué se hizo**

- `/index.html` reescrito. Deja de ser el selector de idioma y pasa a ser la home en
  español peruano, con las 10 secciones en el orden acordado: `#hero`, `#problema`,
  `#servicios`, `#stack-crm`, `#migracion-ecommerce`, `#casos`, `#nosotros`,
  `#auditoria`, `#contacto`, `footer`.
- `#hero`, `#problema`, `#servicios` y `#nosotros` van con **copy provisional**
  marcado `{{PENDIENTE FASE 2}}`. Las secciones de las fases 3, 4 y 5 quedan
  maquetadas con un marcador visible `{{PENDIENTE FASE N: ...}}`.
- SEO: `<link rel="canonical">` a `https://nouweb.es/` y `hreflang` completo
  (`x-default` → `/`, `es` → `/`, `en` → `/en/`, `de` → `/de/`).
- `.htaccess`: **301 de `/es/` y `/es/index.html` → `/`**. Solo la home; las páginas
  legales de `/es/` se siguen sirviendo desde su carpeta.
- **Banner de idioma** (sin redirección automática): barra superior discreta que
  aparece solo si `navigator.language` no es español. La elección se guarda en la
  cookie `nw_lang_banner` durante 180 días.
- Assets unificados: la home enlaza **un solo** `/styles.css` y `/script.js`. Los
  estilos nuevos se añadieron al final de `/styles.css`.
- `/script.js`: añadidos los datos de modal de los tres servicios nuevos
  (`diagnostico`, `migracion`, `integracion`), la lógica del banner y dos correcciones
  (ver abajo).
- Verificado en navegador: sin scroll horizontal a 375 px ni a 1265 px, sin errores de
  consola nuevos, `hreflang` y canónica correctos, anclas del menú sin quedar tapadas
  por el header fijo.

**Dos bugs preexistentes corregidos de paso**

1. `script.js` reventaba con `languageModal is null` en cualquier página sin
   `#language-modal` (las tres legales de la raíz lo sufrían). Añadido el guard.
2. El modal de servicio inyectaba `<source src="undefined">` si el servicio no tenía
   vídeo. Ahora cae al icono del servicio.

**Lo aprendido**

- La raíz y `/es/` compartían `../styles.css`, así que la home nueva heredó todo el
  sistema de diseño sin tocar nada. La triplicación real está en `script.js`, no en el
  CSS: `/script.js` solo lo usaban las tres páginas legales de la raíz, por eso se pudo
  modificar sin riesgo para `/en` y `/de`.
- Al probar en local, el navegador cachea `styles.css` y `script.js` con fuerza.
  **Si al publicar no ves los cambios, es caché**: recarga forzada antes de dar nada
  por roto.

---

## Backlog aparcado — Seguridad del backend

Detectado en el análisis del 2026-07-20. **Fuera del alcance de las fases 1-7**, pero
no debe perderse. Luis decidió aparcarlo para centrarse en el index.

### 🔴 Crítico

1. **`backend/add_user.php` es un alta de usuarios pública y sin autenticación.**
   Cualquiera que visite la URL puede crearse una cuenta activa y entrar al dashboard.
   → Borrarlo del servidor o añadirle `require_once 'check_session.php'; requireAuth();`
2. **`hostinger-recovery-codes.txt`** — 9 códigos de recuperación MFA en texto plano en
   la raíz web, servidos públicamente, sincronizados en OneDrive y copiados en `Backup/`.
   → Considerarlos comprometidos, **regenerarlos en Hostinger** y borrar el archivo.
3. **`backend/create_admin.php:16`** — contraseña de admin en claro en el código.
   El `.gitignore` no protege nada porque **el proyecto no es un repositorio git**.
   → Cambiar la contraseña y borrar el archivo del servidor.

### 🟠 Importante

4. `config.php:43` — `session.cookie_secure = 0` mientras el `.htaccess` fuerza HTTPS.
   Debe ser `1`.
5. `login.php` — sin límite de intentos ni bloqueo por IP. Fuerza bruta trivial.
6. `add_user.php:141` — contraseña mínima de 6 caracteres. Subir a 10-12.
7. No existe flujo de cambio de contraseña, pese a que el código lo recomienda al
   cliente. La tabla `password_resets` existe en el SQL pero nadie la usa.
8. `init_db.sql` y `backend/README.md` son descargables públicamente.

### 🟡 Higiene

9. `styles.css.bak`, `test-idiomas.html`, `test-selector.html` — residuos en producción.
12. **`de/index.html:786`** — el selector de idioma manda "English" a `../index.html`,
    que desde la Fase 1 ya no es el selector sino la home **en español**. Enlace roto.
    Está dentro de `/de`, congelado hasta la Fase 7: **arreglar allí**.
13. `script.js` deja dos `console.error('lang-toggle-btn not found!')` en la home nueva,
    que ya no lleva el selector flotante. Ruido inofensivo; limpiar al desmontar el
    sistema de traducción viejo (Fase 6).
10. `Backup/` vive **dentro** del directorio del sitio: si se sube por FTP tal cual, se
    publican tres copias históricas completas, con los códigos de recuperación y la
    contraseña de admin incluidos. → Sacarlo fuera del proyecto.
11. Sin control de versiones. `git init` resolvería el problema de fondo.
14. **Selectores duplicados en `styles.css`** (deuda de la triplicación). En la Fase 11
    se retiró la copia del bloque de pie + animaciones, que pisaba a la original y
    dejaba muerta cualquier edición hecha allí. **Quedan al menos dos duplicados más:**
    el modal de servicio y un `@media (max-width: 768px)`. Hoy son inofensivos.
    ⚠️ **Síntoma a reconocer:** si un cambio de CSS "no hace efecto" y no es caché,
    buscar el mismo selector más abajo en el archivo.
15. **Las páginas legales de `/es/`** (`es/aviso-legal.html`, `es/politica-cookies.html`,
    `es/politica-privacidad.html`) enlazan `../styles.css` **sin `?v=`**. Las de la raíz
    ya lo tienen desde la Fase 11. No se tocaron porque `/es` está congelado hasta las
    fases 6/7: **añadirlo allí.**
16. **El blog crece a mano.** Publicar es editar `blog/blog.js` y `sitemap.xml` y subir
    dos archivos por FTP (`blog/README.md` lo explica). Va bien hasta unos **20-30
    artículos**; a partir de ahí, editar el array a mano cansa y el `sitemap.xml`
    empieza a desincronizarse solo. **Entonces —y no antes— toca reevaluar un generador
    estático** (11ty o Astro). Hoy no compensa: metería Node y un paso de build en un
    proyecto que no los tiene. Anotado en la Fase 10.
18. **`Videos/` pesa 226 MB y la home solo usa 2 archivos de ahí** (`videoprincipal.mp4`,
    1,74 MB, y `5495845-hd_1920_1080_30fps.mp4`, 3,79 MB). Los otros 17 son sobras de la
    web de agencia vieja, y hay tres de más de 20 MB (`videoprincipal1.mp4` son **41 MB**).
    **No afectan a la velocidad de la web** —nadie los descarga si nadie los enlaza— pero
    sí al tiempo de cada subida por FTP y al espacio del hosting. Antes de borrar nada hay
    que comprobar qué usan `/es`, `/en` y `/de`, que están congeladas: **varios de esos
    vídeos los enlazan los modales de servicio del `script.js` viejo.** Tarea de limpieza
    para después de las fases 6 y 7, no antes.
17. ✅ **`/blog/` no está traducido — RESUELTO por decisión, el 2026-07-22.** Los artículos
    nacen solo en español y **a propósito no declaran `hreflang` a `/en/blog` ni
    `/de/blog`**, que no existen. **Luis decidió que se quedan así**: el blog es una
    sección solo en español y `/en/` no la enlaza en su menú. **No hay nada que hacer.**
    Queda anotado para que ningún chat futuro lo "arregle" declarando un idioma que
    daría 404.
19. 🔴 **`/en/index.html` no declara `canonical` ni `hreflang`** (y `/de/index.html`
    tampoco). La raíz apunta a `hreflang="en" → /en/`, pero `/en/` no devuelve el apunte,
    y **`hreflang` sin reciprocidad Google lo ignora**: hoy no hay un grupo de idiomas,
    hay tres sitios sueltos de los que uno contradice a los otros. A `/es/` no le hace
    falta: el `.htaccess` manda su home con **301 a `/`**. → **`/en/` se arregla en la
    Fase 6 y `/de/` en la Fase 7**, que es cuando se reescriben.
20. 🔴 **404 vivo dentro de `/en/`**: el modal de consentimiento de `/en/index.html`
    (línea ~711) sigue en español y enlaza `politica-privacidad.html`, que en esa carpeta
    **no existe** — allí el archivo se llama `privacy-policy.html`. Mismo tipo de fallo
    que el 404 del blog de la Fase 10: **no se ve leyendo el código, solo pulsando.**
    → Fase 6.
21. 🟡 **`/en/` es la única carpeta de idioma sin hoja de estilos propia**: carga
    `../styles.css`, la de la raíz, **rehecha en las fases 11 y 12**, y encima sin `?v=`.
    Medido el 2026-07-22: fondo navy y Outfit ya aplicados, sin desbordes. O sea que la
    página vieja lleva puesto el diseño nuevo — **no parece rota, parece descuidada**, que
    se detecta peor. Se resuelve solo al reescribir `/en/` en la Fase 6.
22. ✅ **Las legales de la raíz escritas mirando solo a Perú — RESUELTO el 2026-08-10**
    (sesión 4). `aviso-legal.html` y `politica-cookies.html` nombran ya el **RGPD**, la
    **LOPDGDD** y la **AEPD**, y la política de cookies abre con su marco legal (art. 22.2
    de la LSSI-CE). Ni un dato inventado: todo estaba ya en `politica-privacidad.html`.
    ⚠️ **Y media frase de este aviso era FALSA, que es la lección que queda.** Decía que el
    aviso legal «tampoco cita la LSSI-CE»: **la cita tres veces** —el artículo 10 en el
    apartado 1, los artículos 11 y 16 en el 5, y el acrónimo en el 2—. El aviso se escribió
    midiendo, el 2026-08-09, y aun así no se sostenía. **Cerrar un punto del backlog empieza
    por volver a medirlo.** Un backlog que no se remide se convierte en folclore.
28. 🟡 **20 px de scroll horizontal a 320 px de ancho**, en las dos home por igual. Lo causa
    `article.caso-card` (la tarjeta de Misako, de la Fase 4), que mide 320 px y arranca a
    20 px del borde. Medido el 2026-08-10 con el viewport real, no dentro de un iframe.
    **A 375, 768, 1024 y 1440 px no hay desbordamiento**, y 320 px no es el ancho de ningún
    teléfono en circulación (el más estrecho de uso real es 375). **Es preexistente: no lo
    causa la Fase 14.** → Cuando se toque `styles.css` por otro motivo, quitarle el ancho
    fijo a `.caso-card`.
29. ✅ **El pie de las tres legales era el de la agencia vieja — RESUELTO el 2026-08-11**,
    a petición de Luis, justo después de cerrar la sesión 4. Decían *«Transformamos ideas en
    experiencias digitales excepcionales»*, ofrecían **«Diseño Web · Desarrollo a Medida ·
    Ecommerce»** y cerraban con *«Hecho para ti en Alicante y Valencia»*; los tres iconos de
    «Síguenos» apuntaban a `#`. Nada de eso era el posicionamiento de `CLAUDE.md` § 2, y
    **son justo las páginas que abre el comprador que verifica**, más aún desde `/es-es/`.
    Hoy las tres llevan **el mismo pie que la home**: el descriptor de consultora, los tres
    servicios reales, la columna de Contacto con el correo y el +34, y un solo icono social.
    ⚠️ **El «Blog» del pie de la home NO se copió, a propósito.** Las legales las enlazan
    los DOS mercados, y el blog está en español peruano: es la única diferencia entre el pie
    de `/` y el de `/es-es/`, y es una decisión abierta (pendiente nº 28). Omitirlo es la
    opción reversible. **Si Luis cierra el nº 28 diciendo que sí, se añade aquí también.**
    ⚠️ **Y salió un ancla muerta que llevaba viva desde la Fase 1:** el «Inicio» del menú de
    las tres apuntaba a **`index.html#inicio`, y `#inicio` no existe** en ninguna de las dos
    home (el id es `hero`). No se notaba porque el navegador se queda arriba, que es justo
    donde quería ir «Inicio». Corregido a `#hero`. **Se encontró comparando cada `href` con
    los `id` que existen de verdad**, no leyendo — la misma sonda vale para `/en/` y `/de/`.
32. 🟡 **El único enlace social apunta a `href="#"`**, en la home, en `/es-es/` y ahora en
    las tres legales (se copió tal cual para no divergir). Es un icono que no lleva a
    ninguna parte en una web que pide credibilidad. **No se inventa una URL** (§ 6.3) →
    pendiente nº 31: con el perfil real de LinkedIn se arregla en las cinco páginas de una
    pasada. Si Luis prefiere no tener LinkedIn público, la decisión correcta es **quitar el
    icono**, no dejarlo apuntando a `#`.
30. ✅ **`nw_lang_banner` llevaba desde la Fase 1 sin declararse en `politica-cookies.html`
    — RESUELTO el 2026-08-10** (sesión 4), el día en que se detectó, al ir a declarar la
    cookie nueva del banner de país. Hoy están declaradas las dos (`nw_lang_banner` y
    `nw_pais_banner`), con su duración de 180 días y la nota de que la sugerencia de país
    sale de la zona horaria del navegador y **no de la IP**.
    ⚠️ **La lección, que es lo que queda:** la regla de `CLAUDE.md` § 8 se estaba leyendo
    como «declara los píxeles de terceros», y no dice eso. **La pregunta correcta no es
    "¿esto es un tercero?" sino "¿el navegador guarda algo?"** Una cookie propia y técnica
    sigue siendo una cookie, y una política incompleta se detecta igual de rápido que un
    badge de partner falso, que es el motivo entero de § 6.1.
31. ✅ **El botón de cerrar del modal de servicios sin nombre accesible — RESUELTO el
    2026-08-10** (sesión 4), en las dos home a la vez. Dentro solo había un icono de Font
    Awesome, que además la Fase 13 dejó cargando diferido: un lector de pantalla anunciaba
    «botón» a secas y, un instante, se veía vacío. Hoy lleva `aria-label="Cerrar"` y el
    icono `aria-hidden`. De paso, `rel="noopener"` en los dos `target="_blank"` que no lo
    tenían (el acceso de clientes y el enlace a la política del aviso de datos).
    ⚠️ **Cómo se encontró, que es lo reutilizable:** preguntándole a cada `<button>` y cada
    `<a>` de la página **cómo se llama** (`innerText || aria-label || title`). No se ve
    leyendo el código ni mirando la pantalla. **La misma sonda vale para `/en/` y `/de/`
    cuando les toque** (fases 6 y 7).
23. ✅ **Kommo destacado en España — RESUELTO el 2026-08-10, el mismo día.** Se detectó al
    etiquetar `CRMS` (su gancho «WhatsApp primero» contradice § 4bis en España), se dejó
    anotado en vez de cambiarlo por cuenta propia, y **Luis decidió quitarlo**. Hoy es
    `destacado: ['pe']`, y el hueco destacado de España lo ocupa **Klaviyo**.
    ⚠️ **Kommo sigue siendo la primera ficha de la rejilla en los dos mercados** (es el
    orden del array). Ya no va resaltada; si además se quiere que no abra la lista en
    España, es mover el objeto — pero eso cambiaría también el orden peruano, así que
    haría falta un campo de orden por mercado. **No lo pidió nadie: queda solo apuntado.**
25. 🔴 **`logo.clearbit.com` se apagó y nadie se enteró — RESUELTO el 2026-08-10.**
    Los 8 logos de CRM llevaban tiempo cayendo al wordmark en la web publicada, en
    silencio, porque el `onerror` de la Fase 3 degradaba sin avisar. Hoy los logos son
    **archivos propios en `Imagenes/crm/`**. Queda la lección, que es lo que importa:
    **el sitio no tiene ninguna alarma para una dependencia externa que muere.** Los
    otros terceros vivos hoy son **Google Fonts** y **Font Awesome** (los dos con
    `<noscript>` de respaldo, ninguno con aviso). Si algún día uno de los dos cae, se
    notará igual de tarde. → No hay tarea abierta; hay criterio para la próxima vez.
24. ✅ **La raíz con `<html lang="es">` en vez de `es-PE` — RESUELTO el 2026-08-10**
    (sesión 3), en la misma pasada que el `hreflang` recíproco, que era la condición.
    Hoy la raíz declara `lang="es-PE"` y el grupo entero: `x-default`, `es-PE`, `es-ES`,
    `en`, `de`. `/es-es/` declara **el mismo grupo, ella incluida**.
26. ✅ **El modal de `#servicios` iba a hablar peruano en España — RESUELTO el 2026-08-10**
    (sesión 3), el mismo día en que se detectó. **Es el hallazgo que más enseña de la
    fase.** El copy de las tres tarjetas de servicio no está en `index.html` ni en las 7
    rejillas que la sesión 2 filtró: vive en `serviceData`, dentro de `script.js`, **que
    `/es-es/` carga igual**. Sin filtrarlo, «Integración» le decía a un español «tu
    WhatsApp», «WhatsApp Business API» y «vía OSE/PSE», y «Migración» decía *celular* dos
    veces. Hoy se construye desde el array `SERVICIOS_MODAL`, con `mercado` y filtrado
    **antes** de armar el diccionario.
    ⚠️ **La lección, que es lo que queda:** la verificación planificada («buscar SUNAT en
    el HTML servido») **compartía el punto ciego del trabajo que verificaba** — las dos
    miraban el archivo, y este texto solo existe en el DOM tras pulsar. **Lo que se dibuja
    con JS no está en el HTML servido: barrer `document.body.innerText` y pulsar lo que
    solo aparece con un clic.** Aplica a los tres modales, al banner de cookies y a
    cualquier cosa que dibuje `script.js` en el futuro.
27. 🟡 **La clase CSS del sello fiscal de `/es-es/` se llama `.sunat-sello`**, aunque su
    texto hable de IVA y Verifactu y no diga SUNAT en ningún sitio. Es el gancho de estilo
    que ya existe en `styles.css` (~línea 3572) y renombrarlo obliga a tocar el CSS, que la
    sesión 3 no tocaba. **Es deuda de NOMBRE, no de contenido: el visitante no la ve.**
    → Cuando se toque `styles.css` por otro motivo, renombrar a algo neutro (`.sello-fiscal`)
    en las dos páginas a la vez. Mientras tanto, **no "arreglar" el HTML de `/es-es/`
    poniéndole otra clase**: se quedaría sin estilos.
