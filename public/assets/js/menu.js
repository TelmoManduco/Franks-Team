// /assets/js/menu.js

import { closeMenu } from "./helpers.js"; // Importamos a função de fechar menu

/**
 * Initializes the mobile menu behavior.
 * - Opens/closes the menu via toggle buttons
 * - Closes when clicking the overlay
 * - Automatically closes when resizing to desktop view
 * - Closes when clicking any internal menu link (better UX)
 */

export function setupMobileMenu() {
  // --- Mobile Menu Logic ---
  const openButton = document.getElementById("mobile-menu-button");
  const closeButton = document.getElementById("close-menu-button");
  const menu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("menu-overlay");

  // If key elements do not exist (for example, on other pages), do nothing.
  if (!menu || !openButton) return;

  // Helper to sync accessibility attributes with the visual state
  const updateAccessibility = () => {
    const isClosed = menu.classList.contains("translate-x-full");
    if (isClosed) {
      menu.setAttribute("inert", "");
      menu.setAttribute("aria-hidden", "true");
    } else {
      menu.removeAttribute("inert");
      menu.setAttribute("aria-hidden", "false");
    }
  };

  // Initialize accessibility state on load
  updateAccessibility();

  // Core function to toggle the menu open/closed state
  const toggleMenu = () => {
    menu.classList.toggle("translate-x-full");
    if (overlay) {
      overlay.classList.toggle("opacity-0");
      overlay.classList.toggle("pointer-events-none");
    }
    updateAccessibility(); // Update attributes after toggling classes

    // If we just CLOSED the menu, move focus out of it
    if (menu.classList.contains("translate-x-full") && openButton) {
      openButton.focus(); // Returns focus to the "Hamburger" icon
    }
  };

  // ------------------------------------------------------------------
  // EVENT LISTENERS
  // ------------------------------------------------------------------

  // Open the menu
  openButton.addEventListener("click", toggleMenu);

  // Close button (if exists)
  if (closeButton) closeButton.addEventListener("click", toggleMenu);

  // Clicking the overlay also toggles/ closes the menu
  if (overlay) overlay.addEventListener("click", toggleMenu);

  /**
   * Automatically close the menu when the screen is resized to desktop
   * This prevents the menu from staying stuck open when switching layouts.
   */

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });

  /**
   * Close the menu when a link or button inside the menu is clicked
   * This improves the mobile UX significantly.
   */
  const menuLinks = menu.querySelectorAll("a, button");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });
}
