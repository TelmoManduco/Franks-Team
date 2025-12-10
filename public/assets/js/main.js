// /assets/js/main.js
// Ponto de Entrada principal do JavaScript.

// Importa os módulos criados
import { setupMobileMenu } from './menu.js';
import { setupModals } from './modals.js';
import { setupSmoothScrolling } from './smooth-scroll.js';
import { setupHeroSlideshow } from './slideshow.js';
import { setupForms } from './forms.js'; // Incluímos a função do ficheiro futuro

// O Core Entry Point do seu core.js original foi movido para aqui:
document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM totalmente carregado. Inicializando módulos.");
    
    // Executa todas as funções de configuração
    setupMobileMenu();
    setupModals();
    setupSmoothScrolling();
    setupHeroSlideshow();
    
    // Módulo pronto para receber a lógica de submissão (Backend/Fetch)
    setupForms(); 
});