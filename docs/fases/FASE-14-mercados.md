# Fase 14 — Segmentación por mercado: nace `/es-es/`

**Abierta:** 2026-08-09, por decisión de Luis.
**Estado:** ⬜ planificada, sin tocar ni un archivo del sitio.
**Son 4 sesiones, una por chat.** Protocolo en [`docs/SESIONES.md`](../SESIONES.md).

---

## Qué resuelve

Un visitante que entra desde Perú tiene que leer **IGV, SUNAT, soles, Yape**. Uno que
entra desde España tiene que leer **IVA, Hacienda, Verifactu, euros, Bizum**. Hoy la web
solo habla peruano, y a un comprador español el bloque SUNAT le dice "esto no es para mí"
en los primeros diez segundos.

## La arquitectura, decidida el 2026-08-09

| | |
|---|---|
| `/` | **Sigue siendo la versión Perú y NO se mueve.** Es lo único indexado. `lang="es-PE"` |
| `/es-pe/` | **Solo un 301 a `/`.** Existe porque la gente la va a teclear y porque simetriza el esquema, no porque sirva contenido |
| `/es-es/` | **Nueva.** La versión España. `lang="es-ES"` |
| Detección | **Zona horaria del navegador**, no IP |
| Qué hace la detección | **Solo enseñar un banner ofreciendo cambiar.** Nunca redirigir, nunca cambiar el contenido de `/` |

### Por qué la zona horaria y no la IP

`Intl.DateTimeFormat().resolvedOptions().timeZone` → `America/Lima` vs `Europe/Madrid`.

- **0 bytes, 0 latencia, 0 terceros.** Se resuelve en el propio navegador.
- No entra en el muro de consentimiento: no se manda nada a nadie y no se guarda nada
  hasta que el visitante elige. Igual que el banner de idioma de hoy.
- **Una API de IP de terceros queda descartada**, y no es preferencia: añade una petición
  bloqueante antes de pintar (deshace parte de la Fase 13), filtra la IP del visitante a
  alguien **no declarado en `politica-cookies.html`**, y la web promete "no cedemos a
  terceros". Sería incumplir en la propia página.
- **Una cabecera de servidor** (`CF-IPCountry` con Cloudflare por delante) sería más
  precisa, pero choca con `.htaccess:117`: el HTML se sirve `public, max-age=600`, así que
  un proxy puede entregarle la versión Perú a un español. Exigiría `Vary` y bajar la
  caché. No compensa.

⚠️ **`navigator.language` NO sirve para el país.** El `es-ES` del sistema operativo viene
de fábrica en equipos vendidos en cualquier sitio. Dice el idioma, no dónde está la
persona.

### Por qué no se reparte desde la raíz

**Googlebot rastrea casi siempre desde IPs de EE.UU.** Si `/` cambiara según el país,
Google indexaría una sola variante y la otra no existiría para nadie que busque. Es
exactamente el motivo por el que `CLAUDE.md` § 7 prohíbe la redirección automática por
idioma desde la Fase 1. Misma regla, mismo motivo, ahora también para el país.

---

## Decisiones de Luis — cerradas el 2026-08-09 (sesión 1)

| Dato | Decisión |
|---|---|
| **CTA de `/es-es/`** | ✅ **Formulario + teléfono.** El +34 614 94 27 32 en España es número local, al revés que en Perú. WhatsApp baja a secundario |
| **Precios** | ✅ **No se publican**, igual que en Perú. Se hereda la decisión del 2026-07-20 |
| **Prueba social** | ✅ **Misako se reusa** — y resultó ser **más fuerte acá que en Perú**, ver abajo |
| **Verifactu** | ✅ **Se escribe sin ninguna fecha.** Luis no las tiene verificadas y se han aplazado varias veces (§ 6.3) |
| 🔴 **Contrato** (no competencia) | ⬜ **Sigue abierto.** Pendiente nº 21. Bloquea **publicar**, no construir |

### El hallazgo de la sesión: Misako es española

`script.js:338` — *"Moda y complementos · España"*, *"una de las marcas líderes en España
en bolsos, maletas, mochilas y complementos"*. Y `CREDENCIALES` (script.js:523) ya lo dice
en la banda: *"Ejecutada para Misako, marca líder en España"*.

**O sea que el único caso publicable que tiene Nouweb es local para España y extranjero
para Perú**, justo al revés de lo que se asumía al abrir la fase. En `/es-es/` la prueba
social no hay que inventarla ni reservarla: ya existe y es la buena. En la home peruana
sigue siendo un caso de fuera, que es una debilidad **que esta fase no crea ni empeora,
pero que ahora está medida** (pendiente nº 11 y nº 23).

> 🔴 **Y por eso mismo hay que atar el pendiente nº 21 antes de publicar.** Si la migración
> de Misako se ejecutó **dentro de la agencia** donde Luis trabaja, publicarla como caso de
> Nouweb en una página que **capta clientes españoles** es el escenario exacto que preocupa
> a `CLAUDE.md` § 5 — mucho más que publicarla mirando a Perú. Lo mira Luis con el contrato
> y con el permiso escrito del cliente (pendiente nº 7, que sigue abierto).

