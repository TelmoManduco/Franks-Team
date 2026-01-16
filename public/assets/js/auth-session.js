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
        // If they haven't finished the safety form, force them there
        if (
          !user.onboardingComplete &&
          !currentPage.includes("onboarding.html")
        ) {
          window.location.href = "onboarding.html";
          return;
        }

        // If they ARE finished, don't let them go back to the onboarding page
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
    // If a guest tries to access private pages, kick them to home
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
  // Desktop Header adjustments
  const loginBtn = document.getElementById("desktop-login-btn");
  const signupBtn = document.getElementById("desktop-signup-btn");
  const dashboardLink = document.getElementById("desktop-dashboard-link");

  if (loginBtn) loginBtn.classList.add("hidden");
  if (signupBtn) signupBtn.classList.add("hidden");
  if (dashboardLink) dashboardLink.classList.remove("hidden");

  // Mobile Menu adjustments
  document.getElementById("menu-guest-header")?.classList.add("hidden");
  document.getElementById("guest-actions")?.classList.add("hidden"); // Hides both Login & Join

  document.getElementById("menu-user-profile")?.classList.remove("hidden");
  document.getElementById("links-authenticated")?.classList.remove("hidden");

  const logoutBtn = document.getElementById("menu-logout-btn");
  if (logoutBtn) {
    logoutBtn.classList.remove("hidden");
    logoutBtn.onclick = (e) => {
      e.preventDefault();
      handleLogout();
    };
  }

  const nameLabel = document.getElementById("menu-full-name");
  if (nameLabel && user.name) {
    nameLabel.textContent = `Hi, ${user.name.split(" ")[0]}`;
  }
}

function renderLoggedOutUI() {
  // Reset Desktop
  document.getElementById("desktop-login-btn")?.classList.remove("hidden");
  document.getElementById("desktop-signup-btn")?.classList.remove("hidden");
  document.getElementById("desktop-dashboard-link")?.classList.add("hidden");

  // Reset Mobile
  document.getElementById("menu-guest-header")?.classList.remove("hidden");
  document.getElementById("guest-actions")?.classList.remove("hidden");
  document.getElementById("menu-user-profile")?.classList.add("hidden");
  document.getElementById("links-authenticated")?.classList.add("hidden");
  document.getElementById("menu-logout-btn")?.classList.add("hidden");
}
