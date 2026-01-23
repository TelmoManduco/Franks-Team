// /assets/js/menu.js
import { closeMenu, showElement, hideElement } from "./helpers.js";

export function setupMobileMenu() {
  const openButton = document.getElementById("mobile-menu-button");
  const menu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("menu-overlay");

  const closeButtons = [
    document.getElementById("close-menu-button"),
    document.getElementById("close-menu-button-guest"),
  ].filter(Boolean);

  if (!menu || !openButton) return;

  const openMenu = () => {
    showElement(menu);
    menu.classList.remove("translate-x-full");
    if (overlay) showElement(overlay);
  };

  const handleClose = () => {
    closeMenu();
  };

  openButton.addEventListener("click", openMenu);
  closeButtons.forEach((btn) => btn.addEventListener("click", handleClose));
  if (overlay) overlay.addEventListener("click", handleClose);

  // Auto-close on resize to prevent "ghost" overlays on desktop
  window.addEventListener("resize", () => {
    if (
      window.innerWidth >= 768 &&
      !menu.classList.contains("translate-x-full")
    ) {
      handleClose();
    }
  });
}