### El otro hallazgo, y abarata la sesión 3

**El copy peruano está escrito en «tú» singular, no en «ustedes».** *"Migramos tu
eCommerce"*, *"¿Te suena esto?"*, *"Te llevas"*. El tuteo singular es idéntico en los dos
países, así que **la estructura de frase se conserva entera** y lo que cambia es
vocabulario suelto y el contenido fiscal. La sesión 3 es más barata de lo previsto.

Cambios léxicos que hay que hacer sí o sí: **celular → móvil · costo → coste · acá → aquí ·
al toque → al momento · boleta → factura · cobranzas → cobros · capacitación → formación**.

---

# Sesión 1 — Decidir y redactar (no toca el sitio) ✅ HECHA 2026-08-09

**Resultado:** las 4 decisiones cerradas (tabla de arriba), el borrador de copy completo
en el **Anexo A** al final de esta ficha, y dos hallazgos que cambian la fase: Misako es
española y el tuteo se conserva. **No se tocó ni un archivo del sitio.**

**Qué se hizo**

- Cerrar las cinco decisiones de la tabla de arriba con Luis.
- Redactar el **copy completo de `/es-es/`** como borrador dentro de esta misma ficha.
  Nada se pega en HTML todavía.
- Marcar con `{{PENDIENTE: ...}}` lo que Luis no haya dado.

**Qué NO se hace:** tocar `index.html`, `script.js`, `styles.css` ni crear carpetas.

**Verificación:** ninguna, es una sesión de decisión. El entregable es texto en `docs/`.

> ⚠️ **La trampa nº 1 de esta sesión: escribir en peruano.** `CLAUDE.md` § 4 dice
> "prohibido *coger*, nunca *vosotros*, celular y no móvil" — y eso aplica **solo a Perú**.
> En `/es-es/` es al revés. Releer § 4bis antes de escribir una sola frase.

---

# Sesión 2 — Cimientos: el objeto `MERCADOS` ✅ HECHA 2026-08-09

**Resultado:** el interruptor está montado y **las 7 rejillas se filtran por mercado**.
Medido con la copia de seguridad cargada al lado en el navegador: **la home peruana sale
con 0 diferencias** (mismo texto, mismas tarjetas, mismos destacados, mismos 68
`.fade-in-up`). La misma `script.js` con `lang="es-ES"` dibuja ya la versión española
entera. Backup en `Backup/09-08-fase14-s2/`, `?v=30`.

**Lo que la sesión 3 se encuentra hecho** (y por tanto **no** tiene que escribir):

| Rejilla | Perú | España |
|---|---|---|
| Hero | 4 frases | 4 frases (WhatsApp y SUNAT **sustituidas**, no traducidas) |
| CRM | 8 | 8 |
| Casos | 1 (Misako) | 1 (Misako) |
| Credenciales | 4 | 4 — `Basado en España` y `Facturación electrónica y Verifactu` |
| Proceso | 6 | 6 — paso 4 fiscal, *costos→costes*, *capacitación→formación* |
| Migraciones | 12 | 10 — sin Tiendanube ni Jumpseller; Amazon/eBay; destacados Magento y PrestaShop |
| Destinos | 4 | 3 — **VTEX fuera** |

**Cómo se declara un elemento nuevo**, para que la sesión 3 no invente otra convención:

```js
{ ..., mercado: ['pe', 'es'] }   // vale para los dos: NO se duplica el objeto
{ ..., mercado: ['es'] }         // solo España
{ ..., destacado: ['pe'] }       // resaltado solo en Perú
```

Sin campo `mercado`, un elemento sale en los dos. Es el fallo visible a propósito:
aparecer de más se ve y se corrige; no aparecer en ningún sitio no se ve.

⚠️ **Filtrar SIEMPRE antes del `.map()`.** El índice del `map` pinta el número del paso
del proceso (01…06) y las clases `delay-1/2/3` del escalonado. Filtrando después, España
numeraría 01, 03, 04, 06, 07, 09.

**Lo que quedó anotado y NO se hizo** (los dos, a propósito, para no ampliar la sesión):

- **Backlog nº 23** — Kommo sigue destacado en España con la nota *«WhatsApp primero»*,
  que contradice § 4bis. Es decisión de Luis (pendiente nº 27), y se cambia con
  `destacado: ['pe']`.
- **Backlog nº 24** — la raíz sigue con `lang="es"` en vez de `es-PE`. Se mueve **a la vez
  que el `hreflang`**, o sea en la sesión 3. No afecta al mercado: `es` y `es-PE` dan `pe`.

<details>
<summary>El plan original de esta sesión</summary>

**Qué se hace**

1. **Un `<script>` en línea en el `<head>`** de las páginas, antes de pintar, para que no
   haya parpadeo:
   ```html
   <script>document.documentElement.dataset.mercado =
     document.documentElement.lang === 'es-ES' ? 'es' : 'pe';</script>
   ```
   *(En esta sesión el mercado sale del `lang`, no de la zona horaria. La detección llega
   en la sesión 4 y solo alimenta el banner.)*
