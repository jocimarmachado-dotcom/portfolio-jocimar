
/* ========================================
   CARROSSEL + LIGHTBOX
   PORTFÓLIO JOCIMAR MACHADO
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    const carousel = document.querySelector(
        "[data-marketing-carousel]"
    );

    if (!carousel) return;

    const slides = Array.from(
        carousel.querySelectorAll(".marketing-slide")
    );

    const dots = Array.from(
        carousel.querySelectorAll(".marketing-carousel-dot")
    );

    const prev = carousel.querySelector(
        ".marketing-carousel-prev"
    );

    const next = carousel.querySelector(
        ".marketing-carousel-next"
    );

    if (!slides.length) return;

    let current = 0;
    let timer = null;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    /* =====================================
       CONTROLE DO CARROSSEL
    ===================================== */

    
function showSlide(index) {

    current = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {

        const active = i === current;

        // Exibe somente a imagem atual
        slide.hidden = !active;

        // Remove o controle antigo do Fade
        slide.classList.remove("is-active");
        slide.removeAttribute("aria-hidden");
        slide.inert = false;

    });

    // Atualiza os indicadores
    dots.forEach((dot, i) => {

        const active = i === current;

        dot.classList.toggle("active", active);

        if (active) {
            dot.setAttribute("aria-current", "true");
        } else {
            dot.removeAttribute("aria-current");
        }

    });

}


    function stopAutoplay() {
        clearInterval(timer);
        timer = null;
    }

    
function startAutoplay() {

    stopAutoplay();

    // Pausa apenas quando a aba ou o popup
    // estiverem abertos em condições que
    // impeçam a reprodução automática.

    if (
        document.hidden ||
        lightbox.open ||
        reducedMotion.matches
    ) {
        return;
    }

    timer = setInterval(() => {
        showSlide(current + 1);
    }, 3000);

}


    /* NAVEGAÇÃO DO CARROSSEL */

    prev.addEventListener("click", () => {
        showSlide(current - 1);
        startAutoplay();
    });

    next.addEventListener("click", () => {
        showSlide(current + 1);
        startAutoplay();
    });

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {
            showSlide(index);
            startAutoplay();
        });

    });

    
    document.addEventListener(
        "visibilitychange",
        startAutoplay
    );

    /* =====================================
       CRIAÇÃO DO LIGHTBOX
    ===================================== */

    const lightbox = document.createElement("dialog");
    lightbox.className = "marketing-lightbox";

    lightbox.setAttribute(
        "aria-label",
        "Galeria de imagens ampliadas"
    );

    /* BOTÃO FECHAR */

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "marketing-lightbox-close";
    closeButton.textContent = "×";
    closeButton.setAttribute("aria-label", "Fechar imagem");

    /* ÁREA DE VISUALIZAÇÃO */

    const lightboxView = document.createElement("div");
    lightboxView.className = "marketing-lightbox-view";

    /* SETA ANTERIOR */

    const lightboxPrev = document.createElement("button");
    lightboxPrev.type = "button";
    lightboxPrev.className = "marketing-lightbox-nav";
    lightboxPrev.innerHTML = "&#10094;";
    lightboxPrev.setAttribute(
        "aria-label",
        "Imagem anterior"
    );

    /* IMAGEM AMPLIADA */

    const lightboxImage = document.createElement("img");
    lightboxImage.className = "marketing-lightbox-image";

    /* SETA PRÓXIMA */

    const lightboxNext = document.createElement("button");
    lightboxNext.type = "button";
    lightboxNext.className = "marketing-lightbox-nav";
    lightboxNext.innerHTML = "&#10095;";
    lightboxNext.setAttribute(
        "aria-label",
        "Próxima imagem"
    );

    /* LEGENDA */

    const lightboxCaption = document.createElement("p");
    lightboxCaption.className = "marketing-lightbox-caption";
    lightboxCaption.setAttribute("aria-live", "polite");

    /* MONTA O POPUP */

    lightboxView.append(
        lightboxPrev,
        lightboxImage,
        lightboxNext
    );

    lightbox.append(
        closeButton,
        lightboxView,
        lightboxCaption
    );

    document.body.appendChild(lightbox);

    /* =====================================
       TROCA DE IMAGENS NO LIGHTBOX
    ===================================== */

    function showLightboxSlide(index) {

        showSlide(index);

        const slide = slides[current];
        const link = slide.querySelector("a");
        const image = slide.querySelector("img");
        const caption = slide.querySelector("figcaption");

        if (!link || !image) return;

        lightboxImage.src = link.href;
        lightboxImage.alt = image.alt || "Imagem ampliada";

        lightboxCaption.textContent = caption
            ? caption.textContent.trim()
            : "";

    }

    /* ABRIR LIGHTBOX */

    slides.forEach((slide, index) => {

        const link = slide.querySelector("a");

        if (!link) return;

        link.addEventListener("click", (event) => {

            event.preventDefault();

            stopAutoplay();

            showLightboxSlide(index);

            lightbox.showModal();
            closeButton.focus();

        });

    });

    /* SETA ANTERIOR DO LIGHTBOX */

    lightboxPrev.addEventListener("click", () => {
        showLightboxSlide(current - 1);
    });

    /* SETA PRÓXIMA DO LIGHTBOX */

    lightboxNext.addEventListener("click", () => {
        showLightboxSlide(current + 1);
    });

    /* NAVEGAÇÃO PELO TECLADO */

    lightbox.addEventListener("keydown", (event) => {

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            showLightboxSlide(current - 1);
        }

        if (event.key === "ArrowRight") {
            event.preventDefault();
            showLightboxSlide(current + 1);
        }

    });

    /* FECHAR PELO X */

    closeButton.addEventListener("click", () => {
        lightbox.close();
    });

    /* FECHAR CLICANDO FORA */

    lightbox.addEventListener("click", (event) => {

        if (event.target === lightbox) {
            lightbox.close();
        }

    });

    /* AO FECHAR */

    lightbox.addEventListener("close", () => {

        lightboxImage.removeAttribute("src");
        startAutoplay();

    });

    /* INICIALIZAÇÃO */

    showSlide(0);
    startAutoplay();

});
