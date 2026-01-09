// /assets/js/modals.js

/**
 * setupModals - Manages Login and Registration modal visibility.
 * Handles opening, closing, and background-click dismissal.
 */
export function setupModals() {
  const loginModal = document.getElementById("login-modal");
  const loginContent = document.getElementById("login-modal-content");

  // 1. SELECT OPEN BUTTONS
  const openButtons = [
    document.getElementById("open-login"), // Desktop
    document.getElementById("menu-login-btn"), // Mobile
  ].filter((btn) => btn !== null);

  // 2. SELECT CLOSE BUTTONS
  const closeBtn = document.getElementById("close-login-modal");
  // We also treat the modal background itself as a close trigger
  const modalOverlay = loginModal;

  // --- OPEN LOGIC ---
  openButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // Only open if button is in "Login" mode (not "Dashboard" mode)
      if (btn.textContent.trim().toLowerCase() === "login") {
        e.preventDefault();

        if (loginModal) {
          // Show the wrapper and enable pointer events
          loginModal.classList.remove(
            "hidden",
            "opacity-0",
            "pointer-events-none",
          );
          loginModal.classList.add(
            "flex",
            "opacity-100",
            "pointer-events-auto",
          );
        }

        if (loginContent) {
          // Animate the form scaling in
          setTimeout(() => {
            loginContent.classList.remove("scale-95", "opacity-0");
            loginContent.classList.add("scale-100", "opacity-100");
          }, 10);
        }
      }
    });
  });

  // --- CLOSE LOGIC ---
  const handleClose = (e) => {
    if (e) e.preventDefault();

    // Start fade/scale out animation
    if (loginContent) {
      loginContent.classList.add("scale-95", "opacity-0");
      loginContent.classList.remove("scale-100", "opacity-100");
    }

    if (loginModal) {
      loginModal.classList.add("opacity-0");
      loginModal.classList.remove("opacity-100");
    }

    // Completely hide after animation finishes (300ms)
    setTimeout(() => {
      if (loginModal) {
        loginModal.classList.add("hidden", "pointer-events-none");
        loginModal.classList.remove("flex", "pointer-events-auto");
      }
    }, 300);
  };

  // Close when clicking the "X" button
  if (closeBtn) {
    closeBtn.addEventListener("click", handleClose);
  }

  // Close when clicking the dark background (overlay)
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      // ONLY close if the user clicked the dark part, NOT the form inside
      if (e.target === modalOverlay) {
        handleClose(e);
      }
    });
  }

  // Close when pressing the "Escape" key
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      loginModal &&
      !loginModal.classList.contains("hidden")
    ) {
      handleClose(e);
    }
  });
}
