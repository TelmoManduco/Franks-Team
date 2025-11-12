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

  // ==========================================================
  // SEÇÃO 4: SLIDESHOW AUTOMÁTICO (10s) COM EFEITO SLIDE
  // Ativo apenas a partir de 768px (md)
  // ==========================================================
  const heroSlideshowContainer = document.getElementById(
    "hero-slideshow-container",
  );

  // **IMPORTANTE:** Mude estes URLs de imagem para as suas imagens reais!
  const backgroundImages = [
    "assets/images/header-images/hero-img.jpg",
    "assets/images/header-images/1255.jpg",
    "assets/images/header-images/1256.jpg",
    // Adicione mais imagens aqui, se desejar
  ];

  let currentImageIndex = 0;
  const slideIntervalTime = 10000; // 10 segundos
  let slideshowTimer;

  // Media Query para 768px (Breakpoint MD do Tailwind)
  const mediaQuery = window.matchMedia("(min-width: 768px)");

  if (heroSlideshowContainer && backgroundImages.length > 0) {
    // 1. Cria e injeta as divs de imagem no container
    backgroundImages.forEach((imageUrl) => {
      const imgDiv = document.createElement("div");

      // CORREÇÃO CRÍTICA: USAR 'w-screen' em vez de 'w-full' para forçar a largura do ecrã
      imgDiv.className =
        "w-screen h-full bg-cover bg-center bg-no-repeat flex-shrink-0";
      imgDiv.style.backgroundImage = `url('${imageUrl}')`;
      heroSlideshowContainer.appendChild(imgDiv);
    });

    // 2. Define a variável CSS para o width total do container (3 imagens = 300%)
    heroSlideshowContainer.style.setProperty(
      "--image-count",
      backgroundImages.length,
    );

    /**
     * Função que executa o efeito de slide.
     */
    function slideHeroBackground() {
      // Calcula o próximo índice
      currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;

      // Move o container das imagens horizontalmente
      // NOTA: Agora o translateX usa w-screen. O cálculo é: 100% * index.
      heroSlideshowContainer.style.transform = `translateX(-${currentImageIndex * 100}vw)`;
    }

    /**
     * Inicia/Reinicia o timer do slideshow automático (apenas se for desktop).
     */
    function startSlideshow() {
      // Limpa qualquer timer antigo antes de iniciar um novo
      clearInterval(slideshowTimer);

      if (mediaQuery.matches) {
        // Reinicia o índice e a posição quando o slideshow é ativado/reiniciado
        currentImageIndex = 0;
        heroSlideshowContainer.style.transform = `translateX(0vw)`;

        slideshowTimer = setInterval(() => {
          slideHeroBackground();
        }, slideIntervalTime);
      } else {
        // Se estiver em mobile, garante que o timer é parado e a primeira imagem é visível
        heroSlideshowContainer.style.transform = `translateX(0vw)`;
        currentImageIndex = 0; // Garante que a primeira imagem está sempre visível
      }
    }

    // --- Inicialização ---

    // Inicia o slideshow SE o ecrã for grande o suficiente (ou ajusta para mobile)
    startSlideshow();

    // Adiciona listener para redimensionamento, para parar/iniciar conforme necessário
    mediaQuery.addEventListener("change", startSlideshow);
  }

  // ==========================================================
  // SEÇÃO 5: FAQ EXPANSÍVEL (ACCORDION)
  // ==========================================================
  function setupFAQAccordion() {
    // Seleciona todos os botões de cabeçalho do FAQ
    const faqHeaders = document.querySelectorAll(".faq-header");

    faqHeaders.forEach((header) => {
      header.addEventListener("click", () => {
        const content = header.nextElementSibling; // O conteúdo é o elemento irmão seguinte
        const icon = header.querySelector("svg"); // 1. FECHAR OS OUTROS (para manter apenas um aberto de cada vez)

        faqHeaders.forEach((otherHeader) => {
          if (otherHeader !== header) {
            const otherContent = otherHeader.nextElementSibling;
            const otherIcon = otherHeader.querySelector("svg"); // Colapsa e reseta o ícone
            otherContent.classList.add("hidden");
            otherHeader.setAttribute("aria-expanded", "false");
            otherIcon.classList.remove("rotate-45");
          }
        }); // 2. TOGGLE: Abre ou fecha o item clicado

        const isExpanded = header.getAttribute("aria-expanded") === "true";

        if (isExpanded) {
          // Se estiver aberto, fecha
          content.classList.add("hidden");
          header.setAttribute("aria-expanded", "false");
          icon.classList.remove("rotate-45");
        } else {
          // Se estiver fechado, abre
          content.classList.remove("hidden");
          header.setAttribute("aria-expanded", "true");
          icon.classList.add("rotate-45"); // Gira o ícone para se parecer com um 'X' ou '-'
        }
      });
    });
  }

  // CORREÇÃO: Chamada da função movida para dentro do DOMContentLoaded
  // O código é executado aqui, logo após o seu Slideshow (Seção 4)
  setupFAQAccordion();
});
