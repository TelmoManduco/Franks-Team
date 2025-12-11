// /assets/js/slideshow.js

export function setupHeroSlideshow() {
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
}
