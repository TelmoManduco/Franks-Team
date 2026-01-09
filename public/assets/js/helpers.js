// /assets/js/helpers.js

/**
 * Closes the mobile menu and hides its overlay.
 * Reusable across menu.js, modals.js, and smooth-scroll.js.
 */
export const closeMenu = () => {
  const menu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("menu-overlay");
  const openButton = document.getElementById("mobile-menu-button");

  if (menu) {
    // 1. Manage Focus: return focus to hamburger if it was inside the menu
    if (menu.contains(document.activeElement) && openButton) {
      openButton.focus();
    }

    // 2. Visual State: Move menu off-screen
    menu.classList.add("translate-x-full");

    // 3. Accessibility State: Sync with menu.js logic
    menu.setAttribute("aria-hidden", "true");
    menu.setAttribute("inert", "");
  }

  if (overlay) {
    // 4. Force Overlay Hide: Remove active classes and add hidden classes
    overlay.classList.remove("opacity-100", "pointer-events-auto");
    overlay.classList.add("opacity-0", "pointer-events-none");
  }
};
