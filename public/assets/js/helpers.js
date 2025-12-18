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
  const openButton = document.getElementById("mobile-menu-button");

  // Hide the menu by applying the translate-x utility class
  if (menu) {
    // Move focus to open button if the focus is currently inside the menu being hidden
    if (menu.contains(document.activeElement) && openButton) {
      openButton.focus();
    }

    menu.classList.add("translate-x-full");

    // Synchronize accessibility attributes
    menu.setAttribute("aria-hidden", "true");
    menu.setAttribute("inert", "");
  }

  // Hide the overlay and disable interactions
  if (overlay) {
    overlay.classList.add("opacity-0", "pointer-events-none");
  }
};
