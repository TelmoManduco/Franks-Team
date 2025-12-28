window.addEventListener("pageshow", (event) => {
  // Check if the page is being loaded from the cache or fresh
  checkHomeSession();
});

async function checkHomeSession() {
  try {
    // We check the same endpoint used by the dashboard
    const response = await fetch("/api/me", { credentials: "include" });

    if (response.ok) {
      const data = await response.json();
      if (data.user) {
        updateToDashboardButtons();
      }
    }
  } catch (error) {
    // If it fails, we just do nothing (keep the login buttons as they are)
    console.log("Not logged in or server error");
  }
}

function updateToDashboardButtons() {
  // 1. Select the buttons (Desktop and Mobile)
  const desktopAccountBtn = document.getElementById("open-login-modal");
  const mobileAccountBtn = document.getElementById("open-login-modal-mobile");

  // 2. Change Desktop Button
  if (desktopAccountBtn) {
    desktopAccountBtn.textContent = "Dashboard";
    // Remove the modal trigger and redirect to dashboard instead
    desktopAccountBtn.removeAttribute("id"); // Optional: prevents accidental modal triggers
    desktopAccountBtn.onclick = () => {
      window.location.href = "dashboard.html";
    };
    desktopAccountBtn.classList.add("text-yellow-400"); // Visual cue they are logged in
  }

  // 3. Change Mobile Button
  if (mobileAccountBtn) {
    mobileAccountBtn.textContent = "My Dashboard";
    mobileAccountBtn.onclick = () => {
      window.location.href = "dashboard.html";
    };
    mobileAccountBtn.classList.remove("text-yellow-400"); // Match your mobile style
    mobileAccountBtn.classList.add("text-white");
  }
}
