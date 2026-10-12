# Proyecto NouWeb — Contexto permanente

> Este archivo se carga automáticamente en cada chat nuevo abierto en esta carpeta.
> **Antes de hacer nada, lee `docs/ESTADO.md`** para saber en qué fase estamos.

---

## 1. Qué es este proyecto

Sitio web de **Nouweb** (nouweb-es.com), en reestructuración. Se está pasando de una web
de "agencia de diseño web" genérica a un **posicionamiento de consultoría tecnológica
e integración de sistemas** para pymes.

Stack actual: HTML + CSS + JS vanilla, sin framework ni build. Backend PHP mínimo
(login + dashboard), pensado para el antiguo hosting IONOS.

**Desde el 2026-10-12: repositorio privado en GitHub (`Lulito92/nouweb`) y hosting en
Vercel**, que publica solo con un `git push` a `main`. Tres cosas cambian:

- ⚠️ **Vercel publica SOLO lo que lista `.vercelignore`** (lista blanca). El repo guarda
  `CLAUDE.md`, `docs/` y `backend/`, y no deben servirse. **Una página o carpeta nueva del
  sitio hay que añadirla ahí con `!`, o dará 404.**
- ⚠️ **El `.htaccess` ya no se lee.** Redirecciones (`/` y `/es/` → `/es-es/`), caché y
  cabeceras de seguridad viven en **`vercel.json`**. Se conserva el `.htaccess` por si se
  vuelve a Apache.
- ⚠️ **Vercel no ejecuta PHP**: el login de clientes (`login.html` → `backend/`) no funciona
  allí. Los formularios sí, porque van a Formspree.

---

## 2. Posicionamiento (decidido, no reabrir sin motivo)

Nouweb vende **tres servicios que son tres fases consecutivas**:

1. **Diagnóstico** — análisis de procesos de negocio (*business process analysis*)
2. **Migración** — *replatforming* de eCommerce obsoletos, con UX y responsive reales
3. **Integración** — selección de un CRM de pago que encaje, e integración con la web

Etiqueta paraguas: **consultora tecnológica e integrador de soluciones de negocio
para pymes**.

### Reglas de mensaje

- ❌ **No usar "transformación digital" como titular.** Está quemado en España por el
  Kit Digital y resta credibilidad. Vale solo como palabra secundaria de SEO.
- ❌ **Nouweb NO fabrica software de gestión.** Es partner/integrador. Insinuar lo
  contrario genera una decepción en la primera reunión.
- ✅ La independencia es argumento de venta: *"no vendemos nuestro propio CRM, por eso
  podemos recomendarte el que de verdad te encaja"*.

---

## 3. Cliente objetivo

| Atributo | Valor |
|---|---|
| Tamaño | Pymes de **3 a 50 trabajadores** |
| Volumen | **+200 pedidos/mes** |
| Mercado 1 | **Perú** (actual) |
| Mercado 2 | **España** (abierto el 2026-08-09, decisión de Luis) — ver § 4bis y ⚠️ § 5 |
| Mercado 3 | EE.UU. (futuro) |
| Mercado 4 | Suiza de habla alemana (futuro) |

---

## 4. Contexto de mercado peruano (crítico para el copy)

- **Idioma: español peruano, no de España.** Ustedes (nunca vosotros), computadora
  (no ordenador), celular (no móvil). **Prohibido el verbo "coger"** — es vulgar en Perú.
- **Moneda: soles (S/ / PEN).** Decisión de Luis del 2026-07-20; antes decía USD, se
  corrigió porque en Perú se factura y se compra en soles. El impuesto local es
  **IGV 18%** (no IVA).
- **Facturación electrónica SUNAT** es obligatoria (vía OSE/PSE). Toda integración
  debe contemplarla. Mencionarla = credibilidad local inmediata.
- **WhatsApp es EL canal de venta**, no un canal secundario. Un CRM sin WhatsApp
  Business API no le sirve al cliente objetivo. Gancho comercial principal:
  *"tus pedidos entran por WhatsApp y se pierden en un chat"*.
- **Pasarelas locales:** Niubiz, Izipay, Culqi, Mercado Pago, Yape, Plin.
- **Plataformas eCommerce:** Shopify (incl. OS 2.0), VTEX (fuerte en LatAm),
  WooCommerce, PrestaShop y Magento antiguos (el caladero de replatforming).
  También **Tiendanube/Nuvemshop y Jumpseller**, muy usados por pymes en Perú y Chile.
