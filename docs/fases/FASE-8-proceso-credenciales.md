# Fase 8 — Proceso de 6 pasos y banda de credenciales

**Estado:** ✅ **Hecha el 2026-07-21**
**Bloqueada por:** ~~Fase 11~~ (se hizo antes; esta nació ya con los tokens)
**Necesita de Luis:** ~~decidir 3 o 6 servicios~~ → **decidió 3** (2026-07-21)
**Tamaño:** medio-grande

> Detalle de lo que se hizo, lo medido y lo aprendido:
> [`ESTADO.md` § Detalle de la Fase 8](../ESTADO.md).

---

## Objetivo

Subir la percepción de solidez de la home al nivel del competidor (`docs/COMPETENCIA.md`)
**sin copiar su formato ni inventar cifras**. Dos piezas: un proceso de 6 pasos y una
banda de credenciales honesta.

---

## Parte A — Proceso de 6 pasos

Hoy `#servicios` cuenta **3 fases** (Diagnóstico → Migración → Integración). Eso se
queda: es *qué se compra*. El proceso de 6 pasos es *cómo se trabaja*, y va en una
sección nueva. Cluster tiene las dos cosas por separado y funciona.

- [x] Sección nueva `#proceso`. ⚠️ **Esta línea decía "entre `#servicios` y
      `#stack-crm`" y contradecía a la Parte C**, que coloca el proceso en el puesto 5,
      **antes** de `#servicios` (puesto 6). Se ejecutó según la Parte C, que es la tabla
      de orden y la que cita el criterio de terminado nº 4. Y se lee mejor así: primero
      cómo se trabaja, después qué se compra. **No "corregirlo" en un chat futuro.**
- [x] Montada desde un **array `PROCESO` en `script.js`** (misma pauta que `CRMS` y
      `CASOS`): añadir o reordenar un paso es tocar el array, nunca el HTML.
- [x] Los seis pasos propuestos, cada uno con **título + una línea de qué pasa + el
      entregable concreto**:

| # | Paso | Qué pasa | Se lleva |
|---|---|---|---|
| 1 | **Diagnóstico** | Auditoría de la tienda y mapa de procesos reales | Documento de hallazgos priorizados |
| 2 | **Plan y arquitectura** | Qué plataforma, qué CRM, qué se integra y en qué orden | Plan con cronograma y costos mensuales |
| 3 | **Migración** | Replatforming, datos, catálogo y **SEO sin perder posiciones** | Tienda nueva en preproducción |
| 4 | **Integración** | CRM, facturación SUNAT, pasarelas y WhatsApp conectados | Flujo del pedido de punta a punta |
| 5 | **Lanzamiento** | QA, pruebas de carga y **capacitación del equipo** | Salida a producción acompañada |
| 6 | **Optimización** | Medición y mejoras continuas | Informe periódico y soporte |

- [x] **Los pasos 1, 3 y 4 se corresponden con las 3 fases de `#servicios`.** Marcarlo
      visualmente (color de acento o rótulo) para que no parezcan dos ofertas distintas.
- [x] Mencionar explícitamente **las redirecciones 301 en el paso 3**: perder el SEO en
      una migración es el miedo número uno del cliente y casi nadie lo dice.

## Parte B — Banda de credenciales

Va justo debajo del hero, como en Cluster.

> ⚠️ **Aquí está el riesgo de toda la fase.** Cluster pone 2,88 % de conversión y $48 M.
> Nouweb no tiene esas cifras. **Copiar el formato con los casilleros vacíos —o peor,
> rellenos a ojo— es el peor resultado posible.** Ver `CLAUDE.md` § 6.3.

- [x] La banda comunica **capacidades verificables**, no resultados de negocio:

| Casilla | Contenido | Verificable por |
|---|---|---|
| 1 | **Shopify Partner** | Directorio público de Shopify |
| 2 | **Migración headless → Shopify OS 2.0** | Caso Misako |
| 3 | **España · Perú** — ingeniero full stack en los dos mercados | Perfil de Luis |
| 4 | **Facturación SUNAT e IGV integrados** | Descripción del servicio |

