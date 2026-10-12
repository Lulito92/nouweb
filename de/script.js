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
                    window.location.href = '../es/index.html';
                } else if (selectedLang === 'de') {
                    // Already in German, just close dropdown
                    langDropdown.classList.remove('active');
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
            title: 'Webdesign und Webentwicklung',
            description: 'Wir erstellen Websites, die nicht nur visuell beeindruckend sind, sondern darauf ausgelegt, Besucher in Kunden zu verwandeln. Wir nutzen die neuesten Technologien, um Geschwindigkeit, Sicherheit und ein nahtloses Benutzererlebnis auf allen Geräten zu gewährleisten. Ihre Website wird Ihr bestes Verkaufsinstrument 24/7 sein.',
            icon: 'fa-laptop-code',
            video: '../Videos/diseñoweb.mp4',
            details: `
                <h5>Entwicklungsprozess</h5>
                <ul>
                    <li><strong>Analyse und Planung:</strong> Wir untersuchen Ihr Unternehmen, Ihre Konkurrenz und Ihre Zielgruppe, um die perfekte digitale Strategie zu definieren.</li>
                    <li><strong>UX/UI-Design:</strong> Wir erstellen Wireframes und interaktive Prototypen, die die Benutzererfahrung und Conversion priorisieren.</li>
                    <li><strong>Frontend-Entwicklung:</strong> Wir implementieren pixelgenaue Designs mit HTML5, CSS3 und modernem JavaScript und gewährleisten Cross-Browser-Kompatibilität.</li>
                    <li><strong>Backend-Entwicklung:</strong> Wir bauen die notwendige Infrastruktur mit robusten und skalierbaren Technologien auf.</li>
                    <li><strong>SEO-Optimierung:</strong> Wir implementieren die besten On-Page-SEO-Praktiken, um Ihre Sichtbarkeit in Suchmaschinen zu verbessern.</li>
                    <li><strong>Testing und QA:</strong> Wir führen umfangreiche Tests auf mehreren Geräten und Browsern durch.</li>
                    <li><strong>Launch und Schulung:</strong> Wir stellen Ihre Website online und schulen Sie, damit Sie sie autonom verwalten können.</li>
                </ul>
                
                <h5>Verwendete Technologien</h5>
                <p>HTML5, CSS3, JavaScript (ES6+), React, Vue.js, WordPress, PHP, Node.js, MySQL, PostgreSQL</p>
                
                <h5>Hauptvorteile</h5>
                <ul>
                    <li>Responsives Design angepasst für Mobilgeräte, Tablets und Desktop</li>
                    <li>Optimierte Ladegeschwindigkeit (weniger als 3 Sekunden)</li>
                    <li>SSL-Sicherheit und Schutz vor Schwachstellen</li>
                    <li>Intuitives Administrationspanel</li>
                    <li>Integration mit Google Analytics und Marketing-Tools</li>
                    <li>Support und Wartung nach dem Launch</li>
                </ul>
            `
        },
        'custom-web': {
            title: 'Maßgeschneiderte Website',
            description: 'Wenn Standardlösungen nicht ausreichen, entwickeln wir vollständig personalisierte Webplattformen. Von internen Verwaltungssystemen bis zu komplexen Anwendungen bauen wir genau das, was Ihr Unternehmen benötigt, um Prozesse zu optimieren und ohne Grenzen zu skalieren.',
            icon: 'fa-code',
            video: '../Videos/5495781-uhd_2560_1080_30fps.mp4',
            details: `
                <h5>Personalisierte Lösungen</h5>
                <ul>
                    <li><strong>Komplexe Webanwendungen:</strong> Wir entwickeln SaaS, CRM, ERP und branchenspezifische Plattformen.</li>
                    <li><strong>Unternehmensportale:</strong> Intranets, Extranets und Dokumentenverwaltungssysteme.</li>
                    <li><strong>Buchungsplattformen:</strong> Buchungssysteme für Hotels, Restaurants, Events und Dienstleistungen.</li>
                    <li><strong>Marktplätze:</strong> Multi-Vendor-Plattformen mit Verkäufer-, Produkt- und Provisionsverwaltung.</li>
                    <li><strong>Verwaltungssysteme:</strong> Maßgeschneiderte Tools zur Optimierung Ihrer internen Prozesse.</li>
                    <li><strong>APIs und Integrationen:</strong> Wir verbinden Ihre Website mit externen Systemen (CRM, ERP, Zahlungsgateways, etc.).</li>
                </ul>
                
                <h5>Arbeitsmethodik</h5>
                <p>Wir verwenden agile Methoden (Scrum) mit 2-Wochen-Sprints, inkrementellen Lieferungen und kontinuierlichem Feedback. Dies garantiert vollständige Transparenz und die Möglichkeit, das Projekt anzupassen, wenn sich Ihre Anforderungen entwickeln.</p>
                
                <h5>Technologie-Stack</h5>
                <p>React, Angular, Vue.js, Node.js, Python (Django/Flask), Ruby on Rails, .NET, MongoDB, PostgreSQL, Redis, Docker, AWS/Azure</p>
                
                <h5>Lieferumfang</h5>
                <ul>
                    <li>Dokumentierter und versionierter Quellcode</li>
                    <li>Vollständige technische Dokumentation</li>
                    <li>Benutzerhandbuch</li>
                    <li>Team-Schulung</li>
                    <li>3 Monate Garantie nach dem Launch</li>
                </ul>
            `
        },
        'ecommerce': {
            title: 'E-Commerce',
            description: 'Starten Sie Ihren Online-Shop mit allen Garantien. Wir gestalten intuitive, sichere und verkaufsoptimierte E-Commerce-Lösungen. Wir integrieren Zahlungsgateways, Bestandsverwaltung und Marketing-Tools, damit Sie Ihr Geschäft einfach verwalten und mehr verkaufen können.',
            icon: 'fa-shopping-cart',
            video: '../Videos/videoecommers.mp4',
            details: `
                <h5>Enthaltene Funktionen</h5>
                <ul>
                    <li><strong>Produktkatalog:</strong> Unbegrenzte Produktverwaltung mit Varianten, Bildern, Beschreibungen und Lagerbestand.</li>
                    <li><strong>Warenkorb:</strong> Nahtloses Einkaufserlebnis mit automatischer Berechnung von Versand und Steuern.</li>
                    <li><strong>Zahlungsgateways:</strong> Integration mit Stripe, PayPal, Redsys und anderen sicheren Plattformen.</li>
                    <li><strong>Auftragsverwaltung:</strong> Vollständiges Panel zur Bearbeitung, Rechnungsstellung und Nachverfolgung von Bestellungen.</li>
                    <li><strong>Versandsystem:</strong> Integration mit Versanddienstleistern und automatische Tarifberechnung.</li>
                    <li><strong>Gutscheine und Rabatte:</strong> Erstellen Sie Aktionen, Rabattcodes und Sonderangebote.</li>
                    <li><strong>Kundenbereich:</strong> Benutzer können ihren Verlauf einsehen, Bestellungen verfolgen und ihre Daten verwalten.</li>
                    <li><strong>Bewertungen und Rezensionen:</strong> Bewertungssystem zur Vertrauensbildung.</li>
                </ul>
                
                <h5>Verkaufsoptimierung</h5>
                <ul>
                    <li>Optimierter Ein-Schritt-Checkout</li>
                    <li>Wiederherstellung abgebrochener Warenkörbe</li>
                    <li>Empfehlungen für verwandte Produkte</li>
                    <li>Automatisiertes E-Mail-Marketing</li>
                    <li>Integration mit Google Shopping und Facebook Ads</li>
                    <li>Erweiterte Analytics für datenbasierte Entscheidungen</li>
                </ul>
                
                <h5>Verwendete Plattformen</h5>
                <p>WooCommerce, Shopify, PrestaShop, Magento oder individuelle Entwicklung nach Ihren Bedürfnissen</p>
                
                <h5>Sicherheit und Compliance</h5>
                <p>SSL-Zertifikat, DSGVO-Konformität, PCI DSS Compliance, tägliche Backups, Betrugsschutz</p>
            `
        },
        'graphic-design': {
            title: 'Grafikdesign',
            description: 'Das Image Ihrer Marke ist das Erste, was Ihre Kunden sehen. Wir entwerfen Logos, Corporate-Identity-Handbücher und Grafikmaterial, das Professionalität und Vertrauen vermittelt. Wir machen Ihre Marke unvergesslich und heben sie von der Konkurrenz ab.',
            icon: 'fa-pen-nib',
            video: '../Videos/diseñografico.mp4',
            details: `
                <h5>Grafikdesign-Dienstleistungen</h5>
                <ul>
                    <li><strong>Corporate Identity:</strong> Komplette Markenerstellung von Grund auf, einschließlich Naming, Logo und Farbpalette.</li>
                    <li><strong>Markenhandbuch:</strong> Leitfaden zur Verwendung des Logos, Schriftarten, Farben und korrekten Anwendungen.</li>
                    <li><strong>Geschäftsausstattung:</strong> Visitenkarten, Briefköpfe, Umschläge, Mappen und offizielle Dokumente.</li>
                    <li><strong>Werbematerial:</strong> Flyer, Poster, Banner, Roll-Ups und Event-Material.</li>
                    <li><strong>Social-Media-Design:</strong> Posts, Stories, Cover und visuelle Inhalte optimiert für jede Plattform.</li>
                    <li><strong>Verpackungsdesign:</strong> Design von Verpackungen und Etiketten, die am Point of Sale hervorstechen.</li>
                    <li><strong>Infografiken:</strong> Visualisierung komplexer Daten auf attraktive und verständliche Weise.</li>
                    <li><strong>Unternehmenspräsentationen:</strong> Design professioneller PowerPoint/Keynote-Präsentationen.</li>
                </ul>
                
                <h5>Kreativer Prozess</h5>
                <ul>
                    <li><strong>Briefing:</strong> Wir verstehen Ihre Vision, Werte und Zielgruppe.</li>
                    <li><strong>Recherche:</strong> Wir analysieren Ihre Konkurrenz und Branchentrends.</li>
                    <li><strong>Konzeptentwicklung:</strong> Wir entwickeln mehrere kreative Konzepte.</li>
                    <li><strong>Präsentation:</strong> Wir zeigen Ihnen 3 erste Vorschläge mit ihren Varianten.</li>
                    <li><strong>Verfeinerung:</strong> Wir passen das gewählte Design gemäß Ihrem Feedback an.</li>
                    <li><strong>Endgültige Lieferung:</strong> Dateien in allen notwendigen Formaten (AI, EPS, PDF, PNG, JPG).</li>
                </ul>
                
                <h5>Professionelle Werkzeuge</h5>
                <p>Adobe Illustrator, Photoshop, InDesign, Figma, After Effects</p>
                
                <h5>Lieferformate</h5>
                <p>Bearbeitbare Vektordateien, hochauflösende Versionen für den Druck, für das Web optimierte Versionen, Nutzungsleitfaden und Anwendungen</p>
            `
        },
        'maintenance': {
            title: 'Webwartung',
            description: 'Vergessen Sie technische Probleme. Wir kümmern uns darum, Ihre Website aktuell, sicher und perfekt funktionierend zu halten. Wir erstellen Backups, aktualisieren Plugins und überwachen konstant, damit Sie sich nur um Ihr Geschäft kümmern müssen.',
            icon: 'fa-tools',
            video: '../Videos/mantenimientoweb.mp4',
            details: `
                <h5>Enthaltene Wartungsdienste</h5>
                <ul>
                    <li><strong>Sicherheitsupdates:</strong> Sofortige Installation kritischer Sicherheitspatches.</li>
                    <li><strong>CMS-Updates:</strong> Wir halten WordPress, Plugins und Themes immer auf dem neuesten Stand.</li>
                    <li><strong>Backups:</strong> Automatische tägliche Backups mit Cloud-Speicherung.</li>
                    <li><strong>24/7-Überwachung:</strong> Konstante Überwachung der Verfügbarkeit und Leistung Ihrer Website.</li>
                    <li><strong>Geschwindigkeitsoptimierung:</strong> Kontinuierliche Verbesserungen zur Aufrechterhaltung optimaler Ladezeiten.</li>
                    <li><strong>Fehlerbehebung:</strong> Schnelle Lösung von Bugs und technischen Problemen.</li>
                    <li><strong>Technischer Support:</strong> Prioritätsunterstützung per E-Mail, Telefon oder Chat.</li>
                    <li><strong>Monatliche Berichte:</strong> Detaillierte Berichte über Aktivität, Leistung und Sicherheit.</li>
                </ul>
                
                <h5>Wartungspläne</h5>
                <ul>
                    <li><strong>Basisplan:</strong> Monatliche Updates, wöchentliche Backups, E-Mail-Support (Antwort in 48h)</li>
                    <li><strong>Professioneller Plan:</strong> Wöchentliche Updates, tägliche Backups, Prioritäts-Support (Antwort in 24h), monatliche Optimierung</li>
                    <li><strong>Premium-Plan:</strong> Sofortige Updates, tägliche Backups, 24/7-Support, kontinuierliche Optimierung, Inhaltsänderungen inbegriffen</li>
                </ul>
                
                <h5>Proaktive Sicherheit</h5>
                <ul>
                    <li>Web Application Firewall (WAF)</li>
                    <li>Wöchentlicher Malware-Scan</li>
                    <li>Schutz vor DDoS-Angriffen</li>
                    <li>Automatisch erneuerte SSL-Zertifikate</li>
                    <li>WordPress-Hardening und sichere Konfiguration</li>
                </ul>
                
                <h5>Garantien</h5>
                <p>Garantierte Reaktionszeit je nach Plan, Backup-Wiederherstellung in weniger als 4 Stunden, 99,9% Verfügbarkeit, keine Mindestlaufzeit (jederzeit kündbar)</p>
            `
        },
        'seo-optimization': {
            title: 'SEO-Optimierung',
            description: 'Haben Sie bereits eine Website, erscheinen aber nicht bei Google? Wir analysieren und optimieren Ihre bestehende Website, um ihre Suchmaschinenposition zu verbessern, den organischen Traffic zu erhöhen und mehr potenzielle Kunden anzuziehen. Sie brauchen keine neue Website, wir verbessern die, die Sie bereits haben.',
            icon: 'fa-search',
            video: '../Videos/seo.mp4',
            details: `
                <h5>SEO-Optimierungsprozess</h5>
                <ul>
                    <li><strong>Vollständiges SEO-Audit:</strong> Umfassende Analyse Ihrer aktuellen Website zur Identifizierung technischer Probleme, Fehler und Verbesserungsmöglichkeiten.</li>
                    <li><strong>Keyword-Analyse:</strong> Recherche der Suchanfragen Ihrer Zielgruppe und Auswahl strategischer Keywords.</li>
                    <li><strong>Wettbewerbsanalyse:</strong> Wir untersuchen, was Ihre besser platzierten Konkurrenten tun, um ihre Strategie zu übertreffen.</li>
                    <li><strong>Technische Optimierung:</strong> Wir verbessern Ladegeschwindigkeit, URL-Struktur, Meta-Tags, Schema-Markup und XML-Sitemap.</li>
                    <li><strong>On-Page-Optimierung:</strong> Wir passen Titel, Beschreibungen, Überschriften, Inhalte und interne Struktur jeder Seite an.</li>
                    <li><strong>Content-Optimierung:</strong> Wir verbessern bestehende Texte und erstellen neue, für das Ranking optimierte Inhalte.</li>
                    <li><strong>Interner Linkaufbau:</strong> Wir optimieren die interne Linkstruktur, um die Autorität wichtiger Seiten zu verbessern.</li>
                    <li><strong>Mobile-Optimierung:</strong> Wir stellen sicher, dass Ihre Website vollständig responsive ist und die Core Web Vitals erfüllt.</li>
                </ul>
                
                <h5>Inbegriffenes technisches SEO</h5>
                <ul>
                    <li>Optimierung der Ladegeschwindigkeit (PageSpeed, GTmetrix)</li>
                    <li>Korrektur von 404-Fehlern und Weiterleitungen</li>
                    <li>Implementierung strukturierter Daten (Schema.org)</li>
                    <li>Bildoptimierung (Komprimierung, Lazy Loading, Alt-Tags)</li>
                    <li>Konfiguration von Google Search Console und Analytics</li>
                    <li>Optimierte robots.txt und XML-Sitemap</li>
                    <li>SSL-Zertifikat und HTTPS-Migration falls erforderlich</li>
                    <li>Korrektur doppelter Inhalte</li>
                </ul>
                
                <h5>Content-SEO</h5>
                <ul>
                    <li>Optimierung von Meta-Titeln und -Beschreibungen</li>
                    <li>Korrekte Strukturierung von Überschriften (H1, H2, H3)</li>
                    <li>Optimale Keyword-Dichte</li>
                    <li>Erstellung SEO-freundlicher Inhalte</li>
                    <li>Optimierung von Alternativtexten für Bilder</li>
                    <li>Verbesserung der Lesbarkeit und Benutzererfahrung</li>
                </ul>
                
                <h5>Tracking und Berichte</h5>
                <ul>
                    <li>Erster Bericht mit erkannten Problemen und Aktionsplan</li>
                    <li>Monatliche Berichte über Rankings und organischen Traffic</li>
                    <li>Tracking von Ziel-Keywords bei Google</li>
                    <li>Kontinuierliche Wettbewerbsanalyse</li>
                    <li>Monatliche Verbesserungsempfehlungen</li>
                    <li>Zugang zu Echtzeit-Metrik-Dashboard</li>
                </ul>
                
                <h5>Erwartete Ergebnisse</h5>
                <p>Verbesserung der Google-Position (erste Seiten in 3-6 Monaten), Erhöhung des qualifizierten organischen Traffics, größere Markensichtbarkeit, Steigerung von Conversions und Leads, bessere Benutzererfahrung und Web-Performance</p>
                
                <h5>Investition</h5>
                <p>Monatliche Pläne ab 299€/Monat je nach Größe und Komplexität der Website. Inkl. kontinuierlicher Optimierung und Support. Keine Mindestlaufzeit.</p>
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
