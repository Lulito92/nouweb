document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Language Switcher Functionality
    const langToggleBtn = document.querySelector('.lang-toggle-btn');
    const langDropdown = document.querySelector('.lang-dropdown');
    const langDropdownItems = document.querySelectorAll('.lang-dropdown-item');

    if (langToggleBtn && langDropdown) {
        // Toggle dropdown
        langToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            langDropdown.classList.remove('active');
        });

        // Handle language selection
        langDropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const selectedLang = item.getAttribute('data-lang');
                
                // Redirect based on selected language
                if (selectedLang === 'es') {
                    // Already in Spanish, just close dropdown
                    langDropdown.classList.remove('active');
                } else if (selectedLang === 'de') {
                    window.location.href = '../de/index.html';
                } else if (selectedLang === 'en') {
                    window.location.href = '../index.html';
                }
            });
        });
    }

    // Scroll Animations (Intersection Observer)
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

    // Service Data
    const serviceData = {
        'web-design': {
            title: 'Diseño y Desarrollo Web',
            description: 'Creamos sitios web que no solo son visualmente impactantes, sino que están diseñados para convertir visitantes en clientes. Utilizamos las últimas tecnologías para garantizar velocidad, seguridad y una experiencia de usuario fluida en todos los dispositivos. Tu web será tu mejor herramienta de ventas 24/7.',
            icon: 'fa-laptop-code',
            video: '../Videos/diseñoweb.mp4',
            details: `
                <h5>Proceso de Desarrollo</h5>
                <ul>
                    <li><strong>Análisis y Planificación:</strong> Estudiamos tu negocio, competencia y público objetivo para definir la estrategia digital perfecta.</li>
                    <li><strong>Diseño UX/UI:</strong> Creamos wireframes y prototipos interactivos que priorizan la experiencia del usuario y la conversión.</li>
                    <li><strong>Desarrollo Frontend:</strong> Implementamos diseños pixel-perfect con HTML5, CSS3 y JavaScript moderno, garantizando compatibilidad cross-browser.</li>
                    <li><strong>Desarrollo Backend:</strong> Construimos la infraestructura necesaria con tecnologías robustas y escalables.</li>
                    <li><strong>Optimización SEO:</strong> Implementamos las mejores prácticas de SEO on-page para mejorar tu visibilidad en buscadores.</li>
                    <li><strong>Testing y QA:</strong> Realizamos pruebas exhaustivas en múltiples dispositivos y navegadores.</li>
                    <li><strong>Lanzamiento y Formación:</strong> Desplegamos tu web y te capacitamos para gestionarla de forma autónoma.</li>
                </ul>
                
                <h5>Tecnologías que Utilizamos</h5>
                <p>HTML5, CSS3, JavaScript (ES6+), React, Vue.js, WordPress, PHP, Node.js, MySQL, PostgreSQL</p>
                
                <h5>Beneficios Clave</h5>
                <ul>
                    <li>Diseño responsive adaptado a móviles, tablets y escritorio</li>
                    <li>Velocidad de carga optimizada (menos de 3 segundos)</li>
                    <li>Seguridad SSL y protección contra vulnerabilidades</li>
                    <li>Panel de administración intuitivo</li>
                    <li>Integración con Google Analytics y herramientas de marketing</li>
                    <li>Soporte y mantenimiento post-lanzamiento</li>
                </ul>
            `
        },
        'custom-web': {
            title: 'Web a Medida',
            description: 'Cuando las soluciones estándar no son suficientes, desarrollamos plataformas web totalmente personalizadas. Desde sistemas de gestión interna hasta aplicaciones complejas, construimos exactamente lo que tu negocio necesita para optimizar procesos y escalar sin límites.',
            icon: 'fa-code',
            video: '../Videos/5495781-uhd_2560_1080_30fps.mp4',
            details: `
                <h5>Soluciones Personalizadas</h5>
                <ul>
                    <li><strong>Aplicaciones Web Complejas:</strong> Desarrollamos SaaS, CRM, ERP y plataformas específicas para tu industria.</li>
                    <li><strong>Portales Corporativos:</strong> Intranets, extranets y sistemas de gestión documental.</li>
                    <li><strong>Plataformas de Reservas:</strong> Sistemas de booking para hoteles, restaurantes, eventos y servicios.</li>
                    <li><strong>Marketplaces:</strong> Plataformas multi-vendor con gestión de vendedores, productos y comisiones.</li>
                    <li><strong>Sistemas de Gestión:</strong> Herramientas personalizadas para optimizar tus procesos internos.</li>
                    <li><strong>APIs e Integraciones:</strong> Conectamos tu web con sistemas externos (CRM, ERP, pasarelas de pago, etc.).</li>
                </ul>
                
                <h5>Metodología de Trabajo</h5>
                <p>Utilizamos metodologías ágiles (Scrum) con sprints de 2 semanas, entregas incrementales y feedback continuo. Esto garantiza transparencia total y la posibilidad de ajustar el proyecto según evolucionen tus necesidades.</p>
                
                <h5>Stack Tecnológico</h5>
                <p>React, Angular, Vue.js, Node.js, Python (Django/Flask), Ruby on Rails, .NET, MongoDB, PostgreSQL, Redis, Docker, AWS/Azure</p>
                
                <h5>Entregables</h5>
                <ul>
                    <li>Código fuente documentado y versionado</li>
                    <li>Documentación técnica completa</li>
                    <li>Manual de usuario</li>
                    <li>Formación del equipo</li>
                    <li>Garantía de 3 meses post-lanzamiento</li>
                </ul>
            `
        },
        'ecommerce': {
            title: 'Ecommerce',
            description: 'Lanza tu tienda online con todas las garantías. Diseñamos ecommerces intuitivos, seguros y optimizados para la venta. Integramos pasarelas de pago, gestión de inventario y herramientas de marketing para que puedas gestionar tu negocio fácilmente y vender más.',
            icon: 'fa-shopping-cart',
            video: '../Videos/videoecommers.mp4',
            details: `
                <h5>Funcionalidades Incluidas</h5>
                <ul>
                    <li><strong>Catálogo de Productos:</strong> Gestión ilimitada de productos con variantes, imágenes, descripciones y stock.</li>
                    <li><strong>Carrito de Compra:</strong> Experiencia de compra fluida con cálculo automático de envíos e impuestos.</li>
                    <li><strong>Pasarelas de Pago:</strong> Integración con Stripe, PayPal, Redsys y otras plataformas seguras.</li>
                    <li><strong>Gestión de Pedidos:</strong> Panel completo para procesar, facturar y hacer seguimiento de pedidos.</li>
                    <li><strong>Sistema de Envíos:</strong> Integración con transportistas y cálculo automático de tarifas.</li>
                    <li><strong>Cupones y Descuentos:</strong> Crea promociones, códigos de descuento y ofertas especiales.</li>
                    <li><strong>Área de Cliente:</strong> Los usuarios pueden ver su historial, hacer seguimiento y gestionar sus datos.</li>
                    <li><strong>Opiniones y Valoraciones:</strong> Sistema de reviews para generar confianza.</li>
                </ul>
                
                <h5>Optimización para Ventas</h5>
                <ul>
                    <li>Checkout optimizado de un solo paso</li>
                    <li>Recuperación de carritos abandonados</li>
                    <li>Recomendaciones de productos relacionados</li>
                    <li>Email marketing automatizado</li>
                    <li>Integración con Google Shopping y Facebook Ads</li>
                    <li>Analytics avanzado para tomar decisiones basadas en datos</li>
                </ul>
                
                <h5>Plataformas que Utilizamos</h5>
                <p>WooCommerce, Shopify, PrestaShop, Magento, o desarrollo personalizado según tus necesidades</p>
                
                <h5>Seguridad y Cumplimiento</h5>
                <p>Certificado SSL, cumplimiento RGPD, PCI DSS compliance, copias de seguridad diarias, protección anti-fraude</p>
            `
        },
        'graphic-design': {
            title: 'Diseño Gráfico',
            description: 'La imagen de tu marca es lo primero que ven tus clientes. Diseñamos logotipos, manuales de identidad corporativa y material gráfico que transmite profesionalidad y confianza. Hacemos que tu marca sea memorable y se destaque de la competencia.',
            icon: 'fa-pen-nib',
            video: '../Videos/diseñografico.mp4',
            details: `
                <h5>Servicios de Diseño Gráfico</h5>
                <ul>
                    <li><strong>Identidad Corporativa:</strong> Creación completa de marca desde cero, incluyendo naming, logotipo y paleta de colores.</li>
                    <li><strong>Manual de Marca:</strong> Guía de uso del logotipo, tipografías, colores y aplicaciones correctas.</li>
                    <li><strong>Papelería Corporativa:</strong> Tarjetas de visita, membretes, sobres, carpetas y documentos oficiales.</li>
                    <li><strong>Material Publicitario:</strong> Flyers, carteles, banners, roll-ups y material para eventos.</li>
                    <li><strong>Diseño para Redes Sociales:</strong> Posts, stories, portadas y contenido visual optimizado para cada plataforma.</li>
                    <li><strong>Packaging:</strong> Diseño de envases y etiquetas que destacan en el punto de venta.</li>
                    <li><strong>Infografías:</strong> Visualización de datos compleja de forma atractiva y comprensible.</li>
                    <li><strong>Presentaciones Corporativas:</strong> Diseño de presentaciones PowerPoint/Keynote profesionales.</li>
                </ul>
                
                <h5>Proceso Creativo</h5>
                <ul>
                    <li><strong>Briefing:</strong> Entendemos tu visión, valores y público objetivo.</li>
                    <li><strong>Investigación:</strong> Analizamos tu competencia y tendencias del sector.</li>
                    <li><strong>Conceptualización:</strong> Desarrollamos múltiples conceptos creativos.</li>
                    <li><strong>Presentación:</strong> Te mostramos 3 propuestas iniciales con sus variantes.</li>
                    <li><strong>Refinamiento:</strong> Ajustamos el diseño elegido según tu feedback.</li>
                    <li><strong>Entrega Final:</strong> Archivos en todos los formatos necesarios (AI, EPS, PDF, PNG, JPG).</li>
                </ul>
                
                <h5>Herramientas Profesionales</h5>
                <p>Adobe Illustrator, Photoshop, InDesign, Figma, After Effects</p>
                
                <h5>Formatos de Entrega</h5>
                <p>Archivos vectoriales editables, versiones en alta resolución para impresión, versiones optimizadas para web, guía de uso y aplicaciones</p>
            `
        },
        'maintenance': {
            title: 'Mantenimiento Web',
            description: 'Olvídate de problemas técnicos. Nos encargamos de mantener tu web actualizada, segura y funcionando a la perfección. Realizamos copias de seguridad, actualizaciones de plugins y monitorización constante para que tú solo te preocupes de tu negocio.',
            icon: 'fa-tools',
            video: '../Videos/mantenimientoweb.mp4',
            details: `
                <h5>Servicios de Mantenimiento Incluidos</h5>
                <ul>
                    <li><strong>Actualizaciones de Seguridad:</strong> Instalación inmediata de parches de seguridad críticos.</li>
                    <li><strong>Actualizaciones de CMS:</strong> Mantenemos WordPress, plugins y temas siempre actualizados.</li>
                    <li><strong>Copias de Seguridad:</strong> Backups automáticos diarios con almacenamiento en la nube.</li>
                    <li><strong>Monitorización 24/7:</strong> Vigilancia constante del uptime y rendimiento de tu web.</li>
                    <li><strong>Optimización de Velocidad:</strong> Mejoras continuas para mantener tiempos de carga óptimos.</li>
                    <li><strong>Corrección de Errores:</strong> Resolución rápida de bugs y problemas técnicos.</li>
                    <li><strong>Soporte Técnico:</strong> Asistencia prioritaria vía email, teléfono o chat.</li>
                    <li><strong>Informes Mensuales:</strong> Reportes detallados de actividad, rendimiento y seguridad.</li>
                </ul>
                
                <h5>Planes de Mantenimiento</h5>
                <ul>
                    <li><strong>Plan Básico:</strong> Actualizaciones mensuales, backups semanales, soporte por email (respuesta en 48h)</li>
                    <li><strong>Plan Profesional:</strong> Actualizaciones semanales, backups diarios, soporte prioritario (respuesta en 24h), optimización mensual</li>
                    <li><strong>Plan Premium:</strong> Actualizaciones inmediatas, backups diarios, soporte 24/7, optimización continua, cambios de contenido incluidos</li>
                </ul>
                
                <h5>Seguridad Proactiva</h5>
                <ul>
                    <li>Firewall de aplicaciones web (WAF)</li>
                    <li>Escaneo de malware semanal</li>
                    <li>Protección contra ataques DDoS</li>
                    <li>Certificados SSL renovados automáticamente</li>
                    <li>Hardening de WordPress y configuración segura</li>
                </ul>
                
                <h5>Garantías</h5>
                <p>Tiempo de respuesta garantizado según plan, restauración de backups en menos de 4 horas, disponibilidad del 99.9%, sin permanencia (cancela cuando quieras)</p>
            `
        },
        'seo-optimization': {
            title: 'Optimización SEO',
            description: '¿Ya tienes un sitio web pero no apareces en Google? Analizamos y optimizamos tu web existente para mejorar su posicionamiento en buscadores, aumentar el tráfico orgánico y atraer más clientes potenciales. No necesitas una web nueva, mejoramos la que ya tienes.',
            icon: 'fa-search',
            video: '../Videos/seo.mp4',
            details: `
                <h5>Proceso de Optimización SEO</h5>
                <ul>
                    <li><strong>Auditoría SEO Completa:</strong> Análisis exhaustivo de tu web actual para identificar problemas técnicos, errores y oportunidades de mejora.</li>
                    <li><strong>Análisis de Palabras Clave:</strong> Investigación de las búsquedas que realiza tu público objetivo y selección de keywords estratégicas.</li>
                    <li><strong>Análisis de Competencia:</strong> Estudiamos qué están haciendo tus competidores mejor posicionados para superar su estrategia.</li>
                    <li><strong>Optimización Técnica:</strong> Mejoramos velocidad de carga, estructura de URLs, etiquetas meta, schema markup y sitemap XML.</li>
                    <li><strong>Optimización On-Page:</strong> Ajustamos títulos, descripciones, encabezados, contenido y estructura interna de cada página.</li>
                    <li><strong>Optimización de Contenido:</strong> Mejoramos textos existentes y creamos contenido nuevo optimizado para posicionar.</li>
                    <li><strong>Link Building Interno:</strong> Optimizamos la estructura de enlaces internos para mejorar la autoridad de páginas clave.</li>
                    <li><strong>Optimización para Móviles:</strong> Aseguramos que tu web sea totalmente responsive y cumpla con Core Web Vitals.</li>
                </ul>
                
                <h5>SEO Técnico Incluido</h5>
                <ul>
                    <li>Optimización de velocidad de carga (PageSpeed, GTmetrix)</li>
                    <li>Corrección de errores 404 y redirecciones</li>
                    <li>Implementación de datos estructurados (Schema.org)</li>
                    <li>Optimización de imágenes (compresión, lazy loading, alt tags)</li>
                    <li>Configuración de Google Search Console y Analytics</li>
                    <li>Archivo robots.txt y sitemap XML optimizados</li>
                    <li>Certificado SSL y migración a HTTPS si es necesario</li>
                    <li>Corrección de contenido duplicado</li>
                </ul>
                
                <h5>SEO de Contenido</h5>
                <ul>
                    <li>Optimización de meta títulos y descripciones</li>
                    <li>Estructuración correcta de encabezados (H1, H2, H3)</li>
                    <li>Densidad de palabras clave óptima</li>
                    <li>Creación de contenido SEO-friendly</li>
                    <li>Optimización de textos alternativos de imágenes</li>
                    <li>Mejora de la legibilidad y experiencia de usuario</li>
                </ul>
                
                <h5>Seguimiento y Reportes</h5>
                <ul>
                    <li>Informe inicial con problemas detectados y plan de acción</li>
                    <li>Reportes mensuales de posicionamiento y tráfico orgánico</li>
                    <li>Seguimiento de keywords objetivo en Google</li>
                    <li>Análisis de competencia continuo</li>
                    <li>Recomendaciones mensuales de mejora</li>
                    <li>Acceso a dashboard de métricas en tiempo real</li>
                </ul>
                
                <h5>Resultados Esperados</h5>
                <p>Mejora del posicionamiento en Google (primeras páginas en 3-6 meses), aumento del tráfico orgánico cualificado, mayor visibilidad de marca, incremento de conversiones y leads, mejor experiencia de usuario y rendimiento web</p>
                
                <h5>Inversión</h5>
                <p>Planes mensuales desde 299€/mes según tamaño y complejidad del sitio web. Incluye optimización continua y soporte. Sin permanencia.</p>
            `
        }
    };

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
        
        // Get current language and translations
        const currentLang = localStorage.getItem('selectedLanguage') || 'es';
        const t = translations[currentLang];

        // Map service IDs to translation keys
        const serviceTranslations = {
            'web-design': {
                title: t.serviceWebDesign,
                desc: t.serviceWebDesignDesc
            },
            'custom-web': {
                title: t.serviceCustomWeb,
                desc: t.serviceCustomWebDesc
            },
            'ecommerce': {
                title: t.serviceEcommerce,
                desc: t.serviceEcommerceDesc
            },
            'graphic-design': {
                title: t.serviceGraphicDesign,
                desc: t.serviceGraphicDesignDesc
            },
            'maintenance': {
                title: t.serviceMaintenance,
                desc: t.serviceMaintenanceDesc
            },
            'seo-optimization': {
                title: t.serviceSEO,
                desc: t.serviceSEODesc
            }
        };

        // Use translated title and description
        const translatedData = serviceTranslations[serviceId];
        modalTitle.textContent = translatedData ? translatedData.title : data.title;
        modalDesc.textContent = translatedData ? translatedData.desc : data.description;

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
        modalImage.innerHTML = `
            <video class="modal-video-element" autoplay muted loop playsinline>
                <source src="${data.video}" type="video/mp4">
                Tu navegador no soporta videos HTML5.
            </video>
        `;

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
                // Update button text with current language
                const currentLang = localStorage.getItem('selectedLanguage') || 'es';
                const t = window.currentTranslations || translations[currentLang];
                if (modalDetails.classList.contains('expanded')) {
                    learnMoreBtn.textContent = t.btnMostrarMenos || 'Mostrar menos';
                } else {
                    learnMoreBtn.textContent = t.btnSaberMas || 'Saber más';
                }
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

    // Cookie Consent Banner
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const declineCookiesBtn = document.getElementById('decline-cookies');

    // Verificar si el usuario ya ha dado su consentimiento
    function checkCookieConsent() {
        const cookieConsent = localStorage.getItem('cookieConsent');
        if (!cookieConsent) {
            // Mostrar el banner después de un pequeño delay
            setTimeout(() => {
                if (cookieBanner) {
                    cookieBanner.classList.add('show');
                }
            }, 1000);
        }
    }

    // Aceptar cookies
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieBanner.classList.remove('show');
            // Aquí puedes activar las cookies de terceros si las tienes
            console.log('Cookies aceptadas');
        });
    }

    // Rechazar cookies
    if (declineCookiesBtn) {
        declineCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'declined');
            cookieBanner.classList.remove('show');
            // Aquí puedes desactivar las cookies de terceros
            console.log('Cookies rechazadas');
        });
    }

    // Ejecutar la verificación al cargar la página
    checkCookieConsent();

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
            }
        });
    }

    // Pricing Carousel Functionality
    const pricingGrid = document.querySelector('.pricing-grid');
    const pricingCards = document.querySelectorAll('#precios .pricing-card');
    const carouselDotsContainer = document.querySelector('.carousel-dots');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (pricingGrid && pricingCards.length > 0 && carouselDotsContainer) {
        let currentSlide = 0;
        
        // Create dots
        pricingCards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            carouselDotsContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.carousel-dot');
        
        function updateDots() {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        function goToSlide(index) {
            if (index < 0 || index >= pricingCards.length) return;
            currentSlide = index;
            const scrollAmount = pricingCards[index].offsetLeft - pricingGrid.offsetLeft;
            pricingGrid.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
            updateDots();
        }
        
        // Arrow navigation
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const newIndex = currentSlide > 0 ? currentSlide - 1 : pricingCards.length - 1;
                goToSlide(newIndex);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const newIndex = currentSlide < pricingCards.length - 1 ? currentSlide + 1 : 0;
                goToSlide(newIndex);
            });
        }
        
        // Update current slide on scroll
        pricingGrid.addEventListener('scroll', () => {
            const scrollLeft = pricingGrid.scrollLeft;
            const cardWidth = pricingCards[0].offsetWidth;
            const newIndex = Math.round(scrollLeft / cardWidth);
            if (newIndex !== currentSlide) {
                currentSlide = newIndex;
                updateDots();
            }
        });
    }
});

