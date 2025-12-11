// /assets/js/helpers.js

/**
 * Closes the mobile menu and hides its overlay.
 * This function is intentionally simple so it can be reused across modules.
 */

export const closeMenu = () => {
    // Fetch elements directly when the function is called.
    // This ensures it works even if the DOM loads dynamically.
    const menu = document.getElementById("mobile-menu");
    const overlay = document.getElementById("menu-overlay");

    // Hide the menu by applying the translate-x utility class
    if (menu) {
        menu.classList.add("translate-x-full");
    }

    // Hide the overlay and disable interactions
    if (overlay) {
        overlay.classList.add("opacity-0", "pointer-events-none");
    }
};