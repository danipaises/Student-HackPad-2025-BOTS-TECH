// --- Módulo: Metas Diárias (Firestore) ---
import { db } from '../firebase-config.js';
import {
    doc,
    setDoc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

export function initMetasApp(appId, userId, showFeedback) {
    const metasText = document.getElementById('metasText');
    const saveMetasBtn = document.getElementById('saveMetasBtn');

    const metasDocRef = doc(db, `artifacts/${appId}/users/${userId}/metas/diarias`);

    onSnapshot(metasDocRef, (docSnap) => {
        if (docSnap.exists()) {
            metasText.value = docSnap.data().content || '';
        } else {
            metasText.value = '1. \n2. \n3. ';
        }
    }, (error) => {
        console.error("Erro ao carregar metas: ", error);
        metasText.value = "Erro ao carregar metas.";
    });

    saveMetasBtn.addEventListener('click', async () => {
        try {
            await setDoc(metasDocRef, { content: metasText.value });
            showFeedback('Metas salvas!');
        } catch (e) {
            console.error("Erro ao salvar metas: ", e);
            showFeedback('Erro ao salvar.');
        }
    });
}
