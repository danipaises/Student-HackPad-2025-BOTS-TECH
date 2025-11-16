// --- Módulo de Autenticação ---
import { auth } from './firebase-config.js';
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// Função para fazer login com Google
export async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Erro ao fazer login com Google:", error);
    }
}

// Função para fazer logout
export async function logout() {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Erro ao fazer logout:", error);
    }
}
