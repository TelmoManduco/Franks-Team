document.addEventListener("DOMContentLoaded", () => {
  // 1. SELECT ELEMENTS
  const menu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("menu-overlay");
  const loginModal = document.getElementById("login-modal");

  // Select BOTH possible close buttons
  const closeBtnProfile = document.getElementById("close-menu-button");
  const closeBtnGuest = document.getElementById("close-menu-button-guest");

  // Check for both possible burger button IDs
  const openBtn =
    document.getElementById("mobile-menu-button") ||
    document.getElementById("open-menu-button");

  // Buttons inside the menu
  const menuLoginBtn = document.getElementById("menu-login-btn");
  const menuLogoutBtn = document.getElementById("menu-logout-btn");

  if (!menu || !openBtn) return;

  // 2. TOGGLE FUNCTIONS
  const openMenu = () => {
    menu.classList.remove("translate-x-full");
    overlay.classList.remove("opacity-0", "pointer-events-none");
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    menu.classList.add("translate-x-full");
    overlay.classList.add("opacity-0", "pointer-events-none");
    document.body.style.overflow = "";
  };

  // 3. EVENT LISTENERS FOR OPEN/CLOSE
  openBtn.addEventListener("click", openMenu);

  // Attach close event to whichever button exists/is visible
  if (closeBtnProfile) closeBtnProfile.addEventListener("click", closeMenu);
  if (closeBtnGuest) closeBtnGuest.addEventListener("click", closeMenu);

  if (overlay) overlay.addEventListener("click", closeMenu);

  // 4. SMART LINK LOGIC (Auto-close menu when clicking a link)
  const menuLinks = menu.querySelectorAll("a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // 5. LOGIN MODAL INTEGRATION
  if (menuLoginBtn && loginModal) {
    menuLoginBtn.addEventListener("click", () => {
      closeMenu();
      loginModal.classList.remove("pointer-events-none", "opacity-0");
      const modalContent = loginModal.querySelector("div");
      if (modalContent) {
        modalContent.classList.remove("scale-95");
        modalContent.classList.add("scale-100");
      }
    });
  }

  // 6. AUTHENTICATION UI UPDATER
  const isLoggedIn =
    localStorage.getItem("user_session") ||
    window.location.pathname.includes("dashboard.html");

  const profileSection = document.getElementById("menu-user-profile");
  const guestHeader = document.getElementById("menu-guest-header");

  if (isLoggedIn) {
    // Show Profile UI
    if (profileSection) profileSection.classList.remove("hidden");
    if (guestHeader) guestHeader.classList.add("hidden");

    // Show Authenticated elements
    const authLinks = document.getElementById("links-authenticated");
    if (authLinks) authLinks.classList.remove("hidden");
    if (menuLogoutBtn) menuLogoutBtn.classList.remove("hidden");
    if (menuLoginBtn) menuLoginBtn.classList.add("hidden");

    // Update profile text if on Dashboard
    const nameLabel = document.getElementById("menu-full-name");
    const statusLabel = document.getElementById("menu-user-status");

    if (window.location.pathname.includes("dashboard.html")) {
      if (nameLabel) nameLabel.textContent = "Alex Rodriguez";
      if (statusLabel) statusLabel.textContent = "Intermediate Fighter";
    }
  } else {
    // Ensure Guest UI is shown if not logged in
    if (profileSection) profileSection.classList.add("hidden");
    if (guestHeader) guestHeader.classList.remove("hidden");
  }

  // 7. LOGOUT LOGIC
  if (menuLogoutBtn) {
    menuLogoutBtn.addEventListener("click", () => {
      localStorage.removeItem("user_session");
      window.location.href = "index.html";
    });
  }
});
