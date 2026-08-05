document.addEventListener("DOMContentLoaded", () => {

    /* ==================================================
       MENÚ DE NAVEGACIÓN
    ================================================== */

    const menuButton = document.getElementById("menuButton");
    const navbarMenu = document.getElementById("navbarMenu");
    const menuLinks = navbarMenu?.querySelectorAll("a");

    function abrirMenu() {
        if (!menuButton || !navbarMenu) {
            return;
        }

        menuButton.classList.add("active");
        navbarMenu.classList.add("active");
        document.body.classList.add("menu-open");

        menuButton.setAttribute("aria-expanded", "true");
        menuButton.setAttribute(
            "aria-label",
            "Cerrar menú de navegación"
        );
    }

    function cerrarMenu() {
        if (!menuButton || !navbarMenu) {
            return;
        }

        menuButton.classList.remove("active");
        navbarMenu.classList.remove("active");
        document.body.classList.remove("menu-open");

        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute(
            "aria-label",
            "Abrir menú de navegación"
        );
    }

    function alternarMenu() {
        if (!navbarMenu) {
            return;
        }

        const menuEstaAbierto =
            navbarMenu.classList.contains("active");

        if (menuEstaAbierto) {
            cerrarMenu();
        } else {
            abrirMenu();
        }
    }

    if (menuButton && navbarMenu) {
        menuButton.addEventListener("click", alternarMenu);

        menuLinks?.forEach((link) => {
            link.addEventListener("click", cerrarMenu);
        });

        document.addEventListener("click", (event) => {
            if (!(event.target instanceof Node)) {
                return;
            }

            const menuEstaAbierto =
                navbarMenu.classList.contains("active");

            const clicDentroDelMenu =
                navbarMenu.contains(event.target);

            const clicEnElBoton =
                menuButton.contains(event.target);

            if (
                menuEstaAbierto &&
                !clicDentroDelMenu &&
                !clicEnElBoton
            ) {
                cerrarMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 900) {
                cerrarMenu();
            }
        });
    } else {
        console.warn(
            "No se encontró el botón o el menú de navegación."
        );
    }


    /* ==================================================
       CARRUSEL DE LA PORTADA
    ================================================== */

    const heroSlides = document.querySelectorAll(".hero-slide");
    const heroDots = document.querySelectorAll(".hero-dot");

    const heroBrowserBody = document.querySelector(
        ".hero__browser-body"
    );

    const heroSidebar = document.querySelector(
        ".hero__browser-sidebar"
    );

    if (heroSlides.length > 0 && heroDots.length > 0) {
        let currentHeroSlide = 0;
        let heroInterval = null;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        function showHeroSlide(index) {
            const normalizedIndex =
                ((index % heroSlides.length) +
                    heroSlides.length) %
                heroSlides.length;

            heroSlides.forEach((slide, slideIndex) => {
                slide.classList.toggle(
                    "active",
                    slideIndex === normalizedIndex
                );
            });

            heroDots.forEach((dot, dotIndex) => {
                const dotIsActive =
                    dotIndex === normalizedIndex;

                dot.classList.toggle(
                    "active",
                    dotIsActive
                );

                dot.setAttribute(
                    "aria-current",
                    dotIsActive ? "true" : "false"
                );
            });

            /*
             * El menú lateral de la mini página
             * aparece solamente en la primera diapositiva.
             */
            const mostrarMenuLateral =
                normalizedIndex === 0;

            heroBrowserBody?.classList.toggle(
                "has-sidebar",
                mostrarMenuLateral
            );

            heroSidebar?.setAttribute(
                "aria-hidden",
                String(!mostrarMenuLateral)
            );

            currentHeroSlide = normalizedIndex;
        }

        function nextHeroSlide() {
            showHeroSlide(currentHeroSlide + 1);
        }

        function stopHeroSlider() {
            if (heroInterval !== null) {
                clearInterval(heroInterval);
                heroInterval = null;
            }
        }

        function startHeroSlider() {
            stopHeroSlider();

            if (prefersReducedMotion) {
                return;
            }

            heroInterval = window.setInterval(
                nextHeroSlide,
                3500
            );
        }

        function resetHeroSlider() {
            startHeroSlider();
        }

        heroDots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                showHeroSlide(index);
                resetHeroSlider();
            });
        });

        /*
         * Detiene temporalmente el carrusel cuando
         * la pestaña del navegador no está visible.
         */
        document.addEventListener(
            "visibilitychange",
            () => {
                if (document.hidden) {
                    stopHeroSlider();
                } else {
                    startHeroSlider();
                }
            }
        );

        showHeroSlide(0);
        startHeroSlider();
    }


    /* ==================================================
       ANIMACIONES AL DESPLAZARSE
    ================================================== */

    const revealConfiguration = [
        {
            selector: `
                .about__content,
                .services__header,
                .portfolio__header,
                .process__header,
                .contact__header
            `,
            animationClass: "reveal-left"
        },
        {
            selector: `
                .about__details,
                .services__audience,
                .services__message,
                .portfolio__notice,
                .process__support,
                .contact__cta
            `,
            animationClass: "reveal-right"
        },
        {
            selector: `
                .service-card,
                .project-card,
                .process-step,
                .contact-card
            `,
            animationClass: "reveal-up"
        }
    ];

    const revealElements = [];

    revealConfiguration.forEach((configuration) => {
        const elements = document.querySelectorAll(
            configuration.selector
        );

        elements.forEach((element) => {
            element.classList.add(
                "reveal-item",
                configuration.animationClass
            );

            revealElements.push(element);
        });
    });

    /*
     * Las tarjetas aparecen con una pequeña
     * diferencia de tiempo entre ellas.
     */
    const staggeredContainers =
        document.querySelectorAll(`
            .services__grid,
            .portfolio__grid,
            .process__steps,
            .contact__grid
        `);

    staggeredContainers.forEach((container) => {
        const cards = container.querySelectorAll(
            ":scope > article"
        );

        cards.forEach((card, index) => {
            const positionInRow = index % 3;
            const delay = positionInRow * 90;

            card.style.setProperty(
                "--reveal-delay",
                `${delay}ms`
            );
        });
    });

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    const element = entry.target;

                    element.classList.add("is-visible");

                    element.addEventListener(
                        "transitionend",
                        () => {
                            element.classList.add(
                                "reveal-finished"
                            );
                        },
                        { once: true }
                    );

                    observer.unobserve(element);
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -55px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        /*
         * Alternativa para navegadores antiguos.
         */
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    }


    /* ==================================================
       INFORMACIÓN DE LOS PROYECTOS
    ================================================== */

    const projectData = {
        ingpro: {
            title: "INGPRO",
            category: "Sitio corporativo real",
            status: "Publicado con dominio propio",

            description:
                "Sitio web corporativo desarrollado para presentar las distintas áreas, servicios, cursos y soluciones industriales de INGPRO.",

            solution:
                "Se organizó una empresa con múltiples líneas de trabajo dentro de una experiencia digital coherente, incorporando páginas especializadas, contenido multimedia, catálogo y contacto directo.",

            technologies: [
                "HTML",
                "CSS",
                "JavaScript",
                "Diseño responsivo",
                "Carruseles",
                "Videos",
                "Catálogo PDF"
            ],

            url: "https://ingpro.cl",
            linkText: "Visitar INGPRO"
        },

        "el-chinito": {
            title: "Minimarket El Chinito",
            category: "Comercio local",
            status: "Proyecto para cliente · versión local",

            description:
                "Página web creada para presentar y organizar los productos y servicios de un minimarket de barrio.",

            solution:
                "El proyecto incorpora categorías, carrito, favoritos, ubicación, horarios, Caja Vecina y solicitud de pedidos, facilitando la navegación desde celulares.",

            technologies: [
                "HTML",
                "CSS",
                "JavaScript",
                "JSON",
                "Carrito",
                "Favoritos",
                "Netlify Forms",
                "Mapa"
            ]
        },

        "onevet-store": {
            title: "OneVet Store",
            category: "Educación veterinaria",
            status: "Proyecto académico",

            description:
                "Tienda web educativa orientada a productos, servicios y contenido relacionado con medicina veterinaria y prevención.",

            solution:
                "El proyecto une desarrollo web y medicina veterinaria mediante categorías, productos, favoritos, carrito e información educativa sobre salud animal.",

            technologies: [
                "HTML",
                "CSS",
                "JavaScript",
                "Carrito",
                "Favoritos",
                "Contenido educativo"
            ]
        },

        "onevet-api": {
            title: "OneVet API",
            category: "Backend y API REST",
            status: "Proyecto académico Full Stack",

            description:
                "Aplicación desarrollada con Java y Spring Boot para consultar y administrar información de productos veterinarios.",

            solution:
                "Se construyó una API REST conectada a una base de datos H2 y una interfaz web que consume sus datos mediante JavaScript.",

            technologies: [
                "Java",
                "Spring Boot",
                "API REST",
                "H2",
                "Fetch",
                "Maven"
            ]
        },

        "java-apps": {
            title: "Aplicaciones Java",
            category: "Programación y lógica",
            status: "Proyectos académicos",

            description:
                "Conjunto de aplicaciones de consola y escritorio desarrolladas durante la formación Java Full Stack.",

            solution:
                "Los proyectos aplican programación orientada a objetos, clases, herencia, polimorfismo, colecciones, excepciones y organización modular.",

            technologies: [
                "Java",
                "POO",
                "Herencia",
                "Polimorfismo",
                "Colecciones",
                "Excepciones",
                "Swing"
            ]
        }
    };


    /* ==================================================
       MODAL DE PROYECTOS
    ================================================== */

    const projectModal =
        document.getElementById("projectModal");

    const projectModalClose =
        projectModal?.querySelector(
            ".project-modal__close"
        );

    const projectModalTitle =
        document.getElementById(
            "projectModalTitle"
        );

    const projectModalVisualTitle =
        document.getElementById(
            "projectModalVisualTitle"
        );

    const projectModalCategory =
        document.getElementById(
            "projectModalCategory"
        );

    const projectModalStatus =
        document.getElementById(
            "projectModalStatus"
        );

    const projectModalDescription =
        document.getElementById(
            "projectModalDescription"
        );

    const projectModalSolution =
        document.getElementById(
            "projectModalSolution"
        );

    const projectModalTechnologies =
        document.getElementById(
            "projectModalTechnologies"
        );

    const projectModalLink =
        document.getElementById(
            "projectModalLink"
        );

    const projectDetailButtons =
        document.querySelectorAll(
            ".project-details-button"
        );

    let lastFocusedElement = null;

    function openProjectModal(projectId) {
        const project = projectData[projectId];

        if (
            !project ||
            !projectModal ||
            !projectModalTitle ||
            !projectModalVisualTitle ||
            !projectModalCategory ||
            !projectModalStatus ||
            !projectModalDescription ||
            !projectModalSolution ||
            !projectModalTechnologies ||
            !projectModalLink
        ) {
            return;
        }

        cerrarMenu();

        lastFocusedElement = document.activeElement;

        projectModalTitle.textContent =
            project.title;

        projectModalVisualTitle.textContent =
            project.title;

        projectModalCategory.textContent =
            project.category;

        projectModalStatus.textContent =
            project.status;

        projectModalDescription.textContent =
            project.description;

        projectModalSolution.textContent =
            project.solution;

        projectModalTechnologies.innerHTML =
            project.technologies
                .map((technology) => {
                    return `<span>${technology}</span>`;
                })
                .join("");

        if (project.url) {
            projectModalLink.href = project.url;

            projectModalLink.textContent =
                project.linkText ||
                "Visitar proyecto";

            projectModalLink.hidden = false;
        } else {
            projectModalLink.hidden = true;
            projectModalLink.removeAttribute("href");
        }

        projectModal.classList.add("active");

        projectModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add("modal-open");

        projectModalClose?.focus();
    }

    function closeProjectModal() {
        if (!projectModal) {
            return;
        }

        projectModal.classList.remove("active");

        projectModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );

        if (
            lastFocusedElement instanceof HTMLElement
        ) {
            lastFocusedElement.focus();
        }
    }

    projectDetailButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const projectId =
                button.dataset.project;

            if (projectId) {
                openProjectModal(projectId);
            }
        });
    });

    projectModal?.addEventListener(
        "click",
        (event) => {
            if (!(event.target instanceof Element)) {
                return;
            }

            const closeElement =
                event.target.closest(
                    "[data-close-modal]"
                );

            if (closeElement) {
                closeProjectModal();
            }
        }
    );


    /* ==================================================
       TECLA ESCAPE
    ================================================== */

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") {
            return;
        }

        if (
            projectModal?.classList.contains(
                "active"
            )
        ) {
            closeProjectModal();
            return;
        }

        if (
            navbarMenu?.classList.contains(
                "active"
            )
        ) {
            cerrarMenu();
        }
    });

});