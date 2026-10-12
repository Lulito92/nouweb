# Fase 12 — Pulido final

**Estado:** ✅ **Hecha el 2026-07-22**
**Bloqueada por:** Fase 10 (es la última del bloque)
**Necesita de Luis:** capturas reales de proyectos · 4 logos de cliente
**Tamaño:** medio

> **La versión española queda cerrada.** El detalle completo de lo que se hizo, con las
> mediciones, está en [`ESTADO.md` § Detalle de la Fase 12](../ESTADO.md).
>
> Las dos tareas que dependen de material de Luis (capturas reales y 4 logos de cliente)
> **siguen abiertas a propósito**: no se sustituyen con CSS y no bloquean la Fase 6.

### Arrancar con

```
Lee docs/ESTADO.md y ejecuta la Fase 12.
```

---

## Objetivo

El ajuste fino que solo tiene sentido con el contenido definitivo ya puesto. Los tokens
se establecieron en la Fase 11; aquí se afina sección por sección.

---

## Tareas

- [x] **Repaso sección por sección** con el sistema ya aplicado. Salieron dos cosas que
      no estaban en esta lista y eran más graves que lo que sí estaba:
      **`.btn-outline` era una copia byte a byte de `.btn-primary`** (el hero tenía dos
      botones idénticos y ninguna jerarquía) y **el menú móvil cerrado seguía siendo
      tabulable**.
- [x] **Carrusel en `#casos`** con navegación izquierda/derecha.
      ⚠️ Con **un solo caso** un carrusel queda peor que una tarjeta. Que se active solo
      **a partir de 3 casos** y por debajo caiga a rejilla.
      → Hecho, y con una condición de más que solo apareció midiendo: las flechas se
      esconden si no hay ni **media tarjeta** escondida. Ver `ESTADO.md`.
- [x] **Rejilla de logos de clientes**, separada de las tarjetas de caso.
      No se dibuja hasta tener **4 logos reales** (`CLAUDE.md` § 6.2). Mientras tanto, no
      existe: mejor ausente que a medias.
      → **Sigue sin dibujarse**, que es lo correcto hoy. Pendiente nº 11 de Luis.
- [x] **Accesibilidad**: foco visible en toda la navegación por teclado, contraste AA
      verificado, y orden de tabulación correcto en el menú y el formulario.
      → El sitio **no tenía ni un estilo de foco** y encima lo apagaba en el formulario.
      Añadidos anillo `:focus-visible`, enlace de salto en las 7 páginas y arreglo del
      menú tabulable.
- [x] **Rendimiento**:
      - `loading="lazy"` en imágenes bajo el pliegue → ya lo llevaban los logos de CRM y
        de caso desde las fases 3 y 4; no había ninguna imagen suelta más.
      - dimensiones explícitas para evitar saltos de maquetación → logo del header.
      - **revisar el peso de los vídeos** → el de `#nosotros` (3,79 MB) se descargaba
        entero en cada visita estando muy por debajo del pliegue. Ahora va diferido.
      - `font-display: swap` verificado → ya estaba en la URL de Google Fonts.
- [x] **Repaso responsive final** a 375 / 768 / 1024 / 1440 px.
      → Los cuatro sin scroll horizontal y sin elementos desbordando.
      ⚠️ **El corte de la hamburguesa NO se bajó**, y es deliberado: la Fase 10 lo subió
      a 1260 px porque el menú tiene 9 entradas y cada una cuesta ~63 px. Bajarlo ahora
      deshace esa medición. La única palanca sigue siendo un logo más pequeño.
- [x] Migrar a variables el CSS que quede sin migrar de las secciones tocadas.
      → Los `rgba(59,130,246,…)` escritos a mano del formulario pasaron a
      `var(--accent-soft)`.

---

## Lo que no se resuelve con CSS

El competidor usa **fotografía de producto profesional** de sus clientes. Es buena parte
de por qué su home se ve cara, y no hay técnica que lo sustituya.

De mejor a peor:

1. **Capturas reales de los proyectos de Luis** — la tienda de Misako, un panel de CRM
   configurado. Lo más creíble, y gratis.
2. **Mockups de interfaz** sobre fondo oscuro, hechos a partir de esas capturas.
3. Banco de imágenes → último recurso: se nota, y resta.

⚠️ Antes de publicar capturas de un proyecto de cliente, **confirmar permiso**, igual que
con el logo (`CLAUDE.md` § 6.2).

---

## Criterio de terminado

1. ✅ Con menos de 3 casos, `#casos` sale en rejilla y no en carrusel roto.
   *Medido con el array real (1 caso): clase `casos-grid`, sin flechas. Y probado de
   verdad con 3 casos temporales, que sí encienden el carrusel. Revertido.*
2. ✅ Sin rejilla de logos mientras no haya 4 reales. *Sigue siendo un comentario.*
3. 🟡 Navegación completa por teclado con foco visible.
   *Las reglas están y se comprobó que el navegador las parsea, que no queda ni un
   `outline: none` en toda la hoja y que el menú cerrado ya no es tabulable. **Lo que no
   se pudo probar aquí es el anillo dibujándose**: el panel nunca tiene el foco a nivel
   de navegador (`document.hasFocus()` es siempre `false`), así que `:focus` y
   `:focus-visible` no llegan a aplicar nunca. **Lo cierra Luis pulsando Tab una vez en
   la web publicada** — pendiente nº 17.*
4. ✅ Sin scroll horizontal en los cuatro anchos. *375 / 768 / 1024 / 1440: 0 px y 0
   elementos desbordando.*
5. ✅ Ninguna imagen sin dimensiones ni sin `lazy` bajo el pliegue.

---

## Al terminar

- [x] Marcar el avance en `docs/ESTADO.md`
- [x] **La versión española queda cerrada de verdad.** Ahora sí toca la Fase 6 (inglés).