- [x] Montada desde un array en `script.js`, para poder cambiar casillas sin tocar HTML.
- [x] **Ninguna casilla con porcentaje, facturación, número de clientes ni años de
      trayectoria** mientras Luis no aporte el dato real.

### Opcional, si Luis lo aporta

Cualquiera de estos convierte una casilla de capacidad en una de resultado, que pesa
más: número de proyectos entregados · años trabajando en eCommerce · tiempo medio de
una migración · alguna métrica del caso Misako con su fuente.

---

## Parte C — Orden de secciones

Luis pidió (2026-07-21) **casi la misma estructura** que el competidor. Casi todo el
contenido ya existe: es sobre todo **mover bloques**, no escribir de nuevo.

| # | Cluster | Nouweb tras esta fase |
|---|---|---|
| 1 | Hero | `#hero` |
| 2 | Banda de credenciales | **nueva** (Parte B) |
| 3 | Rejilla de logos de clientes | ⬜ **no se dibuja hasta tener 4 logos reales** (§ 6.2) |
| 4 | — | `#problema` ← **propia de Nouweb, se queda**: es su mejor gancho |
| 5 | Proceso de 6 pasos | **nueva** (Parte A) |
| 6 | Rejilla de servicios | `#servicios` |
| 7 | Casos | `#casos` |
| 8 | Integraciones | `#stack-crm` + `#migracion-ecommerce` |
| 9 | Blog | ⬜ últimos 3 artículos — **se engancha en la Fase 10** |
| — | — | `#nosotros` ← propia, va antes del CTA |
| 10 | CTA final | `#auditoria` + `#contacto` |

- [x] Reordenar las secciones de `index.html` según la columna derecha.
- [x] Actualizar los anclas del menú y el `scroll-margin-top` de cada sección.
- [x] Dejar el **hueco del blog** preparado, oculto con `hidden` hasta la Fase 10.

### Decisión ✅ cerrada: **3 servicios** (Luis, 2026-07-21)

> Luis eligió quedarse en **3**. `#servicios` no se toca. Queda anotado en un comentario
> del propio `index.html` para que no se añadan tarjetas sin decisión suya.
> Esto cierra el pendiente nº 13 del tablero. El razonamiento original, abajo.

Cluster muestra **6 servicios**. Nouweb tiene **3**, y son la columna vertebral del
posicionamiento (`CLAUDE.md` § 2: *tres servicios que son tres fases consecutivas*).

Si Luis quiere seis, estos serían honestos —todos salen de lo que ya hace, ninguno
inventado—:

1. Diagnóstico y análisis de procesos
2. Migración / replatforming de eCommerce
3. Selección e integración de CRM
4. Facturación electrónica SUNAT y pasarelas locales
5. WhatsApp como canal de venta conectado
6. Soporte y optimización continua

> ⚠️ **Recomendación: quedarse en 3.** El relato de "tres fases consecutivas" es lo que
> hace que Nouweb se entienda de una lectura, y con los 6 pasos del proceso ya se
> comunica amplitud. Seis servicios sueltos vuelven a parecer un menú de agencia — justo
> de lo que se huía. **Decisión de Luis.**
>
> Ojo también: los servicios 4 y 5 son en realidad parte del 3 (Integración). Separarlos
> abulta la lista pero puede leerse como relleno.

---

## No hacer

- No copiar copy, imágenes ni diseño concreto de Cluster (`docs/COMPETENCIA.md`).
- No inventar servicios que Luis no presta (Paid Media, por ejemplo, que Cluster sí hace).
- No tocar el pulido fino — es la Fase 12.
- No tocar `/en` ni `/de`.

---

## Criterio de terminado

1. `#proceso` sale entero del array; reordenar un paso no obliga a tocar HTML.
2. La banda no contiene ninguna cifra que Luis no haya aportado.
3. Los 6 pasos se leen como continuación de las 3 fases, no como otra oferta.
4. El orden de secciones coincide con la tabla de la Parte C.
5. Todos los valores nuevos de CSS salen de `docs/DISENO.md`.
6. Sin scroll horizontal a 375 px.
7. Cache busting subido (`?v=` +1).

---

## Al terminar

- [x] Marcar el avance en `docs/ESTADO.md`
- [x] Dejar escrita la frase de arranque de la Fase 9
