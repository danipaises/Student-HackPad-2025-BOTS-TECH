// --- Módulo: Rastreador de Hábitos (Firestore) ---
import { db } from '../firebase-config.js';
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

export function initHabitosApp(appId, userId, showFeedback) {
    const habitInput = document.getElementById('habitInput');
    const addHabitBtn = document.getElementById('addHabitBtn');
    const habitosList = document.getElementById('habitosList');

    const habitosCollectionRef = collection(db, `artifacts/${appId}/users/${userId}/habitos`);

    function renderHabitos(habitos) {
        habitosList.innerHTML = '';
        if (habitos.length === 0) {
            habitosList.innerHTML = '<p class="text-gray-500 text-center">Nenhum hábito adicionado.</p>';
            return;
        }
        habitos.forEach((habit) => {
            const li = document.createElement('li');
            li.className = `task-item flex items-center justify-between p-3 rounded-lg border transition-colors ${habit.completed ? 'completed' : 'bg-gray-50'}`;
            li.innerHTML = `
                <span class="flex-grow cursor-pointer">${habit.text}</span>
                <button data-id="${habit.id}" class="delete-habit-btn text-red-500 hover:text-red-700 p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            `;
            li.querySelector('span').addEventListener('click', async () => {
                const habitDocRef = doc(db, `artifacts/${appId}/users/${userId}/habitos`, habit.id);
                await updateDoc(habitDocRef, { completed: !habit.completed });
            });
            li.querySelector('.delete-habit-btn').addEventListener('click', async () => {
                const habitDocRef = doc(db, `artifacts/${appId}/users/${userId}/habitos`, habit.id);
                await deleteDoc(habitDocRef);
            });
            habitosList.appendChild(li);
        });
    }

    addHabitBtn.addEventListener('click', async () => {
        const text = habitInput.value.trim();
        if (text) {
            try {
                await addDoc(habitosCollectionRef, { text: text, completed: false });
                habitInput.value = '';
            } catch (e) {
                console.error("Erro ao adicionar hábito: ", e);
                showFeedback("Erro ao salvar hábito.");
            }
        }
    });

    habitInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addHabitBtn.click();
        }
    });

    onSnapshot(habitosCollectionRef, (snapshot) => {
        const habitos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderHabitos(habitos);
    });
}
