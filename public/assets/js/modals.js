// /assets/js/modals.js

import { closeMenu } from './helpers.js';

export function setupModals() {
    // --- ELEMENTOS PARTILHADOS ---
    const loginModal = document.getElementById("login-modal");
    const registerModal = document.getElementById("register-modal");
    
    // Seletores de Conteúdo (para animação scale)
    const modalContent = loginModal
        ? loginModal.querySelector("div:nth-child(2)") 
        : null;
    const registerContent = registerModal
        ? registerModal.querySelector("div:nth-child(2)") 
        : null;
    
    // Links de switch
    const switchToRegisterLink = document.getElementById("switch-to-register");
    const switchToLoginLink = document.getElementById("switch-to-login");

    // --- FUNÇÕES DE LOGIN ---

    function openLoginModal(e) {
        if (e) e.preventDefault();
        if (!loginModal || !modalContent) return;

        // Mostrar o modal
        loginModal.classList.remove("opacity-0", "pointer-events-none");
        loginModal.classList.add("opacity-100");
        // Animação de slide in
        modalContent.classList.remove("scale-95");
        modalContent.classList.add("scale-100");
        closeMenu(); // Garante que o menu móvel fecha
    }

    function closeLoginModal() {
        if (!loginModal || !modalContent) return;
        
        // Esconder o modal
        loginModal.classList.remove("opacity-100");
        loginModal.classList.add("opacity-0", "pointer-events-none");
        // Animação de slide out
        modalContent.classList.remove("scale-100");
        modalContent.classList.add("scale-95");
    }

    // --- FUNÇÕES DE REGISTO ---

    function openRegisterModal(e) {
        if (e) e.preventDefault();
        if (!registerModal || !registerContent) return;

        // Mostrar o modal
        registerModal.classList.remove("opacity-0", "pointer-events-none");
        registerModal.classList.add("opacity-100");
        // Animação de slide in
        registerContent.classList.remove("scale-95");
        registerContent.classList.add("scale-100");
        closeMenu(); // Garante que o menu móvel fecha
    }

    function closeRegisterModal() {
        if (!registerModal || !registerContent) return;
        
        // Esconder o modal
        registerModal.classList.remove("opacity-100");
        registerModal.classList.add("opacity-0", "pointer-events-none");
        // Animação de slide out
        registerContent.classList.remove("scale-100");
        registerContent.classList.add("scale-95");
    }


    // --- ATTACH LISTENERS (LOGIN) ---
    if (loginModal) {
        const openModalButtons = [
            document.getElementById("open-login-modal"),
            document.getElementById("open-login-modal-mobile"),
        ].filter((btn) => btn);
        const closeModalButton = document.getElementById("close-login-modal");

        // Abrir/Fechar
        openModalButtons.forEach((button) => button.addEventListener("click", openLoginModal));
        if (closeModalButton) closeModalButton.addEventListener("click", closeLoginModal);
        
        // Fechar ao clicar no overlay ou ESC
        loginModal.addEventListener("click", (e) => { if (e.target === loginModal) closeLoginModal(); });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && loginModal.classList.contains("opacity-100")) closeLoginModal();
        });

        // Switch Login -> Register
        if (switchToRegisterLink) {
            switchToRegisterLink.addEventListener("click", (e) => {
                e.preventDefault();
                closeLoginModal();
                // Pequeno delay para a animação de fecho (180ms)
                setTimeout(() => openRegisterModal(e), 180); 
            });
        }
    }

    // --- ATTACH LISTENERS (REGISTO) ---
    if (registerModal) {
        const closeRegisterButton = document.getElementById("close-register-modal");
        
        if (closeRegisterButton) closeRegisterButton.addEventListener("click", closeRegisterModal);

        // Fechar ao clicar no overlay ou ESC
        registerModal.addEventListener("click", (e) => { if (e.target === registerModal) closeRegisterModal(); });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && registerModal.classList.contains("opacity-100")) closeRegisterModal();
        });

        // Switch Register -> Login
        if (switchToLoginLink) {
            switchToLoginLink.addEventListener("click", (e) => {
                e.preventDefault();
                closeRegisterModal();
                // Pequeno delay para a animação de fecho (180ms)
                setTimeout(() => openLoginModal(e), 180); 
            });
        }
    }
}