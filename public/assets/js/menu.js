// /assets/js/menu.js
import { closeMenu } from "./helpers.js";

export function setupMobileMenu() {
  const openButton = document.getElementById("mobile-menu-button");
  const menu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("menu-overlay");

  const closeButtons = [
    document.getElementById("close-menu-button"),
    document.getElementById("close-menu-button-guest"),
  ].filter((btn) => btn);

  if (!menu || !openButton) return;

  // Helper function to force the menu to close
  const forceClose = () => {
    menu.classList.add("translate-x-full");
    if (overlay) {
      overlay.classList.add("opacity-0");
      overlay.classList.add("pointer-events-none");
    }
    menu.setAttribute("inert", "");
    document.body.style.overflow = "";
  };

  const toggleMenu = () => {
    const isOpening = menu.classList.contains("translate-x-full");
    menu.classList.toggle("translate-x-full");

    if (overlay) {
      overlay.classList.toggle("opacity-0");
      overlay.classList.toggle("pointer-events-none");
    }

    if (isOpening) {
      menu.removeAttribute("inert");
      document.body.style.overflow = "hidden"; // Stop scrolling when open
    } else {
      menu.setAttribute("inert", "");
      document.body.style.overflow = "";
      openButton.focus();
    }
  };

  // --- THE FIX: MONITOR WINDOW SIZE ---
  window.addEventListener("resize", () => {
    // 768px is the standard Tailwind 'md' breakpoint
    // If the window gets wider than mobile, close the menu automatically
    if (window.innerWidth >= 768) {
      forceClose();
    }
  });

  // Event Listeners
  openButton.addEventListener("click", toggleMenu);
  closeButtons.forEach((btn) => btn.addEventListener("click", toggleMenu));
  if (overlay) overlay.addEventListener("click", toggleMenu);

  const links = menu.querySelectorAll('a[href^="#"], a[href*=".html"]');
  links.forEach((link) => {
    link.addEventListener("click", forceClose);
  });
}
