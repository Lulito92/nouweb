# Cómo encender el seguimiento de publicidad

Escrito para ti, Luis, no para un programador. **No hay que programar nada:** se
copian cuatro identificadores de cuatro paneles y se pegan en un sitio.

Tiempo real: **unos 40 minutos la primera vez**, casi todo peleándote con los
paneles de Google y Meta, no con la web. Encender una sola plataforma son 10.

> **Lo que hay que asumir de entrada:** esto mide *tu* web. Que un anuncio
> funcione o no es otra conversación. Lo que esto hace es que **dejes de pagar a
> ciegas**: sin eventos, Google y Meta solo saben venderte clics baratos, y el
> clic barato casi nunca es el que compra.

---

## Antes de empezar: lo que ya está hecho

Todo el sistema está montado desde la Fase 13. **No hay que tocar el HTML, ni
los botones, ni el formulario.** Ya están cableados:

| Ya funciona | Dónde está |
|---|---|
| Aviso de cookies que **bloquea de verdad** | `script.js` |
| Consent Mode v2 de Google, en `denied` por defecto | `script.js` |
| Los píxeles de Google, Meta y TikTok, apagados | `script.js` |
| Las **dos conversiones** ya cableadas a las tres plataformas | `script.js` |
| Las tres plataformas **ya declaradas** en la política de cookies | `politica-cookies.html` |
| Botón de retirar el consentimiento (lo exige el RGPD) | `politica-cookies.html` § 9 |

Lo único que falta son **cuatro números**. En cuanto pongas uno, esa plataforma
se enciende sola y aparece el aviso de cookies. Mientras estén los cuatro
vacíos, la web no pone ni una cookie de terceros y **no muestra el aviso** — eso
es a propósito: pedir permiso para algo que no pasa entrena a la gente a aceptar
sin leer.

### Las dos conversiones que ya se mandan

| Evento | Cuándo se dispara | Para qué sirve |
|---|---|---|
| **`formulario_enviado`** | Al enviar el formulario de `#contacto` | **ESTA es la conversión a optimizar.** Va con el plazo y el volumen de pedidos, para que las plataformas aprendan a buscar clientes buenos y no curiosos. |
| `contacto_whatsapp` | Al pulsar **cualquiera** de los 4 botones de WhatsApp | Sirve para *ver* qué secciones mueven. **No la marques como conversión:** el clic de WhatsApp a veces es solo curiosidad, y si la optimizas le enseñas a la campaña a buscar curiosos. |

> ⚠️ **`formulario_enviado` NO manda nombre, correo ni teléfono.** Solo las dos
> respuestas de calificación. Es deliberado: son datos personales y no tienen por
> qué salir del formulario. No lo cambies sin pensarlo dos veces.

---

## Paso 1 — Sacar los cuatro identificadores

Puedes hacer solo los que uses ahora y dejar el resto en `null`. Cada plataforma
es independiente.

### 1.1 Google Ads → `AW-XXXXXXXXX`

1. Entra en **Google Ads** → icono de herramientas (arriba a la derecha).
2. **Configuración › Etiqueta de Google** (en inglés, *Google tag*).
3. Copia el **ID de la etiqueta**. Empieza por `AW-` y sigue con 9-11 dígitos.

Si nunca has creado la etiqueta, ese mismo panel te la crea. No instales el
código que te ofrece pegar: **ya está en la web**, solo falta el número.

### 1.2 Google Analytics 4 → `G-XXXXXXXXXX`

1. Entra en **Google Analytics** → **Administrar** (rueda dentada, abajo a la izquierda).
2. **Flujos de datos** → pulsa tu flujo web (o crea uno con `nouweb-es.com`).
3. Copia el **ID de medición**. Empieza por `G-`.

> **Pon los dos, Ads y GA4, aunque creas que con Ads te basta.** En el Paso 6 vas
> a ver por qué: la forma limpia de que Google Ads cuente tu conversión pasa por
> GA4. Sin GA4 hay que tocar código.

### 1.3 Meta (Facebook e Instagram) → `1234567890...`

Facebook e Instagram **comparten el mismo píxel**. Es uno solo, no dos.

1. Entra en **Meta Business Suite** → **Administrador de eventos**.
2. **Orígenes de datos** → tu píxel (o **Conectar orígenes › Web** para crearlo).
3. Copia el **ID del píxel**. Son 15-16 dígitos, sin letras y sin prefijo.

### 1.4 TikTok → `XXXXXXXXXXXX`

1. Entra en **TikTok Ads Manager** → **Herramientas › Eventos**.
2. **Eventos del sitio web** → tu píxel (o **Configurar eventos web** para crearlo).
3. Cuando te pregunte el método de instalación elige **Instalación manual del
   código del píxel** — no el Partner ni el Google Tag Manager.
