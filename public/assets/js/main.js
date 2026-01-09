// /assets/js/main.js
// -----------------------------------------------------------------------------
// CORE ENTRY POINT
// -----------------------------------------------------------------------------
// This module serves as the main application orchestrator.
// Its sole responsibility is to import all individual feature modules
// and execute their setup functions once the entire HTML document is ready.
// This implements a clean, modular structure for the front-end.
// -----------------------------------------------------------------------------

// Import created feature modules (using ES Module syntax)
// The './' specifies the path relative to the current file (i.e., inside /assets/js/).

//import { setupMobileMenu } from "./menu.js"; // Handles mobile navigation open/close logic.
import { setupModals } from "./modals.js"; // Manages Login/Registration modal visibility and switching.
import { setupSmoothScrolling } from "./smooth-scroll.js"; // Implements smooth scrolling for anchor links.
import { setupHeroSlideshow } from "./slideshow.js"; // Initializes the hero section image rotator (slideshow).
import { setupForms } from "./forms.js"; // Reserved for form submission logic (linking Front-end to Back-end API via fetch).
import { initAuthSession } from "./auth-session.js";

// Core Entry Point - Executes code only after the entire DOM structure is loaded.
// This replaces the initialization block from the original 'core.js' file.
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded. Initializing modules.");

  // Execute all setup functions to attach event listeners and initialize features.
  // The order generally does not matter here, as modules are independent.

  // Mobile Menu & Overlay Setup
  //setupMobileMenu();

  // Check if user is logged in right away
  initAuthSession(); 

  // Modal Setup (Login, Register, and the switch logic)
  setupModals();

  // Anchor Link Scrolling Setup
  setupSmoothScrolling();

  // Hero Section Slideshow Initialization
  setupHeroSlideshow();

  // Forms Setup: Ready for API/Backend submission logic (fetch).
  setupForms();
});
