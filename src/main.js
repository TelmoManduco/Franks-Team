document.addEventListener("DOMContentLoaded", function () {
  // 1. Get the elements needed for interaction
  const openButton = document.getElementById("mobile-menu-button");
  const closeButton = document.getElementById("close-menu-button");
  const menu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("menu-overlay");

  // --- Utility Function: Closes the menu completely and resets the overlay state ---
  const closeMenu = () => {
    // Ensure the menu slides out (by adding translate-x-full)
    menu.classList.add("translate-x-full");

    // Ensure the overlay disappears and stops intercepting clicks
    overlay.classList.add("opacity-0");
    overlay.classList.add("pointer-events-none");
  };

  // --- Core Function: Toggles the menu and overlay state ---
  const toggleMenu = () => {
    // Toggle the 'translate-x-full' class for the slide-in/out effect
    menu.classList.toggle("translate-x-full");

    // Toggle the overlay visibility and interaction classes
    overlay.classList.toggle("opacity-0");
    overlay.classList.toggle("pointer-events-none");
  };

  // 2. Attach event listeners to the open/close buttons and overlay
  if (openButton && closeButton && overlay) {
    // Open/Close via Hamburger or X icon
    openButton.addEventListener("click", toggleMenu);
    closeButton.addEventListener("click", toggleMenu);

    // Close menu when clicking on the dark overlay area
    overlay.addEventListener("click", toggleMenu);
  }

  // 3. IMPORTANT: Reset menu state when resizing to desktop (768px and above)
  // This prevents the mobile menu from being stuck "open" when changing orientation/resizing
  window.addEventListener("resize", function () {
    // Check if the current window width is greater than or equal to the 'md' breakpoint (768px)
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });

  // OPTIONAL: Close menu when a link is clicked (improves mobile UX)

  const menuLinks = menu.querySelectorAll("a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
});
