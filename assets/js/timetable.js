// /assets/js/timetable.js
// Handles the creation and management of the dynamic tooltip for the weekly class schedule.

// Global variable to hold the reference to the currently visible tooltip element
let currentTooltip = null;

// ----------------------------------------------------------
// HELPER FUNCTIONS
// ----------------------------------------------------------

/**
 * Creates and displays the tooltip based on the data attributes of the cell.
 * @param {HTMLElement} cell The timetable cell element being hovered over.
 */
function createTooltip(cell) {
  // Get class details from HTML data attributes
  const title = cell.getAttribute("data-title");
  const trainer = cell.getAttribute("data-trainer");
  const focus = cell.getAttribute("data-focus");

  // 1. Create the tooltip element (a div)
  const tooltip = document.createElement("div");
  tooltip.className =
    "absolute z-50 p-4 w-64 bg-yellow-400 text-gray-900 rounded-lg shadow-xl pointer-events-none transition-opacity duration-300";

  // 2. Populate the content
  tooltip.innerHTML = `
        <p class="text-lg font-bold mb-1">${title}</p>
        <p class="text-sm font-semibold mb-2">Coach: ${trainer}</p>
        <p class="text-xs text-gray-800">${focus}</p>
        <div class="absolute w-3 h-3 bg-yellow-400 transform rotate-45 -bottom-1 left-4"></div>
    `;

  // 3. Position the tooltip relative to the cell
  // Get position of the cell relative to the viewport
  const rect = cell.getBoundingClientRect();

  // Position the tooltip just below and slightly to the right of the cell
  // Adding window.scrollY accounts for the page scroll position
  tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
  tooltip.style.left = `${rect.left + window.scrollX + 5}px`;

  // 4. Append to the body and update global reference
  document.body.appendChild(tooltip);
  currentTooltip = tooltip;
}

/**
 * Removes the currently visible tooltip from the DOM.
 */
function removeTooltip() {
  if (currentTooltip) {
    // Optional: Add a brief fade-out class before removing
    currentTooltip.classList.add("opacity-0");

    // Remove after a short delay to allow transition effect
    setTimeout(() => {
      if (currentTooltip && currentTooltip.parentNode) {
        currentTooltip.parentNode.removeChild(currentTooltip);
      }
      currentTooltip = null;
    }, 100);
  }
}

// ----------------------------------------------------------
// MODULE ENTRY POINT
// ----------------------------------------------------------

function setupTimetableTooltips() {
  const classCells = document.querySelectorAll(".class-cell");

  // Add event listeners to all class cells
  classCells.forEach((cell) => {
    cell.addEventListener("mouseenter", () => {
      removeTooltip();
      createTooltip(cell);
    });

    // Use mouseleave on the parent cell to remove the tooltip
    cell.addEventListener("mouseleave", removeTooltip);
  });
}

// Initialization: Run the setup function only on the timetable page after the DOM is loaded.
document.addEventListener("DOMContentLoaded", setupTimetableTooltips);
