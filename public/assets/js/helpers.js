// /assets/js/helpers.js

export const showElement = (el) => {
  if (!el) return;
  el.classList.remove("hidden", "opacity-0", "pointer-events-none");
  el.classList.add("flex", "opacity-100", "pointer-events-auto");
  el.setAttribute("aria-hidden", "false");
  el.removeAttribute("inert");
  // Lock scroll
  document.body.style.overflow = "hidden";
};

export const hideElement = (el) => {
  if (!el) return;
  el.classList.add("opacity-0", "pointer-events-none");
  el.classList.remove("opacity-100", "pointer-events-auto");
  el.setAttribute("aria-hidden", "true");
  el.setAttribute("inert", "");

  setTimeout(() => {
    // If the element we are hiding is the menu, we should check specifically
    // for other modals. If it's just the menu closing, unlock the scroll.
    const activeModals = document.querySelectorAll(
      ".modal-open, [role='dialog']",
    );

    // Simplest fix: Just unlock it if we are calling hide.
    // If you have modals that need to keep the lock, check for them specifically.
    if (activeModals.length === 0) {
      document.body.style.overflow = "";
    }

    el.classList.add("hidden");
    el.classList.remove("flex");
  }, 300);
};

export const closeMenu = () => {
  const menu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("menu-overlay");

  // CRITICAL FIX: Force unlock the scroll immediately when menu is closed
  document.body.style.overflow = "";

  if (menu) {
    menu.classList.add("translate-x-full");
    hideElement(menu);
  }
  if (overlay) hideElement(overlay);
};
