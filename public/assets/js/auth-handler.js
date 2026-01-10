// /assets/js/auth-handler.js

/**
 * Helpers for UI feedback
 * Shows or hides error messages in the modal
 */
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

/**
 * Main Forms Setup
 * Attaches submit listeners to both Login and Register forms
 */
export function setupForms() {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const loginErrorDiv = document.getElementById("login-error");
  const registerErrorDiv = document.getElementById("register-error");

  // --- LOGIN LOGIC ---
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Stop the page from refreshing
      hideError(loginErrorDiv);

      const loginButton = document.getElementById("login-submit");
      if (loginButton) {
        loginButton.disabled = true;
        loginButton.textContent = "Logging in...";
      }

      // Collect data from your HTML login inputs
      const credentials = {
        email: document.getElementById("login-email").value.trim(),
        password: document.getElementById("login-password").value,
      };

      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // Essential to store the session cookie
          body: JSON.stringify(credentials),
        });

        const result = await response.json();

        if (response.ok) {
          // Success! Redirect to the dashboard
          window.location.href = "dashboard.html";
        } else {
          // Show the error from your server (e.g., "Invalid password")
          showError(
            loginErrorDiv,
            result.error || "Invalid login credentials.",
          );
        }
      } catch (error) {
        console.error("Login Error:", error);
        showError(loginErrorDiv, "Server error. Please try again later.");
      } finally {
        if (loginButton) {
          loginButton.disabled = false;
          loginButton.textContent = "Log In";
        }
      }
    });
  }

  // --- REGISTER LOGIC ---
  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      hideError(registerErrorDiv);

      const registerButton = document.getElementById("register-submit");
      if (registerButton) {
        registerButton.disabled = true;
        registerButton.textContent = "Creating Account...";
      }

      const userData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("register-email").value.trim(),
        password: document.getElementById("register-password").value,
      };

      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(userData),
        });

        const result = await response.json();

        if (response.ok) {
          window.location.href = "dashboard.html";
        } else {
          showError(registerErrorDiv, result.error || "Registration failed.");
        }
      } catch (error) {
        console.error("Registration Error:", error);
        showError(registerErrorDiv, "Server error. Please try again.");
      } finally {
        if (registerButton) {
          registerButton.disabled = false;
          registerButton.textContent = "Sign Up";
        }
      }
    });
  }
}