// ========================================
// Multi-Language System
// ========================================

// Translation Dictionary
const translations = {
    es: {
        // Navigation & Header
        navInicio: 'Inicio',
        navServicios: 'Servicios',
        navNosotros: 'Nosotros',
        navCasosExito: 'Casos de Éxito',
        navPrecios: 'Precios',
        navProceso: 'Proceso',
        navContacto: 'Contacto',
        loginTitle: 'Acceso Clientes',
        
        // Language Modal
        selectLanguage: 'Selecciona tu idioma',
        choosePreferred: 'Elige tu idioma preferido',
        
        // Hero Section
        badgeText: 'Diseño Web y Marketing Digital en Alicante',
        heroTitle: '¿Necesitas una web que ',
        heroTitleHighlight: 'Venda',
        heroSubtitle: 'Ayudamos a empresas y autónomos a conseguir más clientes con una página web profesional, rápida y optimizada.',
        btnQuieroWeb: 'Quiero mi Web',
        btnVerServicios: 'Ver Servicios',
        
        // Services Section
        serviciosTitle: 'Nuestros Servicios',
        serviciosSubtitle: 'Soluciones integrales para tu presencia digital',
        serviceWebDesign: 'Diseño y Desarrollo Web',
        serviceWebDesignDesc: 'Webs modernas, rápidas y adaptadas a todos los dispositivos. Enfocadas en la experiencia de usuario y la conversión.',
        serviceCustomWeb: 'Web a Medida',
        serviceCustomWebDesc: 'Desarrollo de funcionalidades específicas y aplicaciones web complejas adaptadas 100% a tus necesidades.',
        serviceEcommerce: 'Ecommerce',
        serviceEcommerceDesc: 'Tiendas online robustas y seguras. Optimizadas para vender más y gestionar tu catálogo fácilmente.',
        serviceGraphicDesign: 'Diseño Gráfico',
        serviceGraphicDesignDesc: 'Identidad corporativa, branding y material gráfico que transmite la esencia de tu marca.',
        serviceMaintenance: 'Mantenimiento Web',
        serviceMaintenanceDesc: 'Tu web siempre actualizada, segura y funcionando correctamente. Soporte técnico continuo.',
        serviceSEO: 'Optimización SEO',
        serviceSEODesc: '¿Ya tienes una web? Optimizamos tu sitio existente para mejorar su posicionamiento en buscadores y atraer más tráfico cualificado.',
        btnSolicitarPresupuesto: 'Solicitar Presupuesto',
        btnSaberMas: 'Saber más',
        btnMostrarMenos: 'Mostrar menos',
        
        // About Section
        aboutTitle: 'Expertos en Valencia y Alicante',
        aboutPara1: 'Somos Nouweb, un equipo apasionado por la tecnología y el diseño ubicado en el corazón de Valencia y Alicante. Entendemos el mercado local y global, ofreciendo soluciones que conectan con tu audiencia.',
        aboutPara2: 'Desarrolladores Web Fullstack | Frontend & Backend',
        aboutPara3: 'Creación de sitios web desde cero, E-commerce, Chatbots y sistemas integrados. Soluciones a medida.',
        featureTratoCercano: 'Trato cercano y personalizado',
        featureResultados: 'Resultados medibles',
        featureTecnologia: 'Tecnología de vanguardia',
        
        // Success Cases
        casosExitoTitle: 'Casos de Éxito',
        casosExitoSubtitle: 'Proyectos que han transformado negocios',
        caseEcommerce: 'E-commerce',
        caseTiendaOnline: 'Tienda Online de Celdas',
        caseTiendaDesc: 'Desarrollo completo de e-commerce con integración de pasarela de pago y sistema de gestión de inventario.',
        caseVentas: 'Ventas Online',
        caseUsuarios: 'Usuarios/mes',
        caseWebCorporativa: 'Web Corporativa',
        casePlataforma: 'Plataforma Empresarial',
        casePlataformaDesc: 'Diseño y desarrollo de web corporativa con sistema de gestión de contenidos y área de clientes.',
        caseTiempoCarga: 'Tiempo de Carga',
        caseSatisfaccion: 'Satisfacción',
        caseAppWeb: 'Aplicación Web',
        caseSistemaReservas: 'Sistema de Reservas',
        caseSistemaDesc: 'Aplicación web personalizada para gestión de reservas con panel de administración completo.',
        caseReservas: 'Reservas/mes',
        caseDisponibilidad: 'Disponibilidad',
        testimoniosTitle: 'Lo que dicen nuestros clientes',
        
        // Pricing Section
        preciosTitle: 'Nuestros Precios',
        preciosSubtitle: 'Opciones para todos los gustos y necesidades',
        pricingPopular: 'Popular',
        pricingWebMedida: 'Web a Medida',
        pricingWebMedidaSub: 'Desarrollo personalizado 100%',
        pricingWebCompleta: 'Web Completa',
        pricingWebCompletaPrice: 'Desde 599€',
        pricingWebCompletaSub: 'Tu mejor carta de presentación',
        pricingEcommerce: 'E-commerce',
        pricingEcommerceSub: 'Vende online 24/7',
        pricingSEO: 'SEO Avanzado',
        pricingSEOPrice: '199€',
        pricingSEOPriceMonth: '+ 149€/mes',
        pricingSEOSub: 'Aparece en Google',
        pricingDisenoGrafico: 'Diseño Gráfico',
        pricingDisenoGraficoSub: 'Identidad visual única',
        pricingMultiIdioma: 'Multi Idioma',
        pricingMultiIdiomaPrice: '+10% del total',
        pricingMultiIdiomaSub: 'Tu web en varios idiomas',
        
        // Process Section
        procesoTitle: 'Nuestro Proceso',
        procesoSubtitle: 'Así trabajamos paso a paso contigo',
        step1Title: 'Contacto',
        step1Desc: 'Cuéntanos tu proyecto y te asesoraremos sin compromiso.',
        step2Title: 'Planificación',
        step2Desc: 'Diseñamos la estructura y te presentamos mockups para tu aprobación.',
        step3Title: 'Desarrollo',
        step3Desc: 'Desarrollamos tu web y te mostramos avances regularmente.',
        step4Title: 'Revisiones',
        step4Desc: 'Dos rondas de ajustes incluidas hasta tu completa satisfacción.',
        step5Title: 'Lanzamiento',
        step5Desc: 'Publicamos tu sitio y te entregamos todas las credenciales.',
        step6Title: 'Soporte',
        step6Desc: 'Mantenimiento opcional para SEO continuo y cambios.',
        
        // Contact Section
        contactTitle: 'Hablemos de tu proyecto',
        contactSubtitle: '¿Tienes una idea? Cuéntanos y la haremos realidad.',
        contactUbicacion: 'Ubicación',
        contactEmail: 'Email',
        contactTelefono: 'Teléfono',
        formNombre: 'Nombre',
        formEmail: 'Email',
        formTelefono: 'Número de Contacto',
        formCodigoPostal: 'Código Postal',
        formMensaje: 'Mensaje',
        formConsentimiento: 'Consiento el tratamiento de mis datos. ',
        formLeerMas: 'Leer más...',
        formEnviar: 'Enviar Mensaje',
        
        // Footer
        footerTagline: 'Transformamos ideas en experiencias digitales excepcionales.',
        footerServicios: 'Servicios',
        footerDisenoWeb: 'Diseño Web',
        footerDesarrolloMedida: 'Desarrollo a Medida',
        footerLegal: 'Legal',
        footerAvisoLegal: 'Aviso Legal',
        footerPrivacidad: 'Política de Privacidad',
        footerCookies: 'Cookies',
        footerSiguenos: 'Síguenos',
        footerCopyright: '© 2026 Nouweb. Todos los derechos reservados. Hecho para ti en Alicante y Valencia.'
    },
    
    de: {
        // Navigation & Header
        navInicio: 'Startseite',
        navServicios: 'Dienstleistungen',
        navNosotros: 'Über uns',
        navCasosExito: 'Erfolgsgeschichten',
        navPrecios: 'Preise',
        navProceso: 'Prozess',
        navContacto: 'Kontakt',
        loginTitle: 'Kunden-Login',
        
        // Language Modal
        selectLanguage: 'Wählen Sie Ihre Sprache',
        choosePreferred: 'Wählen Sie Ihre bevorzugte Sprache',
        
        // Hero Section
        badgeText: 'Webdesign und digitales Marketing in Alicante',
        heroTitle: 'Brauchen Sie eine Website, die ',
        heroTitleHighlight: 'Verkauft',
        heroSubtitle: 'Wir helfen Unternehmen und Freiberuflern, mehr Kunden mit einer professionellen, schnellen und optimierten Website zu gewinnen.',
        btnQuieroWeb: 'Ich möchte meine Website',
        btnVerServicios: 'Dienstleistungen ansehen',
        
        // Services Section
        serviciosTitle: 'Unsere Dienstleistungen',
        serviciosSubtitle: 'Umfassende Lösungen für Ihre digitale Präsenz',
        serviceWebDesign: 'Webdesign & Entwicklung',
        serviceWebDesignDesc: 'Moderne, schnelle Websites, die auf alle Geräte angepasst sind. Fokussiert auf Benutzererfahrung und Konversion.',
        serviceCustomWeb: 'Maßgeschneiderte Website',
        serviceCustomWebDesc: 'Entwicklung spezifischer Funktionen und komplexer Webanwendungen, 100% an Ihre Bedürfnisse angepasst.',
        serviceEcommerce: 'E-Commerce',
        serviceEcommerceDesc: 'Robuste und sichere Online-Shops. Optimiert, um mehr zu verkaufen und Ihren Katalog einfach zu verwalten.',
        serviceGraphicDesign: 'Grafikdesign',
        serviceGraphicDesignDesc: 'Unternehmensidentität, Branding und Grafikmaterial, das die Essenz Ihrer Marke vermittelt.',
        serviceMaintenance: 'Website-Wartung',
        serviceMaintenanceDesc: 'Ihre Website ist immer aktuell, sicher und funktioniert einwandfrei. Fortlaufender technischer Support.',
        serviceSEO: 'SEO-Optimierung',
        serviceSEODesc: 'Haben Sie bereits eine Website? Wir optimieren Ihre bestehende Website, um ihr Suchmaschinenranking zu verbessern und qualifizierten Traffic anzuziehen.',
        btnSolicitarPresupuesto: 'Angebot anfordern',
        btnSaberMas: 'Mehr erfahren',
        btnMostrarMenos: 'Weniger anzeigen',
        
        // About Section
        aboutTitle: 'Experten in Valencia und Alicante',
        aboutPara1: 'Wir sind Nouweb, ein leidenschaftliches Team für Technologie und Design im Herzen von Valencia und Alicante. Wir verstehen den lokalen und globalen Markt und bieten Lösungen, die mit Ihrem Publikum in Resonanz stehen.',
        aboutPara2: 'Fullstack-Webentwickler | Frontend & Backend',
        aboutPara3: 'Erstellung von Websites von Grund auf, E-Commerce, Chatbots und integrierte Systeme. Maßgeschneiderte Lösungen.',
        featureTratoCercano: 'Persönlicher und nahbarer Service',
        featureResultados: 'Messbare Ergebnisse',
        featureTecnologia: 'Spitzentechnologie',
        
        // Success Cases
        casosExitoTitle: 'Erfolgsgeschichten',
        casosExitoSubtitle: 'Projekte, die Unternehmen transformiert haben',
        caseEcommerce: 'E-Commerce',
        caseTiendaOnline: 'Handy-Online-Shop',
        caseTiendaDesc: 'Vollständige E-Commerce-Entwicklung mit Integration von Zahlungsgateway und Lagerverwaltungssystem.',
        caseVentas: 'Online-Verkäufe',
        caseUsuarios: 'Benutzer/Monat',
        caseWebCorporativa: 'Unternehmens-Website',
        casePlataforma: 'Unternehmensplattform',
        casePlataformaDesc: 'Design und Entwicklung einer Unternehmenswebsite mit Content-Management-System und Kundenbereich.',
        caseTiempoCarga: 'Ladezeit',
        caseSatisfaccion: 'Zufriedenheit',
        caseAppWeb: 'Webanwendung',
        caseSistemaReservas: 'Buchungssystem',
        caseSistemaDesc: 'Angepasste Webanwendung für die Buchungsverwaltung mit vollständigem Administrationsbereich.',
        caseReservas: 'Buchungen/Monat',
        caseDisponibilidad: 'Verfügbarkeit',
        testimoniosTitle: 'Was unsere Kunden sagen',
        
        // Pricing Section
        preciosTitle: 'Unsere Preise',
        preciosSubtitle: 'Optionen für jeden Geschmack und Bedarf',
        pricingPopular: 'Beliebt',
        pricingWebMedida: 'Maßgeschneiderte Website',
        pricingWebMedidaSub: '100% personalisierte Entwicklung',
        pricingWebCompleta: 'Komplette Website',
        pricingWebCompletaPrice: 'Ab 599€',
        pricingWebCompletaSub: 'Ihre beste Visitenkarte',
        pricingEcommerce: 'E-Commerce',
        pricingEcommerceSub: 'Online verkaufen 24/7',
        pricingSEO: 'Erweiterte SEO',
        pricingSEOPrice: '199€',
        pricingSEOPriceMonth: '+ 149€/Monat',
        pricingSEOSub: 'Bei Google erscheinen',
        pricingDisenoGrafico: 'Grafikdesign',
        pricingDisenoGraficoSub: 'Einzigartige visuelle Identität',
        pricingMultiIdioma: 'Mehrsprachig',
        pricingMultiIdiomaPrice: '+10% der Gesamtsumme',
        pricingMultiIdiomaSub: 'Ihre Website in mehreren Sprachen',
        
        // Process Section
        procesoTitle: 'Unser Prozess',
        procesoSubtitle: 'So arbeiten wir Schritt für Schritt mit Ihnen',
        step1Title: 'Kontakt',
        step1Desc: 'Erzählen Sie uns von Ihrem Projekt und wir beraten Sie unverbindlich.',
        step2Title: 'Planung',
        step2Desc: 'Wir entwerfen die Struktur und präsentieren Mockups zur Genehmigung.',
        step3Title: 'Entwicklung',
        step3Desc: 'Wir entwickeln Ihre Website und zeigen Ihnen regelmäßig Fortschritte.',
        step4Title: 'Überarbeitungen',
        step4Desc: 'Zwei Überarbeitungsrunden bis zu Ihrer vollständigen Zufriedenheit.',
        step5Title: 'Launch',
        step5Desc: 'Wir veröffentlichen Ihre Website und übergeben alle Zugangsdaten.',
        step6Title: 'Support',
        step6Desc: 'Optionale Wartung für kontinuierliche SEO und Änderungen.',
        
        // Contact Section
        contactTitle: 'Sprechen wir über Ihr Projekt',
        contactSubtitle: 'Haben Sie eine Idee? Erzählen Sie uns davon und wir machen sie wahr.',
        contactUbicacion: 'Standort',
        contactEmail: 'E-Mail',
        contactTelefono: 'Telefon',
        formNombre: 'Name',
        formEmail: 'E-Mail',
        formTelefono: 'Kontaktnummer',
        formCodigoPostal: 'Postleitzahl',
        formMensaje: 'Nachricht',
        formConsentimiento: 'Ich stimme der Verarbeitung meiner Daten zu. ',
        formLeerMas: 'Mehr lesen...',
        formEnviar: 'Nachricht senden',
        
        // Footer
        footerTagline: 'Wir verwandeln Ideen in außergewöhnliche digitale Erlebnisse.',
        footerServicios: 'Dienstleistungen',
        footerDisenoWeb: 'Webdesign',
        footerDesarrolloMedida: 'Maßgeschneiderte Entwicklung',
        footerLegal: 'Rechtliches',
        footerAvisoLegal: 'Impressum',
        footerPrivacidad: 'Datenschutzerklärung',
        footerCookies: 'Cookies',
        footerSiguenos: 'Folgen Sie uns',
        footerCopyright: '© 2026 Nouweb. Alle Rechte vorbehalten. Für Sie gemacht in Alicante und Valencia.'
    },
    
    en: {
        // Navigation & Header
        navInicio: 'Home',
        navServicios: 'Services',
        navNosotros: 'About Us',
        navCasosExito: 'Success Stories',
        navPrecios: 'Pricing',
        navProceso: 'Process',
        navContacto: 'Contact',
        loginTitle: 'Client Access',
        
        // Language Modal
        selectLanguage: 'Select your language',
        choosePreferred: 'Choose your preferred language',
        
        // Hero Section
        badgeText: 'Web Design and Digital Marketing in Alicante',
        heroTitle: 'Need a website that ',
        heroTitleHighlight: 'Sells',
        heroSubtitle: 'We help businesses and freelancers get more clients with a professional, fast, and optimized website.',
        btnQuieroWeb: 'I Want My Website',
        btnVerServicios: 'View Services',
        
        // Services Section
        serviciosTitle: 'Our Services',
        serviciosSubtitle: 'Comprehensive solutions for your digital presence',
        serviceWebDesign: 'Web Design & Development',
        serviceWebDesignDesc: 'Modern, fast websites adapted to all devices. Focused on user experience and conversion.',
        serviceCustomWeb: 'Custom Website',
        serviceCustomWebDesc: 'Development of specific functionalities and complex web applications 100% tailored to your needs.',
        serviceEcommerce: 'E-commerce',
        serviceEcommerceDesc: 'Robust and secure online stores. Optimized to sell more and manage your catalog easily.',
        serviceGraphicDesign: 'Graphic Design',
        serviceGraphicDesignDesc: 'Corporate identity, branding and graphic material that conveys the essence of your brand.',
        serviceMaintenance: 'Website Maintenance',
        serviceMaintenanceDesc: 'Your website always updated, secure and working perfectly. Continuous technical support.',
        serviceSEO: 'SEO Optimization',
        serviceSEODesc: 'Already have a website? We optimize your existing site to improve its search engine ranking and attract qualified traffic.',
        btnSolicitarPresupuesto: 'Request Quote',
        btnSaberMas: 'Learn more',
        btnMostrarMenos: 'Show less',
        
        // About Section
        aboutTitle: 'Experts in Valencia and Alicante',
        aboutPara1: 'We are Nouweb, a team passionate about technology and design located in the heart of Valencia and Alicante. We understand the local and global market, offering solutions that connect with your audience.',
        aboutPara2: 'Fullstack Web Developers | Frontend & Backend',
        aboutPara3: 'Building websites from scratch, E-commerce, Chatbots and integrated systems. Customized solutions.',
        featureTratoCercano: 'Close and personalized treatment',
        featureResultados: 'Measurable results',
        featureTecnologia: 'Cutting-edge technology',
        
        // Success Cases
        casosExitoTitle: 'Success Stories',
        casosExitoSubtitle: 'Projects that have transformed businesses',
        caseEcommerce: 'E-commerce',
        caseTiendaOnline: 'Mobile Phone Online Store',
        caseTiendaDesc: 'Complete e-commerce development with payment gateway integration and inventory management system.',
        caseVentas: 'Online Sales',
        caseUsuarios: 'Users/month',
        caseWebCorporativa: 'Corporate Website',
        casePlataforma: 'Business Platform',
        casePlataformaDesc: 'Design and development of corporate website with content management system and client area.',
        caseTiempoCarga: 'Loading Time',
        caseSatisfaccion: 'Satisfaction',
        caseAppWeb: 'Web Application',
        caseSistemaReservas: 'Booking System',
        caseSistemaDesc: 'Custom web application for booking management with complete administration panel.',
        caseReservas: 'Bookings/month',
        caseDisponibilidad: 'Availability',
        testimoniosTitle: 'What our clients say',
        
        // Pricing Section
        preciosTitle: 'Our Pricing',
        preciosSubtitle: 'Options for every taste and need',
        pricingPopular: 'Popular',
        pricingWebMedida: 'Custom Website',
        pricingWebMedidaSub: '100% personalized development',
        pricingWebCompleta: 'Complete Website',
        pricingWebCompletaPrice: 'From €599',
        pricingWebCompletaSub: 'Your best business card',
        pricingEcommerce: 'E-commerce',
        pricingEcommerceSub: 'Sell online 24/7',
        pricingSEO: 'Advanced SEO',
        pricingSEOPrice: '€199',
        pricingSEOPriceMonth: '+ €149/month',
        pricingSEOSub: 'Appear on Google',
        pricingDisenoGrafico: 'Graphic Design',
        pricingDisenoGraficoSub: 'Unique visual identity',
        pricingMultiIdioma: 'Multi-Language',
        pricingMultiIdiomaPrice: '+10% of total',
        pricingMultiIdiomaSub: 'Your website in multiple languages',
        
        // Process Section
        procesoTitle: 'Our Process',
        procesoSubtitle: 'This is how we work step by step with you',
        step1Title: 'Contact',
        step1Desc: 'Tell us about your project and we will advise you without obligation.',
        step2Title: 'Planning',
        step2Desc: 'We design the structure and present mockups for your approval.',
        step3Title: 'Development',
        step3Desc: 'We develop your website and show you progress regularly.',
        step4Title: 'Revisions',
        step4Desc: 'Two rounds of adjustments included until your complete satisfaction.',
        step5Title: 'Launch',
        step5Desc: 'We publish your site and deliver all credentials.',
        step6Title: 'Support',
        step6Desc: 'Optional maintenance for continuous SEO and changes.',
        
        // Contact Section
        contactTitle: 'Let\'s talk about your project',
        contactSubtitle: 'Have an idea? Tell us and we will make it happen.',
        contactUbicacion: 'Location',
        contactEmail: 'Email',
        contactTelefono: 'Phone',
        formNombre: 'Name',
        formEmail: 'Email',
        formTelefono: 'Contact Number',
        formCodigoPostal: 'Postal Code',
        formMensaje: 'Message',
        formConsentimiento: 'I consent to the processing of my data. ',
        formLeerMas: 'Read more...',
        formEnviar: 'Send Message',
        
        // Footer
        footerTagline: 'We transform ideas into exceptional digital experiences.',
        footerServicios: 'Services',
        footerDisenoWeb: 'Web Design',
        footerDesarrolloMedida: 'Custom Development',
        footerLegal: 'Legal',
        footerAvisoLegal: 'Legal Notice',
        footerPrivacidad: 'Privacy Policy',
        footerCookies: 'Cookies',
        footerSiguenos: 'Follow Us',
        footerCopyright: '© 2026 Nouweb. All rights reserved. Made for you in Alicante and Valencia.'
    }
};

