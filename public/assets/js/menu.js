// /assets/js/menu.js

import { closeMenu } from "./helpers.js"; // Importamos a função de fechar menu

export function setupMobileMenu() {
    // --- Mobile Menu Logic ---
    const openButton = document.getElementById("mobile-menu-button");
    const closeButton = document.getElementById("close-menu-button");
    const menu = document.getElementById("mobile-menu");
    const overlay = document.getElementById("menu-overlay");

    // Core function to toggle the menu open/closed state
    const toggleMenu = () => {
        if (menu) {
            menu.classList.toggle("translate-x-full");
        }
        if (overlay) {
            overlay.classList.toggle("opacity-0");
            overlay.classList.toggle("pointer-events-none");
        }
    };

    if (openButton && menu) {
        // Event listeners for opening and closing the menu
        openButton.addEventListener("click", toggleMenu);
        if (closeButton) closeButton.addEventListener("click", toggleMenu);
        if (overlay) overlay.addEventListener("click", toggleMenu);

        // Closes the menu on desktop resizing (prevents "stuck" menu)
        window.addEventListener("resize", () => {
            if (window.innerWidth >= 768) {
                closeMenu(); // Usa a função importada
            }
        });

        // Closes the menu when an internal link is clicked (improves mobile UX)
        const menuLinks = menu.querySelectorAll("a, button");
        menuLinks.forEach((link) => {
            link.addEventListener("click", closeMenu); // Usa a função importada
        });
    }
    // NOTA: A lógica do Modal de Login/Registo NÃO está aqui.
}