4. Copia el **ID del píxel**. Unos 20 caracteres entre letras y números.

---

## Paso 2 — Pegarlos en `script.js`

Abre **`script.js`** (el de la raíz, no los de `/en`, `/de` o `/es`) con
Notepad++ o VS Code y busca:

```
👉 LUIS
```

Está sobre la **línea 1236**. Justo debajo verás esto:

```js
const MARKETING = {
    googleAds: null,
    ga4:       null,
    metaPixel: null,
    tiktok:    null
};
```

Sustituye los `null` que vayas a usar por tu identificador **entre comillas
simples**:

```js
const MARKETING = {
    googleAds: 'AW-123456789',
    ga4:       'G-ABC1234567',
    metaPixel: '1234567890123456',
    tiktok:    'CQWERTYUIOP12345ASDF'
};
```

**Las tres reglas que evitan el 99 % de los errores:**

1. **Comillas simples alrededor del número**, siempre. Incluso en los de Meta y
   TikTok, que parecen números. Sin comillas, la web deja de funcionar entera.
2. **La coma al final de cada línea menos la última.** Fíjate: las tres primeras
   llevan coma, `tiktok` no.
3. **Lo que no uses, se queda en `null`** — sin comillas. `null` no es `'null'`.

❌ `googleAds: AW-123456789,` → sin comillas, rompe la web
❌ `metaPixel: 1234567890123456,` → sin comillas, rompe la web
❌ `tiktok: 'null',` → eso enciende TikTok con un ID inventado
✅ `tiktok: null`

---

## Paso 3 — Subir el número de versión (`?v=`)

**Este paso no es opcional y es el que más se olvida.**

El servidor le dice al navegador que guarde `script.js` **durante un año** sin
volver a preguntar. Eso es lo que hace la web rápida, pero significa que si
subes el archivo sin cambiar el `?v=`, **quien ya visitó la web seguirá con la
versión vieja y sin píxeles durante un año**. Tú lo verás bien en tu computadora
y estarás midiendo la mitad del tráfico.

Hoy el sitio va por **`?v=29`**. Hay que dejarlo todo en **`?v=30`**.

Busca `?v=29` y reemplázalo por `?v=30` en estos **7 archivos**:

```
index.html
aviso-legal.html
politica-privacidad.html
politica-cookies.html
blog/index.html
blog/pedidos-por-whatsapp-como-dejar-de-perderlos.html
blog/_plantilla.html
```

> En Notepad++: **Buscar › Reemplazar en archivos**, carpeta del proyecto,
> `?v=29` → `?v=30`. Marca que **no** entre en `Backup` ni en `docs`.

La próxima vez que subas algo será `?v=31`, y así.

---

## Paso 4 — Subir por FTP

Sube estos 8 archivos, respetando las carpetas:

```
script.js                ← el que acabas de editar
index.html
aviso-legal.html
politica-privacidad.html
politica-cookies.html
blog/index.html
blog/pedidos-por-whatsapp-como-dejar-de-perderlos.html
blog/_plantilla.html
```

**No subas `Backup/` ni `docs/`.**

---

## Paso 5 — Comprobar que funciona (10 minutos, no te los saltes)

Ábrelo en una **ventana de incógnito** (Ctrl+Mayús+N). Es importante: en tu
ventana normal ya tienes guardada una decisión de cookies de las pruebas.

Pulsa **F12** para abrir las herramientas de desarrollador y vete a la pestaña
**Red** (*Network*). En el recuadro de filtro escribe:

```
googletagmanager
```

### Prueba 1 — Antes de aceptar no debe cargar NADA

1. Recarga la página (Ctrl+F5).
2. A los ~1 segundo aparece el aviso de cookies abajo. **No lo toques.**
3. Mira la lista de Red: **tiene que estar vacía.**

Repite el filtro con `facebook` y con `tiktok`. Los tres, vacíos.

> Si aquí ya carga algo, **para y avísame**. Significa que un píxel se está
> cargando sin permiso, y eso incumple lo que la propia web promete en sus
> páginas legales.

> ⚠️ **Un falso positivo que te va a confundir:** en la pestaña **Aplicación ›
> Cookies** puede quedarte una cookie `_gcl_au` de pruebas anteriores. **Ponerla
> no la pone esta página**: es residuo del navegador. Bórrala antes de mirar, o
> te vas a volver loco buscando un fallo que no existe. Me pasó al probar esto.

### Prueba 2 — Al aceptar, sí carga

