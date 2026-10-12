/* ==========================================================================
   Blog — fuente única de artículos (Fase 10)

   ESTE ES EL ÚNICO ARCHIVO QUE SE TOCA PARA PUBLICAR UN ARTÍCULO.
   Las instrucciones completas, escritas en castellano y no en jerga, están
   en blog/README.md. Resumen: copiar _plantilla.html, escribir dentro, añadir
   un objeto ARRIBA de este array y subir los dos archivos por FTP.

   Lo consumen DOS páginas, y por eso el array vive aquí y no dentro de cada
   una:
     · /blog/index.html  → el índice, con TODOS los artículos.
     · /index.html       → la home, con los 3 más recientes (sección #blog).
   Si el array se duplicara, la home acabaría anunciando artículos que el
   índice ya no lista. Un solo archivo, dos lectores.

   ⚠️ Este script se ejecuta EN CUANTO SE LEE, no espera al DOMContentLoaded, y
   en las dos páginas va colocado ANTES de script.js. No es un capricho:
   script.js recoge los .fade-in-up en su DOMContentLoaded y los entrega al
   IntersectionObserver. Si las tarjetas se inyectaran después de ese momento,
   nadie las observaría y se quedarían en opacity 0 para siempre — invisibles,
   sin ningún error en consola que lo delate. Es el mismo motivo por el que en
   script.js el observer va después de los renders de CRM y casos.
   ========================================================================== */

(function () {
    'use strict';

    /* ----------------------------------------------------------------------
       Los artículos, del más nuevo al más viejo.

       El orden de este array ES el orden que se publica: no se ordena por
       fecha automáticamente a propósito, para que Luis pueda dejar arriba un
       artículo que le interese destacar sin tener que falsear su fecha.

       Campos, todos obligatorios salvo `etiqueta`:
         url       · nombre del archivo dentro de /blog/. Sin "/" delante.
         titulo    · el mismo <h1> del artículo. Si no coinciden, el visitante
                     cree que hizo clic en el enlace equivocado.
         resumen   · 2 líneas. Lo que se lee en la tarjeta; no es la meta
                     description, aunque puedan parecerse.
         fecha     · AAAA-MM-DD. Alimenta el <time datetime> y el JSON-LD.
         lectura   · minutos, un número. Contar ~200 palabras por minuto.
         etiqueta  · opcional, una sola. Sirve para orientar, no para filtrar:
                     no hay archivo por categorías y montarlo con 3 artículos
                     sería una sección vacía más.
       ---------------------------------------------------------------------- */
    const ARTICULOS = [
        {
            url: 'pedidos-por-whatsapp-como-dejar-de-perderlos.html',
            titulo: 'Tus pedidos entran por WhatsApp: cómo dejar de perderlos sin cambiar de forma de vender',
            resumen: 'El problema no es que vendas por WhatsApp. Es que el chat no sabe en qué estado está cada pedido. Dónde se pierden exactamente y qué se arregla primero.',
            fecha: '2026-07-22',
            lectura: 8,
            etiqueta: 'Procesos'
        }
    ];

    /* Meses en minúscula: "22 de julio de 2026". En español el mes no va en
       mayúscula, y toLocaleDateString con 'es-PE' devuelve exactamente eso.
       Se deja el <time datetime> en ISO para que Google lea la fecha real. */
    const fechaLegible = iso => new Date(iso + 'T00:00:00').toLocaleDateString('es-PE', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    /* El texto de la tarjeta se escapa antes de inyectarlo. Hoy el array lo
       escribe Luis a mano y no hay riesgo real, pero un título con un & o un
       < rompería la tarjeta en silencio, y eso sí pasa al escribir. */
    const esc = s => String(s).replace(/[&<>"]/g, c => (
        { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]
    ));

    /* ⚠️ El enlace se escribe SIEMPRE como /blog/loquesea.html, absoluto desde
       la raíz del dominio, y esto no es una manía de estilo: la misma tarjeta
       se dibuja en dos páginas que están a distinta profundidad.

       Con el `url` del array tal cual —relativo— funcionaba en el índice y
       daba 404 en la home, porque desde / el navegador lo resolvía a
       nouweb-es.com/loquesea.html en vez de nouweb-es.com/blog/loquesea.html. Es un
       fallo que no se ve leyendo el código ni mirando la página: la tarjeta se
       dibuja perfecta y solo revienta al hacer clic. Medido con un HEAD desde
       la home: 404.

       Por eso el array guarda el nombre a secas (una cosa menos que explicarle
       a quien publica) y el prefijo lo pone este render, en un solo sitio. */
    const enlace = a => '/blog/' + esc(a.url).replace(/^\/+/, '');

    const tarjeta = (a, i) => `
        <article class="blog-card fade-in-up${i % 3 ? ' delay-' + (i % 3) : ''}">
            <div class="blog-card-meta">
                <time datetime="${esc(a.fecha)}">${fechaLegible(a.fecha)}</time>
                <span aria-hidden="true">·</span>
                <span>${a.lectura} min de lectura</span>
                ${a.etiqueta ? `<span class="blog-etiqueta">${esc(a.etiqueta)}</span>` : ''}
            </div>
            <h3 class="blog-card-titulo">
                <!-- El enlace envuelve el título y NO toda la tarjeta: un <a>
                     con varios párrafos dentro se lee fatal en lector de
                     pantalla. El resto de la tarjeta se hace clicable con el
                     ::after del CSS, que es el truco que conserva la
                     semántica. -->
                <a href="${enlace(a)}">${esc(a.titulo)}</a>
            </h3>
            <p class="blog-card-resumen">${esc(a.resumen)}</p>
            <span class="blog-card-seguir" aria-hidden="true">Leer el artículo <i class="fas fa-arrow-right"></i></span>
        </article>`;

    /* --- 1. Índice del blog (/blog/index.html) ---------------------------- */
    const indice = document.querySelector('#blog-index-grid');
    if (indice) {
        if (ARTICULOS.length) {
            indice.innerHTML = ARTICULOS.map(tarjeta).join('');
        } else {
            /* Estado vacío digno, nunca una rejilla rota. No dice
               "próximamente": una promesa sin fecha resta más de lo que suma. */
            const vacio = document.querySelector('#blog-vacio');
            if (vacio) vacio.hidden = false;
            indice.hidden = true;
        }
    }

    /* --- 2. Home: los 3 más recientes (#blog de /index.html) --------------- */
    /* La sección nace con [hidden] desde la Fase 8. Se revela AQUÍ y solo si
       hay artículos: si algún día el array se vacía, la home vuelve sola a no
       tener sección de blog en vez de enseñar un hueco. */
    const homeGrid = document.querySelector('#blog-grid');
    if (homeGrid && ARTICULOS.length) {
        homeGrid.innerHTML = ARTICULOS.slice(0, 3).map(tarjeta).join('');

        const seccion = document.querySelector('#blog');
        if (seccion) seccion.hidden = false;

        /* El pie de la sección enlaza al índice solo cuando hay más de 3:
           con 1 artículo, "ver todos" lleva a una página que enseña justo lo
           mismo que el visitante acaba de ver. */
        const verTodos = document.querySelector('#blog-ver-todos');
        if (verTodos && ARTICULOS.length > 3) verTodos.hidden = false;
    }
})();
