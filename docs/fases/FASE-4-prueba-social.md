# Fase 4 — Prueba social

**Estado:** 🟡 Al 90% (2026-07-20) — falta el material de Misako
**Bloqueada por:** el dato duro y el problema de partida del caso
**Necesita de Luis:** un dato de resultado, el problema que motivó la migración
(el logo y el permiso son opcionales: el caso ya funciona sin ellos)
**Tamaño:** pequeño

### Arrancar con

```
Lee docs/ESTADO.md y ejecuta la Fase 4.
```

---

## Objetivo

En consultoría, **la prueba social vale más que todo el diseño junto**. Un caso real
bien contado convierte mejor que seis logos sin historia.

---

## Tareas

- [x] **Caso Misako** como destacado:
      - Cliente: Misako
      - Trabajo: **migración a Shopify OS 2.0**
      - Rol de Luis: **responsable de la migración**
      - Resultado: `{{PENDIENTE: dato duro de Luis}}` — sigue pendiente, visible en la página
- [x] Montado desde el array `CASOS` de `script.js`: añadir un caso es agregar un objeto.
- [x] Los huecos vacíos **no se renderizan** — el array tiene un solo objeto y sale una
      sola tarjeta, a ancho completo. Cero tarjetas fantasma.
- [x] Formato **contexto → problema → qué se hizo → resultado**, en una `<dl>`.

---

## ⚠️ Reglas innegociables (`CLAUDE.md` § 6.2 y 6.3)

- Solo colaboraciones **reales y con permiso**. Ninguna marca inventada, en ningún caso.
- Si Luis no confirma el permiso escrito de Misako, existe una alternativa igual de
  efectiva y 100% segura: *"Proyectos para marcas del sector retail y moda"*, contando
  el caso **sin el logo**.
- Ninguna métrica sin dato aportado por Luis. Si no llega, se deja el marcador visible
  y se publica sin cifra.

---

## Criterio de terminado

1. ⬜ **Sin cumplir:** Misako aparece, pero la historia tiene dos campos en
   `{{PENDIENTE}}` (el problema de partida y el dato de resultado).
2. ✅ Cero marcas que no sean reales. La única del array es Misako.
3. ✅ Cero cifras que Luis no haya aportado. No hay ni una cifra en la sección.

---

## Al terminar

- [x] Marcar el avance en `docs/ESTADO.md`
- [ ] **Cerrar la fase cuando lleguen los datos:** rellenar `problema` y `resultado`
      en el objeto de Misako del array `CASOS` de `script.js`. No se toca HTML ni CSS.
      Si Luis prefiere no dar el dato, la alternativa es **borrar esos dos campos del
      objeto** y publicar el caso corto: nunca dejar el marcador a la vista en producción.
