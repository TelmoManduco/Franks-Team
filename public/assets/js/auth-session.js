/**
 * Auth Session - Manages persistent login state
 * Checks /api/me to see if the user has a valid session cookie.
 */

export async function initAuthSession() {
  try {
    const response = await fetch("/api/me");

    if (response.ok) {
      const data = await response.json();
      if (data.user) {
        renderLoggedInUI(data.user);
      }
    } else {
      renderLoggedOutUI();
    }
  } catch (error) {
    console.error("Session check failed:", error);
  }
}

function renderLoggedInUI(user) {
  // Select all "Account" buttons (Mobile and Desktop)
  const accountButtons = document.querySelectorAll(
    "#open-login-modal-mobile, #open-login-modal",
  );

  accountButtons.forEach((btn) => {
    // 1. Change the text to the user's name
    const firstName = user.name ? user.name.split(" ")[0] : "User";
    btn.textContent = `Hi, ${firstName}`;

    // 2. Optional: Change styling to show it's active
    btn.classList.add("text-green-400");

    // 3. Optional: Redirect to a dashboard instead of opening the login modal
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("Redirecting to profile...");
      // window.location.href = "/profile.html";
    };
  });
}

function renderLoggedOutUI() {
  // Logic to ensure buttons show "My Account" if no session exists
  // Usually, the HTML already has this by default.
  console.log("User is a guest.");
}
