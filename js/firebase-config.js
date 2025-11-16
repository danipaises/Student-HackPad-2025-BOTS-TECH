// --- Configuração do Firebase ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD1j7ynpoB_Qalk8h9xZPmCSnAGCwKhHGk",
    authDomain: "strange-descent-449722-b5.firebaseapp.com",
    projectId: "strange-descent-449722-b5",
    storageBucket: "strange-descent-449722-b5.firebasestorage.app",
    messagingSenderId: "563644382085",
    appId: "1:563644382085:web:9a8b42cceec735247ce2ec"
};

// Lembrete sobre o Erro "auth/unauthorized-domain"
console.warn(
    'Lembrete: O erro "auth/unauthorized-domain" deve ser corrigido no Console do Firebase. ' +
    'Adicione este domínio à lista de "Domínios autorizados" na aba "Authentication" -> "Sign-in method".'
);

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