- **Vender solo en marketplace** (Mercado Libre, Falabella, Ripley) sin tienda propia es
  una situación muy común y **un origen de migración de primer orden**: comisión alta y
  cero control del cliente.

### Migraciones: destinos (decisión del 2026-07-21)

Shopify / Shopify Plus · **WooCommerce** · VTEX · Shopify headless o a medida.

> ⚠️ **WooCommerce como destino salió el 2026-07-20 y volvió a entrar el 2026-07-21**,
> las dos veces por decisión de Luis. Es un ida y vuelta deliberado, **no un error que
> haya que corregir**.

Frase de posicionamiento asociada, que es **la diferencia con el competidor**:
*"No toda migración termina en la misma plataforma. Primero miramos tu operación y tu
volumen; después decidimos a dónde."*

---

## 4bis. Contexto de mercado español (solo para `/es-es/`)

Lo mínimo que no se puede equivocar. El detalle vive en `docs/fases/FASE-14-mercados.md`,
no acá, para no cargarlo en todos los chats.

- **Español de España, no peruano.** Vosotros, ordenador, móvil, "coger" **sí se usa**.
  Es la trampa nº 1: § 4 dice justo lo contrario y aplica **solo a Perú**.
- **IVA 21 %** (no IGV 18 %). **Euros (€)**, no soles. **Hacienda / AEAT**, no SUNAT.
- **Verifactu** (Ley Antifraude, RD 1007/2023) es el equivalente de SUNAT como gancho de
  credibilidad. ⚠️ **Sus fechas de entrada en vigor se han aplazado varias veces: no se
  escribe ninguna fecha sin que Luis la verifique** — `{{PENDIENTE: ...}}` (§ 6.3). Una
  fecha mal puesta en la web de quien vende facturación es peor que no mencionarla.
