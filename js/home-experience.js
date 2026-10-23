document.addEventListener("DOMContentLoaded", () => {
    const options = document.querySelectorAll("[data-guide-option]");
    const code = document.getElementById("guideResultCode");
    const title = document.getElementById("guideResultTitle");
    const text = document.getElementById("guideResultText");
    const points = document.getElementById("guideResultPoints");
    const link = document.getElementById("guideResultLink");
    const whatsappLink = document.getElementById("guideWhatsappLink");
    const whatsappNumber = "56972367335";

    const whatsappUrl = (message) =>
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    const recommendations = {
        presencia: {
            code: "WEB-01",
            title: "Página web profesional",
            text: "Una página clara y responsiva puede presentar tu propuesta, servicios, canales de contacto y elementos de confianza en un solo lugar.",
            points: ["Presentación del negocio", "Servicios organizados", "Contacto directo"],
            whatsapp: "Hola, usé el orientador del inicio de Janabith PuntoCL. Me interesa una página web profesional y quiero conversar sobre mi idea."
        },
        catalogo: {
            code: "CAT-02",
            title: "Catálogo o vitrina digital",
            text: "Conviene ordenar categorías, fichas, imágenes y consultas para que las personas encuentren fácilmente lo que ofreces.",
            points: ["Categorías claras", "Productos o servicios", "Consultas simplificadas"],
            whatsapp: "Hola, usé el orientador del inicio de Janabith PuntoCL. Me interesa un catálogo o vitrina digital para organizar productos o servicios."
        },
        sistema: {
            code: "SYS-03",
            title: "Aplicación o sistema de gestión",
            text: "Cuando la necesidad principal es registrar, consultar o administrar información, evaluamos una solución Java y una estructura de datos adecuada.",
            points: ["Registro de información", "Consultas y operaciones", "Base de datos"],
            whatsapp: "Hola, usé el orientador del inicio de Janabith PuntoCL. Necesito evaluar una aplicación o sistema para gestionar información."
        },
        orientacion: {
            code: "ORI-04",
            title: "Orientación para ordenar tu idea",
            text: "Primero aclaramos el problema real, las prioridades y una primera etapa alcanzable antes de decidir herramientas o funciones.",
            points: ["Necesidad principal", "Prioridades", "Próximo paso"],
            whatsapp: "Hola, usé el orientador del inicio de Janabith PuntoCL y todavía no sé qué solución necesito. Quiero ordenar mi idea."
        }
    };

    function renderRecommendation(key) {
        const item = recommendations[key];
        if (!item || !code || !title || !text || !points || !link) return;
        code.textContent = item.code;
        title.textContent = item.title;
        text.textContent = item.text;
        points.innerHTML = item.points.map((point) => `<span>${point}</span>`).join("");
        link.href = "explora/index.html";
        if (whatsappLink) whatsappLink.href = whatsappUrl(item.whatsapp);
    }

    options.forEach((option) => {
        option.addEventListener("click", () => {
            options.forEach((button) => button.classList.remove("is-active"));
            option.classList.add("is-active");
            renderRecommendation(option.dataset.guideOption);
        });
    });

    renderRecommendation("presencia");

    /* ==================================================
       VISTA RÁPIDA DE PROYECTOS REALES
    ================================================== */
    const showcaseTabs = document.querySelectorAll("[data-showcase]");
    const showcaseImage = document.getElementById("showcaseImage");
    const showcaseEyebrow = document.getElementById("showcaseEyebrow");
    const showcaseTitle = document.getElementById("showcaseTitle");
    const showcaseText = document.getElementById("showcaseText");
    const showcaseChips = document.getElementById("showcaseChips");

    const showcaseData = {
        empresa: {
            image: "assets/img/proyectos/ingpro/ingpro-portada.png",
            alt: "Vista del proyecto INGPRO",
            eyebrow: "Sitio corporativo",
            title: "INGPRO",
            text: "Una presencia corporativa que organiza soluciones técnicas, catálogo, formularios y navegación responsive.",
            chips: ["Responsive", "Catálogo", "Formularios"]
        },
        comercio: {
            image: "assets/img/proyectos/el-chinito/el-chinito-portada.png",
            alt: "Vista del proyecto Minimarket El Chinito",
            eyebrow: "Catálogo comercial",
            title: "El Chinito",
            text: "Catálogo pensado para productos, búsqueda, favoritos, carrito y preparación de pedidos para retiro en tienda.",
            chips: ["Catálogo", "Carrito", "UX móvil"]
        },
        java: {
            image: "assets/img/proyectos/onevet-store/onevet-store-portada.png",
            alt: "Vista del proyecto OneVet Store",
            eyebrow: "Proyecto Full Stack",
            title: "OneVet",
            text: "Proyecto que conecta interfaz, organización de datos y una base de aprendizaje orientada a soluciones Java Full Stack.",
            chips: ["Java", "Spring Boot", "API REST"]
        }
    };

    function renderShowcase(key) {
        const item = showcaseData[key];
        if (!item || !showcaseImage) return;
        showcaseImage.classList.add("is-changing");
        window.setTimeout(() => {
            showcaseImage.src = item.image;
            showcaseImage.alt = item.alt;
            if (showcaseEyebrow) showcaseEyebrow.textContent = item.eyebrow;
            if (showcaseTitle) showcaseTitle.textContent = item.title;
            if (showcaseText) showcaseText.textContent = item.text;
            if (showcaseChips) showcaseChips.innerHTML = item.chips.map((chip) => `<span>${chip}</span>`).join("");
            showcaseImage.classList.remove("is-changing");
        }, 130);
    }

    showcaseTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            showcaseTabs.forEach((item) => {
                const active = item === tab;
                item.classList.toggle("is-active", active);
                item.setAttribute("aria-selected", String(active));
            });
            renderShowcase(tab.dataset.showcase);
        });
    });

    document.querySelectorAll(".home-faq__question").forEach((button) => {
        button.addEventListener("click", () => {
            const answer = button.parentElement?.querySelector(".home-faq__answer");
            const expanded = button.getAttribute("aria-expanded") === "true";
            button.setAttribute("aria-expanded", String(!expanded));
            const symbol = button.querySelector("b");
            if (symbol) symbol.textContent = expanded ? "+" : "−";
            if (answer) answer.hidden = expanded;
        });
    });
});
