document.addEventListener("DOMContentLoaded", () => {
  const faqHeaders = document.querySelectorAll(".faq-header");

  faqHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      const icon = header.querySelector('[data-icon="plus"]');
      const isExpanded = header.getAttribute("aria-expanded") === "true";

      // 1. Close other items for a true accordion effect
      faqHeaders.forEach((otherHeader) => {
        if (otherHeader !== header) {
          otherHeader.setAttribute("aria-expanded", "false");
          const otherContent = otherHeader.nextElementSibling;
          const otherIcon = otherHeader.querySelector('[data-icon="plus"]');

          otherContent.style.maxHeight = null;
          if (otherIcon) otherIcon.classList.remove("rotate-45");
        }
      });

      // 2. Toggle current item
      if (isExpanded) {
        header.setAttribute("aria-expanded", "false");
        content.style.maxHeight = null;
        if (icon) icon.classList.remove("rotate-45");
      } else {
        header.setAttribute("aria-expanded", "true");
        // Use scrollHeight to tell the browser exactly how tall the content is
        content.style.maxHeight = content.scrollHeight + "px";
        if (icon) icon.classList.add("rotate-45");
      }
    });
  });
});
