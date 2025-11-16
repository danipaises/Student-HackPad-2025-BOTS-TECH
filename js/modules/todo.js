// --- Módulo: Lista de Tarefas (Firestore) ---
import { db } from '../firebase-config.js';
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

export function initTodoApp(appId, userId, showFeedback) {
    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodoBtn');
    const todoList = document.getElementById('todoList');

    const todoCollectionRef = collection(db, `artifacts/${appId}/users/${userId}/tarefas`);

    function renderTasks(tasks) {
        todoList.innerHTML = '';
        if (tasks.length === 0) {
            todoList.innerHTML = '<p class="text-gray-500 text-center">Nenhuma tarefa ainda.</p>';
            return;
        }
        tasks.forEach((task) => {
            const li = document.createElement('li');
            li.className = `task-item flex items-center justify-between p-3 rounded-lg border transition-colors ${task.completed ? 'completed' : 'bg-gray-50'}`;
            li.innerHTML = `
                <span class="flex-grow cursor-pointer">${task.text}</span>
                <button data-id="${task.id}" class="delete-task-btn text-red-500 hover:text-red-700 p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            `;
            li.querySelector('span').addEventListener('click', async () => {
                const taskDocRef = doc(db, `artifacts/${appId}/users/${userId}/tarefas`, task.id);
                await updateDoc(taskDocRef, { completed: !task.completed });
            });
            li.querySelector('.delete-task-btn').addEventListener('click', async () => {
                const taskDocRef = doc(db, `artifacts/${appId}/users/${userId}/tarefas`, task.id);
                await deleteDoc(taskDocRef);
            });
            todoList.appendChild(li);
        });
    }

    addTodoBtn.addEventListener('click', async () => {
        const text = todoInput.value.trim();
        if (text) {
            try {
                await addDoc(todoCollectionRef, { text: text, completed: false });
                todoInput.value = '';
            } catch (e) {
                console.error("Erro ao adicionar tarefa: ", e);
                showFeedback("Erro ao salvar tarefa.");
            }
        }
    });

    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodoBtn.click();
        }
    });

    onSnapshot(todoCollectionRef, (snapshot) => {
        const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderTasks(tasks);
    });
}
