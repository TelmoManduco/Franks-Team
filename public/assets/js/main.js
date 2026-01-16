// /assets/js/main.js
import { setupMobileMenu } from "./menu.js";
import { setupModals } from "./modals.js";
import { setupForms } from "./auth-handler.js";
import { initAuthSession } from "./auth-session.js";

// UI scripts
import { setupSmoothScrolling, setupBackToTop } from "./smooth-scroll.js";
import { setupHeroSlideshow } from "./slideshow.js";

document.addEventListener("DOMContentLoaded", async function () {
  console.log("MMA Gym Site Initializing...");

  /**
   * 1. THE GATEKEEPER
   * initAuthSession checks /api/me and handles the logic:
   * - If no onboarding & on dashboard -> redirect to onboarding
   * - If guest & on dashboard -> redirect to index
   * - Swaps Login/Join Now buttons for Dashboard link
   */
  await initAuthSession();

  /**
   * 2. CORE LOGIC
   * We initialize these on every page. setupForms will now
   * automatically handle the onboarding-form if it's found.
   */
  setupForms();
  setupMobileMenu();
  setupModals();

  /**
   * 3. PAGE-SPECIFIC VISUALS
   * We use "Conditional Initialization" so errors don't stop the script
   * if an element (like the Hero Slideshow) isn't present on the current page.
   */

  // Only run slideshow if the hero element exists (usually index.html)
  if (document.getElementById("hero-slideshow-container")) {
    setupHeroSlideshow();
  }

  // Visual utilities
  setupSmoothScrolling();
  setupBackToTop();

  console.log("Initialization Complete.");
});
