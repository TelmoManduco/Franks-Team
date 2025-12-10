// /assets/js/forms.js
// Módulo de Formulários

export function setupForms() {
    // LOGIN FORM
    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            console.log("LOGIN SUBMITTED!");
            // depois ligamos ao backend
        });
    }

    // REGISTER FORM
    const registerForm = document.getElementById("register-form");

    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            console.log("REGISTER SUBMITTED!");
        });
    }
}