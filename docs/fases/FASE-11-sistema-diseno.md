# Fase 11 — Sistema de diseño (tipografía y tokens)

**Estado:** ✅ Hecha (2026-07-21)
**Bloqueada por:** nada
**Necesita de Luis:** ~~decidir Outfit+Inter o solo Outfit~~ → **decidido: solo Outfit**
**Tamaño:** medio

### Arrancar con

```
Lee docs/ESTADO.md y ejecuta la Fase 11.
```

> ⚠️ **Esta fase se ejecuta LA PRIMERA del bloque**, antes de la 8. El número es un
> identificador, no el orden. Ver `ESTADO.md`.

---

## Por qué va primero

Luis pidió (2026-07-21) acercar la home al acabado del competidor **en tipografía y
diseño**, no solo en estructura. Si se montan las secciones nuevas (8, 9, 10) con los
tamaños y espaciados actuales, luego hay que repasarlas una a una.

Estableciendo los tokens primero, **las fases 8, 9 y 10 nacen ya con el acabado bueno.**
Lo que sí se deja para el final es el ajuste fino sección por sección (Fase 12).

---

## Tareas

- [x] Leer **`docs/DISENO.md` entero**. Es la fuente de verdad de esta fase.
- [x] Declarar **todas las variables** en `:root`, al principio de `styles.css`, en el
      orden del documento: tipografía → color → espaciado → formas → movimiento.
      → **62 variables**, ninguna sin resolver.
- [x] **Cargar las fuentes.** Outfit ya estaba. **Inter no entra**: Luis eligió una sola
      familia. `--font-body` existe igualmente y apunta a `--font-display`, para que
      añadirla algún día sea cambiar una línea.
- [x] Aplicar la **escala tipográfica** a todos los niveles: `h1` a `h3`, cuerpo,
      entradillas, rótulos y textos pequeños.
- [x] Aplicar **tracking e interlínea**. Medido: h1 `-2,4px`, h2 `-0,8px`, h3 `-0,48px`,
      rótulos `+0,96px`.
- [x] **Párrafos a `--text-muted` (66 %), no a blanco puro.** Contraste medido: 8,6:1.
- [x] Unificar el **ritmo vertical**: todas las secciones con `--section-y`
      (128 px en escritorio, 64 px en celular).
- [x] Contenedor único a `--container` (1240 px) con `--container-x` lateral.
- [x] Párrafos con `max-width: var(--measure)`.
- [x] Migrar a variables **solo el CSS que se toque**.
- [x] Añadir el bloque `prefers-reduced-motion: reduce`.

## No hacer

- No tocar la estructura ni el contenido — eso es la Fase 8.
- No rehacer el carrusel ni la rejilla de logos — Fase 12.
- No tocar `/en` ni `/de`: siguen con su CSS propio y esto no les afecta.

---

## Riesgo a vigilar

Cambiar la escala tipográfica global **toca todas las secciones a la vez**. Las tarjetas
de `#servicios` y `#problema` tienen alturas que hoy cuadran por casualidad; con
titulares más grandes o interlínea distinta pueden descuadrarse.

Ya pasó algo así en la Fase 2: *"rótulo de fase ≤ 4 palabras"* salió de ver tarjetas
desalineadas en pantalla. **Revisar las rejillas de tarjetas después de aplicar la
escala, no antes.**

---

## Criterio de terminado

| # | Criterio | Resultado |
|---|---|---|
| 1 | Ningún tamaño, color ni espaciado nuevo fuera de las variables | ✅ las dos que hicieron falta (`--bg-rgb`, `--measure`) se añadieron **primero** a `DISENO.md` |
| 2 | Titulares con tracking negativo, rótulos con positivo | ✅ medido en el DOM |
| 3 | Párrafos no en blanco puro y cumplen AA | ✅ 8,6:1 (`--text-muted`) y 4,5:1 (`--text-faint`) |
| 4 | Sin scroll horizontal a 375 / 768 / 1024 / 1440 px | ✅ los cuatro a 0 px, y 0 elementos desbordando |
| 5 | Tarjetas de `#servicios` y `#problema` alineadas | ✅ en los cuatro anchos |
| 6 | Cache busting subido | ✅ `?v=15` |

---

## Al terminar

- [x] Marcar el avance en `docs/ESTADO.md`
- [x] Anotar en `DISENO.md` las variables que hicieron falta (`--bg-rgb`, `--measure`)
      y la capa de alias heredados (§ 8, nuevo)
- [x] Dejar escrita la frase de arranque de la Fase 8
