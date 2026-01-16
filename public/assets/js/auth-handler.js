// /assets/js/auth-handler.js

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

export async function handleLogout() {
  try {
    const response = await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });
    if (response.ok) {
      window.location.href = "index.html";
    }
  } catch (error) {
    console.error("Logout Error:", error);
  }
}

export function setupForms() {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const onboardingForm = document.getElementById("onboarding-form"); // New selector

  const loginErrorDiv = document.getElementById("login-error");
  const registerErrorDiv = document.getElementById("register-error");

  // --- 1. LOGIN LOGIC ---
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      hideError(loginErrorDiv);
      const loginButton = document.getElementById("login-submit");

      const credentials = {
        email: document.getElementById("login-email").value.trim(),
        password: document.getElementById("login-password").value,
      };

      try {
        loginButton.disabled = true;
        loginButton.textContent = "Logging in...";
        const response = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(credentials),
        });

        const result = await response.json();
        if (response.ok) {
          // If login is successful, check if they need onboarding
          // (Your server should ideally return if onboarding is complete)
          window.location.href = result.onboardingComplete
            ? "dashboard.html"
            : "onboarding.html";
        } else {
          showError(loginErrorDiv, result.error || "Invalid credentials.");
        }
      } catch (error) {
        showError(loginErrorDiv, "Server error.");
      } finally {
        loginButton.disabled = false;
        loginButton.textContent = "Log In";
      }
    });
  }

  // --- 2. REGISTER LOGIC (Step 1) ---
  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      hideError(registerErrorDiv);
      const registerButton = document.getElementById("register-submit");

      const userData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("register-email").value.trim(),
        phone: document.getElementById("register-phone").value.trim(), // Added phone
        password: document.getElementById("register-password").value,
      };

      try {
        registerButton.disabled = true;
        registerButton.textContent = "Creating Account...";
        const response = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          // SUCCESS: Redirect to Step 2 (Medical/Safety)
          window.location.href = "onboarding.html";
        } else {
          const result = await response.json();
          showError(registerErrorDiv, result.error || "Registration failed.");
        }
      } catch (error) {
        showError(registerErrorDiv, "Server error.");
      } finally {
        registerButton.disabled = false;
        registerButton.textContent = "Continue to Safety Form";
      }
    });
  }

  // --- 3. ONBOARDING LOGIC (Step 2) ---
  if (onboardingForm) {
    onboardingForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const submitBtn = document.getElementById("onboarding-submit");

      const medicalData = {
        emergencyName: document.getElementById("emergency-name").value.trim(),
        emergencyPhone: document.getElementById("emergency-phone").value.trim(),
        medicalConditions: document
          .getElementById("medical-conditions")
          .value.trim(),
        injuries: document.getElementById("injuries").value.trim(),
        waiverAccepted: document.getElementById("waiver").checked,
      };

      try {
        submitBtn.disabled = true;
        submitBtn.textContent = "Saving Profile...";

        const response = await fetch("/api/update-profile", {
          // New endpoint
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(medicalData),
        });

        if (response.ok) {
          // FINISHED: Move to Dashboard
          window.location.href = "dashboard.html";
        }
      } catch (error) {
        console.error("Onboarding Error:", error);
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Complete & Enter Dashboard";
      }
    });
  }
}
