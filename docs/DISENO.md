# Sistema de diseño — Proyecto NouWeb

> Creado el 2026-07-21. Luis pidió acercar la home al acabado de
> [Cluster](https://cluster.global/) en estructura, tipografía y diseño.
> **Todo valor nuevo de CSS sale de aquí.** Nada a ojo.

---

## Nota sobre el origen de estos valores

**No son los valores de Cluster.** No se pudo leer su CSS desde el entorno de trabajo
(el panel del navegador está sin red y el lector de páginas descarta las hojas de
estilo). Lo que sigue es un sistema que **produce el mismo efecto** —el "caro" de
agencia— a partir de lo que sí es observable en su home: fondo oscuro, sans blanca,
mucho aire, rejilla ordenada y casi nada de animación.

### Cómo obtener su tipografía exacta, si la quieres

En Chrome, sobre su web: clic derecho en un titular → **Inspeccionar** → pestaña
**Computed** → busca `font-family`. Copia lo que salga y dímelo; se ajusta en una línea
de este documento y se propaga a todo el sitio.

> ⚠️ Usar la misma tipografía es perfectamente legítimo: los tipos de letra no se
> protegen como obra. Lo que no se copia es su **texto, sus imágenes y su maquetación
> concreta** (`CLAUDE.md` § 11).

---

## 1. Tipografía

### Familias

> ✅ **Decidido el 2026-07-21 (Luis): una sola familia, Outfit para todo.**
> La opción de añadir Inter queda descartada. **No volver a cargarla** en un chat
> futuro sin decisión suya: sería peso extra y una petición más a Google Fonts.

| Uso | Fuente | Por qué |
|---|---|---|
| Todo el sitio | **Outfit** (ya cargada) | Geométrica, moderna, con personalidad en tamaños grandes |
| ~~Cuerpo e interfaz~~ | ~~Inter~~ | Descartada. Se habría leído algo mejor en párrafos largos, a cambio de ~20 KB |

```css
--font-display: 'Outfit', system-ui, sans-serif;
--font-body: var(--font-display);
```

`--font-body` existe aunque hoy apunte a la misma familia: si algún día entra una
segunda fuente, se cambia **una línea** y se propaga a todo el sitio.

Ya está cargada con `display=swap`. El subconjunto `latin` + `latin-ext` (acentos y ñ)
lo sirve Google Fonts por defecto según el `Accept-Language` del visitante.

### Escala

Fluida con `clamp()`: escala sola entre celular y escritorio sin *media queries*.

```css
--fs-display: clamp(2.75rem, 7vw, 5rem);      /* h1 del hero */
--fs-h1:      clamp(2.25rem, 5vw, 3.25rem);
--fs-h2:      clamp(1.875rem, 3.5vw, 2.5rem); /* títulos de sección */
--fs-h3:      clamp(1.25rem, 2vw, 1.5rem);    /* tarjetas */
--fs-body-lg: 1.125rem;                        /* entradillas */
--fs-body:    1rem;
--fs-small:   0.875rem;
--fs-label:   0.75rem;                         /* rótulos en versalitas */
```

### Espaciado de letra y altura de línea

**Esto es lo que más separa un sitio "caro" de uno normal**, más que la fuente elegida.

```css
--tracking-display: -0.03em;  /* titulares grandes: MUY apretado */
--tracking-heading: -0.02em;
--tracking-body:     0;
--tracking-label:    0.08em;  /* rótulos: abiertos y en mayúsculas */

--leading-display: 1.05;
--leading-heading: 1.15;
--leading-body:    1.65;      /* generoso: es lo que da sensación de aire */
```

Regla: **cuanto más grande el texto, más apretado el tracking y más corta la
interlínea.** Al revés en texto pequeño.

### Pesos

Solo tres: **400** cuerpo · **600** titulares y botones · **700** solo cifras destacadas.
Nada de 300 en texto oscuro sobre claro: se rompe en pantallas normales.

---

## 2. Color

Se conserva el acento cian existente (`#06b6d4`). No se cambia la identidad, se ordena.

```css
--bg:          #0a0f1a;                    /* fondo base, navy casi negro */
--bg-rgb:      10, 15, 26;                 /* el mismo, en canales sueltos */
--bg-elev:     #111827;                    /* tarjetas y bloques elevados */
--bg-subtle:   rgba(255,255,255,0.03);     /* superficies muy tenues */
--border:      rgba(255,255,255,0.10);
--border-strong: rgba(255,255,255,0.18);

--text:        #ffffff;
--text-muted:  rgba(255,255,255,0.66);     /* párrafos */
--text-faint:  rgba(255,255,255,0.45);     /* pies y metadatos */

--accent:      #06b6d4;                    /* el de siempre */
--accent-soft: rgba(6,182,212,0.12);

--focus-ring:   #7dd3fc;                   /* añadido en la Fase 12, ver § 10 */
--focus-width:  3px;
--focus-offset: 3px;
```

> **`--bg-rgb` se añadió en la Fase 11.** Dos sitios necesitan el color de fondo *con
> transparencia*: el header translúcido con `backdrop-filter` y el velo que va sobre el
> vídeo del hero. Antes los dos llevaban un `rgba(10,10,10,…)` escrito a mano, así que
> al cambiar el fondo a navy se habrían quedado en negro y habría cantado el corte.
> Se usa así: `rgba(var(--bg-rgb), 0.8)`.

> **El texto de párrafo NO va en blanco puro.** Blanco 100 % sobre fondo oscuro vibra y
> cansa. `--text-muted` al 66 % es la diferencia entre "web de plantilla" y "web
> diseñada".

**Contraste medido en la Fase 11** (sobre `--bg`, con el navegador resolviendo el alfa):

| Token | Ratio | AA (4,5:1) |
|---|---|---|
| `--text` | 19,2:1 | ✅ |
| `--text-muted` | 8,6:1 | ✅ con margen |
| `--text-faint` | 4,5:1 | ✅ **justo en el límite** |

> ⚠️ **`--text-faint` está pegado al mínimo.** Vale para pies y metadatos y nada más.
> No bajarlo, no usarlo sobre `--bg-elev` (que es más claro y estrecharía el margen)
> y no aplicarlo a nada que el visitante tenga que leer de verdad.

---

## 3. Espaciado

Escala de base 4 px. **Ningún valor fuera de esta lista.**

```css
--sp-1: 0.25rem;  --sp-2: 0.5rem;   --sp-3: 0.75rem;  --sp-4: 1rem;
--sp-5: 1.5rem;   --sp-6: 2rem;     --sp-7: 3rem;     --sp-8: 4rem;
--sp-9: 6rem;     --sp-10: 8rem;
```

```css
--section-y:   clamp(4rem, 10vw, 8rem);    /* aire vertical entre secciones */
--container:   1240px;
--container-x: clamp(1.25rem, 5vw, 2.5rem);
--measure:     65ch;                       /* ancho máximo de una línea de texto */
```

> **`--measure` se añadió en la Fase 11.** El § 6 lo pedía como valor suelto (`65ch`) y
> acabó repitiéndose en nueve selectores. Un token evita que dentro de seis meses haya
> tres anchos de lectura distintos por copiar y pegar.

El **aire vertical es el 80 % del efecto**. Una sección con `--section-y` de 8rem en
escritorio se lee cara; la misma con 3rem se lee barata. Es lo más barato de copiar y lo
que más se nota.

---

## 4. Formas y elevación

```css
--radius-sm: 10px;   --radius:    16px;   --radius-lg: 24px;
--radius-pill: 999px;                     /* botones y chips */

--shadow: 0 20px 60px rgba(0,0,0,0.35);   /* usar con moderación */
```

Sobre fondo oscuro, **la separación se hace con borde, no con sombra**. Las sombras casi
no se ven y solo suman peso visual.

---

## 5. Movimiento

Cluster casi no anima, y esa contención es parte de que se vea serio.

```css
--ease: cubic-bezier(0.22, 1, 0.36, 1);
--dur:  240ms;
```

- Transiciones solo en `opacity` y `transform`. **Nunca** animar `width`, `height`,
  `top` ni `left`: provocan repintado y van a tirones en celular.
- Las apariciones al hacer scroll (`.fade-in-up`) se quedan, pero suaves.
- Obligatorio respetar `prefers-reduced-motion: reduce`.

---

## 6. Rejilla

```css
--grid-gap: clamp(1.25rem, 3vw, 2rem);
```

- Contenedor a `--container`, centrado, con `--container-x` de padding lateral.
- Tarjetas con `repeat(auto-fit, minmax(280px, 1fr))`.
- **Máximo 2 anchos de columna por sección.** Mezclar tres rompe el ritmo.
- Texto de párrafo a `max-width: var(--measure)`. Una línea de 120 caracteres no se lee.
  ⚠️ Si el párrafo va **centrado**, hace falta además `margin-inline: auto`; si no, la
  caja de 65ch se queda pegada a la izquierda dentro de una sección centrada.

---

## 7. Reglas de aplicación

1. **Ningún valor nuevo de tamaño, color o espaciado fuera de estas variables.** Si hace
   falta uno que no está, se añade aquí primero y se justifica.
2. Las variables viven al principio de `styles.css`, en `:root`, en este orden:
   tipografía → color → espaciado → formas → movimiento.
3. Al tocar CSS existente, migrar lo que se toque a variables. **No** reescribir de golpe
   las 3.498 líneas: se migra por secciones, según se van tocando.
4. Cada cambio visual se verifica a **375 / 768 / 1024 / 1440 px** antes de darlo por
   bueno.
5. Subir el `?v=` de `styles.css` y `script.js` en cada publicación.

---

## 8. La capa de alias heredados (Fase 11)

`styles.css` arrastra ~3.400 líneas de la triplicación, escritas contra los nombres
viejos: `--bg-color`, `--surface-color`, `--text-color`, `--border-color`,
`--accent-color`, `--font-main`, `--container-width`.

**No se renombraron.** Al final del `:root` esos nombres **apuntan a los tokens nuevos**:

```css
--bg-color:     var(--bg);
--surface-color: var(--bg-elev);
--text-color:   var(--text);
--border-color: var(--border);
--accent-color: var(--accent);
--font-main:    var(--font-display);
--container-width: var(--container);
```

Así **todo el sitio adoptó la paleta nueva sin tocar un solo selector**, incluidas las
páginas legales. Se van retirando conforme cada sección se migra; cuando no quede
ningún uso de un alias, se borra esa línea.

### Dos cosas que NO están en el sistema, a propósito

1. **`--primary-color` (#3b82f6)** — el azul de los botones y del degradado del hero. Es
   identidad heredada, no parte de este documento. **Se queda**, y ahora tiene un papel
   escrito: es el socio oscuro del cian, no un acento rival. Ver § 11.

   > ✅ **El morado `--secondary-color` (#8b5cf6) se retiró en la Fase 12** (decisión de
   > Luis, 2026-07-22). El nombre de la variable sigue vivo y **apunta a `--accent`**,
   > igual que la capa de alias de arriba: los 13 usos heredados se convirtieron solos
   > sin tocar un selector. **No devolverle un color propio** sin decisión suya.
2. **`--transition`** dejó de ser `all 0.3s ease` y pasó a listar solo lo que se puede
   animar barato (`color`, `background-color`, `border-color`, `opacity`, `transform`,
   `box-shadow`) con `var(--dur)` y `var(--ease)`. `all` acababa animando propiedades de
   maquetación sin querer, que es justo lo que prohíbe el § 5.

---

## 9. Cortes de maquetación (breakpoints)

El sistema es **fluido a propósito**: `clamp()` en la tipografía y `auto-fit` en las
rejillas hacen casi todo el trabajo sin *media queries*. **La regla por defecto sigue
siendo no añadir un corte.** Estos son los que existen y por qué.

| Corte | Dónde | Por qué |
|---|---|---|
| `600px` | Header | El logo apaisado (299 px) no cabe con el padding de 50 px. Baja a 64 px de alto. |
| `1260px` | Header | Aparece la hamburguesa. **Subido de 1200 en la Fase 10**, ver abajo. |
| `640` y `1200px` | Banda de credenciales (Fase 8) | 1 → 2 → 4 columnas. |
| `640` y `1200px` | Fila de destinos de migración (Fase 9) | 1 → 2 → 4 columnas. Los mismos cortes que la banda, por el mismo motivo: son 4 tarjetas. |
| `900px` | Rejilla de blog de la home (Fase 10) | 1 → 3 columnas, **sin pasar por 2**: son 3 tarjetas y dos columnas siempre dejan una huérfana. |

### El corte del header depende del número de entradas del menú

**Cada entrada del menú cuesta ~63 px de fila.** Al añadir "Blog" en la Fase 10, el hueco
entre el logo y el menú quedó así:

| Ancho | Hueco logo ↔ menú |
|---|---|
| 1201-1220 px | **0 px** — se tocan |
| 1240 px | 21 px |
| 1260 px | 41 px |
| 1280 px | 61 px |

Con el corte en 1200 quedaba una franja de ~20 px en la que el menú nacía pegado al logo.
**No llegaba a solapar** —el logo lleva `flex-shrink: 0`— y ahí está el problema: no se ve
como un fallo, se ve como un diseño descuidado, y eso nadie lo reporta. El corte subió a
**1260 px**.

> **Regla:** añadir una entrada al menú obliga a volver a medir este corte. Si algún día no
> se puede subir más, la única palanca real es un logo más pequeño (ya avisado en la Fase 8);
> quitar una entrada es decisión de Luis, no de maquetación.

### Cuándo un `auto-fit` no vale y hay que fijar las columnas

`repeat(auto-fit, minmax(X, 1fr))` es el patrón por defecto (§ 6) y se usa en las
rejillas de servicios, problema, CRM, casos, auditoría y proceso. **Deja de valer en
cuanto los elementos se separan con un borde entre ellos**, porque el número de columnas
pasa a depender del ancho disponible y ya no se sabe qué elemento abre fila: el primero
de cada fila dibuja una raya vertical suelta contra el margen.

Pasó en la banda de credenciales: a 768 px salían **tres** columnas para **cuatro**
casillas, con una huérfana debajo y una raya colgando. La solución no es tocar el
`minmax` —solo mueve el problema de ancho— sino **declarar las columnas** y hacer los
separadores exactos con `:nth-child`. Son 4 casillas: 1 / 2 / 4 columnas, nunca 3.

> Dicho al revés, la regla corta: **si la sección separa con `gap`, `auto-fit`. Si separa
> con borde, columnas explícitas.**

### El segundo caso en que `auto-fit` no vale (Fase 9)

Hay otro, y no tiene que ver con los bordes: **cuando el número de tarjetas es fijo y
pequeño, y no encaja en las columnas que el `minmax` puede dar.**

Los 4 destinos de migración nacieron con `minmax(280px, 1fr)`. Medido: el contenedor de
1240 px deja ~1160 px útiles y cuatro columnas necesitan `4×280 + 3×32 = 1216`. Así que a
1440 px salían **tres** columnas y el cuarto destino caía solo en una segunda fila. No
dibujaba ninguna raya suelta —no se separan con borde— pero se leía como si sobrara.

> **Regla corta:** `auto-fit` sirve cuando el número de elementos es **variable o
> divisible** por las cuentas de columna posibles. Con un número fijo y pequeño (4, 5, 7),
> declarar las columnas sale más barato que ajustar el `minmax` hasta que cuadre — tocar
> el `minmax` solo mueve el problema a otro ancho.

Contraejemplo del mismo commit: la matriz de **12 orígenes** se quedó con `auto-fit` y está
bien. Ese `minmax` solo puede dar 1, 2, 3 o 4 columnas, y **12 es divisible por las
cuatro**: nunca deja fila incompleta.

### El tercer caso: `auto-fill` cuando la lista es corta y va a crecer (Fase 10)

Los dos casos de arriba se resuelven **quitando** el `auto-fit`. Este se resuelve
**cambiándolo por `auto-fill`**, que es la palabra que casi nunca se usa y que aquí era
exactamente la correcta.

La diferencia solo se nota cuando **sobran pistas**:

| | Con 1 elemento en un contenedor de 1160 px |
|---|---|
| `auto-fit` | Colapsa las pistas vacías y **estira esa única tarjeta a los 1160 px**. |
| `auto-fill` | Conserva las pistas: la tarjeta se queda en **365 px**, arriba a la izquierda. |

El índice del blog nace con **un solo artículo**. Con `auto-fit` esa tarjeta salía de
ancho de pantalla con dos líneas de texto dentro: se lee como un error de maquetación, no
como un blog nuevo. Con `auto-fill` se ve como lo que es.

> **Regla corta:** si la lista es **variable pero hoy es corta**, `auto-fill`. Si está
> siempre llena, da igual cuál de los dos. `auto-fit` solo gana cuando de verdad quieres
> que pocos elementos ocupen todo el ancho.

---

## 10. El foco del teclado (Fase 12)

Hasta la Fase 12 **el sitio no tenía ni un solo estilo de foco** en sus 4.456 líneas de
CSS, y además apagaba el del navegador en el formulario con dos `outline: none`. Quien
navega con el tabulador —por discapacidad motora, por costumbre o porque se le rompió el
ratón— **no podía saber dónde estaba**.

```css
--focus-ring:   #7dd3fc;   /* cian claro: 10,4:1 sobre --bg, se ve sobre el cian normal */
--focus-width:  3px;
--focus-offset: 3px;
```

Tres decisiones que conviene no deshacer:

1. **`:focus-visible`, no `:focus`.** El navegador solo lo aplica cuando el foco viene del
   teclado. Con `:focus` a secas, cada clic del ratón dejaría un anillo pegado al botón y
   alguien acabaría quitándolo entero — que es exactamente cómo desaparecen estos estilos.
2. **El anillo es más claro que `--accent`, no igual.** Un anillo cian sobre un botón cian
   no se distingue. `#7dd3fc` es el cian subido de luminosidad, así que se lee tanto sobre
   el fondo navy como sobre el propio acento.
3. **`outline`, no `box-shadow`.** El `outline` respeta las esquinas redondeadas en los
   navegadores actuales y **sigue viéndose en el modo de alto contraste de Windows**, que
   descarta las sombras.

> ⚠️ **Nunca escribir `outline: none` sin poner algo en su lugar.** Si hay que quitar el
> anillo del navegador para dar uno propio, el propio va en la misma regla.

---

## 11. Los dos colores de acento y qué hace cada uno (Fase 12)

Antes de la Fase 12 el sitio tenía tres colores de acento sin jerarquía: el azul (55
usos), el cian (52) y el morado (13). No era un problema de gusto sino de **dirección**:
el titular del hero degradaba azul → cian y los botones degradaban azul → morado. Dos
rampas distintas saliendo del mismo azul es lo que hacía que la web se leyera como dos
sistemas pegados.

Con el morado retirado queda **una sola rampa, azul → cian**, y cada color con su papel:

| Color | Papel | Dónde |
|---|---|---|
| **Cian `--accent`** | El acento del sistema. Señala **información**. | Rótulos, cifras, chips, bordes de tarjeta activa, iconos de lista |
| **Azul `--primary-color`** | El extremo oscuro de la rampa. Señala **acción**. | Solo el degradado de los botones llenos y sus sombras |

> **Regla corta:** si el visitante lo puede **pulsar**, la rampa azul → cian. Si solo lo
> puede **leer**, cian a secas. Un texto que no es un enlace nunca lleva azul.

### El botón secundario tenía que ser secundario

`.btn-outline` era **una copia byte a byte de `.btn-primary`**: mismo degradado, mismo
color de texto, misma sombra. En el hero eso significaba dos botones idénticos, así que
"Quiero mi auditoría gratuita" y "Ver cómo trabajamos" pesaban lo mismo y el visitante no
tenía ninguna pista de cuál era la acción principal. Desde la Fase 12 es un botón de
verdad perfilado: fondo transparente, borde y texto en cian, y al pasar por encima se
rellena. **La jerarquía del hero es la conversión** (`CLAUDE.md` § 8), no un detalle
estético.
