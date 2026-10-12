# Fase 6 — Inglés (mercado EE.UU.)

**Estado:** ⏸️ **Pausada el 2026-07-22, antes de tocar ningún archivo del sitio.**
**Bloqueada por:** la parada de validación del español (`ESTADO.md` § Parada recomendada)
**Tamaño:** grande

### Arrancar con

```
Lee docs/ESTADO.md y ejecuta la Fase 6.
```

---

## ⛔ Por qué está pausada

El 2026-07-22 se abrió el chat de la Fase 6 y **Luis decidió parar y validar primero**.
Es lo que este mismo documento pedía en su § "Antes de empezar" y lo que `ESTADO.md`
lleva recomendando desde la Fase 2.

**No se tocó ni un archivo del sitio.** Lo único que cambió ese día fueron estos dos
documentos.

**Se levanta la pausa cuando Luis haya enseñado la home a 3-4 conocidos del sector en
Perú** y sepamos si el copy español se sostiene. Las cuatro preguntas están en
`ESTADO.md` § Parada recomendada. La que decide es la primera: *después de leer solo la
primera pantalla, ¿a qué se dedica esta empresa?*

> El chat siguiente **no empieza a traducir**: empieza preguntando qué contestaron.
> Si el hero hay que reescribirlo, se reescribe **antes**, o se traduce dos veces.

---

## Decisiones ya tomadas (2026-07-22, Luis) — no reabrir

| Decisión | Qué implica |
|---|---|
| **El blog se queda solo en español** | El menú inglés **no lleva "Blog"**. `/blog/` sigue **sin declarar `hreflang`** a `/en/blog` ni `/de/blog`, que no existen. Cierra el aviso nº 17 del backlog. Beneficio lateral: el menú inglés se ahorra los ~63 px que cuesta cada entrada (`DISENO.md` § 9). |
| **CTA principal de `/en/` = formulario + email** | El botón principal baja al formulario; el email queda visible. **Sin botón flotante de WhatsApp y sin CTA de WhatsApp** en `/en/`. El **+34 se queda solo en el pie**, como dato de ubicación, sin invitar a llamar: para un estadounidense es una llamada internacional. |

> ⚠️ Si algún día Luis abre una agenda tipo Calendly, el CTA fuerte de EE.UU. pasa a ser
> *"Book a 30-min call"*. Hoy no existe, así que **no se inventa un enlace de agenda**.

---

## Estado real de `/en/` hoy — medido el 2026-07-22, no leído

Esto ya está investigado. **El chat que ejecute la fase no tiene que volver a mirarlo.**

`/en/index.html` **es todavía la web de agencia vieja**, con el posicionamiento que
`CLAUDE.md` § 2 abandonó:

- **`<title>`: "Nouweb | Web Design and Development in Alicante"** y `<h1>`: *"Do you need
  a website that Sells?"*. Hoy `nouweb.es/en/` **contradice a la home**.
- **Carga `../styles.css`, o sea la hoja de la RAÍZ**, la que rehicieron las fases 11 y
  12 — y **sin `?v=`**. Medido: el fondo ya sale navy (`rgb(10,15,26)`) y la tipografía
  ya es Outfit. O sea, **la página vieja lleva puesto el sistema de diseño nuevo**. No
  desborda (scroll horizontal 0 px), así que no canta como rota: canta como incoherente.
- **Carga su propio `en/script.js`** (68 KB): es una de las copias de la triplicación.
  **No existe `en/styles.css`** — `/en/` es la única de las tres carpetas que no tiene
  hoja propia.
- 🔴 **No declara `canonical` ni `hreflang`. Ninguno.** La raíz sí apunta a
  `hreflang="en" → /en/`, pero `/en/` no devuelve el apunte. **El `hreflang` no es
  recíproco, así que Google ignora el grupo entero.** Esto no estaba en el backlog.
- 🔴 **Enlace roto en producción:** el modal de consentimiento de `/en/index.html`
  (línea ~711) sigue en español y enlaza `politica-privacidad.html`, **que no existe
  dentro de `/en/`** → 404. El archivo de allí se llama `privacy-policy.html`.
- `/es/index.html` y `/de/index.html` **tampoco declaran `canonical` ni `hreflang`**.
  Para `/es/` da igual: el `.htaccess` lo manda con **301 a `/`** (solo la home; las
  legales de `/es/` se siguen sirviendo). **`/de/` se arregla en la Fase 7.**

---

## Arquitectura decidida: `/en/` NO trae una cuarta copia

**`/en/index.html` reusa `/styles.css` y `/script.js` con ruta absoluta**, exactamente
como hizo el blog en la Fase 10. `en/script.js` **se borra**.

