// --- Aplicação Principal ---
import { auth } from './firebase-config.js';
import { db } from './firebase-config.js';
import { loginWithGoogle, logout } from './auth.js';
import { initNavigation, initFeedbackSystem, initConfirmSystem } from './ui-utils.js';
import { initMobileMenu } from './mobile-menu.js';
import { initI18n, toggleLanguage } from './i18n.js';
import { initTodoApp } from './modules/todo.js';
import { initHabitosApp } from './modules/habitos.js';
import { initFlashcardApp } from './modules/flashcards.js';
import { initNotepadApp } from './modules/notepad.js';
import { initLinksApp } from './modules/links.js';
import { initMetasApp } from './modules/metas.js';
import { initPomodoroApp } from './modules/pomodoro.js';
import { initCalculadoraApp } from './modules/calculadora.js';
import { initMusicaApp } from './modules/musica.js';
import { initGraficosApp } from './modules/graficos.js';
import { initCalendarioApp } from './modules/calendario.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// Variáveis para elementos do DOM
let mainAppDiv, loginDiv, loginBtn, logoutBtn, userEmailDisplay;

// Função principal de inicialização
function initApp() {
    // Inicializa sistema de internacionalização
    initI18n();

    // Adiciona listeners aos botões de troca de idioma
    const languageToggle = document.getElementById('languageToggle');
    const languageToggleMobile = document.getElementById('languageToggleMobile');

    if (languageToggle) {
        languageToggle.addEventListener('click', toggleLanguage);
    }
    if (languageToggleMobile) {
        languageToggleMobile.addEventListener('click', toggleLanguage);
    }

    // Adiciona listeners aos botões de login/logout
    loginBtn.addEventListener('click', loginWithGoogle);
    logoutBtn.addEventListener('click', logout);

    // Ouve o estado da autenticação
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // --- USUÁRIO ESTÁ LOGADO ---
            mainAppDiv.style.display = 'flex'; // Mostra o app
            loginDiv.style.display = 'none'; // Esconde o login
            userEmailDisplay.textContent = user.email; // Mostra o email

            const appId = 'studyhub-hackpad';

            // Inicializa os componentes que dependem do Firebase
            initComponents(db, auth, appId, user.uid);
        } else {
            // --- USUÁRIO ESTÁ DESLOGADO ---
            mainAppDiv.style.display = 'none'; // Esconde o app
            loginDiv.style.display = 'flex'; // Mostra o login
            userEmailDisplay.textContent = '';
        }
    });
}

// Esta função wrapper será chamada APÓS o login
function initComponents(db, auth, appId, userId) {
    // --- Verificação de Inicialização ---
    if (!db || !userId) {
        console.error("Firebase não inicializado corretamente. Os aplicativos conectados à nuvem não funcionarão.");
        return;
    }

    // Inicializa sistemas de UI
    initNavigation();
    initMobileMenu();
    const showFeedback = initFeedbackSystem();
    const showConfirm = initConfirmSystem();

    // --- INICIALIZAÇÃO DE TODOS OS MÓDULOS ---
    initTodoApp(appId, userId, showFeedback);
    initHabitosApp(appId, userId, showFeedback);
    initFlashcardApp(appId, userId, showFeedback, showConfirm);
    initNotepadApp(appId, userId, showFeedback);
    initLinksApp(appId, userId, showFeedback);
    initMetasApp(appId, userId, showFeedback);
    initPomodoroApp();
    initCalculadoraApp();
    initMusicaApp();
    initGraficosApp(appId, userId, showFeedback);
    initCalendarioApp(appId, userId, showFeedback);
}

// O script espera o DOM carregar ANTES de tentar encontrar
// os elementos e inicializar o app.
document.addEventListener('DOMContentLoaded', () => {
    // Agora é seguro buscar os elementos
    mainAppDiv = document.getElementById('main-app');
    loginDiv = document.getElementById('app-login');
    loginBtn = document.getElementById('loginWithGoogleBtn');
    logoutBtn = document.getElementById('logoutBtn');
    userEmailDisplay = document.getElementById('userEmail');

    // Inicia a aplicação
    initApp();
});