1. Pulsa **«Acepto»**.
2. La lista de Red se llena: `gtag/js?id=AW-...`, `fbevents.js`, `events.js`.
3. En la pestaña **Consola**, escribe `window.dataLayer` y pulsa Enter. Tiene que
   devolver una lista con cosas dentro, no `undefined`.

### Prueba 3 — Al rechazar, no carga y se acuerda

1. Abre otra ventana de incógnito nueva.
2. Pulsa **«Rechazar»**. La lista de Red sigue vacía.
3. **Recarga.** El aviso **no** debe volver a salir, y sigue sin cargar nada.

### Prueba 4 — Se puede cambiar de opinión

1. Vete a `nouweb-es.com/politica-cookies.html`, al final del todo (§ 9).
2. Pulsa **«Cambiar mis preferencias»**. Debe llevarte a la home con el aviso
   otra vez visible.

### Prueba 5 — Las conversiones llegan de verdad

Con las cookies **aceptadas**:

1. Pulsa un botón de WhatsApp. En **Meta › Administrador de eventos › Probar
   eventos** debe aparecer `contacto_whatsapp` en unos segundos.
2. Envía el formulario con datos de prueba. Debe aparecer `formulario_enviado`.

Para Google, el equivalente es **Google Ads › Herramientas › Etiqueta de Google
› Comprobar**, o el informe **Tiempo real** de GA4.

---

## Paso 6 — Marcar la conversión en cada plataforma

Ya se está midiendo. Ahora hay que decirle a cada plataforma **cuál de los dos
eventos es "ganar un cliente"**, que es lo que usa para optimizar.

En las tres: **la conversión es `formulario_enviado`.** `contacto_whatsapp` se
deja como evento de consulta, sin marcar.

### 6.1 Google Ads — el paso con trampa, léelo entero

La web manda el evento como `gtag('event', 'formulario_enviado', …)`. Eso GA4 lo
entiende perfecto; **Google Ads, por sí solo, no**. Google Ads espera además una
"etiqueta de conversión" que es distinta para cada acción que crees.

**La ruta que funciona sin tocar el código** (y por eso te pedí poner GA4 en el
paso 1.2):

1. En **GA4 › Administrar › Eventos**, espera a que aparezca
   `formulario_enviado` (tarda hasta 24 h en salir en la lista).
2. Márcalo como **evento clave** (antes se llamaba "conversión").
3. En **Google Ads › Herramientas › Vinculaciones**, vincula tu propiedad de GA4.
4. En **Google Ads › Objetivos › Conversiones › Nueva acción › Importar › GA4**,
   importa `formulario_enviado`.
5. En la configuración de tus campañas, déjalo como **objetivo de conversión
   principal** y quita los demás.

> **Si prefieres no usar GA4**, la alternativa es crear la conversión directamente
> en Google Ads y meter su *etiqueta de conversión* en el código. Son **dos
> líneas** en `script.js`, pero hay que tocar código: dímelo y lo hago. La ruta
> por GA4 no requiere tocar nada y además te deja los informes de GA4, que son
> mejores. Recomiendo esa.

### 6.2 Meta

1. **Administrador de eventos › Conversiones personalizadas › Crear**.
2. Origen: tu píxel. Evento: `formulario_enviado` (aparece bajo *eventos
   personalizados* en cuanto se dispare una vez).
3. Ponle de nombre "Auditoría solicitada" y categoría **Cliente potencial**.
4. En el conjunto de anuncios, objetivo de optimización: esa conversión.

> Meta necesita **unas 50 conversiones por semana** para salir del modo
> aprendizaje. Con poco volumen puede tener sentido optimizar temporalmente por
> `contacto_whatsapp`, que ocurre más. Es la única excepción a la regla de arriba,
> y es temporal.

### 6.3 TikTok

1. **Herramientas › Eventos › Eventos del sitio web** → tu píxel.
2. Busca `formulario_enviado` en la lista de eventos recibidos.
3. Úsalo como objetivo de optimización del grupo de anuncios.

> ⚠️ **TikTok trabaja mejor con sus nombres estándar** (`SubmitForm`, `Contact`).
> Un evento con nombre propio se recibe y se ve, pero puede que TikTok **no te
> deje elegirlo como objetivo de optimización**. Compruébalo en el paso 3: si no
> aparece en la lista de objetivos, avísame y le cambio el nombre a `SubmitForm`
> solo para TikTok — es una línea de `script.js`.

---

## Si algún día añades una plataforma nueva (LinkedIn, Pinterest…)

Tres cosas, y **las tres son obligatorias**:

1. Añadir su identificador a `MARKETING` y su bloque de carga dentro de
   `cargarMarketing()`, en `script.js`.
2. **Nombrarla en `politica-cookies.html`**, en la tabla del § 3 y en la lista
   del § 6, con su duración y su enlace de privacidad. Un píxel que no está
   declarado en la política es exactamente el problema que todo este sistema
   viene a evitar.
