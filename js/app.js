// --- Aplicação Principal ---
import { auth } from './firebase-config.js';
import { db } from './firebase-config.js';
import { loginWithGoogle, logout } from './auth.js';
import { initNavigation, initFeedbackSystem, initConfirmSystem } from './ui-utils.js';
import { initMobileMenu } from './mobile-menu.js';
import { initI18n, toggleLanguage, t } from './i18n.js'; // Importar 't'
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
// NOVO: Importar funções do Firestore necessárias para o painel
import {
    doc,
    onSnapshot,
    collection
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";


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

    // --- NOVO: Lógica dos Widgets do Painel ---
    const dashboardMetasContent = document.getElementById('dashboardMetasContent');
    const dashboardTasksList = document.getElementById('dashboardTasksList');

    // Carrega Metas no Painel
    if (dashboardMetasContent) {
        const metasDocRef = doc(db, `artifacts/${appId}/users/${userId}/metas/diarias`);
        onSnapshot(metasDocRef, (docSnap) => {
            if (docSnap.exists() && docSnap.data().content) {
                // Preenche o widget de metas no dashboard
                dashboardMetasContent.innerText = docSnap.data().content;
            } else {
                dashboardMetasContent.innerText = t('dashboard.goals.empty');
            }
        }, (error) => {
             console.error("Erro ao carregar metas do painel: ", error);
             dashboardMetasContent.innerText = "Erro ao carregar metas.";
        });
    }

    // Carrega Tarefas no Painel
    if (dashboardTasksList) {
        const todoCollectionRef = collection(db, `artifacts/${appId}/users/${userId}/tarefas`);
        onSnapshot(todoCollectionRef, (snapshot) => {
            const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const pendingTasks = tasks.filter(task => !task.completed);
            
            dashboardTasksList.innerHTML = ''; // Limpa a lista
            
            if (pendingTasks.length === 0) {
                const li = document.createElement('li');
                li.className = 'text-gray-500';
                li.textContent = t('dashboard.tasks.empty');
                dashboardTasksList.appendChild(li);
            } else {
                // Limita a 4 tarefas
                pendingTasks.slice(0, 4).forEach(task => {
                    const li = document.createElement('li');
                    li.className = 'py-1 border-b border-gray-200 last:border-b-0 truncate';
                    li.textContent = task.text;
                    dashboardTasksList.appendChild(li);
                });
                // Adiciona contador "e mais..."
                if (pendingTasks.length > 4) {
                    const li = document.createElement('li');
                    li.className = 'pt-2 text-sm text-indigo-600 font-medium';
                    li.textContent = `+ ${pendingTasks.length - 4} ${t('dashboard.tasks.more')}`;
                    dashboardTasksList.appendChild(li);
                }
            }
        }, (error) => {
            console.error("Erro ao carregar tarefas do painel: ", error);
            dashboardTasksList.innerHTML = '<li class="text-red-500">Erro ao carregar tarefas.</li>';
        });
    }
    // --- Fim da Lógica do Painel ---
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