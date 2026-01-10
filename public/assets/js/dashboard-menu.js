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

  // Select both mobile and desktop logout buttons
  const logoutBtns = [
    document.getElementById("menu-logout-btn"),
    document.getElementById("desktop-logout-btn"),
  ].filter((btn) => btn !== null);

  // --- 1. MENU ANIMATION LOGIC ---

  function openMenu() {
    if (!mobileMenu || !menuOverlay) return;

    // 1. Show overlay (remove hidden)
    menuOverlay.classList.remove("hidden", "pointer-events-none");

    // 2. Small delay to allow the CSS transition to trigger
    setTimeout(() => {
      menuOverlay.classList.remove("opacity-0");
      mobileMenu.classList.remove("translate-x-full");
    }, 10);

    document.body.style.overflow = "hidden"; // Prevent background scroll
  }

  function closeMenu() {
    if (!mobileMenu || !menuOverlay) return;

    // 1. Start sliding out and fading
    mobileMenu.classList.add("translate-x-full");
    menuOverlay.classList.add("opacity-0");
    menuOverlay.classList.add("pointer-events-none");

    // 2. Wait for transition (300ms) then hide completely
    setTimeout(() => {
      menuOverlay.classList.add("hidden");
    }, 300);

    document.body.style.overflow = ""; // Re-enable scroll
  }

  // --- 2. LOGOUT LOGIC ---

  logoutBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (confirm("Are you sure you want to log out?")) {
        handleLogout();
      }
    });
  });

  // --- 3. EVENT LISTENERS ---

  // Open button
  openMenuBtn?.addEventListener("click", openMenu);

  // Close button (The X inside the menu)
  closeMenuBtn?.addEventListener("click", closeMenu);

  // CLICK OUTSIDE (The Overlay)
  menuOverlay?.addEventListener("click", (e) => {
    // Only close if the user clicked the overlay itself, not the menu content
    if (e.target === menuOverlay) {
      closeMenu();
    }
  });

  // Close when clicking any link inside the menu
  const menuLinks = mobileMenu?.querySelectorAll("a");
  menuLinks?.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
});