- **WhatsApp NO es el canal de venta.** El gancho peruano (*"tus pedidos se pierden en un
  chat"*) no se traduce: en España se vende por email, teléfono y marketplace.
- **Pasarelas:** Redsys, Bizum, Stripe, PayPal (no Yape, Plin, Niubiz, Izipay, Culqi).
- ❌ **Kit Digital / "transformación digital": siguen prohibidos** (§ 2), y en España más.

---

## 5. Perfil de Luis (para la sección "Sobre mí")

Ingeniero de software full stack, **peruano radicado en España**. Trabaja en una
agencia digital española y se especializa en soluciones de gestión empresarial.
Habla inglés y algo de alemán.

> ⚠️ **No nombrar a la agencia empleadora en la web.** Usar su marca para captar
> clientes propios puede chocar con el contrato (exclusividad / no competencia) y con
> su política de marca. La fórmula aprobada es *"agencia digital española"*, sin nombre.
> Solo se nombra si Luis confirma que tiene permiso por escrito.

> ⚠️ **Abrir el mercado España (§ 3) sube ese riesgo, y es cosa de Luis, no de Claude.**
> Vender consultoría a pymes **peruanas** casi no roza a su empleador; vender a pymes
> **españolas** es competencia directa y es justo lo que suele cubrir una cláusula de no
> competencia. Está avisado, Luis decidió seguir el 2026-08-09, y se ejecuta. **Que él lo
> mire con su contrato delante antes de publicar `/es-es/`** — anotado como pendiente.
>
> ✅ **Resuelto el 2026-10-12: Luis confirma que ya revisó el contrato** y decidió publicar
> `/es-es/` (pendiente nº 21 cerrado).

---

## 6. Reglas de honestidad comercial (innegociables)

Estas tres reglas protegen la credibilidad del sitio ante un comprador que verifica.

### 6.1 Badges de Partner

Los directorios de partners de HubSpot, Zoho y Odoo son **públicos y gratuitos**. Un
badge falso se detecta en 20 segundos y elimina a Nouweb de la comparativa.

- Los **logos de los 9 CRM se muestran ya**, bajo el encabezado
  **"Integramos con las principales plataformas CRM"** (afirmación cierta hoy).
  Desde el 2026-08-10 son **archivos propios en `Imagenes/crm/`**, no de un tercero.
  ⚠️ **Klaviyo entró el 2026-08-10** por decisión de Luis, y se vende a sí mismo como
  *"B2C CRM"*: cabe bajo ese encabezado. Va **destacado solo en España**; **Kommo va
  destacado solo en Perú**, porque su gancho es WhatsApp (§ 4bis).
- La palabra **"Partner"** solo aparece cuando el programa esté aprobado de verdad.
- Texto puente permitido mientras tanto: *"Partner en proceso de certificación con
  HubSpot, Zoho y Kommo."*
- Implementación: array en JS con `partner: false, enProceso: true`. Cuando llegue la
  aprobación se cambia a `true` y el badge aparece solo, sin tocar HTML.

**Estado hoy:**
- **CRM (Klaviyo, HubSpot, Zoho, Kommo y los demás): Luis NO es partner de ninguno todavía.**
- **Shopify: Luis declara ser Shopify Partner (2026-07-21).** Se publica.

> ⚠️ **"Shopify Partner" ≠ "Shopify Plus Partner".** El primero es gratuito y de alta
> inmediata; el segundo es selectivo, con umbrales de facturación. **Nunca escribir
> "Plus Partner"** mientras no esté aprobado. Los dos son verificables en el directorio
> público de Shopify.

### 6.2 Logos de clientes

- Solo se publican **colaboraciones reales y con permiso**.
- **Misako** es real: Luis fue responsable de la **migración a Shopify OS 2.0**.
  Luis confirma que tiene permiso para usar el logo.
- El resto de huecos quedan **reservados y vacíos** hasta que Luis dé datos reales.
  No se rellenan con marcas inventadas bajo ningún concepto.

### 6.3 Sin métricas inventadas

Ningún porcentaje, cifra de resultado ni testimonio se escribe sin que Luis lo aporte.
Si falta el dato, se deja un marcador visible `{{PENDIENTE: ...}}`.

---

## 7. Arquitectura del sitio (decidida)

| Decisión | Detalle |
|---|---|
| Home real en la raíz | **Desde el 2026-10-12 no hay `/index.html`**: `/` redirige (**302**) a `/es-es/`. El antiguo selector de idioma desaparece. |
| Canónica ES | Cada versión es canónica de sí misma: `/es-es/` y `/es-pe/`. `/es/` → **301 a `/es-es/`**. |
| Sin redirección automática por idioma | Rompe el rastreo de Google. En su lugar: **banner superior discreto** ofreciendo EN/DE si el navegador no es español, con la elección guardada en cookie. |
| **Mercados en español** (2026-08-09, **cambiado el 2026-10-12**) | ⚠️ **España sale primero** (decisión de Luis del 2026-10-12): `/` → **302 a `/es-es/`**. **Perú vive en `/es-pe/`** (era la raíz y se mudó entera). El 302 y no 301 es a propósito: el navegador guarda un 301 para siempre y esta decisión ya ha cambiado una vez. |
| **Sin reparto por país** | Misma regla que el idioma, mismo motivo: **Googlebot rastrea desde EE.UU.** y solo vería una variante. El país se detecta con la **zona horaria** del navegador y se ofrece cambiar con **`#pais-banner`** (hermano de `#lang-banner`, misma clase CSS, misma lógica en `script.js`; cookies `nw_pais_banner` y `nw_lang_banner`, 180 días). Solo sale **una** barra a la vez y el idioma tiene prioridad. **Nunca redirigir según idioma, país o IP.** La redirección de `/` a `/es-es/` es la misma para todo el mundo, Googlebot incluido: no rompe esta regla. |
| hreflang | `x-default` → `/es-es/`, `es-PE` → `/es-pe/`, `es-ES` → `/es-es/` (nunca a `/`, que redirige), `en` → `/en/`, `de` → `/de/`. ⚠️ **Recíprocos o no valen nada**: cada carpeta declara el grupo entero, incluida ella misma. |
| Assets | La home nueva usa **un solo** `/styles.css` y `/script.js`. Es el primer paso para matar la triplicación existente. |
| EN y DE | **Congelados** tal como están hasta cerrar el ES. Se traducen en las fases 6 y 7. |

### Deuda conocida (no tocar ahora, está registrada)

El sitio tiene `styles.css` y `script.js` **triplicados** en `/`, `/es`, `/en` y `/de`,
ya divergidos entre 286 y 333 líneas. Se corrige progresivamente, empezando por la home.

> ⚠️ **El `/script.js` de la raíz adelgazó mucho en la Fase 13** (115 → 61 KB): se le quitó
> el sistema de idiomas viejo, 6 servicios de la agencia y el carrusel de precios. **Las
> copias de `/en`, `/de` y `/es` NO se tocaron** y siguen teniendo todo eso. Al traducir
> (fases 6 y 7) conviene partir del `/script.js` nuevo y ligero, no del viejo de esas
> carpetas.

---

## 8. Conversión

- **Auditoría gratuita** como puerta de entrada (no de pago, decisión de Luis).
- Calificada: *"gratuita para negocios con intención real de implementar, ahora o a
  mediano plazo"*.

### Publicidad de pago y seguimiento (Fase 13, 2026-07-23)

Luis hace publicidad en Google Ads, Meta (Facebook/Instagram) y TikTok. El seguimiento
está **montado y apagado** en un solo sitio: el objeto **`MARKETING`** de `script.js`.
Detalle y guía de encendido en `docs/ESTADO.md` § Encender el seguimiento.

> ⚠️ **Ningún píxel puede cargar sin consentimiento.** El banner de cookies bloquea de
> verdad desde la Fase 13 (antes solo guardaba el clic). Esto es innegociable: la web
> promete RGPD y Ley 29733 y dice "no cedemos a terceros" (§ 6), así que cargar un píxel
> antes del "Acepto" incumple en la propia web. **Cualquier plataforma nueva se NOMBRA en
> `politica-cookies.html`.**

> ⚠️ **Y no solo las plataformas: TODO lo que el navegador guarde.** La regla se leyó
> durante meses como *"declara los píxeles de terceros"*, y así `nw_lang_banner` —cookie
> **propia**, técnica, 180 días— pasó desde la Fase 1 hasta el 2026-08-10 sin declararse.
> **La pregunta no es "¿esto es un tercero?" sino "¿el navegador guarda algo?"** Hoy están
> declaradas las siete: `PHPSESSID`, `nw_consent_v1`, `nw_lang_banner`, `nw_pais_banner` y
> las de Google, Meta y TikTok.

> ⚠️ **La conversión a optimizar es `formulario_enviado`, no el clic de WhatsApp.** El
> formulario es intención real; el clic de WhatsApp a veces es curiosidad. Los dos eventos
> se mandan, pero solo el primero debe marcarse como conversión en las campañas.
- El formulario filtra con dos preguntas: **cuándo planea implementar** y
  **cuántos pedidos maneja al mes**.
- **CTA principal = WhatsApp**, no teléfono. Luis solo tiene número español (+34) y
  para un peruano es llamada internacional y "no es de acá". El +34 va en el pie,
  donde refuerza el pitch de "peruano radicado en España".
- Precios en **soles (S/)**, sin tarifa pública: solo "desde S/ X" para proyectos.
  (Corregido de USD a soles el 2026-07-20, decisión de Luis.)

---

## 9. Reglas de trabajo para cada chat

1. **Leer `docs/ESTADO.md` primero.** Dice qué fase toca y qué quedó a medias.
2. **Una fase por chat.** No adelantar trabajo de fases posteriores.
3. **Antes de sobrescribir un archivo, su versión anterior tiene que estar en un commit**
   (hay git desde el 2026-10-12). Si no lo está, copia en `Backup/DD-MM/`. `Backup/` no
   se sube a GitHub (`.gitignore`). ⚠️ **Hacer `git push` es publicar**: Vercel despliega
   `main` sola, así que no se empuja nada a medio hacer.
4. **`backend/` está fuera de alcance.** Tiene incidencias de seguridad conocidas y
   registradas en `docs/ESTADO.md` § Backlog. No se tocan sin petición explícita.
5. **Al terminar la fase**: marcarla en `docs/ESTADO.md`, anotar lo aprendido y dejar
   escrita la frase exacta con la que Luis debe arrancar el siguiente chat.
6. Si falta un dato de Luis, **no inventarlo**: dejar `{{PENDIENTE: ...}}` y anotarlo
   en `docs/ESTADO.md` § Pendientes de Luis.
7. **Todo copy se escribe para UN mercado.** Antes de redactar, mirar en qué carpeta cae
   el archivo: `/es-pe/` y el blog = Perú (§ 4), `/es-es/` = España (§ 4bis). Son reglas opuestas.

> 📋 **El protocolo exacto de abrir y cerrar una sesión está en
> [`docs/SESIONES.md`](docs/SESIONES.md)**: los tres pasos de arranque, el checklist de
> cierre y la plantilla del traspaso al chat siguiente. Es el arnés de sesiones; esta
> lista de 7 son las reglas de fondo que no cambian.

---

## 10. Mapa de archivos del arnés

```
CLAUDE.md                          ← este archivo (contexto permanente)
docs/
  ESTADO.md                        ← tablero: fase actual, avance, pendientes, backlog
  SESIONES.md                      ← arnés de sesiones: abrir chat, cerrar chat, traspaso
  COMPETENCIA.md                   ← ficha de competidores (Cluster)
  DISENO.md                        ← sistema de diseño: tokens, tipografía, escalas
  GUIA-PUBLICIDAD.md               ← encender los píxeles de Ads, paso a paso (para Luis)
  fases/
    FASE-1-base-tecnica.md         ✅
    FASE-2-mensaje-copy.md         ✅
    FASE-3-stack-tecnico.md        🟢 publicable
    FASE-4-prueba-social.md        ✅
    FASE-5-conversion.md           ✅
    FASE-11-sistema-diseno.md      ✅
    FASE-8-proceso-credenciales.md ✅
    FASE-9-migraciones.md          ✅
    FASE-10-blog.md                ✅
    FASE-12-pulido-final.md        ✅
    FASE-14-mercados.md            ✅ España /es-es/ (4 sesiones, cerrada el 2026-08-10)
    FASE-6-ingles.md               ← siguiente
    FASE-7-aleman.md
```

⚠️ **Los números son identificadores, no el orden.** Se ejecutaron
**11 → 8 → 9 → 10 → 12 → 6 → 7**. La 11 (tokens de diseño) fue la primera para que las
secciones nuevas nacieran ya con el acabado bueno. Las traducciones van las últimas:
traducir una home que todavía va a cambiar obliga a traducirla dos veces.

> ✅ **El español está cerrado desde el 2026-07-22** (Fase 12). Solo quedan **6 → 7**.

---

## 11. Competencia

**[Cluster](https://cluster.global/)** es el competidor directo localizado el 2026-07-21:
agencia **Shopify-exclusive** en LatAm, migraciones VTEX y Magento → Shopify Plus, con
clientes peruanos (Incalpaca, Kuna, Dermotienda). Ficha completa en `docs/COMPETENCIA.md`.

**Sirve de referencia de nivel visual, nunca de plantilla.** Dos reglas:

1. **No copiar su copy, sus imágenes ni su diseño concreto.** Las ideas de layout no se
   protegen; el texto y los assets sí.
2. **No replicar su banda de métricas.** Ellos publican 2,88 % de conversión y $48 M
   facturados, ganados en 10 años. Nouweb no tiene esas cifras y **no se inventan**
   (§ 6.3). La banda de Nouweb comunica **capacidades verificables**, no resultados.

**El hueco de Nouweb frente a ellos:** Cluster es Shopify-exclusive, así que toda
migración termina en Shopify. Nouweb es independiente de plataforma y de CRM, y analiza
procesos antes de recomendar. **Esa diferencia desaparece si Nouweb se disfraza de
Cluster.**

---

## 12. Diseño

**Todo valor de CSS nuevo sale de `docs/DISENO.md`.** Tamaños, colores, espaciados,
radios y tiempos están declarados ahí como variables en `:root`. Si hace falta uno que no
existe, **se añade primero al documento** y se justifica. Nada a ojo.

El CSS viejo (3.498 líneas, heredado de la triplicación) **se migra por secciones, según
se van tocando.** No se reescribe de golpe.

Acento del sistema: **cian `#06b6d4`**, ya existente. Usar `var(--accent)`, nunca un
rgba inventado.

### Los dos colores de acento (decisión del 2026-07-22, Fase 12)

Queda **una sola rampa: azul `#3b82f6` → cian `#06b6d4`**, y cada color tiene su papel:

- **Cian = información.** Rótulos, cifras, chips, iconos de lista, bordes activos.
- **Azul = acción.** Solo el degradado de los botones llenos y sus sombras.

> **Regla corta:** si se puede **pulsar**, la rampa azul → cian. Si solo se puede **leer**,
> cian a secas. Un texto que no es un enlace nunca lleva azul.

⚠️ **El morado `#8b5cf6` se retiró**, por decisión de Luis. La variable
`--secondary-color` sigue existiendo pero **apunta a `--accent`**, así que los usos
heredados se convirtieron solos. **No devolverle un color propio** sin decisión suya.
Detalle en `docs/DISENO.md` § 11.

### Accesibilidad (Fase 12)

⚠️ **Nunca escribir `outline: none` sin poner un foco propio en la misma regla.** El sitio
llegó a la Fase 12 sin ningún estilo de foco y con dos `outline: none` en el formulario.
El anillo global (`:focus-visible`) y sus tokens están en `docs/DISENO.md` § 10.
