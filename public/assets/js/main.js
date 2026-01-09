// /assets/js/main.js
import { setupMobileMenu } from "./menu.js";
import { setupModals } from "./modals.js";
import { setupForms } from "./auth-handler.js";
import { initAuthSession } from "./auth-session.js";

// Import other UI scripts...
import { setupSmoothScrolling, setupBackToTop } from "./smooth-scroll.js";
import { setupHeroSlideshow } from "./slideshow.js";

document.addEventListener("DOMContentLoaded", async function () {
  console.log("Initializing...");

  // 1. Wait for session check to finish.
  // This updates buttons to "Login" or "Dashboard" BEFORE modals are set up.
  await initAuthSession();

  // 2. Now setup event listeners
  setupModals();
  setupForms();
  setupMobileMenu();

  // 3. Other visuals
  setupSmoothScrolling();
  setupBackToTop();
  setupHeroSlideshow();
});
