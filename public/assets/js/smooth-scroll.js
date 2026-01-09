/**
 * /assets/js/smooth-scroll.js
 * Handles internal navigation and the floating back-to-top button.
 */

export function setupSmoothScrolling() {
  const header = document.querySelector("header");
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

  // Select mobile menu elements to close them on navigation
  const mobileMenu = document.getElementById("mobile-menu");
  const menuOverlay = document.getElementById("menu-overlay");

  if (!anchorLinks.length || !header) return;

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // 1. Close mobile menu if it's open (Prevents menu staying stuck on screen)
        if (mobileMenu && !mobileMenu.classList.contains("translate-x-full")) {
          mobileMenu.classList.add("translate-x-full");
          if (menuOverlay) {
            menuOverlay.classList.add("opacity-0", "pointer-events-none");
            menuOverlay.classList.remove("opacity-100", "pointer-events-auto");
          }
        }

        // 2. Calculate position with dynamic header offset
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        // 3. Execute Smooth Scroll
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // 4. Update URL hash without the "jump"
        window.history.pushState(null, null, targetId);
      }
    });
  });
}

/**
 * Logic for the Floating Back to Top Button
 * Specifically optimized for mobile visibility and transparency.
 */
export function setupBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top");

  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    // Show button after scrolling down 400px (roughly 1-2 screen lengths)
    if (window.scrollY > 400) {
      backToTopBtn.classList.remove("opacity-0", "pointer-events-none");
      backToTopBtn.classList.add("opacity-100", "pointer-events-auto");
    } else {
      backToTopBtn.classList.add("opacity-0", "pointer-events-none");
      backToTopBtn.classList.remove("opacity-100", "pointer-events-auto");
    }
  });

  // Smooth scroll back to absolute top (0)
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