2. **Un objeto `MERCADOS`** al principio de `script.js`, con la misma estética de
   interruptor único que ya tienen `SHOPIFY_PARTNER` y `MARKETING`: impuesto, moneda,
   organismo, pasarelas, gancho.
3. **Campo `mercado` en los arrays existentes**, y filtrado al renderizar — igual que
   `CREDENCIALES` ya filtra por `activo`:
   `HERO_FRASES` (script.js:76) · `CRMS` (276) · `CASOS` (334) · `CREDENCIALES` (510) ·
   `PROCESO` (564) · `MIGRACIONES` (646) · `DESTINOS` (720).
   Lo que valga para los dos mercados lleva `mercado: ['pe','es']`, no se duplica.

**Verificación — y es la buena de esta sesión:** con la raíz en `pe`, **la home tiene que
salir idéntica a como estaba**. Mismo número de tarjetas en cada rejilla, mismas frases
del hero, mismo texto. Si algo cambió, el filtro está mal. Se cuenta con el DOM, no se
mira la pantalla.

**Riesgo conocido:** es un refactor de las 7 rejillas que se dibujan solas. Backup de
`script.js` **obligatorio** y `?v=` subido.

</details>

---

# Sesión 3 — Nace `/es-es/` ✅ HECHA 2026-08-10

**Resultado:** `/es-es/index.html` existe, se dibuja entera y **no dice SUNAT, IGV, S/,
Yape, celular ni Ley 29733 en ningún sitio** (medido sobre el DOM, no leyendo). El grupo
`hreflang` es recíproco por fin, y la raíz pasó a `lang="es-PE"`. La home peruana sale
**idéntica**: comparadas las dos páginas elemento a elemento, la única diferencia es la
esperada. Backup en `Backup/10-08-fase14-s3/`, `?v=32`.

**Lo medido, y es lo que da valor a la sesión:**

| | Perú (`/`) | España (`/es-es/`) |
|---|---|---|
| `lang` → mercado | `es-PE` → `pe` | `es-ES` → `es` |
| Credenciales | `España · Perú` · `SUNAT e IGV` | `Basado en España` · `Facturación electrónica y Verifactu` |
| CRM (destacados) | 9 (Kommo, HubSpot) | 9 (Klaviyo, HubSpot) |
| Casos | 1 · Misako | 1 · Misako |
| Proceso | 6 → `01…06` | 6 → `01…06` |
| Migraciones (destacadas) | 12 (marketplace) | 10 (Magento 1, Magento 2, PrestaShop, marketplace) |
| Destinos | 4 (con VTEX) | 3 (**sin VTEX**) |
| CTA WhatsApp | hero + auditoría + contacto + flotante | **solo contacto**, secundario |
| `.fade-in-up` | 69 | 64 |

Las **5 diferencias de `.fade-in-up` son exactamente las previstas** y ninguna otra: el
bloque de blog (2) y la sección de migración (3 = dos orígenes y un destino menos). Se
comprobó cargando `/es-es/` en un iframe junto a la home y contando por sección, que es la
prueba de regresión que estrenó la sesión 2.

> 🔴 **EL HALLAZGO DE LA SESIÓN, Y NO ESTABA EN ESTA FICHA: el modal de `#servicios`.**
> El texto de las tres tarjetas de servicio no vive en `index.html` ni en ninguna de las 7
> rejillas: vive en `serviceData`, dentro de `script.js`, **que `/es-es/` carga igual**.
> Sin tocarlo, un visitante español que pulsara «Integración» leía **«tu WhatsApp»,
> «WhatsApp Business API» y «vía OSE/PSE»** —o sea, la SUNAT con otro nombre— dentro de la
> página que presume de no nombrarla nunca. Y «Migración» decía *celular* dos veces.
>
> **La verificación que pedía esta ficha no lo habría cazado**: buscar «SUNAT» en el HTML
> servido de `/es-es/` no encuentra nada, porque ese texto llega por JS y solo existe en el
> DOM **después de pulsar**. Se caza abriendo las tres tarjetas, que es literalmente la
> lección que ya había dejado escrita la Fase 13 con este mismo modal.
>
> Arreglado con la convención de la sesión 2: `serviceData` pasa a construirse desde el
> array **`SERVICIOS_MODAL`**, con campo `mercado` y **filtrado antes** de armar el
> diccionario. Verificado abriendo las tres tarjetas en los dos mercados: 0 fugas en
> España, y en Perú siguen diciendo lo de siempre.

**Lo que quedó anotado y NO se hizo** (a propósito, para no ampliar la sesión):

- **La clase CSS del sello fiscal sigue llamándose `.sunat-sello`** en `/es-es/`, aunque su
  texto hable de Verifactu. Renombrarla obliga a tocar `styles.css`, que esta sesión no
  toca. Es deuda de nombre, no de contenido → backlog nº 27.
