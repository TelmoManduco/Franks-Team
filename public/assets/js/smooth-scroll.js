// /assets/js/smooth-scroll.js

export function setupSmoothScrolling() {
    const header = document.querySelector("header");
    // Seleciona todos os links âncora válidos que começam com # mas não são apenas #
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

    if (!anchorLinks.length || !header) return;

    anchorLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Obter a altura do cabeçalho fixo (header) para aplicar um offset
                const headerHeight = header.offsetHeight;
                // Calcular a posição de rolagem (Posição Superior do Elemento - Altura do Cabeçalho)
                const targetPosition = targetElement.offsetTop - headerHeight;

                // Executar a rolagem suave
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });
            }
        });
    });
}