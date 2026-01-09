// /assets/js/auth-handler.js

// Helpers for UI feedback
const showError = (element, message) => {
  if (!element) return;
  element.textContent = message;
  element.classList.remove("hidden");
};

const hideError = (element) => {
  if (!element) return;
  element.textContent = "";
  element.classList.add("hidden");
};

/**
 * Global Logout Function
 * POSTs to the server to clear the session cookie and redirects to home.
 */
export async function handleLogout() {
  try {
    const response = await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      window.location.href = "index.html"; // Refresh and reset state
    } else {
      console.error("Logout failed on server");
    }
  } catch (error) {
    console.error("Logout Error:", error);
  }
}

export function setupForms() {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const loginErrorDiv = document.getElementById("login-error");
  const registerErrorDiv = document.getElementById("register-error");

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      hideError(loginErrorDiv);

      const loginButton = document.getElementById("login-submit");
      if (loginButton) {
        loginButton.disabled = true;
        loginButton.textContent = "Logging in...";
      }

      const credentials = {
        email: document.getElementById("login-email").value.trim(),
        password: document.getElementById("login-password").value,
      };

      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(credentials),
        });

        const result = await response.json();
        if (response.ok) {
          window.location.href = "dashboard.html";
        } else {
          showError(loginErrorDiv, result.error || "Invalid login.");
        }
      } catch (error) {
        showError(loginErrorDiv, "Server error.");
      } finally {
        if (loginButton) {
          loginButton.disabled = false;
          loginButton.textContent = "Log In";
        }
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      hideError(registerErrorDiv);
      // ... Add your registration logic here similar to login
    });
  }
}
