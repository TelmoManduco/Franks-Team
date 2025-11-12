// /assets/js/faq.js
// Handles the accordion functionality for the Frequently Asked Questions (FAQ) section.

// ----------------------------------------------------------
// MODULE: FAQ ACCORDION
// ----------------------------------------------------------
function setupFAQAccordion() {
  // Selects all the clickable header elements of the FAQ items
  const faqHeaders = document.querySelectorAll(".faq-header");

  faqHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling; // The content is the immediate next sibling element
      const icon = header.querySelector("svg"); // The icon to be rotated

      // 1. Close all other FAQ items (maintaining only one open at a time)
      faqHeaders.forEach((otherHeader) => {
        if (otherHeader !== header) {
          const otherContent = otherHeader.nextElementSibling;
          const otherIcon = otherHeader.querySelector("svg");
          otherContent.classList.add("hidden");
          otherHeader.setAttribute("aria-expanded", "false");
          if (otherIcon) otherIcon.classList.remove("rotate-45");
        }
      });

      // 2. Toggle the clicked item (Open or Close)
      const isExpanded = header.getAttribute("aria-expanded") === "true";

      if (isExpanded) {
        // If it's open, close it
        content.classList.add("hidden");
        header.setAttribute("aria-expanded", "false");
        if (icon) icon.classList.remove("rotate-45");
      } else {
        // If it's closed, open it
        content.classList.remove("hidden");
        header.setAttribute("aria-expanded", "true");
        if (icon) icon.classList.add("rotate-45"); // Rotates the icon to look like a 'X' or '-'
      }
    });
  });
}

// Initialization: Run the setup function once the HTML content is loaded.
document.addEventListener("DOMContentLoaded", setupFAQAccordion);
