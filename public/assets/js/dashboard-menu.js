/**
 * Dashboard Menu Logic
 * Handles the sidebar drawer for mobile users and the logout functionality.
 */

import { handleLogout } from "./auth-handler.js";

document.addEventListener("DOMContentLoaded", () => {
  const openMenuBtn = document.getElementById("open-menu-button");
  const closeMenuBtn = document.getElementById("close-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuOverlay = document.getElementById("menu-overlay");
  const logoutBtn = document.getElementById("menu-logout-btn");

  // --- 1. MENU ANIMATION LOGIC ---

  function openMenu() {
    if (!mobileMenu || !menuOverlay) return;

    // Show overlay first, then trigger transitions
    menuOverlay.classList.remove("hidden");

    // Small delay to allow 'hidden' to be removed so transitions work
    setTimeout(() => {
      menuOverlay.classList.remove("opacity-0");
      mobileMenu.classList.remove("translate-x-full");
    }, 10);

    document.body.style.overflow = "hidden"; // Prevent background scroll
  }

  function closeMenu() {
    if (!mobileMenu || !menuOverlay) return;

    // Slide menu out and fade overlay
    mobileMenu.classList.add("translate-x-full");
    menuOverlay.classList.add("opacity-0");

    // Hide overlay from DOM completely after transition (300ms matches duration-300)
    setTimeout(() => {
      menuOverlay.classList.add("hidden");
    }, 300);

    document.body.style.overflow = ""; // Re-enable scroll
  }

  // --- 2. LOGOUT LOGIC ---

  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // Confirm with user before logging out
      if (confirm("Are you sure you want to log out?")) {
        handleLogout();
      }
    });
  }

  // --- 3. EVENT LISTENERS ---

  openMenuBtn?.addEventListener("click", openMenu);
  closeMenuBtn?.addEventListener("click", closeMenu);
  menuOverlay?.addEventListener("click", closeMenu);

  // Close when clicking any link inside the menu
  const menuLinks = mobileMenu?.querySelectorAll("a");
  menuLinks?.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // ESC key support for accessibility
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      !mobileMenu.classList.contains("translate-x-full")
    ) {
      closeMenu();
    }
  });
});