// Language System Initialization
document.addEventListener('DOMContentLoaded', () => {
    const languageModal = document.getElementById('language-modal');
    const languageOptions = document.querySelectorAll('.language-option');
    const langToggleBtn = document.querySelector('.lang-toggle-btn');
    const langDropdown = document.querySelector('.lang-dropdown');
    const langDropdownItems = document.querySelectorAll('.lang-dropdown-item');
    
    // Check if language is already set
    let currentLang = localStorage.getItem('selectedLanguage');
    
    // Show language modal if no language is selected
    if (!currentLang) {
        setTimeout(() => {
            languageModal.classList.add('active');
        }, 500);
    } else {
        // Apply saved language
        applyLanguage(currentLang);
        updateActiveLanguage(currentLang);
    }
    
    // Language option click handlers (Initial Modal)
    languageOptions.forEach(option => {
        option.addEventListener('click', () => {
            console.log('Language option clicked');
            const lang = option.getAttribute('data-lang');
            console.log('Selected language:', lang);
            if (lang) {
                setLanguage(lang);
                languageModal.classList.remove('active');
                console.log('Modal closed');
            }
        });
    });
    
    // Toggle language dropdown
    if (langToggleBtn) {
        console.log('Floating button initialized');
        langToggleBtn.addEventListener('click', (e) => {
            console.log('Floating button clicked!');
            e.stopPropagation();
            langDropdown.classList.toggle('active');
            console.log('Dropdown active:', langDropdown.classList.contains('active'));
        });
    } else {
        console.error('lang-toggle-btn not found!');
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (langDropdown && !e.target.closest('.language-switcher')) {
            langDropdown.classList.remove('active');
        }
    });
    
    // Language dropdown item click handlers
    langDropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            console.log('Dropdown item clicked');
            const lang = item.getAttribute('data-lang');
            console.log('Dropdown language selected:', lang);
            setLanguage(lang);
            langDropdown.classList.remove('active');
        });
    });
    
    // Set language function
    function setLanguage(lang) {
        console.log('setLanguage called with:', lang);
        localStorage.setItem('selectedLanguage', lang);
        currentLang = lang;
        try {
            applyLanguage(lang);
            updateActiveLanguage(lang);
            console.log('Language applied successfully');
        } catch (error) {
            console.error('Error applying language:', error);
        }
    }
    
    // Apply language translations
    function applyLanguage(lang) {
        const t = translations[lang];
        if (!t) return;
        
        // Helper function to safely set text content
        const setText = (selector, text) => {
            const el = document.querySelector(selector);
            if (el && text) el.textContent = text;
        };
        
        // Helper function to safely set HTML content
        const setHTML = (selector, html) => {
            const el = document.querySelector(selector);
            if (el && html) el.innerHTML = html;
        };
        
        // Navigation
        const navLinks = document.querySelectorAll('.nav-list li a');
        if (navLinks.length >= 7) {
            navLinks[0].textContent = t.navInicio;
            navLinks[1].textContent = t.navServicios;
            navLinks[2].textContent = t.navNosotros;
            navLinks[3].textContent = t.navCasosExito;
            navLinks[4].textContent = t.navPrecios;
            navLinks[5].textContent = t.navProceso;
            navLinks[6].textContent = t.navContacto;
        }
        
        // Login icon - only update title attribute
        const loginIcon = document.querySelector('.login-icon');
        if (loginIcon) loginIcon.setAttribute('title', t.loginTitle);
        
        // Hero Section
        setText('.hero .badge', t.badgeText);
        setHTML('.hero h1', `${t.heroTitle}<span class="text-gradient">${t.heroTitleHighlight}</span>?`);
        setText('.hero-content > p', t.heroSubtitle);
        const heroButtons = document.querySelectorAll('.hero-buttons .btn');
        if (heroButtons.length >= 2) {
            heroButtons[0].textContent = t.btnQuieroWeb;
            heroButtons[1].textContent = t.btnVerServicios;
        }
        
        // Services Section
        setText('#servicios .section-header h2', t.serviciosTitle);
        setText('#servicios .section-header p', t.serviciosSubtitle);
        
        // Service Cards
        const serviceCards = {
            'web-design': { title: t.serviceWebDesign, desc: t.serviceWebDesignDesc },
            'custom-web': { title: t.serviceCustomWeb, desc: t.serviceCustomWebDesc },
            'ecommerce': { title: t.serviceEcommerce, desc: t.serviceEcommerceDesc },
            'graphic-design': { title: t.serviceGraphicDesign, desc: t.serviceGraphicDesignDesc },
            'maintenance': { title: t.serviceMaintenance, desc: t.serviceMaintenanceDesc },
            'seo-optimization': { title: t.serviceSEO, desc: t.serviceSEODesc }
        };
        
        Object.keys(serviceCards).forEach(serviceId => {
            const card = document.querySelector(`[data-service="${serviceId}"]`);
            if (card) {
                const h3 = card.querySelector('h3');
                const p = card.querySelector('p');
                if (h3) h3.textContent = serviceCards[serviceId].title;
                if (p) p.textContent = serviceCards[serviceId].desc;
            }
        });
        
        // About Section
        setText('#nosotros h2', t.aboutTitle);
        const aboutParas = document.querySelectorAll('#nosotros .about-content p');
        if (aboutParas.length >= 3) {
            aboutParas[0].textContent = t.aboutPara1;
            aboutParas[1].textContent = t.aboutPara2;
            aboutParas[2].textContent = t.aboutPara3;
        }
        
        const featuresList = document.querySelectorAll('.features-list li');
        if (featuresList.length >= 3) {
            setHTML('.features-list li:nth-child(1)', `<i class="fas fa-check-circle"></i> ${t.featureTratoCercano}`);
            setHTML('.features-list li:nth-child(2)', `<i class="fas fa-check-circle"></i> ${t.featureResultados}`);
            setHTML('.features-list li:nth-child(3)', `<i class="fas fa-check-circle"></i> ${t.featureTecnologia}`);
        }
        
        // Success Cases Section
        setText('#casos-exito .section-header h2', t.casosExitoTitle);
        setText('#casos-exito .section-header p', t.casosExitoSubtitle);
        
        // Success Case Cards
        const caseCards = document.querySelectorAll('.case-card');
        if (caseCards.length >=  3) {
            // Case 1 - E-commerce
            const case1 = caseCards[0];
            const case1Category = case1.querySelector('.case-category');
            const case1Title = case1.querySelector('h3');
            const case1Desc = case1.querySelector('p');
            if (case1Category) case1Category.textContent = t.caseEcommerce;
            if (case1Title) case1Title.textContent = t.caseTiendaOnline;
            if (case1Desc) case1Desc.textContent = t.caseTiendaDesc;
            const case1Stats = case1.querySelectorAll('.stat span');
            if (case1Stats.length >= 2) {
                case1Stats[0].textContent = t.caseVentas;
                case1Stats[1].textContent = t.caseUsuarios;
            }
            
            // Case 2 - Web Corporativa
            const case2 = caseCards[1];
            const case2Category = case2.querySelector('.case-category');
            const case2Title = case2.querySelector('h3');
            const case2Desc = case2.querySelector('p');
            if (case2Category) case2Category.textContent = t.caseWebCorporativa;
            if (case2Title) case2Title.textContent = t.casePlataforma;
            if (case2Desc) case2Desc.textContent = t.casePlataformaDesc;
            const case2Stats = case2.querySelectorAll('.stat span');
            if (case2Stats.length >= 2) {
                case2Stats[0].textContent = t.caseTiempoCarga;
                case2Stats[1].textContent = t.caseSatisfaccion;
            }
            
            // Case 3 - Aplicación Web
            const case3 = caseCards[2];
            const case3Category = case3.querySelector('.case-category');
            const case3Title = case3.querySelector('h3');
            const case3Desc = case3.querySelector('p');
            if (case3Category) case3Category.textContent = t.caseAppWeb;
            if (case3Title) case3Title.textContent = t.caseSistemaReservas;
            if (case3Desc) case3Desc.textContent = t.caseSistemaDesc;
            const case3Stats = case3.querySelectorAll('.stat span');
            if (case3Stats.length >= 2) {
                case3Stats[0].textContent = t.caseReservas;
                case3Stats[1].textContent = t.caseDisponibilidad;
            }
        }
        
        // Testimonials
        setText('#casos-exito .testimonials-section h3', t.testimoniosTitle);
        
        // Modal Buttons
        const modalSolicitarBtn = document.querySelector('.modal-buttons .btn-primary');
        if (modalSolicitarBtn) modalSolicitarBtn.textContent = t.btnSolicitarPresupuesto;
        
        const modalSaberMasBtn = document.querySelector('.modal-buttons .btn-outline');
        if (modalSaberMasBtn) modalSaberMasBtn.textContent = t.btnSaberMas;
        
        // Pricing Section
        setText('#precios .section-header h2', t.preciosTitle);
        setText('#precios .section-header p', t.preciosSubtitle);
        
        // Process Section
        setText('#proceso .section-header h2', t.procesoTitle);
        setText('#proceso .section-header p', t.procesoSubtitle);
        
        const processSteps = document.querySelectorAll('.process-step');
        if (processSteps.length >= 6) {
            setText('.process-step:nth-child(1) h3', t.step1Title);
            setText('.process-step:nth-child(1) p', t.step1Desc);
            setText('.process-step:nth-child(2) h3', t.step2Title);
            setText('.process-step:nth-child(2) p', t.step2Desc);
            setText('.process-step:nth-child(3) h3', t.step3Title);
            setText('.process-step:nth-child(3) p', t.step3Desc);
            setText('.process-step:nth-child(4) h3', t.step4Title);
            setText('.process-step:nth-child(4) p', t.step4Desc);
            setText('.process-step:nth-child(5) h3', t.step5Title);
            setText('.process-step:nth-child(5) p', t.step5Desc);
            setText('.process-step:nth-child(6) h3', t.step6Title);
            setText('.process-step:nth-child(6) p', t.step6Desc);
        }
        
        // Contact Section
        setText('.contact-info h2', t.contactTitle);
        setText('.contact-info > p', t.contactSubtitle);
        
        const infoItems = document.querySelectorAll('.info-item h4');
        if (infoItems.length >= 3) {
            infoItems[0].textContent = t.contactUbicacion;
            infoItems[1].textContent = t.contactEmail;
            infoItems[2].textContent = t.contactTelefono;
        }
        
        // Contact Form Labels
        setText('.contact-form label[for="name"]', t.formNombre);
        setText('.contact-form label[for="email"]', t.formEmail);
        setText('.contact-form label[for="phone"]', t.formTelefono);
        setText('.contact-form label[for="postal_code"]', t.formCodigoPostal);
        setText('.contact-form label[for="message"]', t.formMensaje);
        setText('.contact-form .btn-primary', t.formEnviar);
        
        // Form Placeholders
        const nameInput = document.querySelector('input[name="name"]');
        if (nameInput) nameInput.placeholder = lang === 'es' ? 'Fernando Alonso' : (lang === 'de' ? 'Max Mustermann' : 'John Doe');
        
        const emailInput = document.querySelector('input[name="email"]');
        if (emailInput) emailInput.placeholder = lang === 'es' ? 'fernando@alonso.com' : (lang === 'de' ? 'max@mustermann.de' : 'john@doe.com');
        
        const phoneInput = document.querySelector('input[name="phone"]');
        if (phoneInput) phoneInput.placeholder = '+34 612 123 456';
        
        const postalInput = document.querySelector('input[name="postal_code"]');
        if (postalInput) postalInput.placeholder = '03000';
        
        const messageTextarea = document.querySelector('textarea[name="message"]');
        if (messageTextarea) messageTextarea.placeholder = t.formMensaje;
        
        // Consent text
        const consentSpan = document.querySelector('.consent-label span');
        if (consentSpan) {
            consentSpan.innerHTML = `${t.formConsentimiento}<a href="#" id="read-more-consent" class="consent-link">${t.formLeerMas}</a>`;
            const newReadMoreLink = document.getElementById('read-more-consent');
            if (newReadMoreLink) {
                newReadMoreLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    document.getElementById('consent-modal').classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            }
        }
        
        // Footer
        const footerCols = document.querySelectorAll('.footer-col');
        if (footerCols.length >= 4) {
            setText('.footer-col:nth-child(1) p', t.footerTagline);
            setText('.footer-col:nth-child(2) h4', t.footerServicios);
            setText('.footer-col:nth-child(3) h4', t.footerLegal);
            setText('.footer-col:nth-child(4) h4', t.footerSiguenos);
        }
        setText('.footer-bottom p', t.footerCopyright);
        
        // Modal button text
        const learnMoreBtn = document.getElementById('learn-more-btn');
        if (learnMoreBtn) {
            const modalDetails = document.getElementById('modal-details');
            if (modalDetails && !modalDetails.classList.contains('expanded')) {
                learnMoreBtn.textContent = t.btnSaberMas;
            }
        }
        
        // Language switcher aria-label
        const langToggleBtn = document.querySelector('.lang-toggle-btn');
        if (langToggleBtn) {
            const ariaLabel = lang === 'es' ? 'Cambiar idioma' : (lang === 'de' ? 'Sprache ändern' : 'Change language');
            langToggleBtn.setAttribute('aria-label', ariaLabel);
        }
        
        // Update document language attribute
        document.documentElement.lang = lang;
    }
    
    // Update active language indicator
    function updateActiveLanguage(lang) {
        langDropdownItems.forEach(item => {
            if (item.getAttribute('data-lang') === lang) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
});
