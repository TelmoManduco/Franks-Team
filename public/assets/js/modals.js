// /assets/js/modals.js

export function setupModals() {
  const loginModal = document.getElementById("login-modal");
  const registerModal = document.getElementById("register-modal");

  // Open Buttons (Desktop & Mobile)
  const openLoginBtns = [
    document.getElementById("open-login"),
    document.getElementById("menu-login-btn"),
  ].filter((btn) => btn);

  // Switch Links
  const switchToRegister = document.getElementById("switch-to-register");
  const switchToLogin = document.getElementById("switch-to-login");

  // Close Buttons
  const closeLogin = document.getElementById("close-login-modal");
  const closeRegister = document.getElementById("close-register-modal");

  // --- HELPER FUNCTIONS ---
  const showModal = (modal) => {
    modal?.classList.remove("hidden", "opacity-0", "pointer-events-none");
    modal?.classList.add("flex", "opacity-100", "pointer-events-auto");
    // Trigger scale animation on the inner div
    const content = modal.querySelector("div");
    content?.classList.remove("scale-95");
    content?.classList.add("scale-100");
  };

  const hideModal = (modal) => {
    modal?.classList.add("opacity-0", "pointer-events-none");
    modal?.classList.remove("opacity-100", "pointer-events-auto");
    const content = modal.querySelector("div");
    content?.classList.add("scale-95");
    content?.classList.remove("scale-100");

    setTimeout(() => {
      modal?.classList.add("hidden");
    }, 150);
  };

  // --- EVENT LISTENERS ---

  // 1. Open Login Modal
  openLoginBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (btn.textContent.trim().toLowerCase() === "login") {
        e.preventDefault();
        showModal(loginModal);
      }
    });
  });

  // 2. Switch from Login to Register
  switchToRegister?.addEventListener("click", (e) => {
    e.preventDefault();
    hideModal(loginModal);
    setTimeout(() => showModal(registerModal), 150);
  });

  // 3. Switch from Register to Login
  switchToLogin?.addEventListener("click", (e) => {
    e.preventDefault();
    hideModal(registerModal);
    setTimeout(() => showModal(loginModal), 150);
  });

  // 4. Close Buttons
  closeLogin?.addEventListener("click", () => hideModal(loginModal));
  closeRegister?.addEventListener("click", () => hideModal(registerModal));

  // 5. Close on Background Click
  [loginModal, registerModal].forEach((modal) => {
    modal?.addEventListener("click", (e) => {
      if (e.target === modal) hideModal(modal);
    });
  });
}
