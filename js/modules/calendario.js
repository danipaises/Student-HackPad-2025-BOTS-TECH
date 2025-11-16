// --- Módulo: Calendário de Eventos (Firestore) ---
import { db } from '../firebase-config.js';
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

export function initCalendarioApp(appId, userId, showFeedback) {
    const eventoInput = document.getElementById('eventoInput');
    const eventoDateInput = document.getElementById('eventoDateInput');
    const addEventoBtn = document.getElementById('addEventoBtn');
    const eventosList = document.getElementById('eventosList');

    const eventosCollectionRef = collection(db, `artifacts/${appId}/users/${userId}/eventos`);

    function renderEventos(eventos) {
        eventosList.innerHTML = '';
        if (eventos.length === 0) {
            eventosList.innerHTML = '<p class="text-gray-500 text-center">Nenhum evento agendado.</p>';
            return;
        }
        eventos.forEach(evento => {
            const li = document.createElement('li');
            li.className = 'flex items-center justify-between bg-gray-50 p-3 rounded-lg border';

            const dataFormatada = new Date(evento.date + 'T00:00:00-03:00').toLocaleDateString('pt-BR', {
                timeZone: 'America/Sao_Paulo',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });

            li.innerHTML = `
                <div>
                    <span class="font-medium text-indigo-700">${dataFormatada}</span>
                    <p class="text-gray-900">${evento.text}</p>
                </div>
                <button data-id="${evento.id}" class="delete-evento-btn text-red-500 hover:text-red-700 p-1 rounded-full flex-shrink-0 ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            `;
            li.querySelector('.delete-evento-btn').addEventListener('click', async () => {
                const eventoDocRef = doc(db, `artifacts/${appId}/users/${userId}/eventos`, evento.id);
                await deleteDoc(eventoDocRef);
            });
            eventosList.appendChild(li);
        });
    }

    addEventoBtn.addEventListener('click', async () => {
        const text = eventoInput.value.trim();
        const date = eventoDateInput.value; // Formato YYYY-MM-DD
        if (!text || !date) {
            showFeedback('Preencha o nome do evento e a data.');
            return;
        }
        try {
            await addDoc(eventosCollectionRef, { text, date });
            eventoInput.value = '';
            eventoDateInput.value = '';
        } catch (e) {
            console.error("Erro ao adicionar evento: ", e);
            showFeedback("Erro ao salvar evento.");
        }
    });

    onSnapshot(eventosCollectionRef, (snapshot) => {
        const eventos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Ordena por data antes de renderizar
        eventos.sort((a, b) => new Date(a.date) - new Date(b.date));
        renderEventos(eventos);
    });
}
