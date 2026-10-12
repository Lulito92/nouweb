# Fase 9 — Migraciones ampliadas y Shopify Partner

**Estado:** ✅ Hecha (2026-07-21)
**Bloqueada por:** ~~Fase 8~~ — hecha
**Necesita de Luis:** confirmar el alta real en el Programa de Partners de Shopify
(pendiente nº 8, **sigue abierto**: la sección se publicó sobre su declaración del
2026-07-21, igual que la banda de la Fase 8)
**Tamaño:** medio

### Arrancar con

```
Lee docs/ESTADO.md y ejecuta la Fase 9.
```

---

## Objetivo

Convertir `#migracion-ecommerce` de dos columnas cortas en **la sección que demuestra
que Nouweb conoce el terreno**. Es la que compite de frente con Cluster.

---

## Parte A — Matriz origen → destino

Hoy la sección son dos columnas (Desde / Hacia). Se sustituye por una **matriz de
orígenes reales**, cada uno con el problema que lo motiva y el destino recomendado.

- [x] Montada desde un **array `MIGRACIONES` en `script.js`**. Los destinos salen de un
      segundo array, `DESTINOS`. El HTML de la sección **no contiene el nombre de ninguna
      plataforma**.

### Orígenes (columna "Desde")

Los que ya estaban, más los que faltaban:

| Origen | El problema real |
|---|---|
| **Magento 1** | Sin soporte desde 2020: **sin parches de seguridad** |
| **Magento 2 / Adobe Commerce** | Licencia y mantenimiento desproporcionados para una pyme |
| **VTEX** | Licencia + *revenue share*: cara cuando el volumen todavía no da |
| **PrestaShop antiguo** (1.6 / 1.7) | Módulos incompatibles, actualizar rompe la tienda |
| **WooCommerce lento** | Plugins acumulados y hosting insuficiente |
| **Desarrollo a medida huérfano** | El programador se fue y nadie toca el código |
| **Headless mal implementado** | Bugs e inventario descuadrado ← **el caso Misako** |
| **Tiendanube / Nuvemshop** | Se queda corto al escalar *(nuevo)* |
| **Jumpseller** | Ídem, muy usado en Perú y Chile *(nuevo)* |
| **Wix / Squarespace** | Sirvió para empezar, no para +200 pedidos/mes *(nuevo)* |
| **BigCommerce** | Poco ecosistema local en LatAm *(nuevo)* |
| **Solo marketplace** (Mercado Libre, Falabella, Ripley) | Sin tienda propia: **cero control del cliente y comisión alta** *(nuevo)* |

> El último es el más peruano de todos y probablemente el de mayor mercado: marcas que
> venden solo en marketplace y no tienen canal propio.

> ✅ **Los doce están.** Cada uno con su problema real y su destino sugerido, en tarjetas
> montadas desde `MIGRACIONES`. El de marketplace lleva `destacado: true` (borde y fondo
> de acento) y el de headless enlaza al caso Misako con el campo `caso`.

### Destinos (columna "Hacia")

- [x] **Shopify / Shopify Plus** con OS 2.0 nombrado explícitamente
- [x] **WooCommerce** ← ⚠️ **vuelve a entrar por decisión de Luis del 2026-07-21.**
      Se había quitado el 2026-07-20 a petición suya. Se documenta el ida y vuelta para
      que ningún chat futuro lo "corrija" pensando que es un error.
- [x] **VTEX**, cuando el volumen sí lo justifica
- [x] **Shopify headless o desarrollo a medida**, cuando el proyecto lo amerita

- [x] Frase de posicionamiento, que es **la diferencia con Cluster**:
      > *No toda migración termina en la misma plataforma. Primero miramos tu operación
      > y tu volumen; después decidimos a dónde.*
      >
      > Va en `.migracion-tesis`, **arriba del todo**, antes de la matriz: condiciona cómo
      > se lee todo lo que viene después.

## Parte B — Shopify Partner

- [x] Añadir **Shopify Partner** a `#migracion-ecommerce` y a la banda de credenciales
      de la Fase 8, con el mismo sistema de flags que los CRM (`CLAUDE.md` § 6.1).
      **Los dos sitios beben del mismo objeto `SHOPIFY_PARTNER`**, no de dos flags
      sueltos: con dos usos, dos flags acaban desincronizados y la web diría una cosa
      arriba y otra abajo.

> ⚠️ **Dos programas distintos, no confundirlos:**
> - **Shopify Partner** — gratuito, alta inmediata en `partners.shopify.com`. Es el que
>   Luis declara tener (2026-07-21). Este es el que se publica.
> - **Shopify Plus Partner** — selectivo, con umbrales de facturación y certificación.
>   **No se escribe "Plus Partner" mientras no esté aprobado.** Es casi seguro el que
>   tiene Cluster.
>
> Ambos son verificables en el directorio público de Shopify. Antes de publicar,
> confirmar que el alta está activa.

- [x] Coherencia con el discurso de independencia: ser Shopify Partner **no** contradice
      la frase de arriba, pero conviene que las dos convivan a la vista. Que se lea:
      *"somos partner de Shopify y aun así te decimos cuándo no te conviene"*. Eso es más
      creíble que cualquiera de las dos frases por separado.

      Resuelto con `#migracion-independencia`, justo debajo de los destinos:

      > *Somos **Shopify Partner** y aun así, si tu operación no lo pide, te vamos a decir
      > que no migres a Shopify. La recomendación sale de tu volumen y de tus procesos, no
      > del programa de partners en el que estemos dados de alta.*

      La escribe `script.js`, no el HTML, porque **depende del flag**: con
      `SHOPIFY_PARTNER.activo = false` se cambia sola por *"No revendemos ninguna
      plataforma…"*, que sigue siendo cierta sin mencionar un programa que no existe.

---

## Criterio de terminado

1. ✅ La sección sale entera del array; añadir un origen es añadir un objeto.
2. ✅ "Shopify Partner" aparece solo si el flag está en `true`, y **nunca** "Plus Partner".
   **Probado apagando el flag de verdad**, no leyendo el código: con `activo: false`
   desaparecen el badge del destino y la casilla de la banda, y la frase de independencia
   se reescribe sola. Con `true`, cero apariciones de "Plus Partner" o "Select Partner".
3. ✅ WooCommerce figura como destino.
4. ✅ Los 5 orígenes nuevos están, incluido el de marketplace (que además va destacado).
5. ✅ Sin scroll horizontal a 375 px (ni a 768 / 1024 / 1200 / 1440). Cache busting a
   **`?v=17`** en `index.html` y en las tres páginas legales de la raíz.

---

## Al terminar

- [x] Marcar el avance en `docs/ESTADO.md`
- [x] Dejar escrita la frase de arranque de la Fase 10

---

## Nota para quien lea esta ficha después

**El campo `destino` de cada origen no es una promesa cerrada, y casi ninguno nombra una
sola plataforma.** Es deliberado. Si en un chat futuro los doce destinos acabaran diciendo
"Shopify", la sección se contradiría con su propia frase de cabecera y Nouweb se habría
disfrazado del competidor, que sí es Shopify-exclusive (`CLAUDE.md` § 11). Está avisado
también en un comentario de `script.js`, encima del array.
