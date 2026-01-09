// /assets/js/slideshow.js

export function setupHeroSlideshow() {
  const container = document.getElementById("hero-slideshow-container");
  if (!container) return;

  container.innerHTML = "";

  const images = [
    "assets/images/header-images/hero-img.jpg",
    "assets/images/header-images/1255.jpg",
    "assets/images/header-images/1256.jpg",
  ];

  if (images.length === 0) return;

  let currentIndex = 0;
  const intervalTime = 10000;
  let timer = null;

  const desktopQuery = window.matchMedia("(min-width: 768px)");

  images.forEach((imageUrl) => {
    const slide = document.createElement("div");

    // flex-shrink-0 prevents the images from squishing
    // w-[100vw] forces the image to be exactly the size of the screen
    slide.className =
      "h-full w-[100vw] bg-cover bg-center bg-no-repeat flex-shrink-0";

    slide.style.backgroundImage = `url('${imageUrl}')`;
    container.appendChild(slide);
  });

  container.style.setProperty("--image-count", images.length);

  function moveToNextSlide() {
    currentIndex = (currentIndex + 1) % images.length;

    // If you have 3 images, 100/3 = 33.33%
    // Moving by 33.33% moves exactly one screen width
    const translateValue = currentIndex * (100 / images.length);
    container.style.transform = `translateX(-${translateValue}%)`;
  }

  function startSlideshow() {
    if (timer) clearInterval(timer); // Clean up existing timer

    if (desktopQuery.matches) {
      currentIndex = 0;
      container.style.transform = "translateX(0%)";
      timer = setInterval(moveToNextSlide, intervalTime);
    } else {
      container.style.transform = "translateX(0%)";
      currentIndex = 0;
    }
  }

  startSlideshow();
  desktopQuery.addEventListener("change", startSlideshow);
}
