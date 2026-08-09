(() => {
    const contactLinks = document.querySelectorAll('[data-contact-message]');
    contactLinks.forEach((link) => {
        const params = new URLSearchParams({
            servicio: link.dataset.contactService || 'otro',
            origen: link.dataset.contactOrigin || 'Explora',
            mensaje: link.dataset.contactMessage || 'Hola, quiero conversar sobre mi proyecto digital.'
        });
        link.href = `../pages/contacto.html?${params.toString()}#formulario-contacto`;
    });

    document.querySelectorAll('.details-toggle').forEach((button) => {
        button.addEventListener('click', () => {
            const panel = button.nextElementSibling;
            const open = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', String(!open));
            panel.hidden = open;
        });
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
    }, { threshold: 0.2 });
    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

    const progressDots = [...document.querySelectorAll('.progress span')];
    const sections = [...document.querySelectorAll('[data-step]')];
    const stepObserver = new IntersectionObserver((entries) => {
        const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const step = Number(visible.target.dataset.step || 0);
        progressDots.forEach((dot, index) => dot.classList.toggle('is-active', index === step));
    }, { threshold: [0.35, 0.55, 0.75] });
    sections.forEach((section) => stepObserver.observe(section));
})();
