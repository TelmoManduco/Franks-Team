// /assets/js/menu.js
import { closeMenu } from "./helpers.js";

export function setupMobileMenu() {
  const openButton = document.getElementById("mobile-menu-button");
  const menu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("menu-overlay");

  // Select BOTH potential close buttons in your HTML
  const closeButtons = [
    document.getElementById("close-menu-button"),
    document.getElementById("close-menu-button-guest"),
  ].filter((btn) => btn);

  if (!menu || !openButton) return;

  const toggleMenu = () => {
    const isOpening = menu.classList.contains("translate-x-full");
    menu.classList.toggle("translate-x-full");
    if (overlay) {
      overlay.classList.toggle("opacity-0");
      overlay.classList.toggle("pointer-events-none");
    }

    // Accessibility and Focus management
    if (isOpening) {
      menu.removeAttribute("inert");
    } else {
      menu.setAttribute("inert", "");
      openButton.focus();
    }
  };

  openButton.addEventListener("click", toggleMenu);
  closeButtons.forEach((btn) => btn.addEventListener("click", toggleMenu));
  if (overlay) overlay.addEventListener("click", toggleMenu);

  // Close when clicking navigation links
  const links = menu.querySelectorAll('a[href^="#"], a[href*=".html"]');
  links.forEach((link) => link.addEventListener("click", closeMenu));
}