- **El blog no se enlaza desde `/es-es/`** (ni menú, ni pie, ni sección, ni `blog.js`).
  Está escrito en español peruano y su único artículo se apoya en el gancho de WhatsApp
  que § 4bis descarta para España. Es reversible en dos líneas → **decisión de Luis,
  pendiente nº 28**.

<details>
<summary>El plan original de esta sesión</summary>

**Qué se hace**

0. **El `<script>` de mercado en el `<head>`**, copiado tal cual de `index.html` (va antes
   del `<title>`). Sin él, `/es-es/` se dibujaría en peruano sin avisar de nada.
1. **Carpeta `/es-es/` con un solo `index.html`.** Reusa `/styles.css` y `/script.js` con
   **ruta absoluta**, como hizo el blog en la Fase 10. **No se copia ni un asset**: la
   triplicación de `/en`, `/de` y `/es` es la deuda que este proyecto está pagando, y no
   se le añade una cuarta copia.
2. **`lang="es-ES"`** y el copy de la sesión 1.
3. **Los bloques escritos a mano que hay que adaptar** (los arrays ya se filtran solos
   desde la sesión 2). Estos están en `index.html` y son los caros:

   | Qué | Línea en `index.html` |
   |---|---|
   | `<meta description>` y `keywords` | 32, 34 |
   | JSON-LD: negocio, `ItemList`, **`FAQPage`** (tiene la pregunta de SUNAT) | 66, 87, 126-138 |
   | `#problema`: *"La facturación SUNAT va por su lado"* | 441 |
   | `#servicios`, fase 3: *"la facturación SUNAT dentro del mismo flujo"* | 532 |
   | **El sello SUNAT** → sello IVA/Verifactu | 639-648 |
   | **Las pasarelas** (Niubiz, Yape, Plin…) → Redsys, Bizum, Stripe, PayPal | 650-663 |
   | `#nosotros` (el pitch cambia: acá Luis **vive en el mercado**) | 699-712 |
   | `#auditoria`: *"del pedido que entra por WhatsApp… la boleta en SUNAT"* | 760 |
   | Aviso de datos y modal de consentimiento: **Ley 29733 → RGPD + LOPDGDD** | 877, 952 |

   > ⚠️ **Los números son del 2026-08-09, después de la sesión 2**, que metió 23 líneas en
   > el `<head>`. Si no cuadran, buscar el texto: las líneas envejecen, el texto no.

4. **`hreflang` recíproco en las dos páginas.** `index.html` gana `es-ES` y
   `/es-es/index.html` declara **el grupo entero, incluida ella misma**. En la misma
   pasada, **`<html lang="es">` de la raíz pasa a `es-PE`** (backlog nº 24): los dos se
   mueven juntos o el grupo de idiomas dice dos cosas distintas.

> ⚠️ **`hreflang` sin reciprocidad se ignora entero.** No es medio trabajo hecho: vale
> exactamente cero. Es la lección que dejó escrita la Fase 6 al medir `/en/`, que lleva
> meses publicada sin declarar ni `canonical` ni `hreflang`.

**Verificación:** las dos páginas se abren y se piden las dos cabeceras. Que `/es-es/` no
tenga ni un "SUNAT", ni un "S/", ni un "IGV", ni un "celular" — se comprueba buscando en
el HTML servido, no leyendo. Y que la raíz siga sin ninguna palabra española.

> ⚠️ **Esta verificación resultó ser insuficiente, y así se descubrió el hallazgo de
> arriba.** Buscar en el *HTML servido* no ve nada de lo que escribe `script.js`, y ahí
> vivía el copy peruano del modal de servicios. La versión buena de esta comprobación es
> **barrer `document.body.innerText` del DOM ya montado y, además, abrir a mano lo que solo
> existe tras un clic** (los tres modales). Anotado para la sesión 4.

</details>

---

# Sesión 4 — Banner de país, `.htaccess` y publicación ✅ HECHA 2026-08-10

**Resultado:** la Fase 14 queda **técnicamente terminada**. El banner de país funciona en
las dos direcciones, `/es-pe/` redirige, `/es-es/` está en el `sitemap.xml` y **el backlog
nº 22 está cerrado**: las tres legales nombran ya el RGPD y la LOPDGDD. Backup en
`Backup/10-08-fase14-s4/`, `?v=33`.

🔴 **Lo único que sigue bloqueando la publicación de `/es-es/` es el pendiente nº 21: el
contrato de Luis.** Eso no es trabajo de Claude y no se puede cerrar aquí.

**Lo que se hizo, punto por punto**

1. **Banner de país por zona horaria.** No se reusó el `#lang-banner` como decía el plan:
   se añadió un **`#pais-banner` hermano, con la misma clase `.lang-banner`**, y la lógica
   de las dos barras se unificó en un solo bloque de `script.js`. Motivo: son **dos ofertas
   distintas** y necesitan **dos cookies distintas** (ver § Lo aprendido). Con la misma
   clase, `styles.css` no se toca — y eso además esquiva el backlog nº 14 (selectores
   duplicados).
   - En `/`, zona europea → *«¿Escribes desde España? · Ver la versión para España»*.
   - En `/es-es/`, zona americana → *«¿Escribes desde Perú? · Ver la versión para Perú»*.
   - **El idioma tiene prioridad**: a quien no lee español no le sirve la otra versión
     española. Nunca salen las dos barras a la vez.
