document.addEventListener("DOMContentLoaded", () => {
    const options = document.querySelectorAll("[data-guide-option]");
    const code = document.getElementById("guideResultCode");
    const title = document.getElementById("guideResultTitle");
    const text = document.getElementById("guideResultText");
    const points = document.getElementById("guideResultPoints");
    const link = document.getElementById("guideResultLink");

    const recommendations = {
        presencia: {
            code: "WEB-01",
            title: "Página web profesional",
            text: "Una página clara y responsiva puede presentar tu propuesta, servicios, canales de contacto y elementos de confianza en un solo lugar.",
            points: ["Presentación del negocio", "Servicios organizados", "Contacto directo"],
            href: "pages/servicios.html"
        },
        catalogo: {
            code: "CAT-02",
            title: "Catálogo o vitrina digital",
            text: "Conviene ordenar categorías, fichas, imágenes y consultas para que las personas encuentren fácilmente lo que ofreces.",
            points: ["Categorías claras", "Productos o servicios", "Consultas simplificadas"],
            href: "pages/servicios.html"
        },
        sistema: {
            code: "SYS-03",
            title: "Aplicación o sistema de gestión",
            text: "Cuando la necesidad principal es registrar, consultar o administrar información, evaluamos una solución Java y una estructura de datos adecuada.",
            points: ["Registro de información", "Consultas y operaciones", "Base de datos"],
            href: "pages/portafolio.html"
        },
        orientacion: {
            code: "ORI-04",
            title: "Sesión inicial de orientación",
            text: "Primero ordenamos la idea, identificamos el problema real y definimos una primera etapa alcanzable antes de hablar de herramientas.",
            points: ["Necesidad principal", "Prioridades", "Próximo paso"],
            href: "pages/contacto.html"
        }
    };

    function renderRecommendation(key) {
        const item = recommendations[key];
        if (!item || !code || !title || !text || !points || !link) return;
        code.textContent = item.code;
        title.textContent = item.title;
        text.textContent = item.text;
        points.innerHTML = item.points.map((point) => `<span>${point}</span>`).join("");
        link.href = item.href;
    }

    options.forEach((option) => {
        option.addEventListener("click", () => {
            options.forEach((button) => button.classList.remove("is-active"));
            option.classList.add("is-active");
            renderRecommendation(option.dataset.guideOption);
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
