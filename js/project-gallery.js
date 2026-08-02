document.addEventListener("DOMContentLoaded", () => {

    /* ==================================================
       CAPTURAS DISPONIBLES POR PROYECTO
    ================================================== */

    const projectGalleries = {
        ingpro: [
            {
                src: "assets/img/proyectos/ingpro/ingpro-portada.png",
                alt: "Portada corporativa del sitio web de INGPRO",
                caption:
                    "Portada corporativa con carrusel, servicios principales y acceso directo a cotización."
            },
            {
                src: "assets/img/proyectos/ingpro/ingpro-catalogo.png",
                alt: "Visor del catálogo digital de INGPRO",
                caption:
                    "Visor en línea del catálogo INGPRO 2026, con controles de navegación y descarga."
            },
            {
                src: "assets/img/proyectos/ingpro/ingpro-formulario.png",
                alt: "Formulario de cotización de INGPRO",
                caption:
                    "Formulario organizado para solicitar antecedentes y evaluar requerimientos de clientes."
            },
            {
                src: "assets/img/proyectos/ingpro/ingpro-impresion-3d.png",
                alt: "Carrusel de trabajos de impresión 3D de INGPRO",
                caption:
                    "Carrusel automático para presentar trabajos reales de impresión 3D."
            },
            {
                src: "assets/img/proyectos/ingpro/ingpro-trabajos-metal.png",
                alt: "Galería de trabajos metálicos realizados por INGPRO",
                caption:
                    "Galería visual de proyectos realizados en metal y corte CNC."
            },
            {
                src: "assets/img/proyectos/ingpro/ingpro-cnc-router.png",
                alt: "Proyectos CNC Router desarrollados por INGPRO",
                caption:
                    "Carrusel de proyectos en madera, MDF y otros materiales mecanizables."
            },
            {
                src: "assets/img/proyectos/ingpro/ingpro-vista-movil.png",
                alt: "Versión móvil responsiva del sitio web de INGPRO",
                caption:
                    "Vista responsiva desde celular, con navegación móvil y contenido adaptado."
            }
        ]
    };


    /* ==================================================
       ELEMENTOS DE LA GALERÍA
    ================================================== */

    const projectModal =
        document.getElementById("projectModal");

    const projectGallery =
        document.getElementById("projectGallery");

    const projectGalleryViewport =
        projectGallery?.querySelector(
            ".project-gallery__viewport"
        );

    const projectModalMockup =
        document.getElementById("projectModalMockup");

    const projectGalleryImage =
        document.getElementById("projectGalleryImage");

    const projectGalleryCaption =
        document.getElementById("projectGalleryCaption");

    const projectGalleryCounter =
        document.getElementById("projectGalleryCounter");

    const projectGalleryDots =
        document.getElementById("projectGalleryDots");

    const previousButton =
        document.querySelector("[data-gallery-previous]");

    const nextButton =
        document.querySelector("[data-gallery-next]");

    const projectButtons =
        document.querySelectorAll(
            ".project-details-button"
        );

    let currentImages = [];
    let currentImageIndex = 0;
    let pointerStartX = 0;
    let galleryInterval = null;

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* ==================================================
       CONTROL AUTOMÁTICO
    ================================================== */

    function stopGalleryAutoplay() {
        if (galleryInterval !== null) {
            clearInterval(galleryInterval);
            galleryInterval = null;
        }
    }

    function startGalleryAutoplay() {
        stopGalleryAutoplay();

        const modalIsOpen =
            projectModal?.classList.contains("active");

        const galleryIsVisible =
            projectGallery &&
            !projectGallery.hidden;

        if (
            prefersReducedMotion ||
            !modalIsOpen ||
            !galleryIsVisible ||
            currentImages.length < 2
        ) {
            return;
        }

        galleryInterval = window.setInterval(() => {
            showGalleryImage(currentImageIndex + 1);
        }, 4500);
    }

    function resetGalleryAutoplay() {
        startGalleryAutoplay();
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
            ((index % currentImages.length) +
                currentImages.length) %
            currentImages.length;

        const currentImage =
            currentImages[currentImageIndex];

        projectGalleryImage.style.opacity = "0";

        window.setTimeout(() => {
            projectGalleryImage.src =
                currentImage.src;

            projectGalleryImage.alt =
                currentImage.alt;

            projectGalleryCaption.textContent =
                currentImage.caption;

            projectGalleryCounter.textContent =
                `${currentImageIndex + 1} / ${currentImages.length}`;

            projectGalleryImage.style.opacity = "1";
        }, 120);

        const dots =
            projectGalleryDots?.querySelectorAll(
                ".project-gallery__dot"
            );

        dots?.forEach((dot, dotIndex) => {
            const isActive =
                dotIndex === currentImageIndex;

            dot.classList.toggle(
                "active",
                isActive
            );

            dot.setAttribute(
                "aria-current",
                isActive ? "true" : "false"
            );
        });
    }


    /* ==================================================
       CREAR LOS PUNTOS
    ================================================== */

    function renderGalleryDots() {
        if (!projectGalleryDots) {
            return;
        }

        projectGalleryDots.innerHTML = "";

        currentImages.forEach((image, index) => {
            const dot =
                document.createElement("button");

            dot.type = "button";
            dot.className =
                "project-gallery__dot";

            dot.setAttribute(
                "aria-label",
                `Mostrar captura ${index + 1}: ${image.alt}`
            );

            dot.addEventListener("click", () => {
                showGalleryImage(index);
                resetGalleryAutoplay();
            });

            projectGalleryDots.appendChild(dot);
        });
    }


    /* ==================================================
       CARGAR GALERÍA DEL PROYECTO
    ================================================== */

    function loadProjectGallery(projectId) {
        stopGalleryAutoplay();

        currentImages =
            projectGalleries[projectId] || [];

        currentImageIndex = 0;

        const hasImages =
            currentImages.length > 0;

        if (projectGallery) {
            projectGallery.hidden = !hasImages;
        }

        if (projectModalMockup) {
            projectModalMockup.hidden = hasImages;
        }

        if (!hasImages) {
            projectGalleryImage?.removeAttribute(
                "src"
            );

            if (projectGalleryDots) {
                projectGalleryDots.innerHTML = "";
            }

            return;
        }

        renderGalleryDots();
        showGalleryImage(0);

        /*
         * Esperamos a que el modal termine de abrirse.
         */
        window.setTimeout(
            startGalleryAutoplay,
            350
        );
    }


    /* ==================================================
       CONTROLES MANUALES
    ================================================== */

    previousButton?.addEventListener("click", () => {
        showGalleryImage(currentImageIndex - 1);
        resetGalleryAutoplay();
    });

    nextButton?.addEventListener("click", () => {
        showGalleryImage(currentImageIndex + 1);
        resetGalleryAutoplay();
    });

    projectButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const projectId =
                button.dataset.project;

            if (projectId) {
                loadProjectGallery(projectId);
            }
        });
    });


    /* ==================================================
       PAUSAR AL COLOCAR EL CURSOR
    ================================================== */

    projectGalleryViewport?.addEventListener(
        "mouseenter",
        stopGalleryAutoplay
    );

    projectGalleryViewport?.addEventListener(
        "mouseleave",
        startGalleryAutoplay
    );

    projectGalleryViewport?.addEventListener(
        "focusin",
        stopGalleryAutoplay
    );

    projectGalleryViewport?.addEventListener(
        "focusout",
        startGalleryAutoplay
    );


    /* ==================================================
       FLECHAS DEL TECLADO
    ================================================== */

    document.addEventListener("keydown", (event) => {
        const modalIsOpen =
            projectModal?.classList.contains(
                "active"
            );

        const galleryIsVisible =
            projectGallery &&
            !projectGallery.hidden;

        if (!modalIsOpen || !galleryIsVisible) {
            return;
        }

        if (event.key === "ArrowLeft") {
            showGalleryImage(
                currentImageIndex - 1
            );

            resetGalleryAutoplay();
        }

        if (event.key === "ArrowRight") {
            showGalleryImage(
                currentImageIndex + 1
            );

            resetGalleryAutoplay();
        }

        if (event.key === "Escape") {
            stopGalleryAutoplay();
        }
    });


    /* ==================================================
       DESLIZAR EN PANTALLAS TÁCTILES
    ================================================== */

    projectGalleryImage?.addEventListener(
        "pointerdown",
        (event) => {
            pointerStartX = event.clientX;
            stopGalleryAutoplay();
        }
    );

    projectGalleryImage?.addEventListener(
        "pointerup",
        (event) => {
            const pointerDifference =
                event.clientX - pointerStartX;

            if (Math.abs(pointerDifference) >= 45) {
                if (pointerDifference > 0) {
                    showGalleryImage(
                        currentImageIndex - 1
                    );
                } else {
                    showGalleryImage(
                        currentImageIndex + 1
                    );
                }
            }

            resetGalleryAutoplay();
        }
    );


    /* ==================================================
       DETECTAR CUANDO SE CIERRA EL MODAL
    ================================================== */

    if (projectModal) {
        const modalObserver = new MutationObserver(() => {
            const modalIsOpen =
                projectModal.classList.contains(
                    "active"
                );

            if (modalIsOpen) {
                startGalleryAutoplay();
            } else {
                stopGalleryAutoplay();
            }
        });

        modalObserver.observe(projectModal, {
            attributes: true,
            attributeFilter: ["class"]
        });
    }


    /* ==================================================
       PAUSAR SI SE CAMBIA DE PESTAÑA
    ================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {
            if (document.hidden) {
                stopGalleryAutoplay();
            } else {
                startGalleryAutoplay();
            }
        }
    );

});