2. **`.htaccess`**: `^es-pe/?$` y `^es-pe/index\.html$` → 301 a `/`, al lado de las de
   `/es/`. Fuera de todo `<IfModule>`, como las que ya funcionan en producción.
3. **`sitemap.xml`**: entra `/es-es/` con prioridad 0.9, y `/es-pe/` se apunta en la lista
   de «qué NO va aquí» junto a `/es/`. Se subió el `lastmod` de `/` y de las dos legales
   que cambiaron.
4. **`politica-cookies.html`**: resultó que **sí había algo nuevo que declarar**, y además
   algo viejo. Ver § Lo aprendido.
5. **Backlog nº 22 cerrado**, con una corrección: la mitad del aviso era falsa.
6. **Repaso de accesibilidad y responsive**, que encontró dos cosas.

**Qué NO se hizo, y a propósito**

- **No se tocó `styles.css`.** El banner nuevo reusa la clase que ya existe.
- **No se arregló el desbordamiento de 20 px a 320 px** (`.caso-card`): es preexistente,
  está en las dos páginas por igual y 320 px no es el ancho de ningún teléfono actual.
  → backlog nº 28.
- **No se tocó el pie de las tres legales**, que sigue siendo el de la agencia vieja
  («Diseño Web», «Desarrollo a Medida»). → backlog nº 29.

## Cómo se verificó

**El interruptor tenía 12 posiciones, no 2.** Mercado (2) × idioma del navegador (2) ×
zona horaria (varias) × «ya elegí» (2). Se generaron **dos copias temporales de las páginas
reales** con un stub en el `<head>` que falsea `navigator.language` y
`Intl.DateTimeFormat().resolvedOptions().timeZone` por query string, y se cargaron las 12
en iframes del mismo origen. Las copias se borraron al terminar.

| Página | Navegador | Zona horaria | Cookie | Barra que sale |
|---|---|---|---|---|
| `/` | es-ES | `Europe/Madrid` | — | **país** → España ✅ |
| `/` | es-ES | `Atlantic/Canary` | — | **país** → España ✅ |
| `/` | es-ES | `Africa/Ceuta` | — | **país** → España ✅ |
| `/` | es-ES | `America/Lima` | — | ninguna ✅ |
| `/` | en-US | `Europe/Madrid` | — | **idioma** (tiene prioridad) ✅ |
| `/` | es-ES | `Europe/Madrid` | ya eligió | ninguna ✅ |
| `/` | es-ES | *(sin zona)* | — | ninguna ✅ |
| `/es-es/` | es-ES | `America/Lima` | — | **país** → Perú ✅ |
| `/es-es/` | es-ES | `America/Bogota` | — | **país** → Perú ✅ |
| `/es-es/` | es-ES | `Europe/Madrid` | — | ninguna ✅ |
| `/es-es/` | en-US | `America/Lima` | — | **idioma** ✅ |
| `/es-es/` | es-ES | `America/Lima` | ya eligió | ninguna ✅ |

Y lo que no se ve en la tabla:

- **Las dos formas de cerrar guardan la elección:** la X deja `nw_pais_banner=pe`, esconde
  la barra y devuelve el `header` de `top: 44px` a `top: 0`; el enlace deja
  `nw_pais_banner=es` **antes** de navegar.
- **Las dos cookies son independientes, medido:** se cerró el banner de idioma, se volvió
  con el navegador en español y **el de país salió igual**. Con una sola cookie no habría
  salido nunca.
- **Las páginas que cargan el mismo `script.js` y no tienen barras** (las tres legales y
  el blog) siguen sin errores y sin la clase `has-lang-banner`.
- **La barra no desborda su altura fija de 44 px** a 320, 375, 414, 768 ni 1280 px, en las
  tres variantes de texto.
- **Regresión del hallazgo de la sesión 3:** se volvieron a abrir los tres modales de
  servicio en las dos páginas y se comprobó que **de verdad se abren** (588/562/589
  caracteres en Perú, 584/553/717 en España) y que no hay ni una palabra del otro mercado.
  Contar solo «0 fugas» sin comprobar que el modal se abrió habría dado el mismo resultado
  con el modal roto.
- **Barrido del DOM entero** en las dos páginas contra las dos listas de palabras
  prohibidas: **0 y 0**.
- **Sin errores de consola** en ninguna de las dos.
- **`hreflang` recíproco intacto** (el mismo grupo de 5 en las dos), `canonical` correcto,
  3 JSON-LD que parsean en cada una, y **69 / 64 `.fade-in-up`**, exactamente los mismos
  que dejó la sesión 3: las barras nuevas no descuadraron nada.
