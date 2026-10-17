
/* =========================================
   PORTFÓLIO - JOCIMAR MACHADO
   Funcionalidades JavaScript
========================================= */

"use strict";

// ELEMENTOS DO MENU
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

// 1. MENU RESPONSIVO
if (menuToggle && nav) {

  function fecharMenu() {
    nav.classList.remove("is-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
  }

  function alternarMenu() {
    const aberto = nav.classList.toggle("is-open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(aberto)
    );

    menuToggle.setAttribute(
      "aria-label",
      aberto ? "Fechar menu" : "Abrir menu"
    );
  }

  // Abrir ou fechar ao clicar no botão
  menuToggle.addEventListener("click", alternarMenu);

  // Fechar ao selecionar uma seção
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", fecharMenu);
  });

  // Fechar ao clicar fora do menu
  document.addEventListener("click", (event) => {
    if (
      nav.classList.contains("is-open") &&
      !nav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      fecharMenu();
    }
  });

  // Fechar com a tecla ESC
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      nav.classList.contains("is-open")
    ) {
      fecharMenu();
      menuToggle.focus();
    }
  });

  // Restaurar o menu ao voltar para desktop
  const desktopQuery = window.matchMedia(
    "(min-width: 861px)"
  );

  desktopQuery.addEventListener("change", (event) => {
    if (event.matches) {
      fecharMenu();
    }
  });
}

// 2. ANO AUTOMÁTICO DO RODAPÉ
const currentYear = document.getElementById("current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// 3. INFORMAÇÃO DE INICIALIZAÇÃO
console.info("Portfólio de Jocimar Machado carregado.");
