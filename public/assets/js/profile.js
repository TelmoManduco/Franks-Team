import { setupMobileMenu } from "./menu.js";

document.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();
  loadProfileData();

  const uploadInput = document.getElementById("profile-upload");
  const mainImg = document.getElementById("profile-img-main");

  if (uploadInput) {
    uploadInput.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          mainImg.src = e.target.result;
          // In the future, we will call an upload function here
        };
        reader.readAsDataURL(file);
      }
    });
  }
});

async function loadProfileData() {
  const response = await fetch("/api/me", { credentials: "include" });
  if (response.ok) {
    const data = await response.json();
    document.getElementById("profile-name").textContent = data.user.name;
    document.getElementById("profile-email").textContent = data.user.email;
  }
}
