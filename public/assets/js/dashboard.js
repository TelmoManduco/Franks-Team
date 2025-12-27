import { setupMobileMenu } from "./menu.js";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Re-use your existing logic
  // This finds the burger-menu-button and the mobile-menu automatically
  setupMobileMenu();

  // 2. Add Dashboard-specific logic (Check if user is logged in)
  checkUserSession();

  setupLogout();
});

async function checkUserSession() {
  try {
    const response = await fetch("/api/me", { credentials: "include" });
    if (!response.ok) {
      window.location.href = "index.html"; // Redirect if not logged in
      return;
    }
    const data = await response.json();

    // Update the Welcome message in the header
    document.getElementById("user-name").textContent =
      data.user.name.split(" ")[0];
  } catch (error) {
    window.location.href = "index.html";
  }
}

/**
 * Sets up the event listener for the logout button in the dashboard.
 */
function setupLogout() {
  const logoutBtn = document.getElementById("dashboard-logout-btn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        const response = await fetch("/api/logout", {
          method: "POST",
          credentials: "include",
        });

        if (response.ok) {
          // Once the server clears the cookie, redirect back to home
          window.location.href = "index.html";
        } else {
          console.error("Logout failed on the server side");
        }
      } catch (error) {
        console.error("Error connecting to logout endpoint:", error);
      }
    });
  }
}
