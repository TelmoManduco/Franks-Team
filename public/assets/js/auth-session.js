// /assets/js/auth-session.js
import { handleLogout } from "./auth-handler.js";

export async function initAuthSession() {
  const currentPage = window.location.pathname;

  try {
    const response = await fetch("/api/me", { credentials: "include" });

    if (response.ok) {
      const data = await response.json();
      const user = data.user;

      if (user) {
        // --- 1. THE GATEKEEPER LOGIC ---
        if (
          !user.onboardingComplete &&
          !currentPage.includes("onboarding.html")
        ) {
          window.location.href = "onboarding.html";
          return;
        }

        if (
          user.onboardingComplete &&
          currentPage.includes("onboarding.html")
        ) {
          window.location.href = "dashboard.html";
          return;
        }

        renderLoggedInUI(user);
        return;
      }
    }

    // 2. If Not Logged In
    if (
      currentPage.includes("dashboard.html") ||
      currentPage.includes("onboarding.html")
    ) {
      window.location.href = "index.html";
    }

    renderLoggedOutUI();
  } catch (error) {
    console.error("Session Init Error:", error);
    renderLoggedOutUI();
  }
}

function renderLoggedInUI(user) {
  const firstName = user.firstName || "Athlete";

  // --- DESKTOP HEADER ADJUSTMENTS (Public Pages/Global) ---
  const authActions = document.getElementById("desktop-auth-actions");
  const userMenu = document.getElementById("desktop-user-menu");
  const desktopLogoutBtn = document.getElementById("desktop-logout-btn");

  if (authActions) authActions.classList.add("hidden");
  if (userMenu) userMenu.classList.remove("hidden");

  if (desktopLogoutBtn) {
    desktopLogoutBtn.onclick = async (e) => {
      e.preventDefault();
      const confirmExit = confirm("Are you sure you want to log out?");
      if (confirmExit) await handleLogout();
    };
  }

  // --- MOBILE MENU ADJUSTMENTS (Global) ---
  document.getElementById("menu-guest-header")?.classList.add("hidden");
  document.getElementById("guest-actions")?.classList.add("hidden");
  document.getElementById("menu-user-profile")?.classList.remove("hidden");
  document.getElementById("links-authenticated")?.classList.remove("hidden");

  const mobileLogoutTriggers = [
    document.getElementById("menu-logout-btn"),
    document.getElementById("menu-logout-link"), // This matches the ID we added to the HTML
  ];

  mobileLogoutTriggers.forEach((trigger) => {
    if (trigger) {
      trigger.classList.remove("hidden"); // Ensure the elements are visible
      trigger.onclick = async (e) => {
        e.preventDefault();
        const confirmExit = confirm("Are you sure you want to log out?");
        if (confirmExit) await handleLogout();
      };
    }
  });

  // --- GREETING UPDATES (Global & Nav) ---
  const mobileNameLabel = document.getElementById("menu-firstname");
  if (mobileNameLabel) mobileNameLabel.textContent = `Hi, ${firstName}`;

  const desktopNameLabel = document.getElementById("desktop-firstname");
  if (desktopNameLabel) desktopNameLabel.textContent = `Hi, ${firstName}`;

  // --- DASHBOARD SPECIFIC GREETINGS ---
  // Mobile Dashboard Header (e.g., "Welcome back, Alex")
  const dashMobileGreeting = document.getElementById(
    "dashboard-mobile-greeting",
  );
  if (dashMobileGreeting)
    dashMobileGreeting.textContent = `Welcome back, ${firstName}`;

  // Desktop Sidebar Header (e.g., "Hi, Alex")
  const dashDesktopGreeting = document.getElementById(
    "dashboard-desktop-greeting",
  );
  if (dashDesktopGreeting) dashDesktopGreeting.textContent = `Hi, ${firstName}`;
}

function renderLoggedOutUI() {
  // Reset Desktop
  document.getElementById("desktop-auth-actions")?.classList.remove("hidden");
  document.getElementById("desktop-user-menu")?.classList.add("hidden");

  // Reset Mobile
  document.getElementById("menu-guest-header")?.classList.remove("hidden");
  document.getElementById("guest-actions")?.classList.remove("hidden");
  document.getElementById("menu-user-profile")?.classList.add("hidden");
  document.getElementById("links-authenticated")?.classList.add("hidden");
  document.getElementById("menu-logout-btn")?.classList.add("hidden");
}
