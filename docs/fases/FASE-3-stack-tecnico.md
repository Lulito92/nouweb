# Fase 3 — Stack técnico

**Estado:** 🟡 Al 90% (2026-07-20) — falta solo soltar los archivos de logo
**Bloqueada por:** Fase 1 · logos de los CRM
**Necesita de Luis:** logos en PNG/SVG de los 8 CRM
**Tamaño:** medio

### Arrancar con

```
Lee docs/ESTADO.md y ejecuta la Fase 3.
```

---

## Objetivo

Demostrar solvencia técnica y, sobre todo, **conocimiento del terreno peruano**. Esta
sección es la que separa a Nouweb de una agencia española genérica.

---

## Tareas

### `#stack-crm`

- [x] Encabezado: **"Integramos con las principales plataformas CRM"**
- [x] Rejilla de logos, montada desde un **array en `script.js`**:

```js
const CRMS = [
  { nombre: 'Kommo',    logo: '...', destacado: true,  partner: false, enProceso: true  },
  { nombre: 'HubSpot',  logo: '...', destacado: true,  partner: false, enProceso: true  },
  { nombre: 'Zoho',     logo: '...', destacado: false, partner: false, enProceso: true  },
  { nombre: 'Odoo',     logo: '...', destacado: false, partner: false, enProceso: false },
  { nombre: 'Bitrix24', logo: '...', destacado: false, partner: false, enProceso: false },
  { nombre: 'Pipedrive',logo: '...', destacado: false, partner: false, enProceso: false },
  { nombre: 'monday',   logo: '...', destacado: false, partner: false, enProceso: false },
  { nombre: 'Clientify',logo: '...', destacado: false, partner: false, enProceso: false },
];
```

- [x] Kommo y HubSpot van **destacados** (los de mejor encaje con pyme peruana).
- [x] Texto al pie: *"Partner en proceso de certificación con HubSpot, Zoho y Kommo."*
- [x] Frase de posicionamiento: *"No vendemos nuestro propio CRM. Por eso podemos
      recomendarte el que de verdad te encaja."*

> ⚠️ **Regla innegociable** (`CLAUDE.md` § 6.1): la palabra **"Partner"** y su badge
> solo se renderizan cuando `partner: true`. Hoy Luis **no es partner de ninguno**.
> El badge debe activarse solo con cambiar el flag, sin tocar HTML.

**Por qué estos 8:** Kommo es WhatsApp-first y domina la pyme LatAm · HubSpot es el
nombre que todos reconocen · Zoho tiene precio imbatible y suite completa · Odoo suma
ERP e inventario si el cliente tiene almacén · Bitrix24 está muy implantado en LatAm ·
Pipedrive es simple y de adopción rápida · monday gusta a equipos no técnicos ·
Clientify da soporte en español.

### `#migracion-ecommerce`

- [x] **Plataformas:** Shopify (mencionar **OS 2.0** explícitamente), VTEX,
      WooCommerce, PrestaShop, Magento
- [x] **Pasarelas locales:** Niubiz, Izipay, Culqi, Mercado Pago, Yape, Plin
- [x] **Sello destacado de facturación electrónica SUNAT** — es obligatoria en Perú y
      mencionarla demuestra que conoces el terreno

---

## Criterio de terminado

1. Ningún badge de "Partner" visible mientras los flags estén en `false`.
2. Cambiar un flag a `true` hace aparecer el badge sin tocar HTML.
3. ⬜ **Sin cumplir:** faltan los archivos de logo. Mientras tanto cada ficha dibuja el nombre de la marca en texto. Nunca se usa un logo que no sea el archivo real.

---

## Al terminar

- [x] Marcar el avance en `docs/ESTADO.md`
- [ ] **Cerrar la fase cuando lleguen los logos:** dejarlos en `Imagenes/crm/` y poner
      la ruta en el campo `logo` del array `CRMS` de `script.js`. No se toca HTML ni CSS.
