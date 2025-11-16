// --- Módulo: Bloco de Notas (Firestore) ---
import { db } from '../firebase-config.js';
import {
    doc,
    setDoc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

export function initNotepadApp(appId, userId, showFeedback) {
    const notepadText = document.getElementById('notepadText');
    const saveNoteBtn = document.getElementById('saveNoteBtn');

    const notepadDocRef = doc(db, `artifacts/${appId}/users/${userId}/blocoDeNotas/unicaNota`);

    function loadNote() {
        onSnapshot(notepadDocRef, (docSnap) => {
            if (docSnap.exists()) {
                notepadText.value = docSnap.data().content || '';
            } else {
                notepadText.value = '';
            }
        }, (error) => {
            console.error("Erro ao carregar nota: ", error);
            notepadText.value = "Erro ao carregar nota.";
        });
    }

    async function saveNote() {
        try {
            await setDoc(notepadDocRef, { content: notepadText.value });
            showFeedback('Anotação salva!');
        } catch (e) {
            console.error("Erro ao salvar nota: ", e);
            showFeedback('Erro ao salvar.');
        }
    }

    saveNoteBtn.addEventListener('click', saveNote);
    loadNote();
}
