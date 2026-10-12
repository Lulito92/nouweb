# Fase 7 — Alemán (mercado suizo)

**Estado:** ⬜ Pendiente
**Bloqueada por:** Fase 6
**Tamaño:** grande

### Arrancar con

```
Lee docs/ESTADO.md y ejecuta la Fase 7.
```

---

## Objetivo

Adaptar el sitio a `/de/` para la **Suiza de habla alemana**.

---

## ⚠️ Aviso importante sobre el idioma

Luis habla algo de alemán, pero **le falta práctica**. El mercado suizo es
extremadamente sensible a la calidad del idioma y a la precisión: un texto comercial
con errores de alemán hace **más daño que no tener versión alemana**.

**Recomendación firme:** que un hablante nativo revise el texto antes de publicar.
Es un gasto pequeño comparado con el coste de perder credibilidad en ese mercado.

---

## Qué cambia respecto a EE.UU.

| Elemento | Detalle |
|---|---|
| Suiza ≠ Alemania | Moneda **CHF**, IVA **7,7%**, y **Suiza no está en la UE** |
| Protección de datos | Rige la **nLPD/revDSG** suiza, no el RGPD (aunque son parecidos) |
| Ortografía | En Suiza **no se usa la ß** — se escribe siempre `ss` |
| Pasarelas | **TWINT** (dominante), PostFinance, Stripe |
| Plataformas | Shopify, Shopware (muy fuerte en el ámbito germanoparlante) |
| Facturación | **QR-Rechnung** suiza |
| Tono | Formal, `Sie` siempre. Menos marketing, más precisión y datos concretos. |

---

## Tareas

- [ ] Adaptar el contenido a `/de/` con enfoque suizo, no alemán
- [ ] Precios en **CHF**
- [ ] Sustituir el bloque legal por la nLPD
- [ ] Revisar que no quede ninguna `ß` en todo el texto
- [ ] **Revisión por hablante nativo antes de publicar**
- [ ] Actualizar `hreflang` en las cuatro versiones

---

## Al terminar

- [ ] Marcar ✅ en `docs/ESTADO.md` y anotar el avance