- **Scroll horizontal 0 px a 375, 768, 1024 y 1440 px** en las dos páginas.
- **47 rutas propias pedidas con `fetch(HEAD)`** (25 en `/`, 22 en `/es-es/`): **todas 200**.

⚠️ **Lo único que NO se pudo probar aquí es el 301 de `/es-pe/`**: el servidor de pruebas
es un estático de Python y no lee `.htaccess`. Lo comprueba Luis después de subirlo,
abriendo `nouweb-es.com/es-pe/`.

## Lo aprendido

- 🔴 **La regla de «ninguna pieza entra sin nombrarse» se estaba aplicando solo a los
  terceros.** Al ir a declarar la cookie nueva se descubrió que **`nw_lang_banner` lleva
  sin declararse desde la Fase 1**: una cookie propia, de 180 días, que la política de
  cookies no menciona — en la página que sostiene el muro de consentimiento. Se declararon
  las dos. **La pregunta correcta no es «¿esto es un tercero?» sino «¿el navegador guarda
  algo?»**.
- 🔴 **Un aviso del backlog puede estar equivocado y sobrevivir porque nadie vuelve a
  medirlo.** El nº 22 decía que `aviso-legal.html` «tampoco cita la LSSI-CE». **La cita
  tres veces** (el art. 10 en el apartado 1, los arts. 11 y 16 en el 5, y el acrónimo en el
  2). Lo que sí faltaba —y era cierto— es el RGPD. El aviso se escribió el 2026-08-09
  midiendo, y aun así media frase era falsa. **Al cerrar un punto del backlog hay que
  volver a medirlo, no darlo por bueno porque lo escribió una sesión anterior.**
- **El plan decía «reusa la cookie que ya existe» y era la decisión equivocada, por una
  razón que solo se ve al escribirla:** son dos preguntas distintas. Cerrar *«esto también
  está en inglés»* no responde a *«¿escribes desde España?»*. Con una cookie, un visitante
  en Madrid con el navegador en inglés cerraba la primera barra y **no veía nunca la
  segunda** — que era justo la que le interesaba. Dos cookies, dos preguntas.
- **El copy de un banner de país puede romper la prueba que protege al proyecto.** La
  versión atractiva era *«Ver la versión con IVA y Verifactu»*, pero eso mete vocabulario
  español en el DOM de la raíz, y la prueba de fugas entre mercados es literalmente
  «la raíz no contiene ni una palabra española». Habría quedado un **falso positivo
  permanente** en la comprobación más importante de la fase. **La barra señaliza; no vende.**
- **Un repaso de accesibilidad encuentra cosas que doce sesiones de trabajo no.** El botón
  de cerrar del modal de servicios **no tiene nombre accesible** en ninguna de las dos
  páginas: dentro solo hay un icono de Font Awesome, y la Fase 13 lo dejó cargando
  diferido, así que además está vacío un instante. Arreglado en las dos a la vez.
- **Medir el ancho dentro de un iframe miente 18 px.** El primer barrido dio 20 px de
  scroll horizontal a «320 px» y resultó ser en parte la barra de scroll del iframe. La
  medición buena es **pedir el ancho + 18 y leer `clientWidth`**; hecho así, el
  desbordamiento de 320 px es real (son 20 px de `.caso-card`) pero 375 px está limpio. Es
  la misma familia de trampa que ya tenían anotada las fases 9 y 13 con este panel.

---

## Lo que esta fase NO hace

- **No traduce a inglés ni alemán.** Eso son las fases 6 y 7, y siguen bloqueadas por la
  parada de validación (pendiente nº 18).
- **No toca `/en/`, `/de/` ni `/es/`.** Sus defectos vivos (sin `canonical`, sin
  `hreflang`, un 404 en el modal) siguen en el backlog y son de la Fase 6.
- **No mete el blog en España.** Se quedó en español peruano por decisión del 2026-07-22
  y esta fase no lo reabre.
- **No publica precios en euros.** Decidido en la sesión 1: no se publican.

---

# Anexo A — Borrador de copy de `/es-es/`

**Escrito en la sesión 1 (2026-08-09).** Esto es el material de la sesión 3: se pega, no se
reinventa. Lo que no aparece acá **se hereda igual de la home peruana** porque no cambia.

> Recordatorio antes de tocar nada: **español de España** (§ 4bis). El tuteo singular se
> mantiene; lo que cambia es el vocabulario y el contenido fiscal.

## A.1 — Cabecera y SEO

- **`<title>`** — `Consultoría tecnológica e integración de sistemas para pymes | Nouweb`
- **`description`** — *Migramos tu eCommerce y conectamos tus pedidos a un CRM que encaja
  de verdad con tu negocio, con la facturación electrónica y Verifactu contemplados. No
  vendemos CRM propio. Auditoría gratuita.*
- **`keywords`** — `migración eCommerce España, integración CRM pymes, replatforming
  Shopify, migración PrestaShop, migración Magento, facturación electrónica Verifactu,
  consultoría tecnológica pymes`
- **`lang="es-ES"`**, `canonical` a `https://nouweb-es.com/es-es/`, y el grupo `hreflang`
  entero (§ Arquitectura).
