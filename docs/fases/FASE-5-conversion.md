# Fase 5 — Conversión

**Estado:** 🟡 En curso — montada al 90% el 2026-07-20. Todo el HTML, CSS y JS está
hecho y verificado. Solo faltan los dos datos de Luis, que se escriben en el objeto
`CONTACTO` de `script.js`. Ver `docs/ESTADO.md` § Detalle de la Fase 5.
**Bloqueada por:** WhatsApp de Luis · precio "desde"
**Necesita de Luis:** número de WhatsApp, precio de entrada en USD
**Tamaño:** medio

### Arrancar con

```
Lee docs/ESTADO.md y ejecuta la Fase 5.
```

---

## Objetivo

Convertir visitas en conversaciones **calificadas**. El objetivo no es maximizar
formularios enviados, es que Luis no acabe ahogado en curiosos.

---

## Tareas

### `#auditoria`

- [ ] Bloque de **auditoría gratuita** como puerta de entrada.
- [ ] Dicho abiertamente en la página:
      > *La auditoría es gratuita para negocios con intención real de implementar,
      > ahora o a mediano plazo.*
      Ahuyenta a los curiosos sin sonar antipático.
- [ ] Qué incluye la auditoría, en concreto (revisión de la tienda, mapa de procesos,
      recomendación de CRM). Que se perciba con valor, no como una llamada de ventas.
- [x] ~~Precios "desde" en la web.~~ **Anulado el 2026-07-20**: Luis decidió no publicar
      ningún precio. No hay campo de precio ni cifra en la página.

### `#contacto`

- [ ] **CTA principal = WhatsApp** (`https://wa.me/{{PENDIENTE}}`), con mensaje
      prerrellenado. En Perú es el canal natural, y es gratis e internacional.
- [ ] Dos preguntas de calificación en el formulario:
      - *¿Cuándo planea implementar?* → Ahora · En 3-6 meses · Solo explorando
      - *¿Cuántos pedidos maneja al mes?* → <100 · 100-500 · +500
- [ ] El **+34 va solo en el pie**. Para un peruano es llamada internacional y "no es
      de acá", pero en el pie **refuerza** el pitch de "peruano radicado en España".
- [ ] Mantener el consentimiento RGPD que ya existe y **añadir mención a la Ley 29733**
      peruana de protección de datos. El RGPD sigue aplicando porque Luis está
      establecido en España.

> Más adelante, si el volumen lo pide, un número virtual de Lima cuesta ~5 USD/mes.

---

## Criterio de terminado

1. El CTA de WhatsApp funciona desde móvil. → ⬜ **conectado y activo con el número
   español `+34 614 94 27 32` (decisión de Luis, provisional). Falta abrirlo una vez
   desde un celular real para darlo por bueno.**
2. El formulario llega con la calificación incluida. → ✅ dos `<select>` obligatorios.
3. Ningún `{{PENDIENTE}}` visible en producción. → ✅ ninguno. La web ya **no lleva
   precios** (decisión de Luis del 2026-07-20).

---

## Al terminar

- [ ] Marcar ✅ en `docs/ESTADO.md` y anotar el avance
- [ ] **La versión española queda cerrada.** Toca dejarla correr y medir antes de
      traducir: las fases 6 y 7 son caras y conviene traducir un mensaje ya validado.