Es la decisión estructural de la fase y no es negociable por comodidad: la deuda de la
triplicación (`CLAUDE.md` § 7) es lo que este proyecto lleva desmontando desde la Fase 1,
y la Fase 10 ya demostró que se puede añadir una sección entera sin crear una copia.

### Cómo se sirve el contenido en dos idiomas

Los arrays de `script.js` (`HERO_FRASES`, `CRMS`, `CASOS`, `CREDENCIALES`, `PROCESO`,
`MIGRACIONES`, `DESTINOS`, `SHOPIFY_PARTNER`, `CONTACTO`) están hoy **en español dentro
del código**. Para que la misma hoja sirva a las dos páginas:

1. **Separar lo neutro de lo traducible.** El `logo`, la `url`, el `icono`, los flags y
   el nombre de marca **no se traducen**. Lo que se traduce es la `nota`, el `problema`,
   el `cuando`, el `destino`, el `titulo`, el `quePasa`, la `entrega`.
2. **Unirlos por un `id` estable**, no por posición en el array. Con dos arrays paralelos,
   el día que alguien añada un CRM al español y no al inglés, la rejilla inglesa se
   desalinea en silencio.
3. **El idioma sale de `document.documentElement.lang`**, que ya está bien puesto en las
   dos páginas (medido: `/en/` devuelve `en`). Nada de `navigator.language`: eso es lo
   que decide el visitante, no lo que es la página.

> ⚠️ **Que la falta de traducción NO caiga en silencio al español.** Es exactamente así
> como acaba publicada una frase en español dentro de la home inglesa. La comprobación
> de abajo lo caza midiendo, que es lo único que este proyecto se cree.

### Lo que muere en esta fase