- **JSON-LD**: el `FAQPage` cambia la pregunta de SUNAT por **«¿Contempláis Verifactu y la
  facturación electrónica?»** → *Sí. La conexión con tu software de facturación se define
  en el mismo momento que el flujo de venta, para que la factura salga sola cuando el
  pedido se confirma, con su IVA y su registro. Trabajamos con el software adaptado que ya
  tengas o te ayudamos a elegirlo.* **Sin fechas.**

## A.2 — Hero

Badge y botones igual. El titular rota desde `HERO_FRASES`; para España:

| Frase | Mercado |
|---|---|
| `Tus pedidos se pierden entre correos y llamadas.` | solo `es` |
| `Tu stock vive en un Excel que no cuadra.` | `['pe','es']` — vale igual |
| `Tu facturación va por su lado.` | solo `es` |
| `Tus sistemas no se hablan entre ellos.` | `['pe','es']` — vale igual |

> ⚠️ **La frase de WhatsApp no se traduce, se sustituye.** *"Tus pedidos viven en
> WhatsApp"* es el gancho peruano y en España no describe a nadie (§ 4bis).

**Subtítulo:** *Migramos tu eCommerce y conectamos tus procesos a un CRM que encaja de
verdad con tu negocio. No vendemos software de gestión propio: por eso podemos
recomendarte el correcto.* (idéntico, ya funciona en los dos)

## A.3 — Banda de credenciales (`CREDENCIALES`)

| Casilla | Qué cambia |
|---|---|
| Shopify Partner | igual, sale de `SHOPIFY_PARTNER` |
| Migración headless → Shopify OS 2.0 | igual — *"Ejecutada para Misako, marca líder en España"*. **Acá juega en casa** |
| `España · Perú` | → **`Basado en España`** · *Ingeniero full stack trabajando en los dos mercados* |
| `SUNAT e IGV integrados` | → **`Facturación electrónica y Verifactu`** · *Contemplados desde el diseño* |

## A.4 — `#problema`: las 6 tarjetas

Encabezado igual (*¿Te suena esto?*). Cambian dos tarjetas y el léxico de una tercera:

1. **Los pedidos se pierden entre correos y llamadas** *(sustituye a la de WhatsApp)* —
   Entran por email, por teléfono o por el marketplace, alguien los apunta donde puede, y
   al cierre del día nadie sabe con certeza cuáles quedaron pendientes.
2. **El stock vive en un Excel que nunca cuadra** — igual, pero **cobranzas → cobros**.
3. **La tienda va lenta y no vende en móvil** — **celular → móvil** (dos veces).
4. **Verifactu llega y tu facturación no está preparada** *(sustituye a la de SUNAT)* —
   Emitir las facturas es un trámite manual, desconectado de la venta. Se duplica el
   trabajo, se cuelan errores, y la normativa antifraude exige un registro que tu proceso
   de hoy no deja.
5. **Tus sistemas no se hablan entre ellos** — igual.
6. **Nadie sabe cuántos clientes repiten** — igual.

## A.5 — `#servicios` y `#proceso`

Las tres fases y los seis pasos **se mantienen tal cual**. Solo cambian dos frases donde
se nombra el terreno peruano:

- **Servicios, fase 3** — *…lo conectamos con tu web y con tu facturación electrónica.*
  (fuera «tu WhatsApp»)
  · **Te llevas:** *los pedidos entrando solos, cada conversación registrada y la
  facturación dentro del mismo flujo.*
- **Proceso, paso 4 (Integración)** — *Conectamos el CRM, la facturación electrónica y su
  registro, las pasarelas de pago y los canales por los que te escriben.*
- **Proceso, paso 5** — **capacitación → formación**.
- **Proceso, paso 3** — se mantiene entero, redirecciones 301 incluidas. Es lo que más
  tranquiliza y no depende del país.

## A.6 — `#casos`

**Misako, sin tocar una coma.** Es el único bloque de toda la página que en España es más
fuerte que en Perú: sector *«Moda y complementos · España»*, marca que el visitante
reconoce, y el dato duro (9/10 UX, 9,5/10 responsive) ya está aportado y verificado.

Encabezado igual: *Solo publicamos trabajos reales y con permiso del cliente.*

🔴 **Antes de publicar: pendiente nº 21 (contrato) y nº 7 (permiso escrito).**

## A.7 — `#stack-crm`, `#migracion-ecommerce`, sello fiscal y pasarelas

- **CRM**: los 8 se quedan. Encabezado y nota de partner, igual.
- **Orígenes de migración** (`MIGRACIONES`): fuera **Tiendanube/Nuvemshop, Jumpseller** y
  el bloque de marketplaces peruanos (Falabella, Ripley). Dentro y **con peso**:
  **PrestaShop** y **Magento 1/2**, que son el caladero real de replatforming en España.
  **VTEX** baja a secundario. Amazon/eBay ocupan el hueco de «solo marketplace».
- **Destinos** (`DESTINOS`): Shopify / Shopify Plus · WooCommerce · Shopify headless o a
  medida. **VTEX fuera para España.**
