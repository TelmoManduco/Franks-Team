/**
 * Auth Handler - Client-Side Authentication
 * Connects Login / Register modals to Express + Prisma API
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- FORMS ---
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  // --- ERROR CONTAINERS ---
  const loginErrorDiv = document.getElementById("login-error");
  const registerErrorDiv = document.getElementById("register-error");

  // --- BUTTONS ---
  const loginButton = document.getElementById("login-submit");
  const registerButton = registerForm?.querySelector("button[type='submit']");

  // --- HELPERS ---
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

  /* ===========================
      REGISTER
  ============================ */
  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      hideError(registerErrorDiv);

      if (registerButton) {
        registerButton.disabled = true;
        registerButton.textContent = "Creating account...";
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
          body: JSON.stringify(userData),
        });

        const result = await response.json();

        if (response.ok) {
          console.log("Account created:", result.user);

          // Close register modal
          document.getElementById("close-register-modal")?.click();
        } else {
          showError(registerErrorDiv, result.error || "Registration failed.");
        }
      } catch (error) {
        console.error("REGISTER ERROR:", error);
        showError(
          registerErrorDiv,
          "Server connection error. Try again later.",
        );
      } finally {
        if (registerButton) {
          registerButton.disabled = false;
          registerButton.textContent = "Sign Up";
        }
      }
    });
  }

  /* ===========================
      LOGIN
  ============================ */
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      hideError(loginErrorDiv);

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
          body: JSON.stringify(credentials),
        });

        const result = await response.json();

        if (response.ok) {
          console.log("Login successful:", result.user);

          // Close login modal
          document.getElementById("close-login-modal")?.click();

          // Refresh UI / redirect
          window.location.reload();
        } else {
          showError(
            loginErrorDiv,
            result.error || "Invalid email or password.",
          );
        }
      } catch (error) {
        console.error("LOGIN ERROR:", error);
        showError(loginErrorDiv, "Server connection error. Try again later.");
      } finally {
        if (loginButton) {
          loginButton.disabled = false;
          loginButton.textContent = "Log In";
        }
      }
    });
  }
});
