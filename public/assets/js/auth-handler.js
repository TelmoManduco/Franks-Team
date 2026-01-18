// /assets/js/auth-handler.js

// REMOVED: import intlTelInput from "..."
// Since we are using the global script method, we access it via window.intlTelInput

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
  const onboardingForm = document.getElementById("onboarding-form");

  const loginErrorDiv = document.getElementById("login-error");
  const registerErrorDiv = document.getElementById("register-error");

  // --- PHONE INPUT INITIALIZATION ---
  const itiOptions = {
    initialCountry: "gb",
    strictMode: true,
    useFullscreenPopup: false,
    fixDropdownWidth: true,
    dropdownContainer: document.body,
    validationNumberTypes: ["MOBILE"],
    autoPlaceholder: "aggressive", // Options: "off", "polite", "aggressive"
    placeholderNumberType: "MOBILE",
    // Standard way to load utils
    loadUtils: () =>
      import("https://cdn.jsdelivr.net/npm/intl-tel-input@25.15.0/build/js/utils.js"),
    i18n: {
      searchPlaceholder: "Type a country...",
    },
  };

  let registerIti, emergencyIti;

  const registerPhoneField = document.querySelector("#register-phone");
  if (registerPhoneField) {
    // Accessing via window as per the global script method
    registerIti = window.intlTelInput(registerPhoneField, itiOptions);
  }

  const emergencyPhoneField = document.querySelector("#emergency-phone");
  if (emergencyPhoneField) {
    emergencyIti = window.intlTelInput(emergencyPhoneField, itiOptions);
  }

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
      const registerButton = document.getElementById("register-submit");

      if (registerIti) {
        await registerIti.promise;
        const isValid = registerIti.isValidNumberPrecise();

        if (!isValid) {
          const errorCode = registerIti.getValidationError();
          let message = "Invalid phone number.";

          // Accessing the validation error constants globally
          const validationError = window.intlTelInput.utils.validationError;
          if (errorCode === validationError.TOO_SHORT)
            message = "Number is too short.";
          if (errorCode === validationError.INVALID_COUNTRY_CODE)
            message = "Invalid country code.";

          showError(registerErrorDiv, message);
          registerButton.disabled = false;
          registerButton.textContent = "Continue to Safety Form";
          return;
        }
      }

      const userData = {
        firstName: document.getElementById("first-name").value.trim(),
        lastName: document.getElementById("last-name").value.trim(),
        email: document.getElementById("register-email").value.trim(),
        phone: registerIti ? registerIti.getNumber() : "",
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

      if (emergencyIti) {
        await emergencyIti.promise;
        if (!emergencyIti.isValidNumberPrecise()) {
          alert("Please enter a valid emergency contact phone number.");
          return;
        }
      }

      const medicalData = {
        emergencyName: document.getElementById("emergency-name").value.trim(),
        emergencyPhone: emergencyIti ? emergencyIti.getNumber() : "",
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
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(medicalData),
        });

        if (response.ok) {
          window.location.href = "dashboard.html";
        } else {
          const result = await response.json();
          alert(result.error || "Failed to save profile.");
        }
      } catch (error) {
        console.error("Onboarding Error:", error);
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Complete & Enter Dashboard";
      }
    });
  }

  // --- 4. CANCEL/EXIT LOGIC ---
  const exitBtn = document.getElementById("logout-exit");
  if (exitBtn) {
    exitBtn.addEventListener("click", async () => {
      const confirmExit = confirm(
        "Are you sure? You will need to log in again if you leave now.",
      );
      if (confirmExit) {
        await handleLogout();
      }
    });
  }
}
