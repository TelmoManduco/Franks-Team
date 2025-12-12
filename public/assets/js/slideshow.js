// /assets/js/slideshow.js

/**
 * Sets up a simple horizontal slideshow for the hero section.
 * - Desktop: auto-slide every X seconds
 * - Mobile: static first image (no sliding)
 * - Uses CSS translateX for smooth horizontal transitions
 */

export function setupHeroSlideshow() {
  /*
    const heroSlideshowContainer = document.getElementById(
        "hero-slideshow-container",
    );

    if (!heroSlideshowContainer) return;

    // Limpar o conteúdo antes de injetar (como no original)
    heroSlideshowContainer.innerHTML = ""; 

    // IMPORTANT: Update these URLs to your actual image paths
    const backgroundImages = [
        "assets/images/header-images/hero-img.jpg",
        "assets/images/header-images/1255.jpg",
        "assets/images/header-images/1256.jpg",
    ];

    let currentImageIndex = 0;
    const slideIntervalTime = 10000; // 10 seconds per slide
    let slideshowTimer;
    // Media Query para o breakpoint 'md'
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    if (backgroundImages.length === 0) return;

    // 1. Criação e injeção dos divs de imagem
    backgroundImages.forEach((imageUrl) => {
        const imgDiv = document.createElement("div");
        imgDiv.className =
            "w-screen h-full bg-cover bg-center bg-no-repeat flex-shrink-0";
        imgDiv.style.backgroundImage = `url('${imageUrl}')`;
        heroSlideshowContainer.appendChild(imgDiv);
    });

    // 2. Definir a variável CSS
    heroSlideshowContainer.style.setProperty(
        "--image-count",
        backgroundImages.length,
    );

    // Função para a transição
    function slideHeroBackground() {
        currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
        // Mover o container horizontalmente
        heroSlideshowContainer.style.transform = `translateX(-${currentImageIndex * 100}vw)`;
    }

    // Função para iniciar/parar o slideshow com base no tamanho do ecrã
    function startSlideshow() {
        clearInterval(slideshowTimer);

        if (mediaQuery.matches) {
            // Iniciar para desktop
            currentImageIndex = 0;
            heroSlideshowContainer.style.transform = `translateX(0vw)`;
            slideshowTimer = setInterval(slideHeroBackground, slideIntervalTime);
        } else {
            // Parar e redefinir para o primeiro slide no móvel
            heroSlideshowContainer.style.transform = `translateX(0vw)`;
            currentImageIndex = 0;
        }
    }

    // --- Inicialização ---
    startSlideshow();
    // Re-executar quando o ecrã ultrapassa o breakpoint 'md'
    mediaQuery.addEventListener("change", startSlideshow);
    */

  const container = document.getElementById("hero-slideshow-container");
  if (!container) return;

  // Clear existing content before injecting images
  container.innerHTML = "";

  // -----------------------------------------------
  // IMAGE LIST — Update these paths if needed
  // -----------------------------------------------
  const images = [
    "assets/images/header-images/hero-img.jpg",
    "assets/images/header-images/1255.jpg",
    "assets/images/header-images/1256.jpg",
  ];

  if (images.length === 0) return;

  let currentIndex = 0;
  const intervalTime = 10000; // 10 seconds per slide
  let timer = null;

  // Match the Tailwind 'md' breakpoint (desktop starts at 768px)
  const desktopQuery = window.matchMedia("(min-width: 768px)");

  // -----------------------------------------------
  // Create and inject a DIV for each image
  // -----------------------------------------------
  images.forEach((imageUrl) => {
    const slide = document.createElement("div");

    slide.className =
      "w-screen h-full bg-cover bg-center bg-no-repeat flex-shrink-0";

    slide.style.backgroundImage = `url('${imageUrl}')`;

    container.appendChild(slide);
  });

  // Set CSS variable with the number of images
  container.style.setProperty("--image-count", images.length);

  // -----------------------------------------------
  // Slide transition function (moves container horizontally)
  // -----------------------------------------------
  function moveToNextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    container.style.transform = `translateX(-${currentIndex * 100}vw)`;
  }

  // -----------------------------------------------
  // Start or stop slideshow depending on screen size
  // -----------------------------------------------
  function startSlideshow() {
    // Always clear any previous timer
    clearInterval(timer);

    if (desktopQuery.matches) {
      // Desktop mode: slideshow enabled
      currentIndex = 0;
      container.style.transform = "translateX(0vw)";

      timer = setInterval(moveToNextSlide, intervalTime);
    } else {
      // Mobile mode: static first image only
      container.style.transform = "translateX(0vw)";
      currentIndex = 0;
    }
  }

  // -----------------------------------------------
  // INITIALIZATION
  // -----------------------------------------------
  startSlideshow();

  // Re-run logic whenever the screen passes the md breakpoint
  desktopQuery.addEventListener("change", startSlideshow);
}
