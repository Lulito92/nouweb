# Cómo publicar un artículo en el blog

Escrito para ti, Luis, no para un programador. Son **4 pasos** y no hace falta
saber programar: se copia un archivo, se escribe dentro, se añaden cuatro líneas
y se sube todo por FTP.

Tiempo real la primera vez: unos 20 minutos. A partir de la segunda, 5.

> **Lo que hay que asumir de entrada:** esto no es WordPress. No hay panel de
> administración ni botón de publicar. A cambio, no hay nada que actualizar,
> nada que se pueda hackear y nada que se rompa solo. Con el volumen que vas a
> llevar, sale ganando.

---

## Antes de empezar: qué archivo es cada cosa

| Archivo | Qué es |
|---|---|
| `_plantilla.html` | El **molde**. No se toca nunca y no se publica. Se copia. |
| `blog.js` | **La lista de artículos.** Lo único que se edita en cada publicación. |
| `index.html` | El índice. Se monta solo desde `blog.js`. **Nunca se toca.** |
| `pedidos-por-whatsapp-...html` | El primer artículo, ya publicado. Sirve de ejemplo. |

Para escribir puedes usar el Bloc de notas, pero se recomienda
**[Notepad++](https://notepad-plus-plus.org/)** o **VS Code**: colorean el texto
y hacen mucho más difícil romper algo sin darte cuenta.

---

## Paso 1 — Copiar la plantilla y ponerle nombre

Haz una copia de `_plantilla.html` dentro de esta misma carpeta y renómbrala.

**El nombre del archivo es la dirección del artículo en Google**, así que
importa:

- Todo en **minúsculas**, con **guiones** entre palabras.
- **Sin tildes, sin eñes, sin espacios.** `ñ` → `n`, `ó` → `o`.
- Que se entienda de qué va, con 4 o 6 palabras. Es lo que la gente ve antes
  de hacer clic.
- Termina en `.html`.

✅ `migrar-de-magento-a-shopify-sin-perder-seo.html`
❌ `Artículo 2 (final).html`

> ⚠️ **Una vez publicado, el nombre no se cambia.** Si lo cambias después, la
> dirección vieja deja de existir y quien la tuviera guardada —o Google— llega a
> un error 404. Piénsalo un minuto ahora y ya está.

---

## Paso 2 — Escribir el artículo

Abre tu copia y busca las **dobles llaves**: `{{ASÍ}}`. Cada una marca algo que
hay que cambiar. La plantilla lleva un comentario encima de cada zona
explicando qué va ahí y con cuánto espacio cuentas.

Los párrafos van envueltos en `<p>` y `</p>`, uno por párrafo. Los títulos de
sección en `<h2>`. Todo lo que puedes usar está listado dentro de la plantilla,
con un ejemplo de cada cosa: negrita, listas, enlaces, imágenes y la frase
destacada con la raya cian.

**Al terminar, busca `{{` en el archivo (Ctrl+F).** Si sale algún resultado, es
que te dejaste algo sin rellenar. No debe quedar ninguna.

Tres cosas que se olvidan siempre:

1. **La canónica.** En la cabecera hay tres direcciones con el nombre del
   archivo. Si te las dejas apuntando al artículo del que copiaste, Google
   indexa el otro y el tuyo no aparece nunca. Es el error más caro y el más
   invisible.
2. **Borrar la línea del `noindex`.** La plantilla la lleva para que no se
   indexe por error; en tu artículo hay que quitarla o Google no lo mostrará.
   Está señalada con un comentario.
3. **Las dos fechas del bloque de datos** (`datePublished` y `dateModified`).
   Al publicar, las dos iguales.

### Las reglas de la casa también valen acá

Son las mismas del resto del sitio (`CLAUDE.md` § 6.3) y son las que hacen que
el blog sume credibilidad en vez de restarla:

- **Ni un porcentaje ni una cifra de resultado que no sea real y tuya.**
- **Ningún testimonio ni logo de cliente sin permiso.**
- Si te falta un dato, no lo redondees: escribe `{{PENDIENTE: qué falta}}` y no
  publiques hasta tenerlo.
- Español peruano: *ustedes*, *celular*, *computadora*, soles, SUNAT, IGV.

---

## Paso 3 — Añadirlo a la lista y al mapa del sitio

Son los dos únicos archivos que se editan. Sin esto, el artículo existe pero no
lo encuentra nadie.

### 3a. `blog/blog.js`

Abre `blog.js` y busca `const ARTICULOS = [`. Justo debajo, **añade tu bloque
arriba del todo** (el primero de la lista es el que sale primero):

```js
{
    url: 'nombre-de-tu-archivo.html',
    titulo: 'El mismo titular que pusiste en el <h1>',
    resumen: 'Dos líneas contando de qué va. Es lo que se lee en la tarjeta.',
    fecha: '2026-09-15',
    lectura: 6,
    etiqueta: 'Procesos'
},
```

Detalles que importan:

- **La coma del final**, salvo si es el último de la lista. Si te la comes, el
  blog deja de listar artículos. Es el fallo número uno.
- La fecha va **`AAAA-MM-DD`**, con el año primero.
- `lectura` son minutos: cuenta las palabras y divide entre 200.
- Si un texto lleva **apóstrofo** (`'`), escríbelo entre comillas dobles:
  `titulo: "Lo que no te cuenta el 'kit digital'"`. Si no, se rompe.

### 3b. `sitemap.xml` (en la carpeta de arriba, no en esta)

Copia uno de los bloques `<url>` de los artículos y cambia la dirección y la
fecha:

```xml
<url>
    <loc>https://nouweb-es.com/blog/nombre-de-tu-archivo.html</loc>
    <lastmod>2026-09-15</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
</url>
```

Es lo que hace que Google se entere de que el artículo existe sin esperar a
encontrarlo por su cuenta.

---

## Paso 4 — Subir por FTP

Sube estos archivos, respetando las carpetas:

| Archivo | A dónde |
|---|---|
| `tu-articulo.html` | `/blog/` |
| `blog.js` | `/blog/` |
| `sitemap.xml` | la raíz |

**No hace falta subir** `index.html` del blog ni la plantilla: no cambiaron.

### Si además tocaste el diseño o la home

Solo en ese caso, y siempre juntos: `index.html` (la raíz), `styles.css`,
`script.js` y **subiendo el número del `?v=`** en todos a la vez. Ese número es
lo que obliga al navegador a descargarse la versión nueva; sin cambiarlo, los
visitantes que ya entraron siguen viendo la vieja durante días.

### Comprobar que salió bien

1. Abre `nouweb-es.com/blog/` y **fuerza la recarga con Ctrl + F5**. Sin eso ves la
   versión cacheada y parece que no se subió nada. Es el error que más tiempo
   hace perder.
2. Comprueba que tu artículo aparece en el índice y que **el enlace abre**.
3. Baja a la home: debe salir entre los últimos tres.
4. Pega la dirección del artículo en un chat de WhatsApp contigo mismo: tiene
   que salir la vista previa con el título y el logo.

---

## Preguntas que van a salir

**¿Y si me equivoco y rompo el blog?**
El índice se queda en blanco, pero **la home y el resto del sitio no se tocan**:
el blog vive en su propia carpeta. Vuelve a subir la versión anterior de
`blog.js` y todo regresa a como estaba. Guarda una copia antes de editarlo.

**¿Cuántos artículos aguanta esto?**
Hasta unos 20 o 30 se lleva bien. A partir de ahí, editar `blog.js` a mano
empieza a cansar y toca replantearlo. Está anotado en el backlog del proyecto.

**¿Puedo despublicar un artículo?**
Borra su bloque de `blog.js` y su `<url>` del `sitemap.xml`: desaparece del
índice y de la home. El archivo sigue en el servidor, así que quien tenga el
enlace directo lo sigue viendo. Para que desaparezca del todo, bórralo también
por FTP.

**¿Puedo poner un artículo destacado arriba aunque sea viejo?**
Sí. El orden de la lista manda, no la fecha. Mueve su bloque al principio del
array y ya está: **no hace falta cambiarle la fecha**, y no se debe.

**¿Dónde pongo las imágenes?**
En `/Imagenes/blog/`. Dentro del artículo se enlazan como
`/Imagenes/blog/nombre.jpg`. Ponles siempre el `alt`: es lo que lee quien no
puede ver la imagen y lo que entiende Google.
