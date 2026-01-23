// /assets/js/helpers.js

export const showElement = (el) => {
  if (!el) return;
  el.classList.remove("hidden", "opacity-0", "pointer-events-none");
  el.classList.add("flex", "opacity-100", "pointer-events-auto");
  el.setAttribute("aria-hidden", "false");
  el.removeAttribute("inert");
  document.body.style.overflow = "hidden";
};

export const hideElement = (el) => {
  if (!el) return;
  el.classList.add("opacity-0", "pointer-events-none");
  el.classList.remove("opacity-100", "pointer-events-auto");
  el.setAttribute("aria-hidden", "true");
  el.setAttribute("inert", "");

  // Only unlock if NO other overlays are visible
  setTimeout(() => {
    const activeOverlays = document.querySelectorAll(
      ".opacity-100:not(.hidden)",
    );
    if (activeOverlays.length === 0) {
      document.body.style.overflow = "";
    }
    el.classList.add("hidden");
    el.classList.remove("flex");
  }, 300); // Match your transition duration
};

export const closeMenu = () => {
  const menu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("menu-overlay");

  if (menu) {
    menu.classList.add("translate-x-full");
    hideElement(menu);
  }
  if (overlay) hideElement(overlay);
};
