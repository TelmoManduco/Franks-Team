import { setupMobileMenu } from "./menu.js";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Mobile Menu
  setupMobileMenu();

  // 2. Check Session & Load User Data
  checkUserSession();

  // 3. Initialize Logout Logic
  setupLogout();

  // 4. Handle Profile Image Preview
  setupProfileImage();
});

async function checkUserSession() {
  try {
    const response = await fetch("/api/me", { credentials: "include" });
    if (!response.ok) {
      window.location.href = "index.html";
      return;
    }
    const data = await response.json();

    // Update Welcome Message (First Name)
    const firstName = data.user.name.split(" ")[0];
    document.getElementById("user-name").textContent = firstName;

    // Update Mobile Menu Details
    document.getElementById("menu-full-name").textContent = data.user.name;
    document.getElementById("menu-email").textContent = data.user.email;
  } catch (error) {
    console.error("Session check failed:", error);
    window.location.href = "index.html";
  }
}

function setupLogout() {
  const mobileBtn = document.getElementById("dashboard-logout-btn");
  const desktopBtn = document.getElementById("desktop-logout-btn");

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        window.location.href = "index.html";
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (mobileBtn) mobileBtn.addEventListener("click", handleLogout);
  if (desktopBtn) desktopBtn.addEventListener("click", handleLogout);
}

function setupProfileImage() {
  const uploadInput = document.getElementById("profile-upload");
  const profileDisplay = document.getElementById("profile-img-mobile");

  if (uploadInput && profileDisplay) {
    uploadInput.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          profileDisplay.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }
}
