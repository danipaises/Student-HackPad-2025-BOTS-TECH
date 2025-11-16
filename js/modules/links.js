// --- Módulo: Links Rápidos (Firestore) ---
import { db } from '../firebase-config.js';
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

export function initLinksApp(appId, userId, showFeedback) {
    const linkNameInput = document.getElementById('linkNameInput');
    const linkUrlInput = document.getElementById('linkUrlInput');
    const addLinkBtn = document.getElementById('addLinkBtn');
    const linksList = document.getElementById('linksList');

    const linksCollectionRef = collection(db, `artifacts/${appId}/users/${userId}/links`);

    function renderLinks(links) {
        linksList.innerHTML = '';
        if (links.length === 0) {
            linksList.innerHTML = '<p class="text-gray-500 text-center">Nenhum link salvo.</p>';
            return;
        }
        links.forEach(link => {
            const li = document.createElement('li');
            li.className = 'flex items-center justify-between bg-gray-50 p-3 rounded-lg border';
            li.innerHTML = `
                <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="font-medium text-indigo-600 hover:text-indigo-800 break-all">
                    ${link.nome}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 inline-block ml-1"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                </a>
                <button data-id="${link.id}" class="delete-link-btn text-red-500 hover:text-red-700 p-1 rounded-full flex-shrink-0 ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            `;
            li.querySelector('.delete-link-btn').addEventListener('click', async () => {
                const linkDocRef = doc(db, `artifacts/${appId}/users/${userId}/links`, link.id);
                await deleteDoc(linkDocRef);
            });
            linksList.appendChild(li);
        });
    }

    addLinkBtn.addEventListener('click', async () => {
        const nome = linkNameInput.value.trim();
        let url = linkUrlInput.value.trim();
        if (!nome || !url) {
            showFeedback('Preencha o nome e a URL.');
            return;
        }
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        try {
            await addDoc(linksCollectionRef, { nome, url });
            linkNameInput.value = '';
            linkUrlInput.value = '';
        } catch (e) {
            console.error("Erro ao adicionar link: ", e);
            showFeedback("Erro ao salvar link.");
        }
    });

    onSnapshot(linksCollectionRef, (snapshot) => {
        const links = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderLinks(links);
    });
}
