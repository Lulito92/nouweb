document.addEventListener('DOMContentLoaded', () => {
    // ========================================================================
    // MERCADOS — el interruptor de las dos versiones en español
    // Fase 14, sesión 2 (2026-08-09)
    // ========================================================================
    //
    // Nouweb vende a DOS mercados en el mismo idioma: Perú (la raíz, `/`) y
    // España (`/es-es/`, que nace en la sesión 3). No son dos traducciones: son
    // dos marcos legales, dos monedas, dos impuestos y dos canales de venta.
    // Un visitante español que lee "IGV", "SUNAT" o "S/" entiende en diez
    // segundos que la página no es para él.
    //
    // La estética es la misma que ya tienen SHOPIFY_PARTNER y MARKETING: UN
    // solo sitio donde se cambia el dato, y todo lo que dependa de él se
    // recalcula solo. Aquí eso significa que los arrays que dibujan la home
    // llevan un campo `mercado` y se filtran al renderizar, exactamente igual
    // que CREDENCIALES ya filtraba por `activo`.
    //
    // ⚠️ DE DÓNDE SALE EL MERCADO HOY: del atributo `data-mercado` que el
    // <head> de la página escribe ANTES de pintar, a partir de su `lang`. No
    // sale de la IP ni de la zona horaria, y eso es a propósito
    // (FASE-14-mercados.md § Arquitectura): Googlebot rastrea desde EE.UU., así
    // que una página cuyo contenido cambie según quién la pida solo se
    // indexaría en una de sus dos variantes. La detección por zona horaria
    // llega en la sesión 4 y NO toca el contenido: solo enseña un banner
    // ofreciendo cambiar de versión.
    //
    // Si el atributo no está (páginas legales, blog), cae a 'pe', que es lo que
    // sirve la raíz. Es el fallo seguro: lo peor que puede pasar es que una
    // página en español peruano se dibuje en español peruano.
    const MERCADOS = {
        pe: {
            nombre: 'Perú',
            impuesto: 'IGV',
            impuestoTasa: '18 %',
            moneda: 'S/',
            monedaISO: 'PEN',
            organismo: 'SUNAT',
            facturacion: 'facturación electrónica SUNAT vía OSE/PSE',
            proteccionDatos: 'Ley 29733 de Protección de Datos Personales',
            pasarelas: ['Niubiz', 'Izipay', 'Culqi', 'Mercado Pago', 'Yape', 'Plin'],
            gancho: 'Tus pedidos entran por WhatsApp y se pierden en un chat'
        },
        es: {
            nombre: 'España',
            impuesto: 'IVA',
            impuestoTasa: '21 %',
            moneda: '€',
            monedaISO: 'EUR',
            organismo: 'Hacienda (AEAT)',
            // ⚠️ SIN FECHAS. Las de entrada en vigor de Verifactu se han
            // aplazado varias veces y Luis no las tiene verificadas
            // (CLAUDE.md § 4bis y § 6.3, pendiente nº 22). En la web de quien
            // vende integraciones de facturación, una fecha mal puesta hace más
            // daño que no mencionarla. No escribir ninguna aquí.
            facturacion: 'facturación electrónica y Verifactu',
            proteccionDatos: 'RGPD (Reglamento UE 2016/679) y LOPDGDD (LO 3/2018)',
            pasarelas: ['Redsys', 'Bizum', 'Stripe', 'PayPal', 'Apple Pay', 'Google Pay'],
            // ⚠️ El gancho peruano NO se traduce, se sustituye: en España los
            // pedidos no entran por WhatsApp (CLAUDE.md § 4bis).
            gancho: 'Tus pedidos se pierden entre correos, llamadas y el marketplace'
        }
    };

    // El mercado activo. La comprobación contra MERCADOS no es paranoia: si un
    // día alguien escribe `data-mercado="ES"` o "españa", esto cae a 'pe' en vez
    // de dejar la página a medio dibujar.
    const MERCADO = MERCADOS[document.documentElement.dataset.mercado] ? document.documentElement.dataset.mercado : 'pe';

    // ⚠️ Los campos de MERCADOS (impuesto, moneda, pasarelas…) todavía NO los
    // consume nadie: son los cimientos que la sesión 3 usa al escribir
    // /es-es/. Lo que SÍ está vivo desde hoy es `MERCADO` y los dos ayudantes
    // de abajo, que es lo que filtra las 7 rejillas.

    // Un elemento SIN campo `mercado` vale para los dos. Es el fallo visible, no
    // el silencioso: si alguien añade una tarjeta y olvida declarar el mercado,
    // aparece de más (se ve y se corrige) en vez de no aparecer nunca en ningún
    // sitio (que no se ve hasta que alguien la echa de menos).
    const deEsteMercado = (item) => !item.mercado || item.mercado.includes(MERCADO);

    // `destacado` se declara igual que `mercado`: la lista de mercados donde esa
    // tarjeta va resaltada. Un `true` heredado sigue valiendo para los dos, así
    // que no hay que tocar los arrays que aún no lo necesiten.
    const destacaAqui = (campo) => Array.isArray(campo) ? campo.includes(MERCADO) : !!campo;

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav');

    // Desde la Fase 13 el botón lleva DENTRO los dos iconos en SVG (barras y
    // aspa) y el CSS enseña uno u otro según la clase del propio botón. Antes
    // se cambiaban las clases de un <i> de Font Awesome; ese <i> ya no existe,
    // porque los iconos de encima del pliegue van en línea para que la
    // cabecera no espere a que llegue Font Awesome.
    //
    // `aria-expanded` no es decorativo: es lo que le dice a un lector de
    // pantalla si el menú está abierto o cerrado. Antes no lo decía nadie.
    const pintarToggle = (abierto) => {
        mobileToggle.classList.toggle('abierto', abierto);
        mobileToggle.setAttribute('aria-expanded', String(abierto));
        mobileToggle.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    };

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            pintarToggle(nav.classList.toggle('active'));
        });
    }

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                pintarToggle(false);
            }
        });
    });

    // --- Ocultar el header al bajar, mostrarlo al subir --------------------
    // Estándar: al bajar el scroll el header se va hacia arriba (más sitio para
    // leer); al subir vuelve. No se esconde si el menú móvil está abierto ni
    // cerca de la parte de arriba de la página.
    const header = document.querySelector('.header');
    if (header) {
        let lastScroll = window.scrollY;
        const DELTA = 8; // ignora microscroll y no parpadea
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            // Con el menú móvil abierto no tocamos el header (el desplegable
            // cuelga de él).
            if (nav && nav.classList.contains('active')) {
                lastScroll = y;
                return;
            }
            if (Math.abs(y - lastScroll) < DELTA) return;
            if (y > lastScroll && y > header.offsetHeight) {
                header.classList.add('header-hidden');    // bajando
            } else {
                header.classList.remove('header-hidden');  // subiendo
            }
            lastScroll = y;
        }, { passive: true });
    }

    // --- Titular que se escribe solo (2026-07-22) ---------------------------
    // Petición de Luis a partir de la home de Cluster. Se copió EL EFECTO, que
    // es una idea de interacción y no se protege; NO su frase ("Ecommerce is
    // the new retail"), que además de ser copy suyo describe el negocio de una
    // agencia Shopify y no el de Nouweb (CLAUDE.md § 11.1).
    //
    // Las cuatro frases son cuatro de los seis dolores de #problema, en boca
    // del visitante. Rotarlas es el gancho: cada una da otra oportunidad de que
    // se reconozca. Cambiar una aquí basta; el HTML no hay que tocarlo.
    //
    // ⚠️ Si se añade una frase MUY larga, mirar el hero a 375 px: la caja
    // reserva la altura de la más alta, así que una frase suelta de cinco
    // líneas empuja hacia abajo todo el hero en todos los anchos.
    //
    // Fase 14: cada frase declara su mercado. Dos de las cuatro peruanas NO se
    // traducen, se SUSTITUYEN: "viven en WhatsApp" y "facturación SUNAT" no
    // describen a ningún comprador español (CLAUDE.md § 4bis). Las otras dos
    // valen igual en los dos países y no se duplican.
    const HERO_FRASES_TODAS = [
        { texto: 'Tus pedidos viven en WhatsApp.', mercado: ['pe'] },
        { texto: 'Tus pedidos se pierden entre correos y llamadas.', mercado: ['es'] },
        { texto: 'Tu stock vive en un Excel que no cuadra.', mercado: ['pe', 'es'] },
        { texto: 'Tu facturación SUNAT va por su lado.', mercado: ['pe'] },
        { texto: 'Tu facturación va por su lado.', mercado: ['es'] },
        { texto: 'Tus sistemas no se hablan entre ellos.', mercado: ['pe', 'es'] }
    ];

    // El efecto de tecleo de abajo trabaja con un array de STRINGS y no hay que
    // tocarlo: se le entrega ya filtrado y aplanado. Es deliberado — es el
    // trozo de código más delicado de la página (mide alturas, reconstruye
    // nodos y sobrevive a la lluvia de `resize` de iOS), así que el filtro de
    // mercado se queda fuera de él.
    //
    // ⚠️ `reservarAltura()` recorre ESTE array para reservar la altura de la
    // frase más alta. Al estar ya filtrado, una frase larga de España no puede
    // empujar hacia abajo el hero peruano.
    const HERO_FRASES = HERO_FRASES_TODAS.filter(deEsteMercado).map(f => f.texto);

    const heroRotativo = document.querySelector('#hero-rotativo');
    const heroTexto = heroRotativo && heroRotativo.querySelector('.hero-rotativo-texto');

    if (heroTexto) {
        // DISENO.md § 5 obliga a respetar "reducir movimiento" — es lo que iOS
        // activa cuando el usuario enciende Ajustes › Accesibilidad › Reducir
        // movimiento. Con eso NO se teclea (el tecleo puede marear a quien es
        // sensible), pero desde 2026-07-23 las cuatro frases IGUAL rotan con un
        // fundido suave (ver el `else` del final).
        //
        // ⚠️ Antes, con "reducir movimiento" activo, el titular se quedaba
        // clavado en la PRIMERA frase para siempre, así que el visitante no veía
        // nunca los otros tres dolores. Un fundido de opacidad no es
        // "movimiento" —es justo lo que Apple recomienda como alternativa a los
        // deslizamientos bajo ese ajuste—, así que rota sin incumplir nada.
        const animar = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // ⚠️ EL PUNTO DELICADO DE TODO EL EFECTO (2026-07-22).
        //
        // La versión ingenua es ir cortando la frase con slice() y meterla en el
        // elemento. Se ve mal, y el motivo es de maquetación, no de código:
        // mientras se teclea "SUNAT", la S suelta SÍ cabe al final de la línea,
        // así que el navegador la deja arriba; al completarse la palabra ya no
        // cabe y la baja de golpe a la línea siguiente. Al borrar pasa lo mismo
        // al revés y la palabra sube. El titular parece descuadrarse solo.
        //
        // La solución no es medir mejor: es que el navegador NUNCA calcule la
        // maqueta de una frase a medias. Se pintan TODAS las letras de la frase
        // desde el primer momento, cada una en su <span>, y escribir consiste en
        // pasarlas de invisibles a visibles.
        //
        // Se usa `visibility`, no `display` ni `opacity`: `visibility: hidden`
        // deja el hueco ocupado, que es justo lo que fija los saltos de línea.
        // Con `display: none` el problema volvería idéntico.
        const construir = (frase) => {
            heroTexto.textContent = '';
            const letras = [];
            // Recorrido por code points: las tildes y la ñ son un solo carácter
            // y no se pueden partir por la mitad.
            for (const ch of frase) {
                const s = document.createElement('span');
                s.className = 'hero-letra';
                s.textContent = ch;
                heroTexto.appendChild(s);
                letras.push(s);
            }
            return letras;
        };

        // El cursor no es un elemento propio: lo dibuja el ::after de la última
        // letra visible (o el ::before de la primera, cuando no hay ninguna).
        // Así no hay ningún nodo que insertar y quitar entre las letras, que
        // volvería a mover la maqueta un carácter.
        const revelar = (letras, pos) => {
            letras.forEach((s, k) => {
                s.classList.toggle('hero-letra-visible', k < pos);
                s.classList.remove('hero-letra-cursor', 'hero-letra-cursor-inicio');
            });
            if (pos > 0) letras[pos - 1].classList.add('hero-letra-cursor');
            else if (letras.length) letras[0].classList.add('hero-letra-cursor-inicio');
        };

        // Borrar va más rápido que escribir: releer lo ya leído aburre. La pausa
        // larga es la de lectura, y es la que hace que la frase se entienda
        // antes de desaparecer.
        const RITMO = { escribir: 55, borrar: 30, leer: 2400, entre: 450 };

        let i = 0;
        let pos = HERO_FRASES[0].length;
        let borrando = true; // arranca con la frase escrita, así que toca borrar
        let letras = [];

        // Reservar la altura de la frase más alta. Sin esto el hero salta al
        // cambiar de frase, porque no todas ocupan el mismo número de líneas, y
        // el botón de la auditoría se movería solo bajo el dedo del visitante.
        // Se mide sobre el elemento REAL, oculto un instante, en vez de clonar
        // un nodo: así no queda en el DOM ningún texto duplicado que Google
        // pueda leer como parte del <h1>.
        //
        // ⚠️ Medir DESTRUYE los <span> de las letras, porque escribe texto plano
        // en el contenedor. Por eso al final reconstruye la frase actual y
        // vuelve a apuntar `letras` a los nodos NUEVOS. Sin esa última parte el
        // tecleo se muere en silencio en el primer cambio de ancho: seguiría
        // encendiendo y apagando clases sobre nodos que ya no están en la
        // página, y el titular se quedaría congelado a medio escribir.
        const reservarAltura = () => {
            heroRotativo.style.minHeight = '';
            heroTexto.style.visibility = 'hidden';
            let alto = 0;
            HERO_FRASES.forEach(f => {
                heroTexto.textContent = f;
                alto = Math.max(alto, heroRotativo.getBoundingClientRect().height);
            });
            heroRotativo.style.minHeight = Math.ceil(alto) + 'px';

            if (animar) {
                letras = construir(HERO_FRASES[i]);
                revelar(letras, pos);
            } else {
                // Rama "reducir movimiento": la frase ACTUAL (i), no siempre la
                // 0. Así, si cambia el ancho mientras rota, no salta atrás.
                heroTexto.textContent = HERO_FRASES[i];
            }
            heroTexto.style.visibility = '';
        };

        reservarAltura();

        // Al rotar el celular cambia el ancho y con él el número de líneas.
        let reajuste;
        window.addEventListener('resize', () => {
            clearTimeout(reajuste);
            reajuste = setTimeout(reservarAltura, 150);
        }, { passive: true });

        // ⚠️ AÑADIDO EN LA FASE 13, y no es opcional.
        //
        // Desde la Fase 13 la hoja de Google Fonts ya no bloquea el pintado,
        // así que cuando esto se ejecuta la primera vez el titular puede estar
        // dibujado todavía con la tipografía del sistema. Outfit es más
        // estrecha: la altura quedaría reservada de más o de menos, y al
        // llegar la fuente el hero pegaría exactamente el salto que la Fase 12
        // se dedicó a quitar.
        //
        // `document.fonts.ready` resuelve cuando ya están todas las fuentes.
        // Volver a medir ahí cuesta nada y cierra el agujero. El `.catch` es
        // por si un navegador viejo no trae la API: sin él, una promesa
        // rechazada ensuciaría la consola sin que nada esté roto.
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(reservarAltura).catch(() => { });
        }

        if (animar) {
            const teclear = () => {
                pos += borrando ? -1 : 1;
                revelar(letras, pos);

                let espera = borrando ? RITMO.borrar : RITMO.escribir;

                if (!borrando && pos >= letras.length) {
                    borrando = true;
                    espera = RITMO.leer;
                } else if (borrando && pos <= 0) {
                    borrando = false;
                    i = (i + 1) % HERO_FRASES.length;
                    // La frase siguiente se pinta ENTERA e invisible antes de
                    // escribir su primera letra: los saltos de línea quedan
                    // fijados desde antes de que se vea nada.
                    letras = construir(HERO_FRASES[i]);
                    revelar(letras, 0);
                    espera = RITMO.entre;
                }

                setTimeout(teclear, espera);
            };

            // La primera frase se queda quieta un momento antes de borrarse: es
            // la que ve quien entra y se va a los tres segundos.
            setTimeout(teclear, RITMO.leer);
        } else {
            // "Reducir movimiento" activo: sin tecleo, pero las cuatro frases
            // rotan con un fundido de opacidad (no es movimiento; es la
            // alternativa que recomienda Apple bajo ese ajuste). Así el
            // visitante ve los cuatro dolores en vez de clavarse en uno.
            heroTexto.style.transition = 'opacity 400ms var(--ease, ease)';
            const rotarSuave = () => {
                heroTexto.style.opacity = '0';
                setTimeout(() => {
                    i = (i + 1) % HERO_FRASES.length;
                    heroTexto.textContent = HERO_FRASES[i];
                    heroTexto.style.opacity = '1';
                }, 400);
            };
            // 3,6 s por frase: da tiempo de sobra a leerla sin tecleo.
            setInterval(rotarSuave, 3600);
        }
    }

    // --- Stack de CRM ------------------------------------------------------
    // Fuente única de la rejilla de #stack-crm. El HTML no lleva ninguna marca.
    //
    // ⚠️ REGLA INNEGOCIABLE (CLAUDE.md § 6.1): la palabra "Partner" y su badge
    // solo se dibujan con `partner: true`. Los directorios de partners de HubSpot,
    // Zoho y Odoo son públicos: un badge falso se verifica en 20 segundos.
    // Hoy Luis NO es partner de ninguno. Para activar uno basta con cambiar su
    // flag a true; el badge aparece solo, sin tocar el HTML.
    //
    // `logo` es la ruta del logotipo y `url` el sitio oficial (la ficha entera
    // es un acceso directo). Si un archivo falta o no carga, el onerror del
    // render deja el nombre como wordmark, así que la ficha nunca queda rota.
    //
    // ⚠️ LOS LOGOS SON PROPIOS Y VIVEN EN `Imagenes/crm/` (2026-08-10).
    // Hasta hoy salían de `logo.clearbit.com`, un tercero, y **ese servicio se
    // apagó**: el host ya ni resuelve, así que las 8 fichas llevaban un tiempo
    // cayendo al wordmark en la web publicada. Ahora son archivos nuestros:
    //   · no dependen de que un tercero siga vivo,
    //   · no filtran la IP del visitante a nadie no declarado en
    //     `politica-cookies.html` (regla de `CLAUDE.md` § 8),
    //   · y pesan 61 KB entre los nueve, con `loading="lazy"`.
    // Cierra el pendiente nº 1, que pedía justo esto desde la Fase 3.
    //
    // Los tres SVG son la marca oficial en su color oficial; los PNG son el
    // icono de aplicación que publica cada marca en su propio sitio. Para
    // cambiar uno basta con dejar otro archivo con el mismo nombre.
    //
    // Fase 14: los 8 se quedan en los DOS mercados (decisión de la sesión 1,
    // Anexo A.7). Ninguno es exclusivo de un país y la sección comunica
    // amplitud, así que recortarla en España solo la haría parecer más pobre.
    //
    // ⚠️ KOMMO SOLO VA DESTACADO EN PERÚ (decisión de Luis, 2026-08-10).
    // Su gancho es "WhatsApp primero", y en Perú eso es EL argumento; en España
    // WhatsApp no es el canal de venta (CLAUDE.md § 4bis), así que resaltarlo
    // allí contradecía el propio mensaje de la página. Sigue en la rejilla de
    // los dos mercados: lo que cambia es el realce, no la presencia.
    //
    // En España el hueco destacado lo ocupa KLAVIYO, que es lo que de verdad
    // se le pone delante a una tienda española: email, SMS y datos de cliente
    // pegados a Shopify. ⚠️ Klaviyo se vende a sí mismo como "B2C CRM", así que
    // cabe bajo el encabezado de la sección; si algún día se quiere ser más
    // estricto, el encabezado es lo que habría que matizar, no el logo.
    const CRMS = [
        { nombre: 'Kommo', logo: '/Imagenes/crm/kommo.png', url: 'https://www.kommo.com', mercado: ['pe', 'es'], destacado: ['pe'], partner: false, enProceso: true, nota: 'WhatsApp primero' },
        { nombre: 'Klaviyo', logo: '/Imagenes/crm/klaviyo.png', url: 'https://www.klaviyo.com', mercado: ['pe', 'es'], destacado: ['es'], partner: false, enProceso: false, nota: 'Nativo en Shopify' },
        { nombre: 'HubSpot', logo: '/Imagenes/crm/hubspot.svg', url: 'https://www.hubspot.com', mercado: ['pe', 'es'], destacado: ['pe', 'es'], partner: false, enProceso: true, nota: 'El estándar del mercado' },
        { nombre: 'Zoho', logo: '/Imagenes/crm/zoho.svg', url: 'https://www.zoho.com/crm/', mercado: ['pe', 'es'], destacado: false, partner: false, enProceso: true, nota: '' },
        { nombre: 'Odoo', logo: '/Imagenes/crm/odoo.svg', url: 'https://www.odoo.com', mercado: ['pe', 'es'], destacado: false, partner: false, enProceso: false, nota: '' },
        { nombre: 'Bitrix24', logo: '/Imagenes/crm/bitrix24.png', url: 'https://www.bitrix24.com', mercado: ['pe', 'es'], destacado: false, partner: false, enProceso: false, nota: '' },
        { nombre: 'Pipedrive', logo: '/Imagenes/crm/pipedrive.png', url: 'https://www.pipedrive.com', mercado: ['pe', 'es'], destacado: false, partner: false, enProceso: false, nota: '' },
        { nombre: 'monday', logo: '/Imagenes/crm/monday.png', url: 'https://monday.com', mercado: ['pe', 'es'], destacado: false, partner: false, enProceso: false, nota: '' },
        { nombre: 'Clientify', logo: '/Imagenes/crm/clientify.png', url: 'https://www.clientify.com', mercado: ['pe', 'es'], destacado: false, partner: false, enProceso: false, nota: '' }
    ];

    const crmGrid = document.querySelector('#crm-grid');
    if (crmGrid) {
        // ⚠️ El filtro va ANTES del map, no dentro. El índice `i` alimenta las
        // clases delay-1/2/3 del escalonado: si se filtrara después, los huecos
        // dejarían saltos en la animación de entrada.
        crmGrid.innerHTML = CRMS.filter(deEsteMercado).map((crm, i) => {
            // Logo sobre un chip blanco: los logos de marca son de color y
            // pensados para fondo claro, así leen sobre el fondo oscuro. Si el
            // archivo no carga, el onerror quita el chip y deja el wordmark.
            const marca = crm.logo
                ? `<span class="crm-logo-chip"><img src="${crm.logo}" alt="${crm.nombre}" loading="lazy" onerror="this.closest('.crm-logo-chip').classList.add('crm-logo-fail'); this.remove();"><span class="crm-wordmark">${crm.nombre}</span></span>`
                : `<span class="crm-wordmark">${crm.nombre}</span>`;

            // Solo `partner: true` produce badge. `enProceso` no dibuja nada:
            // ya se comunica en el texto al pie de la sección.
            const badge = crm.partner
                ? `<span class="crm-badge"><i class="fas fa-circle-check"></i> Partner</span>`
                : '';

            const nota = crm.nota ? `<span class="crm-nota">${crm.nota}</span>` : '';

            // La ficha entera es el acceso directo al sitio del CRM, en pestaña
            // nueva. rel="nofollow": son plataformas de terceros; ni les regalamos
            // autoridad SEO ni queremos que Google lo lea como una afiliación.
            const attrs = crm.url
                ? `href="${crm.url}" target="_blank" rel="noopener nofollow"`
                : 'href="#stack-crm"';

            return `
                <a class="crm-card fade-in-up${destacaAqui(crm.destacado) ? ' crm-destacado' : ''}${i % 3 ? ' delay-' + (i % 3) : ''}" ${attrs} aria-label="${crm.nombre}">
                    ${marca}
                    ${nota}
                    ${badge}
                </a>`;
        }).join('');
    }

    // --- Casos ------------------------------------------------------------
    // Fuente única de #casos. Añadir un caso nuevo = añadir un objeto aquí.
    //
    // ⚠️ REGLA INNEGOCIABLE (CLAUDE.md § 6.2 y 6.3): solo colaboraciones reales
    // y con permiso. Nada de marcas inventadas ni huecos de relleno: si no hay
    // caso, no hay tarjeta. Ninguna cifra que Luis no haya aportado; mientras
    // falte, el marcador {{PENDIENTE}} se queda VISIBLE en la página.
    //
    // `logo: null` dibuja el nombre del cliente en texto, igual que en CRMS.
    // El logo de Misako solo se pone aquí cuando exista el archivo y Luis
    // confirme el permiso por escrito (ESTADO.md § Pendientes de Luis, nº 7).
    // Datos aportados por Luis el 2026-07-20 (Misako es de España, no de Perú).
    // Las cifras de resultado las dio Luis; no se inventó ninguna (CLAUDE.md § 6.3).
    //
    // ⚠️ Fase 14, y da la vuelta a lo que se creía: Misako es una marca
    // ESPAÑOLA, no peruana. O sea que el único caso publicable de Nouweb juega
    // EN CASA en /es-es/ y es un caso extranjero en la home peruana — justo al
    // revés de lo que se asumió al abrir la fase. Va en los dos mercados sin
    // cambiar una coma; lo que queda pendiente es un caso peruano real
    // (ESTADO.md § Pendientes, nº 26).
    const CASOS = [
        {
            cliente: 'Misako',
            mercado: ['pe', 'es'],
            logo: null,
            sector: 'Moda y complementos · España',
            contexto: 'Una de las marcas líderes en España en bolsos, maletas, mochilas y complementos, reconocida por ofrecer productos modernos y asequibles.',
            problema: 'Su tienda funcionaba headless sobre otra plataforma, pero arrastraba muchos bugs y el inventario no cuadraba bien.',
            queSeHizo: 'Migración de ese sistema headless a Shopify con Online Store 2.0. Luis fue el responsable de la migración.',
            resultado: 'Hoy la tienda puntúa 9 sobre 10 en experiencia de usuario y 9,5 sobre 10 en responsive.'
        }
    ];

    const casosGrid = document.querySelector('#casos-grid');
    if (casosGrid) {
        // Se filtra UNA vez y se usa la lista filtrada en los dos sitios: al
        // dibujar y al decidir si hay carrusel. Con dos filtrados sueltos, el
        // día que un caso sea de un solo mercado el umbral contaría casos que no
        // están en la página y saldrían flechas sin nada que desplazar.
        const CASOS_AQUI = CASOS.filter(deEsteMercado);

        // Un campo que falta se omite entero, rótulo incluido: así se puede
        // publicar el caso corto borrando el campo del objeto, sin que salga un
        // "undefined" ni un rótulo huérfano.
        // Si el texto es un {{PENDIENTE}}, se dibuja bien visible para que nadie
        // lo publique creyendo que es copy definitivo (CLAUDE.md § 6.3).
        const campo = (rotulo, texto) => {
            if (!texto) return '';
            const valor = /^\{\{PENDIENTE/.test(texto)
                ? `<span class="caso-pendiente">${texto}</span>`
                : texto;
            return `<dt>${rotulo}</dt><dd>${valor}</dd>`;
        };

        casosGrid.innerHTML = CASOS_AQUI.map((caso, i) => {
            const marca = caso.logo
                ? `<img src="${caso.logo}" alt="${caso.cliente}" loading="lazy">`
                : `<span class="caso-wordmark">${caso.cliente}</span>`;

            const sector = caso.sector
                ? `<span class="caso-sector">${caso.sector}</span>`
                : '';

            return `
                <article class="caso-card fade-in-up${i % 3 ? ' delay-' + (i % 3) : ''}">
                    <header class="caso-head">
                        ${marca}
                        ${sector}
                    </header>
                    <dl class="caso-historia">
                        ${campo('Contexto', caso.contexto)}
                        ${campo('Problema', caso.problema)}
                        ${campo('Qué se hizo', caso.queSeHizo)}
                        ${campo('Resultado', caso.resultado)}
                    </dl>
                </article>`;
        }).join('');

        // --- Carrusel, y solo a partir de 3 casos (Fase 12) ----------------
        // ⚠️ El umbral es la tarea, no un detalle: con uno o dos casos un
        // carrusel con flechas que no llevan a ninguna parte se lee peor que
        // una tarjeta sola. Hoy hay UN caso, así que esto no se activa y
        // #casos sigue siendo la rejilla de la Fase 4. Al añadir el tercer
        // objeto al array se enciende solo, sin tocar HTML ni CSS.
        // Fase 14: cuenta los casos DE ESTE MERCADO, no los del array entero.
        const MIN_CARRUSEL = 3;

        if (CASOS_AQUI.length >= MIN_CARRUSEL) {
            casosGrid.classList.remove('casos-grid');
            casosGrid.classList.add('casos-carrusel');
            // El scroll horizontal se recorre con el tabulador, así que el
            // contenedor tiene que ser enfocable y anunciarse por lo que es.
            casosGrid.tabIndex = 0;
            casosGrid.setAttribute('role', 'region');
            casosGrid.setAttribute('aria-label', 'Casos, desplazable en horizontal');

            const nav = document.createElement('div');
            nav.className = 'casos-nav';
            nav.innerHTML = `
                <button type="button" data-dir="-1" aria-label="Ver el caso anterior">
                    <i class="fas fa-arrow-left" aria-hidden="true"></i>
                </button>
                <button type="button" data-dir="1" aria-label="Ver el caso siguiente">
                    <i class="fas fa-arrow-right" aria-hidden="true"></i>
                </button>`;
            casosGrid.after(nav);

            const [anterior, siguiente] = nav.querySelectorAll('button');

            // Se mide la tarjeta real en vez de fijar un paso: el ancho sale de
            // un minmax() y cambia con la pantalla, así que un número escrito
            // aquí se desincronizaría del CSS en el primer cambio de ancho.
            const paso = () => {
                const card = casosGrid.querySelector('.caso-card');
                if (!card) return casosGrid.clientWidth;
                const gap = parseFloat(getComputedStyle(casosGrid).columnGap) || 0;
                return card.getBoundingClientRect().width + gap;
            };

            // ⚠️ Esto solo se vio MIDIENDO, y es el fallo de la fase.
            //
            // Con exactamente 3 casos en una pantalla ancha las tarjetas casi
            // caben: medido a 1027px, el recorrido total era de 48px y un paso
            // son 331px. O sea, dos flechas que al pulsarlas mueven la fila un
            // dedo y se apagan. No se ve como un carrusel, se ve como un
            // carrusel roto — y leyendo el código parece perfecto, porque el
            // código es correcto: lo que falla es que no hay nada que
            // desplazar.
            //
            // Así que las flechas aparecen solo si SOBRA contenido de verdad,
            // y se reevalúa en cada cambio de ancho: a 1440px las 3 tarjetas
            // caben y no hay flechas; al estrechar la ventana aparecen solas.
            // Es la misma degradación honesta que el bloque de WhatsApp de la
            // Fase 5 y la sección de blog de la Fase 10: si no aporta, no está.
            //
            // El umbral es MEDIA TARJETA, no un número de píxeles. Un umbral
            // fijo pequeño (se probó con 8px) deja pasar el caso malo: a 1027px
            // sobraban 48px, más que el umbral, así que las flechas seguían
            // saliendo para mover la fila cuatro dedos. Medida en tarjetas la
            // regla se explica sola: si no hay ni media tarjeta escondida, no
            // hay nada que valga un botón, y además el umbral se adapta solo
            // cuando cambia el ancho de la tarjeta en el CSS.
            const HOLGURA = 8; // aparte: absorbe el subpíxel y el ajuste del scroll-snap

            const refrescar = () => {
                const max = casosGrid.scrollWidth - casosGrid.clientWidth;
                nav.hidden = max < paso() / 2;
                anterior.disabled = casosGrid.scrollLeft <= HOLGURA;
                siguiente.disabled = casosGrid.scrollLeft >= max - HOLGURA;
            };

            nav.addEventListener('click', (e) => {
                const btn = e.target.closest('button');
                if (!btn) return;
                casosGrid.scrollBy({ left: paso() * Number(btn.dataset.dir), behavior: 'smooth' });
            });

            casosGrid.addEventListener('scroll', refrescar, { passive: true });
            window.addEventListener('resize', refrescar, { passive: true });
            refrescar();
        }
    }

    // --- Shopify Partner: un solo interruptor (Fase 9) ----------------------
    // Este objeto es la ÚNICA fuente de la afiliación con Shopify. Lo consumen
    // dos sitios: la banda de credenciales (#credenciales) y la tarjeta de
    // destino de #migracion-ecommerce. Antes de la Fase 9 el flag vivía suelto
    // dentro de CREDENCIALES; con dos usos, dos flags acabarían desincronizados
    // y la web diría una cosa arriba y otra abajo.
    //
    // ⚠️ REGLA INNEGOCIABLE (CLAUDE.md § 6.1). Son DOS programas distintos:
    //   · "Shopify Partner"       — gratuito, alta inmediata. Es el que Luis
    //                               declara tener (2026-07-21). Este se publica.
    //   · "Shopify Plus Partner"  — selectivo, con umbrales de facturación.
    //   · "Shopify Select Partner"— ídem, es el que exhibe el competidor.
    // NUNCA escribir "Plus" ni "Select" en `etiqueta`. Los tres se comprueban
    // en el mismo directorio público de Shopify, en 20 segundos.
    //
    // Si el alta resultara no estar activa (ESTADO.md § Pendientes, nº 8), se
    // pone `activo: false` y desaparecen SOLOS el badge de la banda, el de la
    // tarjeta de Shopify y la frase de independencia cambia a su variante sin
    // partner. No hay que tocar ni una línea de HTML.
    const SHOPIFY_PARTNER = {
        activo: true,
        etiqueta: 'Shopify Partner',
        detalle: 'Alta declarada por Luis el 2026-07-21',
        verificable: 'Directorio público de partners de Shopify'
    };

    // --- Banda de credenciales (Fase 8) -------------------------------------
    // Fuente única de #credenciales, la banda que va justo debajo del hero.
    //
    // ⚠️ REGLA INNEGOCIABLE (CLAUDE.md § 6.3). El competidor pone en este mismo
    // sitio "2,88 % de conversión" y "$48 M facturados". Nouweb NO tiene esas
    // cifras y NO se inventan. Por eso esta banda comunica CAPACIDADES
    // VERIFICABLES, no resultados de negocio: cada casilla se puede comprobar
    // desde fuera sin pedirle nada a Luis.
    //
    // Prohibido meter aquí un porcentaje, una facturación, un número de
    // clientes o unos años de trayectoria mientras Luis no aporte el dato real
    // y su fuente. Una casilla vacía o redonda a ojo es peor que no tener banda.
    //
    // `verificable` no se dibuja: es la nota de por qué la casilla es honesta,
    // para quien edite este array dentro de seis meses.
    //
    // Fase 14: las dos primeras casillas valen igual en los dos mercados. Las
    // dos últimas son las que cambian de país, y cada una tiene su pareja
    // justo debajo para que el orden de la banda sea el mismo en las dos
    // versiones.
    const CREDENCIALES = [
        {
            // Los cuatro campos salen de SHOPIFY_PARTNER, arriba: es el único
            // interruptor de la afiliación en toda la página (Fase 9).
            icono: 'fab fa-shopify',
            titulo: SHOPIFY_PARTNER.etiqueta,
            detalle: SHOPIFY_PARTNER.detalle,
            verificable: SHOPIFY_PARTNER.verificable,
            mercado: ['pe', 'es'],
            activo: SHOPIFY_PARTNER.activo
        },
        {
            // Es la casilla que más gana con la Fase 14: en /es-es/ esto deja
            // de ser una referencia extranjera y pasa a ser una marca que el
            // visitante reconoce de la calle.
            icono: 'fas fa-arrow-right-arrow-left',
            titulo: 'Migración headless → Shopify OS 2.0',
            detalle: 'Ejecutada para Misako, marca líder en España',
            verificable: 'Caso publicado en #casos, con permiso del cliente',
            mercado: ['pe', 'es'],
            activo: true
        },
        {
            icono: 'fas fa-earth-americas',
            titulo: 'España · Perú',
            detalle: 'Ingeniero full stack trabajando en los dos mercados',
            verificable: 'Perfil de Luis (#nosotros)',
            mercado: ['pe'],
            activo: true
        },
        {
            // En Perú el argumento es "conoce el terreno desde Europa"; en
            // España es "está en tu mercado, tu horario y tu marco legal", así
            // que la misma casilla se lee al revés (Anexo A.3 y A.8).
            icono: 'fas fa-earth-europe',
            titulo: 'Basado en España',
            detalle: 'Ingeniero full stack trabajando en los dos mercados',
            verificable: 'Perfil de Luis (#nosotros)',
            mercado: ['es'],
            activo: true
        },
        {
            icono: 'fas fa-file-invoice-dollar',
            titulo: 'SUNAT e IGV integrados',
            detalle: 'Facturación electrónica contemplada desde el diseño',
            verificable: 'Descripción del servicio (#migracion-ecommerce)',
            mercado: ['pe'],
            activo: true
        },
        {
            // ⚠️ Sin fechas de entrada en vigor (ver MERCADOS.es.facturacion).
            icono: 'fas fa-file-invoice-dollar',
            titulo: 'Facturación electrónica y Verifactu',
            detalle: 'Contemplados desde el diseño',
            verificable: 'Descripción del servicio (#migracion-ecommerce)',
            mercado: ['es'],
            activo: true
        }
    ];

    const credencialesGrid = document.querySelector('#credenciales-grid');
    if (credencialesGrid) {
        // Dos filtros encadenados y son dos preguntas distintas: `activo` es
        // "¿esto es cierto hoy?" (CLAUDE.md § 6.1) y `mercado` es "¿esto le
        // habla a quien está leyendo?". Una casilla falsa no se arregla
        // enseñándola en el otro país.
        credencialesGrid.innerHTML = CREDENCIALES.filter(c => c.activo && deEsteMercado(c)).map((c, i) => `
                <li class="credencial fade-in-up${i % 3 ? ' delay-' + (i % 3) : ''}">
                    <i class="${c.icono}" aria-hidden="true"></i>
                    <div>
                        <span class="credencial-titulo">${c.titulo}</span>
                        <span class="credencial-detalle">${c.detalle}</span>
                    </div>
                </li>`).join('');
    }

    // --- Proceso de 6 pasos (Fase 8) ----------------------------------------
    // Fuente única de #proceso. Reordenar o añadir un paso es tocar este array
    // y nada más: el HTML no lleva ningún texto del proceso.
    //
    // Los 6 pasos son CÓMO SE TRABAJA. Las 3 tarjetas de #servicios son QUÉ SE
    // COMPRA. No son dos ofertas distintas y no deben leerse así: los pasos 1,
    // 3 y 4 llevan el campo `fase`, que dibuja el vínculo con la fase de
    // #servicios que les corresponde. Si se reordenan los pasos, revisar que
    // ese campo siga apuntando a la fase correcta.
    //
    // Fase 14: tres de los seis pasos valen igual en los dos países. Los otros
    // tres tienen pareja, y solo por dos motivos: el contenido fiscal (paso 4)
    // y el vocabulario (paso 2 "costos → costes", paso 5 "capacitación →
    // formación"). Cada pareja va junta para que la numeración 01…06 salga
    // igual en las dos versiones.
    //
    // ⚠️ El paso 3 se queda ENTERO, redirecciones 301 incluidas: es lo que más
    // tranquiliza de toda la página y el miedo a perder posiciones en Google no
    // depende del país.
    const PROCESO = [
        {
            titulo: 'Diagnóstico',
            fase: 'Fase 1 de servicios',
            mercado: ['pe', 'es'],
            quePasa: 'Auditamos la tienda y levantamos el mapa de tus procesos reales, no el que dice el organigrama.',
            entrega: 'Documento de hallazgos priorizados'
        },
        {
            titulo: 'Plan y arquitectura',
            fase: null,
            mercado: ['pe'],
            quePasa: 'Definimos qué plataforma, qué CRM, qué se integra y en qué orden, con lo que cuesta mantenerlo cada mes.',
            entrega: 'Plan con cronograma y costos mensuales'
        },
        {
            titulo: 'Plan y arquitectura',
            fase: null,
            mercado: ['es'],
            quePasa: 'Definimos qué plataforma, qué CRM, qué se integra y en qué orden, con lo que cuesta mantenerlo cada mes.',
            entrega: 'Plan con cronograma y costes mensuales'
        },
        {
            titulo: 'Migración',
            fase: 'Fase 2 de servicios',
            mercado: ['pe', 'es'],
            // El SEO es el miedo número uno de quien migra y casi ninguna
            // agencia lo nombra. Decirlo aquí, con la palabra "301" incluida,
            // es de lo que más tranquiliza de toda la página.
            quePasa: 'Replatforming de tienda, datos y catálogo. Las URLs viejas se mapean una a una con redirecciones 301: se migra sin perder posiciones en Google.',
            entrega: 'Tienda nueva en preproducción, para revisarla antes de salir'
        },
        {
            titulo: 'Integración',
            fase: 'Fase 3 de servicios',
            mercado: ['pe'],
            quePasa: 'Conectamos el CRM, la facturación SUNAT vía OSE/PSE, las pasarelas locales y WhatsApp.',
            entrega: 'El flujo del pedido conectado de punta a punta'
        },
        {
            titulo: 'Integración',
            fase: 'Fase 3 de servicios',
            mercado: ['es'],
            // Ni SUNAT ni WhatsApp: en España el pedido no entra por un chat, y
            // "su registro" es la parte de Verifactu que se puede decir sin
            // poner una fecha.
            quePasa: 'Conectamos el CRM, la facturación electrónica y su registro, las pasarelas de pago y los canales por los que te escriben.',
            entrega: 'El flujo del pedido conectado de punta a punta'
        },
        {
            titulo: 'Lanzamiento',
            fase: null,
            mercado: ['pe'],
            quePasa: 'QA, pruebas de carga y capacitación de tu equipo: la salida no sirve de nada si nadie sabe operar lo nuevo.',
            entrega: 'Salida a producción acompañada'
        },
        {
            titulo: 'Lanzamiento',
            fase: null,
            mercado: ['es'],
            quePasa: 'QA, pruebas de carga y formación de tu equipo: la salida no sirve de nada si nadie sabe operar lo nuevo.',
            entrega: 'Salida a producción acompañada'
        },
        {
            titulo: 'Optimización',
            fase: null,
            mercado: ['pe', 'es'],
            quePasa: 'Medimos lo que pasa después y seguimos ajustando. Aquí es donde una integración empieza a devolver el dinero.',
            entrega: 'Informe periódico y soporte'
        }
    ];

    const procesoGrid = document.querySelector('#proceso-grid');
    if (procesoGrid) {
        // ⚠️ Filtrar ANTES del map no es estilo: el `i` del map es el que pinta
        // el número del paso (01, 02, 03…). Filtrando después, la versión
        // española numeraría 01, 03, 04, 06, 07, 09.
        procesoGrid.innerHTML = PROCESO.filter(deEsteMercado).map((paso, i) => {
            // El vínculo con #servicios solo se dibuja si el paso tiene fase.
            // Es lo que evita que los 6 pasos se lean como una segunda oferta.
            const vinculo = paso.fase
                ? `<a class="proceso-vinculo" href="#servicios">${paso.fase}</a>`
                : '';

            return `
                <li class="proceso-paso fade-in-up${paso.fase ? ' proceso-paso-fase' : ''}${i % 3 ? ' delay-' + (i % 3) : ''}">
                    <span class="proceso-num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
                    <div class="proceso-cuerpo">
                        <h3>${paso.titulo}</h3>
                        ${vinculo}
                        <p>${paso.quePasa}</p>
                        <p class="proceso-entrega"><strong>Te llevas:</strong> ${paso.entrega}</p>
                    </div>
                </li>`;
        }).join('');
    }

    // --- Migraciones: matriz origen → destino (Fase 9) ----------------------
    // Fuente única de #migracion-ecommerce. Añadir un origen = añadir un objeto.
    // El HTML de la sección no contiene el nombre de ninguna plataforma.
    //
    // Cada origen lleva el PROBLEMA REAL que empuja a migrar, no una etiqueta
    // técnica. Es lo que hace que el visitante se reconozca: no busca "migrar
    // de Magento 1", busca "mi tienda va lenta y nadie la mantiene".
    //
    // ⚠️ El campo `destino` NO es una promesa cerrada, y por eso casi ninguno
    // dice una sola plataforma. Es deliberado: la tesis de la sección es que no
    // toda migración termina en el mismo sitio (CLAUDE.md § 4). Si un día los
    // 12 destinos acabaran diciendo "Shopify", la sección se contradiría sola y
    // Nouweb se habría disfrazado del competidor, que sí es Shopify-exclusive.
    //
    // `destacado` sube la tarjeta visualmente, y desde la Fase 14 se declara
    // POR MERCADO, igual que `mercado`. Es donde más se nota que los dos países
    // no tienen el mismo caladero:
    //   · Perú → el origen de marketplace (marcas que venden en Mercado Libre o
    //     Falabella y no tienen canal propio).
    //   · España → Magento 1/2 y PrestaShop, que es el parque real de tiendas
    //     viejas pendientes de replatforming (Anexo A.7).
    const MIGRACIONES = [
        {
            origen: 'Magento 1',
            mercado: ['pe', 'es'],
            destacado: ['es'],
            problema: 'Sin soporte oficial desde 2020: ya no recibe parches de seguridad. Cada mes que pasa es más caro de asegurar y más difícil de pasar una auditoría.',
            destino: 'Shopify, o WooCommerce si hay lógica a medida que valga la pena conservar'
        },
        {
            origen: 'Magento 2 / Adobe Commerce',
            mercado: ['pe'],
            problema: 'La licencia y el mantenimiento están dimensionados para una corporación. Para una pyme de 3 a 50 personas, el costo fijo se come el margen.',
            destino: 'Shopify; VTEX solo si el volumen ya lo justifica'
        },
        {
            // Pareja española: "costo → coste", y el destino no puede ofrecer
            // VTEX porque en España VTEX no está en DESTINOS (Anexo A.7).
            origen: 'Magento 2 / Adobe Commerce',
            mercado: ['es'],
            destacado: ['es'],
            problema: 'La licencia y el mantenimiento están dimensionados para una corporación. Para una pyme de 3 a 50 personas, el coste fijo se come el margen.',
            destino: 'Shopify; WooCommerce si hay desarrollo a medida que valga la pena conservar'
        },
        {
            origen: 'VTEX',
            mercado: ['pe'],
            problema: 'Licencia más participación sobre las ventas: sale cara mientras el volumen todavía no acompaña.',
            destino: 'Shopify, y se vuelve a mirar VTEX cuando el volumen crezca'
        },
        {
            // En España VTEX baja a secundario: sigue siendo un origen posible,
            // pero no se ofrece como sitio al que volver.
            origen: 'VTEX',
            mercado: ['es'],
            problema: 'Licencia más participación sobre las ventas: sale cara mientras el volumen todavía no acompaña.',
            destino: 'Shopify o WooCommerce, según cuánto haya montado a medida'
        },
        {
            origen: 'PrestaShop antiguo (1.6 / 1.7)',
            mercado: ['pe', 'es'],
            destacado: ['es'],
            problema: 'Módulos que se pisan entre ellos: actualizar rompe la tienda, así que nadie actualiza y la deuda se acumula sola.',
            destino: 'Shopify o WooCommerce, según cuánto contenido y SEO haya que conservar'
        },
        {
            origen: 'WooCommerce lento',
            mercado: ['pe', 'es'],
            // Matiz importante y poco habitual: aquí la respuesta muchas veces
            // NO es cambiar de plataforma. Decirlo es lo que hace creíble el
            // resto de la matriz.
            problema: 'Plugins acumulados durante años sobre un hosting que ya no da. El problema casi nunca es WooCommerce: es lo que le fueron colgando encima.',
            destino: 'WooCommerce bien montado, o Shopify si el equipo prefiere no mantener servidor'
        },
        {
            origen: 'Desarrollo a medida huérfano',
            mercado: ['pe', 'es'],
            problema: 'Quien lo programó se fue y nadie se atreve a tocar el código. Cualquier cambio pequeño se convierte en un proyecto y en un presupuesto.',
            destino: 'Shopify o WooCommerce: lo que tu equipo pueda mantener sin depender de nosotros'
        },
        {
            origen: 'Headless mal implementado',
            mercado: ['pe', 'es'],
            problema: 'Bugs que reaparecen y un inventario que no cuadra con el almacén. Se montó una arquitectura más grande de la que la operación necesitaba.',
            destino: 'Shopify con Online Store 2.0',
            // Enlaza al caso Misako: es exactamente este origen, ya ejecutado.
            // Y Misako es española, así que en /es-es/ este vínculo vale doble.
            caso: 'Es el caso de Misako'
        },
        {
            origen: 'Tiendanube / Nuvemshop',
            mercado: ['pe'],
            problema: 'Resuelve muy bien el arranque y se queda corta al escalar: catálogo grande, reglas de precio por canal o conexión con el sistema de gestión.',
            destino: 'Shopify; WooCommerce si el blog y el SEO pesan más que el catálogo'
        },
        {
            origen: 'Jumpseller',
            mercado: ['pe'],
            problema: 'Muy usada por pymes en Perú y Chile para empezar, con el mismo techo: cuando la operación crece, la plataforma no acompaña.',
            destino: 'Shopify'
        },
        {
            origen: 'Wix / Squarespace',
            mercado: ['pe', 'es'],
            problema: 'Sirvió para tener presencia y vender los primeros pedidos. No está pensada para sostener +200 pedidos al mes ni para conectarse con un CRM.',
            destino: 'Shopify o WooCommerce'
        },
        {
            origen: 'BigCommerce',
            mercado: ['pe'],
            problema: 'Poco ecosistema local en LatAm: las pasarelas de acá, la facturación SUNAT y el soporte en tu zona horaria se vuelven un problema recurrente.',
            destino: 'Shopify'
        },
        {
            origen: 'BigCommerce',
            mercado: ['es'],
            problema: 'Poco ecosistema local en España: conectarla con las pasarelas de aquí y con el software de facturación adaptado acaba siendo desarrollo a medida que hay que mantener.',
            destino: 'Shopify'
        },
        {
            origen: 'Solo marketplace',
            detalleOrigen: 'Mercado Libre, Falabella, Ripley',
            mercado: ['pe'],
            problema: 'Vendes, pero la comisión se lleva el margen y el cliente no es tuyo: no tienes su dato, ni su histórico, ni forma de que te vuelva a comprar directo.',
            destino: 'Tienda propia en Shopify o WooCommerce, sin salir del marketplace',
            destacado: ['pe']
        },
        {
            // Mismo problema, otros marketplaces. Los tres peruanos no le dicen
            // nada a un vendedor español, y al revés.
            origen: 'Solo marketplace',
            detalleOrigen: 'Amazon, eBay',
            mercado: ['es'],
            problema: 'Vendes, pero la comisión se lleva el margen y el cliente no es tuyo: no tienes su dato, ni su histórico, ni forma de que te vuelva a comprar directo.',
            destino: 'Tienda propia en Shopify o WooCommerce, sin salir del marketplace',
            destacado: ['es']
        }
    ];

    // Los cuatro destinos posibles. WooCommerce está aquí por decisión de Luis
    // del 2026-07-21: se había quitado el 2026-07-20 a petición suya y volvió a
    // entrar al día siguiente. ⚠️ Es un ida y vuelta DELIBERADO, no un error:
    // no "corregirlo" en un chat futuro (CLAUDE.md § 4).
    //
    // Fase 14: en España son TRES, no cuatro. VTEX se queda fuera porque su
    // argumento es literalmente la operación en LatAm; ofrecerlo a una pyme
    // española sería recomendar por catálogo y no por operación, que es
    // justamente de lo que esta sección presume.
    const DESTINOS = [
        {
            nombre: 'Shopify / Shopify Plus',
            icono: 'fab fa-shopify',
            mercado: ['pe', 'es'],
            cuando: 'La salida más común para una pyme: sale rápido, se mantiene barato y con Online Store 2.0 las plantillas se arman por secciones, con menos dependencia de apps de pago.',
            // Única tarjeta que puede llevar el badge, y solo si el flag está en
            // true. Ver SHOPIFY_PARTNER arriba.
            shopify: true
        },
        {
            nombre: 'WooCommerce',
            icono: 'fab fa-wordpress',
            mercado: ['pe', 'es'],
            cuando: 'Cuando ya hay un WordPress con tráfico y contenido posicionado que conviene conservar, o cuando el catálogo pide reglas que una plataforma cerrada no deja tocar.'
        },
        {
            nombre: 'VTEX',
            icono: 'fas fa-layer-group',
            mercado: ['pe'],
            cuando: 'Cuando el volumen y la operación en LatAm de verdad lo justifican: varios almacenes, marketplace propio y un equipo grande detrás. Por debajo de eso, la licencia pesa más de lo que aporta.'
        },
        {
            nombre: 'Shopify headless o desarrollo a medida',
            icono: 'fas fa-code',
            mercado: ['pe', 'es'],
            cuando: 'Solo cuando el proyecto lo amerita. Un headless montado sin necesidad es justo el problema del que sacamos a otras tiendas, así que no se propone por defecto.'
        }
    ];

    const migracionMatriz = document.querySelector('#migracion-matriz');
    if (migracionMatriz) {
        migracionMatriz.innerHTML = MIGRACIONES.filter(deEsteMercado).map((m, i) => {
            const detalle = m.detalleOrigen
                ? `<span class="migracion-origen-detalle">${m.detalleOrigen}</span>`
                : '';

            // El vínculo al caso solo aparece si el origen tiene uno publicado.
            // Nada de "caso disponible" genérico (CLAUDE.md § 6.2).
            const caso = m.caso
                ? `<a class="migracion-caso" href="#casos">${m.caso}</a>`
                : '';

            return `
                <li class="migracion-origen fade-in-up${destacaAqui(m.destacado) ? ' migracion-origen-destacado' : ''}${i % 3 ? ' delay-' + (i % 3) : ''}">
                    <h4>${m.origen}${detalle}</h4>
                    <p class="migracion-problema">${m.problema}</p>
                    ${caso}
                    <p class="migracion-destino"><span class="migracion-destino-rotulo">A dónde suele ir</span> ${m.destino}</p>
                </li>`;
        }).join('');
    }

    const migracionDestinos = document.querySelector('#migracion-destinos');
    if (migracionDestinos) {
        migracionDestinos.innerHTML = DESTINOS.filter(deEsteMercado).map((d, i) => {
            const badge = (d.shopify && SHOPIFY_PARTNER.activo)
                ? `<span class="destino-badge"><i class="fas fa-circle-check"></i> ${SHOPIFY_PARTNER.etiqueta}</span>`
                : '';

            return `
                <li class="destino-card fade-in-up${i % 3 ? ' delay-' + (i % 3) : ''}">
                    <i class="${d.icono}" aria-hidden="true"></i>
                    <h4>${d.nombre}</h4>
                    ${badge}
                    <p>${d.cuando}</p>
                </li>`;
        }).join('');
    }

    // La frase que hace convivir el badge con la independencia. Sin ella, ser
    // Shopify Partner se lee como "siempre te van a llevar a Shopify", que es
    // exactamente el competidor del que Nouweb se diferencia. Con el flag
    // apagado se escribe la variante sin partner, que sigue siendo cierta.
    const migracionIndependencia = document.querySelector('#migracion-independencia');
    if (migracionIndependencia) {
        migracionIndependencia.innerHTML = SHOPIFY_PARTNER.activo
            ? `Somos <strong>${SHOPIFY_PARTNER.etiqueta}</strong> y aun así, si tu operación no lo pide, te vamos a decir que no migres a Shopify. La recomendación sale de tu volumen y de tus procesos, no del programa de partners en el que estemos dados de alta.`
            : 'No revendemos ninguna plataforma. La recomendación sale de tu volumen y de tus procesos, no de con quién tengamos más trato.';
    }

    // --- Conversión: WhatsApp y precio (Fase 5) -----------------------------
    // Fuente única de los dos datos que Luis todavía debe dar. Poner el valor
    // aquí enciende de golpe TODOS los puntos de conversión de la página: el
    // CTA del hero, el de #auditoria, el bloque de #contacto y el botón
    // flotante. No hay que tocar el HTML.
    //
    //   whatsapp    → número internacional, SOLO dígitos, sin '+' ni espacios.
    //
    // Decisión de Luis (2026-07-20): NO se publican precios en la web. Por eso
    // ya no hay campo de precio ni se dibuja ninguna cifra "desde".
    //
    // ⚠️ Con whatsapp en null NO se dibuja nada inventado: los botones caen al
    // formulario, que sí funciona hoy, y el botón flotante simplemente no
    // existe. La página es publicable en ese estado.
    //
    // Hoy se usa el número español (+34 614 94 27 32), el mismo del pie.
    // Decisión de Luis, 2026-07-20. El motivo por el que el +34 no valía como
    // CTA era el costo de la LLAMADA internacional para un cliente peruano;
    // en WhatsApp ese motivo no existe: es gratis desde cualquier país.
    // Lo que sí queda es que el número se ve extranjero, y eso se compensa
    // con el pitch de "peruano radicado en España".
    // Cuando el volumen lo justifique, un número virtual de Lima cuesta unos
    // 5 USD/mes: se cambia esta línea y listo (FASE-5-conversion.md).
    const CONTACTO = {
        whatsapp: '34614942732',
        // Mensaje prerrellenado. Le ahorra al cliente escribir la primera
        // línea, que es justo donde se cae la mitad de la gente.
        mensaje: 'Hola, vengo de la web de Nouweb. Me interesa la auditoría gratuita de mi tienda online.'
    };

    const waURL = CONTACTO.whatsapp
        ? `https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(CONTACTO.mensaje)}`
        : null;

    if (waURL) {
        // Todos los CTA marcados en el HTML pasan a apuntar a WhatsApp y
        // adoptan su texto de data-cta-wa (si lo tienen).
        document.querySelectorAll('[data-cta="whatsapp"]').forEach(el => {
            el.href = waURL;
            el.target = '_blank';
            el.rel = 'noopener';
            const textoWa = el.getAttribute('data-cta-wa');
            if (textoWa) {
                // Se respeta el icono si el botón ya lo trae.
                const icono = el.querySelector('i');
                el.textContent = textoWa;
                if (icono) el.prepend(icono, ' ');
            }
        });

        const bloqueWa = document.getElementById('contacto-whatsapp');
        if (bloqueWa) bloqueWa.hidden = false;

        const flotante = document.getElementById('whatsapp-float');
        if (flotante) {
            flotante.href = waURL;
            flotante.hidden = false;
        }

        // --- Conversión: clic en WhatsApp (Fase 13) ------------------------
        // Sin esto las campañas no se pueden optimizar: Google y Meta
        // necesitan saber QUÉ clic acabó en conversación para aprender a quién
        // enseñar el anuncio. Sin eventos, un anuncio solo optimiza clics, y
        // los clics baratos suelen ser los que no compran.
        //
        // Va con delegación en el documento en vez de un listener por botón, y
        // no es por elegancia: los CTA de WhatsApp son cuatro y uno de ellos
        // (el flotante) puede aparecer y desaparecer según el banner de
        // cookies. Con delegación da igual cuándo nazca cada uno.
        //
        // `nwEvento` no hace nada si no hay consentimiento, así que esta línea
        // es segura tal cual: no hay que envolverla en ningún `if`.
        document.addEventListener('click', (e) => {
            const cta = e.target.closest('[data-cta="whatsapp"], .whatsapp-float');
            if (!cta) return;
            window.nwEvento('contacto_whatsapp', {
                // De dónde salió el clic: sirve para saber qué sección
                // convierte y cuál solo se lee.
                origen: cta.id === 'whatsapp-float'
                    ? 'boton_flotante'
                    : (cta.closest('section')?.id || 'desconocido')
            });
        });
    }

    // Scroll Animations (Intersection Observer)
    // Va después del render de CRM y de casos a propósito: las fichas se
    // inyectan con .fade-in-up y tienen que existir en el DOM para que el
    // observer las capte.
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // --- Vídeos diferidos (Fase 12) ----------------------------------------
    // El vídeo de #nosotros pesa 3,79 MB y está muy por debajo del pliegue.
    // Con autoplay a secas se descargaba entero en cada visita aunque nadie
    // bajara hasta allí, y además competía por el ancho de banda con el vídeo
    // del hero justo mientras se pinta la primera pantalla, que es lo único
    // que ve quien entra y se va.
    //
    // El rootMargin de 300px es la parte que importa: empieza a cargar ANTES
    // de que la sección se vea, así que para el visitante que baja despacio no
    // hay diferencia con antes. A 0px se vería arrancar el vídeo, que es peor
    // que dejarlo como estaba.
    // --- Vídeo del hero: se carga el último de todo (Fase 13) --------------
    // Es 1,78 MB de adorno encima del pliegue. No se difiere con el observer
    // como el de #nosotros —está a la vista desde el primer instante, así que
    // el observer dispararía enseguida y no serviría de nada—: se espera al
    // evento `load`, o sea a que ya esté TODO lo demás. Hasta entonces se ve
    // el degradado CSS, que sale de los colores del propio vídeo.
    //
    // Y hay conexiones en las que directamente no se carga. No es una
    // suposición sobre el visitante: `saveData` es que ÉL ha pedido ahorrar
    // datos, y `effectiveType` lo mide el navegador. Servirle 1,78 MB de
    // decoración a quien pidió ahorrar datos es ignorar lo que pidió.
    const heroVideo = document.querySelector('video[data-video-hero]');
    if (heroVideo) {
        const con = navigator.connection || {};
        const conexionMala = con.saveData === true ||
            ['slow-2g', '2g', '3g'].includes(con.effectiveType);
        const menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!conexionMala && !menosMovimiento) {
            const arrancar = () => {
                heroVideo.src = heroVideo.dataset.src;
                heroVideo.removeAttribute('data-src');
                heroVideo.load();
                heroVideo.addEventListener('canplay', () => {
                    heroVideo.classList.add('visible');
                    heroVideo.play().catch(() => { });
                }, { once: true });
            };
            // Si la página ya terminó de cargar, no hay a qué esperar.
            if (document.readyState === 'complete') arrancar();
            else window.addEventListener('load', arrancar, { once: true });
        }
    }

    const videosDiferidos = document.querySelectorAll('video[data-video-diferido]');
    if (videosDiferidos.length) {
        const cargarVideo = (video) => {
            const source = video.querySelector('source[data-src]');
            if (!source) return;
            source.src = source.dataset.src;
            source.removeAttribute('data-src');
            video.load();

            // ⚠️ El play() va en `canplay` y no pegado al load(), y esto se vio
            // midiendo: llamándolo justo después, el vídeo se quedaba en
            // readyState 0 y la promesa no resolvía, así que la caja se quedaba
            // con el primer fotograma congelado. No da ningún error: parece que
            // el vídeo "no tiene animación", no que esté roto.
            //
            // El catch tampoco sobra: play() se rechaza si la política de
            // reproducción automática del navegador no lo permite, y sin él
            // saldría un error sin capturar en consola por algo que no es un
            // fallo. El vídeo es mudo y decorativo: si no arranca, no pasa nada.
            video.addEventListener('canplay', () => {
                video.play().catch(() => { });
            }, { once: true });
        };

        const videoObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                cargarVideo(entry.target);
                obs.unobserve(entry.target);
            });
        }, { rootMargin: '300px' });

        videosDiferidos.forEach(v => videoObserver.observe(v));
    }

    // --- Modal de las tres tarjetas de servicio -----------------------------
    // Es el contenido que sale al pulsar cualquiera de las tres tarjetas de
    // #servicios, o sea un punto de entrada de la home, no un rincón.
    //
    // ⚠️ FASE 14, SESIÓN 3 — ESTO NO ESTABA EN LA LISTA DE LA FICHA Y ERA UNA
    // FUGA DE VERDAD. La sesión 2 filtró por mercado las 7 rejillas que se
    // dibujan solas, y la ficha de la sesión 3 enumeró los bloques escritos a
    // mano de index.html. Este texto no está en ninguno de los dos sitios: vive
    // aquí, en script.js, y /es-es/ carga EL MISMO archivo. Sin filtro, un
    // visitante español que pulsara "Integración" leía "tu WhatsApp",
    // "WhatsApp Business API" y "vía OSE/PSE" —o sea, la SUNAT con otro
    // nombre— dentro de la página que presume de no nombrarla nunca.
    //
    // Y la verificación de la sesión tampoco lo cazaba: buscar "SUNAT" en el
    // HTML servido de /es-es/ no encuentra nada, porque este texto llega por JS
    // y solo existe en el DOM DESPUÉS de pulsar la tarjeta. Se caza abriendo
    // las tres, que es la misma lección que dejó escrita la Fase 13 con el
    // modal apoyado en `translations`.
    //
    // La convención es la de siempre: array con `mercado` y filtrado ANTES de
    // construir el diccionario. `openServiceModal()` no se entera de nada: le
    // sigue llegando un objeto indexado por `data-service`, solo que ya trae
    // las tres fichas del mercado que toca.
    //
    // ⚠️ Copy cerrado en la Fase 2 (Perú) y en la Fase 14 · sesión 1 (España).
    // Revisar cualquier cambio futuro contra CLAUDE.md § 4 si es `pe` y § 4bis
    // si es `es`: son reglas OPUESTAS.
    const SERVICIOS_MODAL = [
        {
            id: 'diagnostico',
            mercado: ['pe'],
            title: 'Diagnóstico',
            description: 'Antes de tocar una sola herramienta, entendemos cómo opera tu negocio hoy: por dónde entran los pedidos, quién los toca, dónde se traban y qué se está perdiendo en el camino. El resultado es un mapa de tus procesos con los puntos de fuga marcados.',
            icon: 'fa-magnifying-glass-chart',
            details: `
                <h5>Qué incluye</h5>
                <ul>
                    <li><strong>Mapa de procesos:</strong> del primer contacto del cliente hasta el comprobante emitido.</li>
                    <li><strong>Puntos de fuga:</strong> dónde se pierden pedidos, datos o tiempo del equipo.</li>
                    <li><strong>Inventario de herramientas:</strong> qué usas hoy y qué se solapa entre sí.</li>
                    <li><strong>Recomendación priorizada:</strong> qué arreglar primero por impacto y esfuerzo.</li>
                </ul>
            `
        },
        {
            // Pareja española: solo cambia "comprobante" por "factura". En
            // España un comprobante no es el documento fiscal, es el resguardo.
            id: 'diagnostico',
            mercado: ['es'],
            title: 'Diagnóstico',
            description: 'Antes de tocar una sola herramienta, entendemos cómo opera tu negocio hoy: por dónde entran los pedidos, quién los toca, dónde se traban y qué se está perdiendo en el camino. El resultado es un mapa de tus procesos con los puntos de fuga marcados.',
            icon: 'fa-magnifying-glass-chart',
            details: `
                <h5>Qué incluye</h5>
                <ul>
                    <li><strong>Mapa de procesos:</strong> del primer contacto del cliente hasta la factura emitida.</li>
                    <li><strong>Puntos de fuga:</strong> dónde se pierden pedidos, datos o tiempo del equipo.</li>
                    <li><strong>Inventario de herramientas:</strong> qué usas hoy y qué se solapa entre sí.</li>
                    <li><strong>Recomendación priorizada:</strong> qué arreglar primero por impacto y esfuerzo.</li>
                </ul>
            `
        },
        {
            id: 'migracion',
            mercado: ['pe'],
            title: 'Migración',
            description: 'Replatforming de tiendas online que se quedaron atrás. Pasamos tu eCommerce a una plataforma actual sin perder el catálogo, el histórico ni el posicionamiento, y con una experiencia de compra pensada para el celular, que es donde te compran.',
            icon: 'fa-cart-shopping',
            details: `
                <h5>Qué incluye</h5>
                <ul>
                    <li><strong>Migración de datos:</strong> catálogo, clientes e histórico de pedidos.</li>
                    <li><strong>UX y responsive reales:</strong> diseñado para celular, no solo adaptado.</li>
                    <li><strong>SEO preservado:</strong> redirecciones y estructura para no perder tráfico.</li>
                    <li><strong>Pasarelas locales:</strong> integración con los medios de pago que tu cliente usa.</li>
                </ul>
            `
        },
        {
            // Pareja española: "celular → móvil" las dos veces (CLAUDE.md
            // § 4bis) y "pasarelas locales", que en LatAm se entiende solo, se
            // dice por su nombre.
            id: 'migracion',
            mercado: ['es'],
            title: 'Migración',
            description: 'Replatforming de tiendas online que se quedaron atrás. Pasamos tu eCommerce a una plataforma actual sin perder el catálogo, el histórico ni el posicionamiento, y con una experiencia de compra pensada para el móvil, que es donde te compran.',
            icon: 'fa-cart-shopping',
            details: `
                <h5>Qué incluye</h5>
                <ul>
                    <li><strong>Migración de datos:</strong> catálogo, clientes e histórico de pedidos.</li>
                    <li><strong>UX y responsive reales:</strong> diseñado para móvil, no solo adaptado.</li>
                    <li><strong>SEO preservado:</strong> redirecciones y estructura para no perder tráfico.</li>
                    <li><strong>Pasarelas de pago:</strong> integración con los medios que tu cliente ya usa.</li>
                </ul>
            `
        },
        {
            id: 'integracion',
            mercado: ['pe'],
            title: 'Integración',
            description: 'Elegimos contigo el CRM de pago que encaja con tu operación y lo conectamos con tu web, tu WhatsApp y tu facturación electrónica. No vendemos CRM propio, así que la recomendación va según lo que necesitas, no según lo que nos conviene vender.',
            icon: 'fa-diagram-project',
            details: `
                <h5>Qué incluye</h5>
                <ul>
                    <li><strong>Selección del CRM:</strong> comparativa de opciones reales para tu tamaño y presupuesto.</li>
                    <li><strong>Conexión con la web:</strong> los pedidos entran solos, sin copiar y pegar.</li>
                    <li><strong>WhatsApp Business API:</strong> las conversaciones quedan registradas donde toca.</li>
                    <li><strong>Facturación electrónica:</strong> flujo contemplado desde el inicio, vía OSE/PSE.</li>
                </ul>
            `
        },
        {
            // Pareja española, y es la que más cambia de las tres: fuera
            // WhatsApp (en España no es el canal de venta) y fuera OSE/PSE, que
            // son los intermediarios de la SUNAT y aquí no existen.
            // ⚠️ Sin ninguna fecha de Verifactu (pendiente nº 22).
            id: 'integracion',
            mercado: ['es'],
            title: 'Integración',
            description: 'Elegimos contigo el CRM de pago que encaja con tu operación y lo conectamos con tu web, con tu facturación electrónica y con los canales por los que te escriben tus clientes. No vendemos CRM propio, así que la recomendación va según lo que necesitas, no según lo que nos conviene vender.',
            icon: 'fa-diagram-project',
            details: `
                <h5>Qué incluye</h5>
                <ul>
                    <li><strong>Selección del CRM:</strong> comparativa de opciones reales para tu tamaño y presupuesto.</li>
                    <li><strong>Conexión con la web:</strong> los pedidos entran solos, sin copiar y pegar.</li>
                    <li><strong>Canales de contacto:</strong> email, formulario y teléfono registrados en la ficha del cliente, no en la bandeja de alguien.</li>
                    <li><strong>Facturación electrónica:</strong> el flujo y su registro contemplados desde el inicio, con el software adaptado que uses.</li>
                </ul>
            `
        }
        // ⚠️ Aqui vivian otros SEIS servicios de la web de agencia vieja
        // (web-design, custom-web, ecommerce, graphic-design, maintenance,
        // seo-optimization). Se retiraron en la Fase 13: ninguna pagina que
        // carga este archivo los abre —el HTML solo tiene tres data-service,
        // y son los tres de arriba (CLAUDE.md § 2)— y ademas arrastraban
        // rutas a videos de 8 y 20 MB. /en y /de tienen su propia copia de
        // script.js y no se han tocado.
    ];

    // ⚠️ El filtro va ANTES de construir el diccionario, no después. Si se
    // construyera primero, la clave 'diagnostico' la escribiría la última
    // pareja del array y el mercado dejaría de importar: ganaría siempre
    // España. Es el mismo error de orden que la sesión 2 evitó en los `map`.
    const serviceData = Object.fromEntries(
        SERVICIOS_MODAL.filter(deEsteMercado).map(s => [s.id, s])
    );

    // Service Modal Logic
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceModal = document.getElementById('service-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-description');
    const modalImage = document.querySelector('.modal-image');

    function openServiceModal(serviceId) {
        const data = serviceData[serviceId];
        if (!data) return;
        
        // ⚠️ Aquí había un mapa `serviceTranslations` que leía del objeto
        // `translations`, retirado en la Fase 13. Y era código muerto **ya
        // antes de retirarlo**: solo mapeaba los SEIS servicios de la agencia
        // vieja, ninguno de los tres actuales, así que para diagnóstico,
        // migración e integración siempre caía al `data.title` de abajo.
        //
        // O sea que no cambiaba nada de lo que se ve, pero al borrar
        // `translations` habría reventado con un ReferenceError **al abrir
        // cualquier tarjeta de servicio**, que son tres de los puntos de
        // entrada de la home. Es el riesgo real de limpiar código muerto: lo
        // muerto se apoya en lo muerto, y solo canta al tirar del primero.
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.description;

        // Populate Details Section (still in Spanish for now - TODO: translate)
        const detailsText = document.getElementById('details-text');
        if (detailsText && data.details) {
            detailsText.innerHTML = data.details;
        }

        // Reset details section to collapsed state
        const modalDetails = document.getElementById('modal-details');
        if (modalDetails) {
            modalDetails.classList.remove('expanded');
        }

        // Inject Video
        // Si el servicio no tiene vídeo asociado, se muestra su icono
        modalImage.innerHTML = data.video
            ? `
            <video class="modal-video-element" autoplay muted loop playsinline>
                <source src="${data.video}" type="video/mp4">
                Tu navegador no soporta videos HTML5.
            </video>
        `
            : `<i class="fas ${data.icon} placeholder-icon"></i>`;

        // Animate Cards (Explosion)
        serviceCards.forEach((card, index) => {
            // Randomize direction slightly based on index
            if (index % 3 === 0) {
                card.classList.add('fly-out-left');
            } else if (index % 3 === 1) {
                card.classList.add('fly-out-bottom');
            } else {
                card.classList.add('fly-out-right');
            }
        });

        // Show Modal after delay
        setTimeout(() => {
            serviceModal.classList.add('active');
            // Bloquear scroll horizontal del body usando clases
            document.body.classList.add('modal-open');
            document.documentElement.classList.add('modal-open');
        }, 500);
    }

    function closeServiceModal() {
        // Hide Modal
        serviceModal.classList.remove('active');

        // Restaurar scroll del body usando clases
        document.body.classList.remove('modal-open');
        document.documentElement.classList.remove('modal-open');

        // Bring Cards Back
        setTimeout(() => {
            serviceCards.forEach(card => {
                card.classList.remove('fly-out-left', 'fly-out-right', 'fly-out-bottom');
            });
        }, 300);
    }

    // Make closeServiceModal available globally for onclick handler
    window.closeServiceModal = closeServiceModal;

    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            // Vibración en móviles
            if ('vibrate' in navigator) {
                navigator.vibrate(50); // Vibración corta de 50ms
            }
            
            const serviceId = card.getAttribute('data-service');
            openServiceModal(serviceId);
        });
        
        // También agregar vibración suave al tocar (touchstart) para mejor feedback
        card.addEventListener('touchstart', () => {
            if ('vibrate' in navigator) {
                navigator.vibrate(30); // Vibración muy corta al tocar
            }
        }, { passive: true });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeServiceModal);
    }

    // Learn More Button Toggle
    const learnMoreBtn = document.getElementById('learn-more-btn');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const modalDetails = document.getElementById('modal-details');
            if (modalDetails) {
                modalDetails.classList.toggle('expanded');
                // Segundo uso de `translations` que había que desmontar (el
                // primero estaba en openServiceModal). Aquí el texto siempre
                // acababa cayendo al literal en español del `||`, porque
                // `window.currentTranslations` no lo escribía nadie desde que
                // la home dejó de usar el sistema viejo. Ahora se escribe
                // directo, que es lo que se veía en pantalla igualmente.
                learnMoreBtn.textContent = modalDetails.classList.contains('expanded')
                    ? 'Mostrar menos'
                    : 'Saber más';
            }
        });
    }

    // Close on click outside
    window.addEventListener('click', (e) => {
        if (e.target === serviceModal) {
            closeServiceModal();
        }
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only prevent default if it's a main nav link, not the modal button
            if (this.getAttribute('onclick')) return;

            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // =====================================================================
    // Consentimiento de cookies y píxeles de publicidad (Fase 13)
    // =====================================================================
    //
    // ⚠️ ANTES DE LA FASE 13 ESTE BANNER NO BLOQUEABA NADA. Guardaba el clic
    // en localStorage, escribía "Cookies aceptadas" en la consola y dejaba un
    // comentario que decía "aquí puedes activar las cookies de terceros".
    // Mientras no hubo terceros daba igual. En cuanto entra un píxel de Meta o
    // de TikTok deja de dar igual: la web promete RGPD y Ley 29733 y dice
    // literalmente "no cedemos tus datos a terceros" (#contacto y las páginas
    // legales), así que cargar un píxel antes del "Acepto" sería incumplir lo
    // que la propia web promete, en la propia web.
    //
    // Ahora los píxeles NO EXISTEN hasta que alguien acepta.
    //
    // ---------------------------------------------------------------------
    // 👉 LUIS: PARA ENCENDER EL SEGUIMIENTO, RELLENA ESTO Y NADA MÁS
    // ---------------------------------------------------------------------
    // Deja en `null` lo que no uses todavía: cada plataforma se enciende sola
    // en cuanto tiene su identificador, y no hay que tocar el HTML.
    //
    //   googleAds : 'AW-XXXXXXXXX'  → Google Ads   (Herramientas › Etiqueta)
    //   ga4       : 'G-XXXXXXXXXX'  → Google Analytics 4 (Admin › Flujos)
    //   metaPixel : '1234567890'    → Meta Business (Eventos › Orígenes)
    //   tiktok    : 'XXXXXXXXXXXX'  → TikTok Ads (Herramientas › Eventos)
    //
    // ⚠️ Si añades una plataforma nueva, hay que NOMBRARLA en
    // politica-cookies.html. Un píxel que no está declarado en la política es
    // exactamente el problema que este bloque viene a evitar.
    const MARKETING = {
        googleAds: null,
        ga4: null,
        metaPixel: null,
        tiktok: null
    };

    // La versión sube si cambian las plataformas: quien aceptó la lista vieja
    // vuelve a ver el banner en vez de quedar consintiendo algo que no vio.
    const CONSENT_KEY = 'nw_consent_v1';

    const hayAlgoQueCargar = Object.values(MARKETING).some(Boolean);

    // --- Consent Mode de Google -------------------------------------------
    // Va ANTES de cargar nada de Google y se ejecuta siempre, incluso sin
    // identificadores. Le dice a Google que, por defecto, NO hay permiso. Sin
    // esto, la etiqueta asume permiso concedido mientras espera respuesta, que
    // es justo lo que el RGPD no permite. Luis está establecido en España, así
    // que esto le aplica de lleno.
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('consent', 'default', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
        wait_for_update: 500
    });

    const meterScript = (src) => {
        const s = document.createElement('script');
        s.async = true;
        s.src = src;
        document.head.appendChild(s);
        return s;
    };

    let yaCargado = false;

    function cargarMarketing() {
        if (yaCargado || !hayAlgoQueCargar) return;
        yaCargado = true;

        // Google (Ads y/o GA4) comparten la misma etiqueta.
        const idGoogle = MARKETING.googleAds || MARKETING.ga4;
        if (idGoogle) {
            meterScript('https://www.googletagmanager.com/gtag/js?id=' + idGoogle);
            gtag('js', new Date());
            gtag('consent', 'update', {
                ad_storage: 'granted',
                ad_user_data: 'granted',
                ad_personalization: 'granted',
                analytics_storage: 'granted'
            });
            if (MARKETING.googleAds) gtag('config', MARKETING.googleAds);
            if (MARKETING.ga4) gtag('config', MARKETING.ga4, { anonymize_ip: true });
        }

        // Meta (Facebook e Instagram comparten píxel).
        if (MARKETING.metaPixel) {
            !function (f, b, e, v, n, t, s) {
                if (f.fbq) return; n = f.fbq = function () {
                    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
                };
                if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
                t = b.createElement(e); t.async = !0; t.src = v;
                s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
            }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
            window.fbq('init', MARKETING.metaPixel);
            window.fbq('track', 'PageView');
        }

        // TikTok.
        if (MARKETING.tiktok) {
            !function (w, d, t) {
                w.TiktokAnalyticsObject = t;
                const ttq = w[t] = w[t] || [];
                ttq.methods = ['page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once', 'ready', 'alias', 'group', 'enableCookie', 'disableCookie'];
                ttq.setAndDefer = function (obj, m) { obj[m] = function () { obj.push([m].concat(Array.prototype.slice.call(arguments, 0))); }; };
                for (let i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
                ttq.load = function (id) {
                    ttq._i = ttq._i || {}; ttq._i[id] = []; ttq._t = ttq._t || {}; ttq._t[id] = +new Date();
                    ttq._o = ttq._o || {};
                    const s = d.createElement('script'); s.async = true;
                    s.src = 'https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=' + id + '&lib=' + t;
                    const f = d.getElementsByTagName('script')[0]; f.parentNode.insertBefore(s, f);
                };
                ttq.load(MARKETING.tiktok);
                ttq.page();
            }(window, document, 'ttq');
        }
    }

    // `nwEvento` es el único punto por el que se manda una conversión. Manda
    // el mismo evento a las tres plataformas y NO HACE NADA si no hay
    // consentimiento, así que se puede llamar desde cualquier sitio sin tener
    // que acordarse de comprobar nada.
    window.nwEvento = function (nombre, datos) {
        if (!yaCargado) return;
        if (MARKETING.googleAds || MARKETING.ga4) gtag('event', nombre, datos || {});
        if (window.fbq) window.fbq('trackCustom', nombre, datos || {});
        if (window.ttq) window.ttq.track(nombre, datos || {});
    };

    // --- El banner ---------------------------------------------------------
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const declineCookiesBtn = document.getElementById('decline-cookies');

    const decidir = (valor) => {
        try { localStorage.setItem(CONSENT_KEY, valor); } catch (e) { /* modo privado */ }
        if (cookieBanner) cookieBanner.classList.remove('show');
        if (valor === 'accepted') cargarMarketing();
    };

    if (acceptCookiesBtn) acceptCookiesBtn.addEventListener('click', () => decidir('accepted'));
    if (declineCookiesBtn) declineCookiesBtn.addEventListener('click', () => decidir('declined'));

    // Al cargar: si ya aceptó en otra visita se carga sin volver a preguntar;
    // si rechazó, no se carga y no se le vuelve a molestar; si no ha decidido,
    // se enseña el banner. ⚠️ Y solo se enseña SI HAY ALGO QUE CONSENTIR: sin
    // ningún identificador puesto, la web no pone ni una cookie de terceros y
    // preguntar por algo que no ocurre es ruido —y encima entrena a la gente a
    // aceptar sin leer.
    let decision = null;
    try { decision = localStorage.getItem(CONSENT_KEY); } catch (e) { /* modo privado */ }

    if (decision === 'accepted') {
        cargarMarketing();
    } else if (!decision && hayAlgoQueCargar) {
        setTimeout(() => { if (cookieBanner) cookieBanner.classList.add('show'); }, 1000);
    }

    // Enlace para cambiar de opinión, que el RGPD exige que sea tan fácil como
    // darlo. Se pone en la política de cookies con id="cambiar-consentimiento".
    const cambiar = document.getElementById('cambiar-consentimiento');
    if (cambiar) {
        cambiar.addEventListener('click', (e) => {
            e.preventDefault();
            try { localStorage.removeItem(CONSENT_KEY); } catch (err) { }
            if (cookieBanner) cookieBanner.classList.add('show');
            else location.href = '/';
        });
    }

    // Consent Modal Logic
    const consentModal = document.getElementById('consent-modal');
    const readMoreLink = document.getElementById('read-more-consent');
    const closeConsentModalBtn = document.querySelector('.close-consent-modal');
    const closeConsentModalBtn2 = document.getElementById('close-consent-modal-btn');
    const acceptConsentBtn = document.getElementById('accept-consent-modal');
    const consentCheckbox = document.getElementById('consent-checkbox');

    // Open modal when clicking "Leer más..."
    if (readMoreLink) {
        readMoreLink.addEventListener('click', (e) => {
            e.preventDefault();
            consentModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close modal function
    function closeConsentModal() {
        consentModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close modal on X button
    if (closeConsentModalBtn) {
        closeConsentModalBtn.addEventListener('click', closeConsentModal);
    }

    // Close modal on "Cerrar" button
    if (closeConsentModalBtn2) {
        closeConsentModalBtn2.addEventListener('click', closeConsentModal);
    }

    // Accept consent button - checks the checkbox and closes modal
    if (acceptConsentBtn) {
        acceptConsentBtn.addEventListener('click', () => {
            if (consentCheckbox) {
                consentCheckbox.checked = true;
            }
            closeConsentModal();
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === consentModal) {
            closeConsentModal();
        }
    });

    // Form validation to ensure consent is checked
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            if (consentCheckbox && !consentCheckbox.checked) {
                e.preventDefault();
                alert('Por favor, acepta el tratamiento de datos para enviar el formulario.');
                consentCheckbox.focus();
                return;
            }

            // --- Conversión: formulario enviado (Fase 13) ------------------
            // Esta es LA conversión del sitio, la que hay que optimizar en las
            // campañas. Va después del `return` de arriba a propósito: si
            // falta el consentimiento el envío no ocurre, y contar una
            // conversión que no pasó estropea el aprendizaje de la campaña.
            //
            // Se mandan las dos respuestas de calificación (plazo y volumen de
            // pedidos) porque no todos los envíos valen lo mismo: "ahora" con
            // "+500 pedidos" es un cliente y "solo explorando" con "<100" no
            // lo es. Con ese dato las plataformas pueden buscar más de los
            // primeros. ⚠️ NO se manda nombre, correo ni teléfono: son datos
            // personales y no tienen por qué salir del formulario.
            window.nwEvento('formulario_enviado', {
                plazo: contactForm.querySelector('#plazo')?.value || '',
                pedidos: contactForm.querySelector('#pedidos')?.value || ''
            });
        });
    }

    // El carrusel de precios se retiro en la Fase 13: Luis decidio el
    // 2026-07-20 no publicar precios, asi que #precios no existe y este
    // bloque consultaba selectores que no estan en ninguna pagina.
});


// ========================================
// Barra superior: banner de IDIOMA y banner de PAÍS
// ========================================
// Son dos ofertas distintas que comparten la misma barra y el mismo estilo, y
// solo puede haber UNA en pantalla a la vez.
//
//   · Idioma (Fase 1) — la raíz es la versión canónica en español. Si el
//     navegador no está en español, ofrecemos EN/DE.
//   · País (Fase 14, sesión 4) — si el navegador SÍ está en español pero la
//     zona horaria es del otro mercado, ofrecemos la otra versión española:
//     desde Europa se ofrece /es-es/, desde América se ofrece /.
//
// ⚠️ LAS DOS SE OFRECEN, NUNCA SE REDIRIGE, y es la misma regla por el mismo
// motivo en los dos casos: Googlebot rastrea con Accept-Language en inglés y
// casi siempre desde IPs de EE.UU. Una redirección automática —por idioma o por
// país— le dejaría ver una sola variante y las demás no existirían para nadie
// que busque. Está en CLAUDE.md § 7 y en FASE-14-mercados.md § Arquitectura.
//
// ⚠️ LA ZONA HORARIA NO CAMBIA NI UNA PALABRA DE LA PÁGINA. Solo decide si se
// enseña la barra. El contenido lo manda el `lang` del documento, vía
// `data-mercado`, y eso es lo que hace que la página que ve Google y la que ve
// el visitante sean la misma.
//
// Por qué la zona horaria y no la IP: se resuelve en el propio navegador, así
// que son 0 bytes, 0 latencia y 0 terceros. Una API de IP mandaría la dirección
// del visitante a alguien que no está declarado en politica-cookies.html, en una
// web que promete "no cedemos a terceros".
document.addEventListener('DOMContentLoaded', () => {
    const bannerIdioma = document.getElementById('lang-banner');
    const bannerPais = document.getElementById('pais-banner');
    if (!bannerIdioma && !bannerPais) return;

    // Dos cookies, no una. Son dos preguntas distintas: cerrar "esto también
    // está en inglés" no responde a "¿escribes desde España?". Con una sola
    // cookie, quien cierre la primera no vería nunca la segunda.
    // Las dos están declaradas en politica-cookies.html (§ 8 de CLAUDE.md:
    // ninguna pieza entra sin nombrarse, aunque sea propia y técnica).
    const COOKIE_IDIOMA = 'nw_lang_banner';
    const COOKIE_PAIS = 'nw_pais_banner';
    const DIAS = 180;

    function getCookie(name) {
        return document.cookie
            .split('; ')
            .find(row => row.startsWith(name + '='))
            ?.split('=')[1];
    }

    function setCookie(name, value, days) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
    }

    // Enseña una barra y le engancha sus dos formas de cerrarse: seguir el
    // enlace o pulsar la X. Las dos guardan la elección para no volver a
    // preguntar en 180 días.
    function activar(banner, cookie, valorAlCerrar) {
        banner.hidden = false;
        document.body.classList.add('has-lang-banner');

        banner.querySelectorAll('[data-banner-choice]').forEach(link => {
            link.addEventListener('click', () => {
                // Se guarda la elección; el enlace sigue su curso normal
                setCookie(cookie, link.getAttribute('data-banner-choice'), DIAS);
            });
        });

        // Por clase y acotado al banner, no por id: hay dos barras en la página
        // y un id repetido devolvería siempre la primera.
        const cerrar = banner.querySelector('.lang-banner-close');
        if (cerrar) {
            cerrar.addEventListener('click', () => {
                setCookie(cookie, valorAlCerrar, DIAS);
                banner.hidden = true;
                document.body.classList.remove('has-lang-banner');
            });
        }
    }

    // --- 1. Idioma. Tiene prioridad: a quien no lee español no le sirve de nada
    //        que le ofrezcamos la otra versión española.
    const idiomaNavegador = (navigator.language || 'es').toLowerCase().substring(0, 2);

    if (bannerIdioma && idiomaNavegador !== 'es' && !getCookie(COOKIE_IDIOMA)) {
        activar(bannerIdioma, COOKIE_IDIOMA, 'es');
        return;
    }

    // --- 2. País. Solo para quien ya está leyendo en español.
    if (!bannerPais || getCookie(COOKIE_PAIS)) return;

    // `timeZone` puede venir vacío en navegadores viejos y `Intl` puede no
    // existir. Sin dato no se enseña nada: el banner es una ayuda, no un
    // requisito, y equivocarse molesta más que callarse.
    let zona = '';
    try {
        zona = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    } catch (e) {
        zona = '';
    }
    if (!zona) return;

    // Canarias y Ceuta son España y NO están bajo `Europe/`. Dejarlas fuera
    // sería justo el fallo que nadie prueba.
    const enEuropa = /^Europe\//.test(zona) || zona === 'Atlantic/Canary' || zona === 'Africa/Ceuta';
    const enAmerica = /^America\//.test(zona);

    // A propósito se mira la REGIÓN entera y no solo Europe/Madrid y
    // America/Lima. El error es asimétrico: enseñar la barra a quien no la
    // necesitaba cuesta una barra que se cierra en un clic; no enseñarla cuesta
    // que un comprador español lea un bloque de SUNAT y soles y se vaya.
    const mercado = document.documentElement.dataset.mercado;

    if (mercado === 'pe' && enEuropa) {
        activar(bannerPais, COOKIE_PAIS, 'pe');
    } else if (mercado === 'es' && enAmerica) {
        activar(bannerPais, COOKIE_PAIS, 'es');
    }
});
