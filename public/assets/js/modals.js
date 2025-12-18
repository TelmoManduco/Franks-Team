// /assets/js/modals.js

import { closeMenu } from "./helpers.js";

/**
 * Initializes all modal logic for Login and Register.
 * Includes:
 * - open/close animations
 * - switching between modals
 * - closing on overlay click
 * - closing on ESC key
 */

export function setupModals() {
  // ------------------------------------------------------------
  // SELECT DOM ELEMENTS
  // ------------------------------------------------------------
  const loginModal = document.getElementById("login-modal");
  const registerModal = document.getElementById("register-modal");

  // Content wrappers (used for scale animation)
  const loginContent = loginModal?.querySelector("div:nth-child(2)") || null;
  const registerContent =
    registerModal?.querySelector("div:nth-child(2)") || null;

  // Switch links
  const switchToRegisterLink = document.getElementById("switch-to-register");
  const switchToLoginLink = document.getElementById("switch-to-login");

  // Buttons that open login modal (desktop + mobile)
  const openLoginButtons = [
    document.getElementById("open-login-modal"),
    document.getElementById("open-login-modal-mobile"),
  ].filter((btn) => btn);

  // ------------------------------------------------------------
  // HELPER FUNCTIONS (Animations)
  // ------------------------------------------------------------

  /** Smoothly opens a modal */
  function openModal(modal, content) {
    if (!modal || !content) return;

    modal.classList.remove("opacity-0", "pointer-events-none");
    modal.classList.add("opacity-100");

    // Play scale animation
    content.classList.remove("scale-95");
    content.classList.add("scale-100");

    closeMenu(); // Prevents menu being open under the modal
  }

  /** Smoothly closes a modal */
  function closeModal(modal, content) {
    if (!modal || !content) return;

    modal.classList.add("opacity-0", "pointer-events-none");
    modal.classList.remove("opacity-100");

    // Reverse scale animation
    content.classList.remove("scale-100");
    content.classList.add("scale-95");
  }

  // ------------------------------------------------------------
  // INDIVIDUAL OPEN/CLOSE WRAPPERS
  // ------------------------------------------------------------

  const openLoginModal = (e) => {
    if (e) e.preventDefault();
    closeModal(registerModal, registerContent); // Ensure register is closed
    openModal(loginModal, loginContent);
  };

  const closeLoginModal = () => {
    closeModal(loginModal, loginContent);
  };

  const openRegisterModal = (e) => {
    if (e) e.preventDefault();
    closeModal(loginModal, loginContent); // Ensure login is closed
    openModal(registerModal, registerContent);
  };

  const closeRegisterModal = () => {
    closeModal(registerModal, registerContent);
  };

  // ------------------------------------------------------------
  // ATTACH EVENT LISTENERS — LOGIN MODAL
  // ------------------------------------------------------------
  if (loginModal) {
    // Buttons that open login
    openLoginButtons.forEach((btn) => {
      btn.addEventListener("click", openLoginModal);
    });

    // Close button
    const closeLoginButton = document.getElementById("close-login-modal");
    if (closeLoginButton) {
      closeLoginButton.addEventListener("click", closeLoginModal);
    }

    // Close on overlay click
    loginModal.addEventListener("click", (e) => {
      if (e.target === loginModal) closeLoginModal();
    });

    // Keyboard ESC support
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && loginModal.classList.contains("opacity-100")) {
        closeLoginModal();
      }
    });

    // Switch Login → Register
    if (switchToRegisterLink) {
      switchToRegisterLink.addEventListener("click", (e) => {
        e.preventDefault();
        closeLoginModal();
        setTimeout(() => openRegisterModal(e), 180); // Wait animation
      });
    }
  }

  // ------------------------------------------------------------
  // ATTACH EVENT LISTENERS — REGISTER MODAL
  // ------------------------------------------------------------
  if (registerModal) {
    const closeRegisterButton = document.getElementById("close-register-modal");
    if (closeRegisterButton) {
      closeRegisterButton.addEventListener("click", closeRegisterModal);
    }

    // Close on overlay click
    registerModal.addEventListener("click", (e) => {
      if (e.target === registerModal) closeRegisterModal();
    });

    // Keyboard ESC support
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        registerModal.classList.contains("opacity-100")
      ) {
        closeRegisterModal();
      }
    });

    // Switch Register → Login
    if (switchToLoginLink) {
      switchToLoginLink.addEventListener("click", (e) => {
        e.preventDefault();
        closeRegisterModal();
        setTimeout(() => openLoginModal(e), 180);
      });
    }
  }
}
