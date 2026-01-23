// /assets/js/modals.js
import { closeMenu, showElement, hideElement } from "./helpers.js";

export function setupModals() {
  const loginModal = document.getElementById("login-modal");
  const registerModal = document.getElementById("register-modal");

  // --- INTERNAL HELPERS ---
  const showModal = (modal) => {
    if (!modal) return;
    closeMenu(); // Closes mobile menu if it's open
    showElement(modal);
    const content = modal.querySelector("div");
    content?.classList.replace("scale-95", "scale-100");
    document.body.style.overflow = "hidden";
  };

  const hideModal = (modal) => {
    if (!modal) return;
    hideElement(modal);
    const content = modal.querySelector("div");
    content?.classList.replace("scale-100", "scale-95");
    document.body.style.overflow = "";
  };

  // --- SELECTORS ---
  const loginBtns = [
    document.getElementById("desktop-login-btn"),
    document.getElementById("menu-login-btn"),
    document.getElementById("open-login"),
  ].filter(Boolean);

  const signupBtns = [
    document.getElementById("desktop-signup-btn"),
    document.getElementById("menu-signup-btn"),
  ].filter(Boolean);

  const switchToRegister = document.getElementById("switch-to-register");
  const switchToLogin = document.getElementById("switch-to-login");
  const closeLogin = document.getElementById("close-login-modal");
  const closeRegister = document.getElementById("close-register-modal");

  // --- EVENT LISTENERS ---

  // 1. Open Login Modal
  loginBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      showModal(loginModal);
    });
  });

  // 2. Open Signup Modal
  signupBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      showModal(registerModal);
    });
  });

  // 3. Switch Logic (Login <-> Register)
  switchToRegister?.addEventListener("click", (e) => {
    e.preventDefault();
    hideModal(loginModal);
    setTimeout(() => showModal(registerModal), 150);
  });

  switchToLogin?.addEventListener("click", (e) => {
    e.preventDefault();
    hideModal(registerModal);
    setTimeout(() => showModal(loginModal), 150);
  });

  // 4. Close Logic
  closeLogin?.addEventListener("click", () => hideModal(loginModal));
  closeRegister?.addEventListener("click", () => hideModal(registerModal));

  // 5. Click Backdrop to Close
  [loginModal, registerModal].forEach((modal) => {
    modal?.addEventListener("click", (e) => {
      if (e.target === modal) hideModal(modal);
    });
  });
}