**`script.js`, líneas 1513-2270: el sistema de traducción viejo.** Son ~760 líneas cuyo
diccionario es el copy de la agencia vieja (*"Diseño Web y Marketing Digital en
Alicante"*, precios, los seis servicios). **No lo usa nada de la home nueva.** De ahí
sale el `console.error('lang-toggle-btn not found!')` de la línea **1979**, el ruido de
consola que arrastran todas las fases desde la 8. Cierra el **backlog nº 13**.

⚠️ **Comprobar antes de borrar** que `/es/` y `/de/` no dependen de él: ellos cargan
`es/script.js` y `de/script.js`, que son copias propias, así que en principio no. **Se
comprueba, no se supone.**

---

## Qué cambia respecto al español (no es traducir)

| Elemento | ES (Perú) | EN (EE.UU.) |
|---|---|---|
| Impuesto | IGV 18% | Sales tax (varía por estado) |
| Facturación | SUNAT / OSE-PSE | No aplica — **quitar, no traducir** |
| Pasarelas | Niubiz, Izipay, Culqi, Yape, Plin | Stripe, PayPal, Authorize.net, Shop Pay |
| Canal principal | WhatsApp | **Formulario y email** (decisión de Luis, arriba) |
| Plataformas | Shopify, VTEX, WooCommerce | Shopify, BigCommerce, Magento/Adobe Commerce |
| Moneda | Soles (S/) | USD |
| Marketplace | Mercado Libre, Falabella, Ripley | Amazon, Walmart Marketplace, Etsy |

- **El hero se cae si se traduce literal.** Las cuatro frases de `HERO_FRASES` son cuatro
  dolores peruanos, y **una de ellas es SUNAT**. En inglés hay que escribir cuatro
  dolores estadounidenses equivalentes, no traducir estos. Ver la trampa de abajo sobre
  la altura del hero.
- **El pitch de Luis cambia.** En EE.UU. "peruano radicado en España" pesa distinto: el
  ángulo fuerte pasa a ser **talento *nearshore* hispanohablante con estándares europeos**
  y solapamiento horario parcial.
- **Revisar los CRM destacados.** Hoy `destacado: true` lo llevan Kommo y HubSpot. En
  EE.UU. **HubSpot y Salesforce** pesan mucho más que Kommo, que es *WhatsApp primero*.
  ⚠️ **Salesforce no está en el array.** Añadirlo es decisión de contenido, no de código.
- **El caso Misako se queda**, y en EE.UU. incluso mejora: es una marca **española**, o
  sea prueba de estándar europeo. Lo que se traduce es el relato, no el dato.
- **`SHOPIFY_PARTNER` es el mismo interruptor para las dos páginas.** No duplicarlo
  (`CLAUDE.md` § 6.1). Sigue pendiente confirmar el alta (pendiente nº 8).

---

## Tareas

- [ ] **Backup previo** en `Backup/DD-MM-fase6/`, carpeta **creada vacía y con nombre
      nuevo** (regla que dejó el accidente de la Fase 9)
- [ ] Reescribir `en/index.html` como la home nueva en inglés, reusando `/styles.css` y
      `/script.js` con **ruta absoluta**
- [ ] Meter el contenido inglés en `script.js` con el reparto neutro / traducible por `id`
- [ ] **Borrar `en/script.js`**
- [ ] Retirar el sistema de traducción viejo (`script.js` 1513-2270) → cierra backlog nº 13
- [ ] **`hreflang` recíproco y `canonical` en `/en/index.html`** (`x-default` → `/`,
      `es` → `/`, `en` → `/en/`, `de` → `/de/`)
- [ ] Arreglar el **404 de `politica-privacidad.html`** en el modal de consentimiento de
      `/en/` y traducir ese modal, que sigue en español
- [ ] Repasar `en/terms.html`, `en/privacy-policy.html` y `en/cookie-policy.html`: son de
      la época de la agencia y **pueden nombrar servicios que ya no se ofrecen**. Añadirles
      el `?v=` y el enlace de salto, como tienen las legales de la raíz desde la Fase 12
- [ ] Añadir `/en/` a `sitemap.xml` (hoy lo deja fuera **a propósito**, porque contradice
      a la home; deja de contradecirla al terminar esta fase)
- [ ] Subir el `?v=` en **todas** las páginas que se toquen
- [ ] *(barato, ya que se pasa por ahí)* Backlog nº 15: el `?v=` que les falta a las tres
      legales de `/es/`

---

## Verificación — medir, no mirar

El panel de vista previa de este proyecto **no hace capturas, no hace scroll, no dispara
`IntersectionObserver` y nunca tiene el foco del navegador**. Todo se mide sobre el DOM.

- [ ] **Cero español en `/en/`**, medido y no leído: recorrer el texto visible buscando
      `¿ ¡ ñ` y la lista negra **SUNAT · IGV · Yape · Plin · Niubiz · Izipay · Culqi ·
      soles · S/ · Mercado Libre · Falabella · Ripley**. Es la tarea 4 de esta ficha
      convertida en una comprobación que o pasa o no pasa.
- [ ] **`hreflang` recíproco de verdad**: pedir las tres URLs y comprobar que cada una
      apunta a las otras dos y a sí misma.
- [ ] **Ningún enlace interno de `/en/` devuelve 404**, comprobado con `HEAD` sobre la URL
      **que resuelve el navegador** — no leyendo el atributo `href`. Es el fallo de la
      Fase 10, y `/en/` ya tiene uno vivo hoy.
- [ ] **375 / 768 / 1024 / 1440 px**: scroll horizontal 0 px y 0 elementos desbordando.
- [ ] **El hero inglés, tecleando, sin que ninguna letra cambie de línea**, con la misma
      prueba de la Fase 12 (muestras por ancho, las cuatro frases de por medio).
- [ ] **Contraste AA** componiendo el alfa sobre el fondo real.
- [ ] **Consola limpia**: al morir el sistema viejo, el `lang-toggle-btn not found!` tiene
      que **desaparecer**, no reducirse.
- [ ] **`/` y `/blog/` siguen intactas** después de tocar `script.js`. Es el riesgo real
      de esta fase: el archivo pasa a estar compartido por tres páginas.

---

## Trampas conocidas de este proyecto que aplican aquí

- **La caché.** Sexta variante ya. Para probar un cambio de JS hay que **cambiarle el
  `?v=` en el HTML**; para medir color hay que **recargar el documento**, no solo la hoja.
- **`auto-fit` vs `auto-fill`.** Si alguna rejilla inglesa nace con menos tarjetas que la
  española, la última se estira sola (Fase 10).
- **El hero reserva la altura de la frase MÁS ALTA.** Las frases inglesas son más cortas
  que las españolas: la caja del hero **va a cambiar de alto**, y hay que mirarlo a 375 px.
- **Un selector que "no hace efecto" y no es caché** = duplicado más abajo en `styles.css`
  (backlog nº 14).
- **`visibility` es la respuesta** cuando algo tiene que dejar de ser tabulable o de
  ocupar hueco. Van dos fases seguidas.

---

## Al terminar

- [ ] Marcar ✅ en `docs/ESTADO.md` y anotar el avance
- [ ] Dejar escrita la frase exacta con la que Luis arranca la **Fase 7 (alemán)**, que
      hereda de aquí la estructura de dos idiomas ya montada — y el enlace roto de
      `de/index.html:786` (backlog nº 12)
