/**
 * Auth Handler - Manages Client-Side Authentication
 * Connects the Login/Register modals to the Express/Prisma API
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- UI ELEMENTS ---
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  const loginErrorDiv = document.getElementById("login-error");
  const registerErrorDiv = document.getElementById("register-error");

  /**
   * Helper to display error messages in the UI
   * @param {HTMLElement} element - The error container
   * @param {string} message - The text to display
   */
  const showError = (element, message) => {
    element.textContent = message;
    element.classList.remove("hidden");
  };

  /**
   * Helper to hide error messages
   * @param {HTMLElement} element - The error container
   */
  const hideError = (element) => {
    element.classList.add("hidden");
    element.textContent = "";
  };

  // --- REGISTRATION LOGIC ---
  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent page reload
      hideError(registerErrorDiv);

      // Collect data from HTML IDs
      const userData = {
        name: document.getElementById("name").value,
        email: document.getElementById("register-email").value,
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
          alert("Account created successfully! You can now log in.");
          // Close register modal and open login modal via trigger buttons
          document.getElementById("close-register-modal").click();
          // Optional: Automatically open login modal here if desired
        } else {
          // Display error sent by the backend (e.g., "User already exists")
          showError(registerErrorDiv, result.error || "Registration failed.");
        }
      } catch (error) {
        console.error("Registration fetch error:", error);
        showError(
          registerErrorDiv,
          "Server connection error. Please try again later.",
        );
      }
    });
  }

  // --- LOGIN LOGIC ---
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      hideError(loginErrorDiv);

      const credentials = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
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
          alert(`Welcome back, ${result.user.name}!`);

          // Redirect or refresh page to update Auth state
          window.location.reload();
        } else {
          // Display error (e.g., "Invalid email or password")
          showError(loginErrorDiv, result.error || "Login failed.");
        }
      } catch (error) {
        console.error("Login fetch error:", error);
        showError(
          loginErrorDiv,
          "Server connection error. Please try again later.",
        );
      }
    });
  }
});
