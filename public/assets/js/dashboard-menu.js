document.addEventListener("DOMContentLoaded", () => {
  const openMenuBtn = document.getElementById("open-menu-button");
  const closeMenuBtn = document.getElementById("close-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuOverlay = document.getElementById("menu-overlay");

  function openMenu() {
    // Show overlay first then fade in
    menuOverlay.classList.remove("hidden");
    setTimeout(() => {
      menuOverlay.classList.remove("opacity-0");
      mobileMenu.classList.remove("translate-x-full");
    }, 10);

    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    // Slide menu out and fade overlay
    mobileMenu.classList.add("translate-x-full");
    menuOverlay.classList.add("opacity-0");

    // Hide overlay from DOM after transition completes
    setTimeout(() => {
      menuOverlay.classList.add("hidden");
    }, 300);

    document.body.style.overflow = "";
  }

  // listeners
  openMenuBtn?.addEventListener("click", openMenu);
  closeMenuBtn?.addEventListener("click", closeMenu);
  menuOverlay?.addEventListener("click", closeMenu);

  // ESC key support
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      !mobileMenu.classList.contains("translate-x-full")
    ) {
      closeMenu();
    }
  });
});
