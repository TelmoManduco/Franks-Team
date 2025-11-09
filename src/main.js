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

  const loginModal = document.getElementById("login-modal");

  // Links para abrir o modal
  const openModalButtons = [
    document.getElementById("open-login-modal"),
    document.getElementById("open-login-modal-mobile"),
  ].filter((btn) => btn);

  const closeModalButton = document.getElementById("close-login-modal");
  // Conteúdo interno para o efeito de deslizar (a caixa branca)
  const modalContent = loginModal
    ? loginModal.querySelector("div:nth-child(2)")
    : null;

  if (loginModal && closeModalButton && modalContent) {
    function openLoginModal(e) {
      e.preventDefault();

      // 1. Torna o overlay do Login visível/clicável (Z-index superior ao menu)
      loginModal.classList.remove("opacity-0", "pointer-events-none");
      loginModal.classList.add("opacity-100");

      // 2. Efeito de deslizar do conteúdo
      modalContent.classList.remove("translate-y-4");
      modalContent.classList.add("translate-y-0");

      // 3. *Ação Corretiva*: Fecha o menu mobile se estiver aberto
      closeMenu();
    }

    function closeLoginModal() {
      // Torna o overlay do Login invisível/não clicável
      loginModal.classList.remove("opacity-100");
      loginModal.classList.add("opacity-0", "pointer-events-none");

      // Reposiciona o conteúdo
      modalContent.classList.remove("translate-y-0");
      modalContent.classList.add("translate-y-4");
    }

    // --- Atribuir Event Listeners ---
    openModalButtons.forEach((button) => {
      button.addEventListener("click", openLoginModal);
    });

    closeModalButton.addEventListener("click", closeLoginModal);

    // Fechar ao clicar fora do modal de login
    loginModal.addEventListener("click", (e) => {
      if (e.target === loginModal) {
        closeLoginModal();
      }
    });

    // Fechar ao pressionar a tecla ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && loginModal.classList.contains("opacity-100")) {
        closeLoginModal();
      }
    });
  }

  // ==========================================================
  // SEÇÃO 3: NAVEGAÇÃO SUAVE COM CORREÇÃO DE OFFSET (FINAL)
  // ==========================================================

  // 1. Obtém o cabeçalho para medir a sua altura (necessário para a correção)
  const header = document.querySelector("header");

  // Seleciona todos os links de âncora válidos
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

  if (anchorLinks.length > 0 && header) {
    anchorLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          // 1. OBTÉM A ALTURA REAL DO SEU HEADER (ex: 64px, 80px)
          const headerHeight = header.offsetHeight;

          // 2. CALCULA O DESTINO DA ROLAGEM
          // targetElement.offsetTop -> Posição do topo do elemento
          // - headerHeight -> Subtrai a altura do header
          const targetPosition = targetElement.offsetTop - headerHeight;

          // 3. Executa a rolagem suave para a nova posição calculada
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      });
    });
  }
});
