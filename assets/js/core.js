// /assets/js/core.js
// Contains all core and common functionalities for the website: Mobile Menu, Login Modal,
// Smooth Scrolling, and Hero Slideshow.

// ----------------------------------------------------------
// MODULE 1: MOBILE MENU AND LOGIN MODAL
// ----------------------------------------------------------
function setupMobileMenuAndModal() {
  // --- Mobile Menu Logic ---
  const openButton = document.getElementById("mobile-menu-button");
  const closeButton = document.getElementById("close-menu-button");
  const menu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("menu-overlay");

  // Utility function to close the mobile menu completely
  const closeMenu = () => {
    menu.classList.add("translate-x-full");
    if (overlay) {
      overlay.classList.add("opacity-0", "pointer-events-none");
    }
  };

  // Core function to toggle the menu open/closed state
  const toggleMenu = () => {
    menu.classList.toggle("translate-x-full");
    if (overlay) {
      overlay.classList.toggle("opacity-0");
      overlay.classList.toggle("pointer-events-none");
    }
  };

  if (openButton && menu) {
    // Event listeners for opening and closing the menu
    openButton.addEventListener("click", toggleMenu);
    if (closeButton) closeButton.addEventListener("click", toggleMenu);
    if (overlay) overlay.addEventListener("click", toggleMenu);

    // Closes the menu on desktop resizing (prevents "stuck" menu)
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    });

    // Closes the menu when an internal link is clicked (improves mobile UX)
    const menuLinks = menu.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }

  // --- Login Modal Logic ---
  const loginModal = document.getElementById("login-modal");
  const openModalButtons = [
    document.getElementById("open-login-modal"),
    document.getElementById("open-login-modal-mobile"),
  ].filter((btn) => btn);
  const closeModalButton = document.getElementById("close-login-modal");
  const modalContent = loginModal
    ? loginModal.querySelector("div:nth-child(2)") // Selects the actual content box
    : null;

  if (loginModal && closeModalButton && modalContent) {
    function openLoginModal(e) {
      e.preventDefault();
      // Show the modal overlay
      loginModal.classList.remove("opacity-0", "pointer-events-none");
      loginModal.classList.add("opacity-100");
      // Slide in the modal content
      modalContent.classList.remove("translate-y-4");
      modalContent.classList.add("translate-y-0");
      closeMenu(); // Corrective action: Ensure mobile menu is closed
    }

    function closeLoginModal() {
      // Hide the modal overlay
      loginModal.classList.remove("opacity-100");
      loginModal.classList.add("opacity-0", "pointer-events-none");
      // Slide out the modal content
      modalContent.classList.remove("translate-y-0");
      modalContent.classList.add("translate-y-4");
    }

    // Attach listeners for opening and closing the modal
    openModalButtons.forEach((button) => {
      button.addEventListener("click", openLoginModal);
    });
    closeModalButton.addEventListener("click", closeLoginModal);

    // Close when clicking outside the modal content
    loginModal.addEventListener("click", (e) => {
      if (e.target === loginModal) {
        closeLoginModal();
      }
    });

    // Close when pressing the ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && loginModal.classList.contains("opacity-100")) {
        closeLoginModal();
      }
    });
  }
}

// ----------------------------------------------------------
// MODULE 2: SMOOTH SCROLLING (ANCHOR LINKS)
// ----------------------------------------------------------
function setupSmoothScrolling() {
  const header = document.querySelector("header");
  // Selects all valid anchor links that start with # but are not just #
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

  if (!anchorLinks.length || !header) return;

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Get the height of the fixed header to apply an offset
        const headerHeight = header.offsetHeight;
        // Calculate the scroll position (Element Top Position - Header Height)
        const targetPosition = targetElement.offsetTop - headerHeight;

        // Perform the smooth scroll
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// ----------------------------------------------------------
// MODULE 3: HERO SLIDESHOW
// ----------------------------------------------------------
function setupHeroSlideshow() {
  const heroSlideshowContainer = document.getElementById(
    "hero-slideshow-container",
  );

  // IMPORTANT: Update these URLs to your actual image paths in /assets/images/header-images/
  const backgroundImages = [
    "assets/images/header-images/hero-img.jpg",
    "assets/images/header-images/1255.jpg",
    "assets/images/header-images/1256.jpg",
  ];

  let currentImageIndex = 0;
  const slideIntervalTime = 10000; // 10 seconds per slide
  let slideshowTimer;
  // Media Query for the 'md' breakpoint (768px in Tailwind)
  const mediaQuery = window.matchMedia("(min-width: 768px)");

  if (!heroSlideshowContainer || backgroundImages.length === 0) return;

  // 1. Create and inject the image divs into the container
  backgroundImages.forEach((imageUrl) => {
    const imgDiv = document.createElement("div");
    imgDiv.className =
      "w-screen h-full bg-cover bg-center bg-no-repeat flex-shrink-0";
    imgDiv.style.backgroundImage = `url('${imageUrl}')`;
    heroSlideshowContainer.appendChild(imgDiv);
  });

  // 2. Set the CSS variable for the total container width (e.g., 3 images = 300%)
  heroSlideshowContainer.style.setProperty(
    "--image-count",
    backgroundImages.length,
  );

  // Function to perform the slide transition
  function slideHeroBackground() {
    currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    // Move the container horizontally using viewport width (vw)
    heroSlideshowContainer.style.transform = `translateX(-${currentImageIndex * 100}vw)`;
  }

  // Function to start or stop the slideshow based on the screen size
  function startSlideshow() {
    clearInterval(slideshowTimer);

    if (mediaQuery.matches) {
      // Start the slideshow for desktop
      currentImageIndex = 0;
      heroSlideshowContainer.style.transform = `translateX(0vw)`;
      slideshowTimer = setInterval(slideHeroBackground, slideIntervalTime);
    } else {
      // Stop and reset to the first image for mobile
      heroSlideshowContainer.style.transform = `translateX(0vw)`;
      currentImageIndex = 0;
    }
  }

  // --- Initialization ---
  startSlideshow();
  // Re-run startSlideshow whenever the screen size crosses the 'md' breakpoint
  mediaQuery.addEventListener("change", startSlideshow);
}

// ----------------------------------------------------------
// CORE ENTRY POINT
// Executes all setup functions after the DOM is fully loaded.
// ----------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  setupMobileMenuAndModal();
  setupSmoothScrolling();
  setupHeroSlideshow();
});
