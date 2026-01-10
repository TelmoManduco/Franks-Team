// /assets/js/auth-session.js
import { handleLogout } from "./auth-handler.js";

export async function initAuthSession() {
  try {
    const response = await fetch("/api/me", { credentials: "include" });

    // 1. If OK (Logged In)
    if (response.ok) {
      const data = await response.json();
      if (data.user) {
        renderLoggedInUI(data.user);
        return;
      }
    }

    // 2. If 401 or any other error, handle as Guest
    renderLoggedOutUI();
  } catch (error) {
    // Catch actual network failures (server down)
    renderLoggedOutUI();
  }
}

function renderLoggedInUI(user) {
  const desktopBtn = document.getElementById("open-login");
  if (desktopBtn) {
    desktopBtn.textContent = "Dashboard";
    desktopBtn.onclick = (e) => {
      e.preventDefault();
      window.location.href = "dashboard.html";
    };
  }

  // Swap elements
  document.getElementById("menu-guest-header")?.classList.add("hidden");
  document.getElementById("menu-user-profile")?.classList.remove("hidden");
  document.getElementById("links-authenticated")?.classList.remove("hidden");
  document.getElementById("menu-login-btn")?.classList.add("hidden");

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
  const desktopBtn = document.getElementById("open-login");
  if (desktopBtn) {
    desktopBtn.textContent = "Login";
    desktopBtn.onclick = null; // Reset
  }

  document.getElementById("menu-login-btn")?.classList.remove("hidden");
  document.getElementById("menu-logout-btn")?.classList.add("hidden");
  document.getElementById("menu-guest-header")?.classList.remove("hidden");
}
