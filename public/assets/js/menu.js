// /assets/js/menu.js
import { closeMenu } from "./helpers.js";

export function setupMobileMenu() {
  const openButton = document.getElementById("mobile-menu-button");
  const menu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("menu-overlay");

  // Filter out any buttons that might not exist on specific pages
  const closeButtons = [
    document.getElementById("close-menu-button"),
    document.getElementById("close-menu-button-guest"),
  ].filter(Boolean);

  if (!menu || !openButton) return;

  const openMenu = () => {
    menu.classList.remove("translate-x-full");
    menu.removeAttribute("inert");
    menu.setAttribute("aria-hidden", "false");

    if (overlay) {
      overlay.classList.remove("opacity-0", "pointer-events-none");
      overlay.classList.add("opacity-100", "pointer-events-auto");
    }

    document.body.style.overflow = "hidden"; // Prevent background scroll
  };

  // 1. OPEN
  openButton.addEventListener("click", openMenu);

  // 2. CLOSE (Shared logic from helpers.js)
  const handleClose = () => {
    closeMenu(); // This handles translate, inert, and focus
    document.body.style.overflow = ""; // Re-enable scroll
  };

  closeButtons.forEach((btn) => btn.addEventListener("click", handleClose));
  if (overlay) overlay.addEventListener("click", handleClose);

  // 3. AUTO-CLOSE on Resize
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) handleClose();
  });

  // 4. AUTO-CLOSE on Link Click
  const links = menu.querySelectorAll('a[href^="#"], a[href*=".html"]');
  links.forEach((link) => {
    link.addEventListener("click", handleClose);
  });
}
