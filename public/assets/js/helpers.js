// /assets/js/helpers.js

/**
 * Fecha o menu móvel e remove o overlay.
 */
export const closeMenu = () => {
    // Estas variáveis precisam de ser definidas aqui, pois estão fora do escopo original.
    const menu = document.getElementById("mobile-menu");
    const overlay = document.getElementById("menu-overlay");

    if (menu) {
        menu.classList.add("translate-x-full");
    }
    if (overlay) {
        overlay.classList.add("opacity-0", "pointer-events-none");
    }
};