document.addEventListener("DOMContentLoaded", () => {

    /* ==================================================
       RUTA DE RECURSOS

       Permite utilizar este archivo desde:
       - index.html
       - pages/portafolio.html
    ================================================== */

    const assetsPath =
        window.location.pathname.includes("/pages/")
            ? "../assets"
            : "assets";


    /* ==================================================
       INFORMACIÓN DE LOS PROYECTOS
    ================================================== */

    const projectData = {

        ingpro: {
            category: "Proyecto corporativo publicado",
            title: "INGPRO",

            description:
                "Sitio corporativo multipágina desarrollado para presentar servicios de corte CNC y plasma, grabado láser, impresión 3D, CNC Router, equipos industriales, cursos, catálogo digital y canales de cotización.",

            technologies: [
                "HTML",
                "CSS",
                "JavaScript",
                "Diseño responsivo",
                "Netlify",
                "Dominio propio"
            ],

            url: "https://ingpro.cl"
        },


        "el-chinito": {
            category: "Proyecto para cliente",
            title: "Minimarket El Chinito",

            description:
                "Página web desarrollada para organizar y presentar los productos de un minimarket. Incorpora categorías, carrito de compras, favoritos, ubicación, horarios, Caja Vecina y preparación de pedidos para retiro presencial.",

            technologies: [
                "HTML",
                "CSS",
                "JavaScript",
                "JSON",
                "Netlify Forms",
                "Diseño responsivo"
            ],

            url: ""
        },


        "killerr-store": {
            category: "Proyecto para clienta",
            title: "Killerr Store",

            description:
                "Tienda web de estilo dark y rosado para presentar ropa, calzado, accesorios, bordados y confecciones propias. Incluye catálogo visual, carruseles y consultas directas mediante Instagram.",

            technologies: [
                "HTML",
                "CSS",
                "JavaScript",
                "Carruseles",
                "Instagram",
                "Diseño responsivo"
            ],

            url: ""
        },


        "onevet-store": {
            category: "Proyecto académico",
            title: "OneVet Store",

            description:
                "Tienda web educativa que combina programación y medicina veterinaria. Presenta productos, servicios, contenido sobre salud animal, prevención de zoonosis, carrito y favoritos.",

            technologies: [
                "HTML",
                "CSS",
                "JavaScript",
                "Carrito",
                "Favoritos",
                "Medicina veterinaria"
            ],

            url: ""
        },


        "onevet-api": {
            category: "Proyecto Java Full Stack",
            title: "OneVet API",

            description:
                "Aplicación desarrollada con Java y Spring Boot para administrar productos veterinarios mediante una API REST conectada a una base de datos H2 y consumida desde una interfaz web.",

            technologies: [
                "Java",
                "Spring Boot",
                "API REST",
                "H2",
                "Fetch",
                "Arquitectura por capas"
            ],

            url: ""
        },


        "java-apps": {
            category: "Formación Java Full Stack",
            title: "Sistemas y aplicaciones Java",

            description:
                "Conjunto de aplicaciones desarrolladas para aplicar programación orientada a objetos, encapsulación, herencia, polimorfismo, colecciones, manejo de excepciones, interfaces gráficas y organización del código.",

            technologies: [
                "Java",
                "POO",
                "Herencia",
                "Polimorfismo",
                "Colecciones",
                "Swing"
            ],

            url: ""
        }

    };


    /* ==================================================
       GALERÍAS DE CAPTURAS
    ================================================== */

    const projectGalleries = {

        ingpro: [
            {
                src:
                    `${assetsPath}/img/proyectos/ingpro/ingpro-portada.png`,

                alt:
                    "Portada corporativa del sitio web de INGPRO",

                caption:
                    "Portada corporativa con carrusel, servicios principales y acceso directo a cotización."
            },

            {
                src:
                    `${assetsPath}/img/proyectos/ingpro/ingpro-catalogo.png`,

                alt:
                    "Visor del catálogo digital de INGPRO",

                caption:
                    "Visor en línea del catálogo INGPRO 2026, con navegación, zoom y descarga."
            },

            {
                src:
                    `${assetsPath}/img/proyectos/ingpro/ingpro-formulario.png`,

                alt:
                    "Formulario de cotización del sitio INGPRO",

                caption:
                    "Formulario organizado para reunir los antecedentes necesarios y evaluar cada requerimiento."
            },

            {
                src:
                    `${assetsPath}/img/proyectos/ingpro/ingpro-impresion-3d.png`,

                alt:
                    "Carrusel de trabajos de impresión 3D de INGPRO",

                caption:
                    "Carrusel visual utilizado para presentar proyectos reales de impresión 3D."
            },

            {
                src:
                    `${assetsPath}/img/proyectos/ingpro/ingpro-trabajos-metal.png`,

                alt:
                    "Galería de trabajos metálicos desarrollados por INGPRO",

                caption:
                    "Galería de proyectos realizados en metal mediante corte CNC y plasma."
            },

            {
                src:
                    `${assetsPath}/img/proyectos/ingpro/ingpro-cnc-router.png`,

                alt:
                    "Proyectos desarrollados con CNC Router",

                caption:
                    "Presentación de trabajos desarrollados en madera, MDF y otros materiales mecanizables."
            },

            {
                src:
                    `${assetsPath}/img/proyectos/ingpro/ingpro-vista-movil.png`,

                alt:
                    "Vista responsiva para celular del sitio INGPRO",

                caption:
                    "Versión responsiva desde celular, con menú móvil y contenido adaptado."
            }
        ]

    };


    /* ==================================================
       ELEMENTOS DEL MODAL
    ================================================== */

    const projectModal =
        document.getElementById("projectModal");

    const projectModalTitle =
        document.getElementById("projectModalTitle");

    const projectModalCategory =
        document.getElementById("projectModalCategory");

    const projectModalDescription =
        document.getElementById("projectModalDescription");

    const projectModalTechnologies =
        document.getElementById(
            "projectModalTechnologies"
        );

    const projectModalLink =
        document.getElementById("projectModalLink");

    const projectModalClose =
        document.getElementById("projectModalClose");

    const projectButtons =
        document.querySelectorAll(
            ".project-details-button"
        );

    const modalCloseElements =
        document.querySelectorAll(
            "[data-modal-close]"
        );


    /* ==================================================
       ELEMENTOS DE LA GALERÍA
    ================================================== */

    const projectGallery =
        document.getElementById("projectGallery");

    const projectGalleryViewport =
        projectGallery?.querySelector(
            ".project-gallery__viewport"
        );

    const projectModalMockup =
        document.getElementById(
            "projectModalMockup"
        );

    const projectGalleryImage =
        document.getElementById(
            "projectGalleryImage"
        );

    const projectGalleryCaption =
        document.getElementById(
            "projectGalleryCaption"
        );

    const projectGalleryCounter =
        document.getElementById(
            "projectGalleryCounter"
        );

    const projectGalleryDots =
        document.getElementById(
            "projectGalleryDots"
        );

    const previousButton =
        document.querySelector(
            "[data-gallery-previous]"
        );

    const nextButton =
        document.querySelector(
            "[data-gallery-next]"
        );


    /* ==================================================
       VARIABLES DE CONTROL
    ================================================== */

    let currentImages = [];
    let currentImageIndex = 0;
    let galleryInterval = null;
    let pointerStartX = 0;
    let lastFocusedElement = null;

    const autoplayTime = 4500;

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    /* ==================================================
       COMPROBAR QUE EL HTML ESTÉ COMPLETO
    ================================================== */

    if (
        !projectModal ||
        !projectModalTitle ||
        !projectModalCategory ||
        !projectModalDescription ||
        !projectModalTechnologies
    ) {
        console.error(
            "No se encontraron todos los elementos del modal de proyectos."
        );

        return;
    }


    /* ==================================================
       COMPROBAR SI EL MODAL ESTÁ ABIERTO
    ================================================== */

    function modalIsOpen() {

        return (
            projectModal.classList.contains(
                "active"
            ) ||
            projectModal.classList.contains(
                "open"
            ) ||
            projectModal.classList.contains(
                "is-open"
            ) ||
            projectModal.getAttribute(
                "aria-hidden"
            ) === "false"
        );

    }


    /* ==================================================
       DETENER CARRUSEL AUTOMÁTICO
    ================================================== */

    function stopGalleryAutoplay() {

        if (galleryInterval !== null) {

            window.clearInterval(
                galleryInterval
            );

            galleryInterval = null;

        }

    }


    /* ==================================================
       INICIAR CARRUSEL AUTOMÁTICO
    ================================================== */

    function startGalleryAutoplay() {

        stopGalleryAutoplay();

        const galleryIsVisible =
            projectGallery &&
            !projectGallery.hidden;

        if (
            prefersReducedMotion ||
            !modalIsOpen() ||
            !galleryIsVisible ||
            currentImages.length < 2
        ) {
            return;
        }

        galleryInterval =
            window.setInterval(() => {

                showGalleryImage(
                    currentImageIndex + 1
                );

            }, autoplayTime);

    }


    /* ==================================================
       MOSTRAR UNA CAPTURA
    ================================================== */

    function showGalleryImage(index) {

        if (
            currentImages.length === 0 ||
            !projectGalleryImage ||
            !projectGalleryCaption ||
            !projectGalleryCounter
        ) {
            return;
        }

        currentImageIndex =
            (
                (
                    index %
                    currentImages.length
                ) +
                currentImages.length
            ) %
            currentImages.length;

        const selectedImage =
            currentImages[
                currentImageIndex
            ];

        projectGalleryImage.style.opacity =
            "0";

        window.setTimeout(() => {

            projectGalleryImage.src =
                selectedImage.src;

            projectGalleryImage.alt =
                selectedImage.alt;

            projectGalleryCaption.textContent =
                selectedImage.caption;

            projectGalleryCounter.textContent =
                `${currentImageIndex + 1} / ${currentImages.length}`;

            projectGalleryImage.style.opacity =
                "1";

        }, 120);


        const dots =
            projectGalleryDots?.querySelectorAll(
                ".project-gallery__dot"
            );

        dots?.forEach(
            (dot, dotIndex) => {

                const isActive =
                    dotIndex ===
                    currentImageIndex;

                dot.classList.toggle(
                    "active",
                    isActive
                );

                dot.setAttribute(
                    "aria-current",
                    isActive
                        ? "true"
                        : "false"
                );

            }
        );

    }


    /* ==================================================
       CREAR PUNTOS DE LA GALERÍA
    ================================================== */

    function renderGalleryDots() {

        if (!projectGalleryDots) {
            return;
        }

        projectGalleryDots.innerHTML = "";

        currentImages.forEach(
            (image, index) => {

                const dot =
                    document.createElement(
                        "button"
                    );

                dot.type = "button";

                dot.className =
                    "project-gallery__dot";

                dot.setAttribute(
                    "aria-label",
                    `Mostrar captura ${index + 1}: ${image.alt}`
                );

                dot.addEventListener(
                    "click",
                    () => {

                        showGalleryImage(
                            index
                        );

                        startGalleryAutoplay();

                    }
                );

                projectGalleryDots.appendChild(
                    dot
                );

            }
        );

    }


    /* ==================================================
       LIMPIAR GALERÍA
    ================================================== */

    function clearProjectGallery() {

        stopGalleryAutoplay();

        currentImages = [];
        currentImageIndex = 0;

        if (projectGallery) {
            projectGallery.hidden = true;
        }

        if (projectModalMockup) {
            projectModalMockup.hidden = false;
        }

        if (projectGalleryImage) {

            projectGalleryImage.removeAttribute(
                "src"
            );

            projectGalleryImage.alt = "";

        }

        if (projectGalleryCaption) {
            projectGalleryCaption.textContent =
                "";
        }

        if (projectGalleryCounter) {
            projectGalleryCounter.textContent =
                "";
        }

        if (projectGalleryDots) {
            projectGalleryDots.innerHTML = "";
        }

    }


    /* ==================================================
       CARGAR GALERÍA DEL PROYECTO
    ================================================== */

    function loadProjectGallery(projectId) {

        stopGalleryAutoplay();

        currentImages =
            projectGalleries[projectId] || [];

        currentImageIndex = 0;

        if (currentImages.length === 0) {

            clearProjectGallery();
            return;

        }

        if (projectGallery) {
            projectGallery.hidden = false;
        }

        if (projectModalMockup) {
            projectModalMockup.hidden = true;
        }

        renderGalleryDots();
        showGalleryImage(0);

    }


    /* ==================================================
       COMPLETAR INFORMACIÓN DEL MODAL
    ================================================== */

    function renderProjectInformation(
        projectId
    ) {

        const selectedProject =
            projectData[projectId];

        if (!selectedProject) {

            console.error(
                `No existe información para el proyecto: ${projectId}`
            );

            return false;

        }

        projectModalCategory.textContent =
            selectedProject.category;

        projectModalTitle.textContent =
            selectedProject.title;

        projectModalDescription.textContent =
            selectedProject.description;

        projectModalTechnologies.innerHTML =
            "";

        selectedProject.technologies.forEach(
            (technology) => {

                const technologyElement =
                    document.createElement(
                        "span"
                    );

                technologyElement.textContent =
                    technology;

                projectModalTechnologies.appendChild(
                    technologyElement
                );

            }
        );


        if (
            projectModalLink &&
            selectedProject.url
        ) {

            projectModalLink.href =
                selectedProject.url;

            projectModalLink.hidden = false;

        } else if (projectModalLink) {

            projectModalLink.hidden = true;

            projectModalLink.removeAttribute(
                "href"
            );

        }

        return true;

    }


    /* ==================================================
       ABRIR MODAL
    ================================================== */

    function openProjectModal(projectId) {

        const projectExists =
            renderProjectInformation(
                projectId
            );

        if (!projectExists) {
            return;
        }

        lastFocusedElement =
            document.activeElement instanceof
            HTMLElement
                ? document.activeElement
                : null;

        loadProjectGallery(projectId);

        projectModal.hidden = false;

        projectModal.setAttribute(
            "aria-hidden",
            "false"
        );

        /*
         * Se agregan las tres clases para que funcione
         * aunque el CSS anterior use un nombre distinto.
         */

        projectModal.classList.add(
            "active",
            "open",
            "is-open"
        );

        document.body.classList.add(
            "modal-open"
        );

        document.body.style.overflow =
            "hidden";

        window.setTimeout(() => {

            projectModalClose?.focus();

            startGalleryAutoplay();

        }, 250);

    }


    /* ==================================================
       CERRAR MODAL
    ================================================== */

    function closeProjectModal() {

        stopGalleryAutoplay();

        projectModal.classList.remove(
            "active",
            "open",
            "is-open"
        );

        projectModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );

        document.body.style.overflow = "";

        window.setTimeout(() => {

            lastFocusedElement?.focus();

        }, 150);

    }


    /* ==================================================
       ABRIR DESDE LOS BOTONES
    ================================================== */

    projectButtons.forEach((button) => {

        button.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                const projectId =
                    button.dataset.project;

                if (!projectId) {

                    console.error(
                        "El botón no tiene data-project."
                    );

                    return;

                }

                openProjectModal(
                    projectId
                );

            }
        );

    });


    /* ==================================================
       CERRAR CON BOTÓN Y FONDO
    ================================================== */

    modalCloseElements.forEach(
        (closeElement) => {

            closeElement.addEventListener(
                "click",
                closeProjectModal
            );

        }
    );


    /* ==================================================
       FLECHA ANTERIOR
    ================================================== */

    previousButton?.addEventListener(
        "click",
        () => {

            showGalleryImage(
                currentImageIndex - 1
            );

            startGalleryAutoplay();

        }
    );


    /* ==================================================
       FLECHA SIGUIENTE
    ================================================== */

    nextButton?.addEventListener(
        "click",
        () => {

            showGalleryImage(
                currentImageIndex + 1
            );

            startGalleryAutoplay();

        }
    );


    /* ==================================================
       PAUSAR CON EL CURSOR
    ================================================== */

    projectGalleryViewport?.addEventListener(
        "mouseenter",
        stopGalleryAutoplay
    );

    projectGalleryViewport?.addEventListener(
        "mouseleave",
        startGalleryAutoplay
    );


    /* ==================================================
       DESLIZAR EN PANTALLA TÁCTIL
    ================================================== */

    projectGalleryImage?.addEventListener(
        "pointerdown",
        (event) => {

            pointerStartX =
                event.clientX;

            stopGalleryAutoplay();

        }
    );

    projectGalleryImage?.addEventListener(
        "pointerup",
        (event) => {

            const difference =
                event.clientX -
                pointerStartX;

            if (
                Math.abs(difference) >= 45
            ) {

                if (difference > 0) {

                    showGalleryImage(
                        currentImageIndex - 1
                    );

                } else {

                    showGalleryImage(
                        currentImageIndex + 1
                    );

                }

            }

            startGalleryAutoplay();

        }
    );

    projectGalleryImage?.addEventListener(
        "dragstart",
        (event) => {

            event.preventDefault();

        }
    );


    /* ==================================================
       CONTROL CON TECLADO
    ================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (!modalIsOpen()) {
                return;
            }

            if (event.key === "Escape") {

                closeProjectModal();

            }

            if (
                event.key === "ArrowLeft" &&
                currentImages.length > 0
            ) {

                showGalleryImage(
                    currentImageIndex - 1
                );

                startGalleryAutoplay();

            }

            if (
                event.key === "ArrowRight" &&
                currentImages.length > 0
            ) {

                showGalleryImage(
                    currentImageIndex + 1
                );

                startGalleryAutoplay();

            }

        }
    );


    /* ==================================================
       PAUSAR CUANDO SE CAMBIA DE PESTAÑA
    ================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.hidden) {

                stopGalleryAutoplay();

            } else if (modalIsOpen()) {

                startGalleryAutoplay();

            }

        }
    );

});