3. Subir `CONSENT_KEY` de `'nw_consent_v1'` a `'nw_consent_v2'` en `script.js`.
   Esto hace que quien aceptó la lista vieja **vuelva a ver el aviso**, en vez de
   quedar consintiendo algo que nunca vio.

Pídemelo y lo hago; los tres pasos juntos son 15 minutos.

---

## ⚠️ Dos cosas del análisis del 2026-07-23 que afectan a esto

Salieron auditando el proyecto, **no bloquean encender el seguimiento**, pero
las dos tocan justo la conversión que vas a optimizar. Decide tú.

### 1. El formulario puede perder conversiones al enviarse

El formulario hace POST a Formspree y **no lleva página de retorno** (`_next`).
Pasan dos cosas:

- El visitante acaba en una página genérica de `formspree.io`. Se rompe la marca
  justo en el mejor momento.
- El evento `formulario_enviado` se dispara **mientras el navegador ya está
  saliendo de la página**, así que a veces no llega a salir. Vas a
  **contar menos conversiones de las que tienes**, y la campaña va a aprender con
  datos incompletos.

**Se arregla con una línea** en `index.html` y una página de gracias:
`<input type="hidden" name="_next" value="https://nouweb-es.com/gracias.html">`.
De paso, esa página de gracias es una URL medible, que es la forma más fiable de
contar conversiones que existe. **Recomiendo hacerlo antes de gastar en
anuncios.** Dímelo y lo monto.

### 2. La política de privacidad dice lo contrario de lo que va a pasar

[`politica-privacidad.html`](../politica-privacidad.html) § 6 afirma hoy:

> *"Los datos no se comunicarán a ningún tercero"* y *"No se prevén
> transferencias internacionales de datos"*.

En cuanto enciendas un píxel, eso deja de ser cierto: Google, Meta y TikTok son
terceros estadounidenses. (Y ya no es del todo cierto ahora mismo, porque el
formulario pasa por Formspree, que también lo es.)

`politica-cookies.html` sí está bien y los nombra a los tres. **La de privacidad
se quedó sin actualizar en la Fase 13.** Es media hora de trabajo y es
exactamente el tipo de incoherencia que este proyecto lleva evitando desde el
principio (`CLAUDE.md` § 6). Dímelo y la corrijo.

---

## Probado de verdad (2026-07-23)

Esta guía no está escrita de memoria: **se ejecutó entera** con los cuatro IDs
falsos del Paso 2, y después se revirtió todo a `null`. Lo que se comprobó:

| Prueba | Resultado |
|---|---|
| Consent Mode antes de aceptar | `denied` en las 4 señales ✅ |
| Antes de aceptar | **0 scripts, 0 peticiones, 0 cookies** ✅ |
| Al aceptar | Cargan Google (Ads **y** GA4), Meta y TikTok, y el Consent Mode sube a `granted` ✅ |
| `contacto_whatsapp` | Llega a las 3, con `origen=hero` ✅ |
| `formulario_enviado` | Llega a las 3, con `plazo=Ahora` y `pedidos=Más de 500` ✅ |
| Al rechazar | Nada carga, se guarda la decisión, y `nwEvento` **no manda nada aunque se le llame a mano** ✅ |
| Al recargar tras rechazar | El aviso no vuelve a salir y sigue sin cargar nada ✅ |

### El Paso 3 no es teoría: me pasó a mí haciendo esta prueba

Puse los IDs falsos, recargué… **y el aviso de cookies no salía.** Parecía roto.
No lo estaba: el navegador me estaba dando el `script.js` viejo **desde su
caché** (`transferSize: 0`), con los `null` dentro. En cuanto subí el `?v=`, salió
a la primera.

Si te saltas el Paso 3 vas a vivir esto mismo, pero peor: **a ti te funcionará**
—porque tu navegador sí descargará el archivo nuevo en algún momento— mientras
que a los visitantes que ya pasaron por la web les seguirá sirviendo la versión
sin píxeles **durante un año**. Estarías midiendo una parte del tráfico y
tomando decisiones de gasto con esos números.

---

## Resumen en 6 líneas

1. Copia los 4 identificadores de Google Ads, GA4, Meta y TikTok.
2. Pégalos en `MARKETING`, en `script.js` (busca `👉 LUIS`), **entre comillas**.
3. Cambia `?v=29` por `?v=30` en los 7 HTML.
4. Sube los 8 archivos por FTP.
5. Comprueba en incógnito: **antes de aceptar, nada; después, todo.**
6. Marca `formulario_enviado` como conversión. `contacto_whatsapp`, no.
