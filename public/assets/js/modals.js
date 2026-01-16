// /assets/js/modals.js

export function setupModals() {
  const loginModal = document.getElementById("login-modal");
  const registerModal = document.getElementById("register-modal");

  // --- SELECTORS ---

  // Collect all Login buttons (Desktop + Mobile)
  const loginBtns = [
    document.getElementById("desktop-login-btn"),
    document.getElementById("menu-login-btn"),
    document.getElementById("open-login"), // Keeping this as fallback
  ].filter((btn) => btn);

  // Collect all Sign Up / Join Now buttons (Desktop + Mobile)
  const signupBtns = [
    document.getElementById("desktop-signup-btn"),
    document.getElementById("menu-signup-btn"),
  ].filter((btn) => btn);

  const switchToRegister = document.getElementById("switch-to-register");
  const switchToLogin = document.getElementById("switch-to-login");
  const closeLogin = document.getElementById("close-login-modal");
  const closeRegister = document.getElementById("close-register-modal");

  // --- HELPER FUNCTIONS ---
  const showModal = (modal) => {
    if (!modal) return;
    modal.classList.remove("hidden", "opacity-0", "pointer-events-none");
    modal.classList.add("flex", "opacity-100", "pointer-events-auto");
    const content = modal.querySelector("div");
    content?.classList.remove("scale-95");
    content?.classList.add("scale-100");
  };

  const hideModal = (modal) => {
    if (!modal) return;
    modal.classList.add("opacity-0", "pointer-events-none");
    modal.classList.remove("opacity-100", "pointer-events-auto");
    const content = modal.querySelector("div");
    content?.classList.add("scale-95");
    content?.classList.remove("scale-100");

    setTimeout(() => {
      modal.classList.add("hidden");
    }, 150);
  };

  // --- EVENT LISTENERS ---

  // 1. Open Login Modal
  loginBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      showModal(loginModal);
    });
  });

  // 2. Open Signup Modal (New Logic)
  signupBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      showModal(registerModal);
    });
  });

  // 3. Switch Logic
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

  [loginModal, registerModal].forEach((modal) => {
    modal?.addEventListener("click", (e) => {
      if (e.target === modal) hideModal(modal);
    });
  });
}