- **Tesis de la sección**: idéntica. Es la diferencia con el competidor y no depende del
  país.

**Sello fiscal — sustituye entero al sello SUNAT (`index.html:618-627`):**

> ### La facturación electrónica y Verifactu van contempladas desde el diseño
> No es un añadido al final. La conexión con tu software de facturación se define en el
> mismo momento en que se define el flujo de venta, para que la factura salga sola cuando
> el pedido se confirma, con su **IVA** y con el registro que exige la normativa
> antifraude. Si aún no tienes software adaptado, te ayudamos a elegirlo — no vendemos
> ninguno.

> ⚠️ **Ni una fecha.** Decisión de la sesión 1: las de Verifactu se han aplazado varias
> veces y Luis no las tiene verificadas. `{{PENDIENTE: fechas de Verifactu verificadas por
> Luis}}` — si algún día las trae, se añaden acá y **solo acá**.

**Pasarelas:** Redsys · Bizum · Stripe · PayPal · Apple Pay · Google Pay.
**Nota de cierre:** *Integrar Bizum no es un detalle menor: es la diferencia entre que el
cliente termine la compra o la deje a medias.*

## A.8 — `#nosotros`

Acá el pitch **se invierte**: en Perú el argumento es *«peruano que conoce el terreno desde
Europa»*; en España es *«está en tu mercado, tu horario y tu marco legal»*.

> ### Quién está detrás de Nouweb
> Soy **Luis**, ingeniero de software full stack afincado en España, especializado en
> soluciones de gestión empresarial.
>
> Trabajo en dos mercados a la vez: la exigencia técnica europea y la operativa
> latinoamericana. Esa mezcla es justo lo que hace falta para que una integración no se
> quede a medias.
>
> Trabajas conmigo directamente. No hay capa de comerciales ni un equipo distinto al que
> arranca el proyecto: quien te explica la propuesta es quien la ejecuta.
>
> - Independientes: no vendemos CRM propio, así que recomendamos el que te encaja
> - Mismo huso horario, mismo marco legal: RGPD, IVA y facturación electrónica
> - Trato directo con quien hace el trabajo

> 🔴 **Ojo con una frase que en Perú es inocua y aquí no.** La home peruana dice *"Trabajo
> en una agencia digital española"* (`index.html:676`). En una página que **capta clientes
> españoles**, esa frase pone al empleador y al cliente potencial en la misma sala. **En el
> borrador de arriba está retirada a propósito**, y no se devuelve hasta que Luis cierre el
> pendiente nº 21. No es censura del dato: es que en `/es-es/` no aporta nada y sí expone.

## A.9 — `#auditoria` y `#contacto`

**Auditoría** — las tres tarjetas se mantienen. Solo cambia la segunda:

> **Mapa de tus procesos** — Del pedido que entra hasta la entrega y la factura emitida.
> Dónde se pierde la información y quién la vuelve a escribir a mano.

Y en la primera, **celular → móvil**. El cierre, el entregable y el filtro de *«intención
real de implementar»* se quedan igual.

**Contacto — acá está el cambio de CTA decidido en la sesión 1:**

- **Formulario + teléfono.** El bloque de teléfono es **nuevo**, no existe en la home
  peruana: *¿Prefieres hablarlo? Llámame: **+34 614 94 27 32**. Horario peninsular.*
- **WhatsApp baja a secundario**, sin botón flotante y sin ser el CTA de los botones
  principales. El `data-cta="whatsapp"` del hero y de `#auditoria` **apunta al formulario**
  en esta página.
- *Dónde trabajamos*: **España · Perú** (se invierte el orden respecto a la home peruana).
- El texto peruano *"El número es español porque Luis vive allá…"* **desaparece**: acá no
  hay nada que justificar.

## A.10 — Legales

| Home peruana | `/es-es/` |
|---|---|
| Ley 29733 de Protección de Datos Personales del Perú | **RGPD (Reglamento UE 2016/679) y LOPDGDD (LO 3/2018)** |
| «Si escribes desde Perú…» | «Si escribes desde España…» |

El resto del bloque (*no cedemos a terceros*) se queda **palabra por palabra**: es la
promesa que sostiene el muro de consentimiento de la Fase 13 y no se toca.

⚠️ Las tres páginas legales de la raíz **no se duplican en esta fase**: `/es-es/` enlaza a
las que ya hay. **Medido el 2026-08-09:** solo `politica-privacidad.html` cita el RGPD (2
veces); **`aviso-legal.html` y `politica-cookies.html` no lo nombran ni una vez**, y el
aviso legal tampoco cita la LSSI-CE, que es la que obliga a los datos identificativos en
un sitio que vende desde España.

Con la web mirando solo a Perú eso pasaba; con una página que capta clientes españoles,
no. **No se arregla en esta fase** —ampliar sobre la marcha es lo que la ficha prohíbe—
pero queda anotado: **backlog nº 22**, y hay que resolverlo **antes de publicar `/es-es/`**,
no después.
