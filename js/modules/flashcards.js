// --- Módulo: Flashcards (Firestore) ---
import { db } from '../firebase-config.js';
import {
    collection,
    addDoc,
    deleteDoc,
    getDocs,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

export function initFlashcardApp(appId, userId, showFeedback, showConfirm) {
    const frenteInput = document.getElementById('frente');
    const versoInput = document.getElementById('verso');
    const addCardBtn = document.getElementById('addCardBtn');
    const clearCardsBtn = document.getElementById('clearCardsBtn');
    const cardContainer = document.getElementById('cardContainer');
    const cardFrente = document.getElementById('cardFrente');
    const cardVerso = document.getElementById('cardVerso');
    const cardCounter = document.getElementById('cardCounter');
    const prevBtn = document.getElementById('prevBtn');
    const flipBtn = document.getElementById('flipBtn');
    const nextBtn = document.getElementById('nextBtn');
    const shuffleBtn = document.getElementById('shuffleBtn');

    const flashcardsCollectionRef = collection(db, `artifacts/${appId}/users/${userId}/flashcards`);

    let cards = [];
    let currentCardIndex = 0;
    let isFlipped = false;

    function updateCardView() {
        if (cards.length === 0) {
            cardFrente.textContent = 'Crie um card para começar!';
            cardVerso.textContent = '';
            cardCounter.textContent = 'Card 0 / 0';
            disableControls(true);
            return;
        }
        disableControls(false);
        if (isFlipped) {
            cardContainer.classList.remove('is-flipped');
            isFlipped = false;
        }
        const card = cards[currentCardIndex];
        if (card) {
            cardFrente.textContent = card.frente;
            cardVerso.textContent = card.verso;
            cardCounter.textContent = `Card ${currentCardIndex + 1} / ${cards.length}`;
            prevBtn.disabled = currentCardIndex === 0;
            nextBtn.disabled = currentCardIndex === cards.length - 1;
        } else if (cards.length > 0) {
            currentCardIndex = 0;
            updateCardView();
        }
    }

    function disableControls(disabled) {
        prevBtn.disabled = disabled;
        nextBtn.disabled = disabled;
        flipBtn.disabled = disabled;
        shuffleBtn.disabled = disabled;
    }

    async function addCard() {
        const frente = frenteInput.value.trim();
        const verso = versoInput.value.trim();
        if (!frente || !verso) {
            showFeedback('Preencha a frente e o verso.');
            return;
        }
        try {
            await addDoc(flashcardsCollectionRef, { frente, verso });
            frenteInput.value = '';
            versoInput.value = '';
            frenteInput.focus();
            showFeedback('Card adicionado!');
        } catch (e) {
            console.error("Erro ao adicionar card: ", e);
            showFeedback("Erro ao salvar card.");
        }
    }

    function clearCards() {
        showConfirm('Tem certeza que deseja apagar TODOS os cards?', async () => {
            try {
                const querySnapshot = await getDocs(flashcardsCollectionRef);
                const deletePromises = [];
                querySnapshot.forEach((docSnap) => {
                    deletePromises.push(deleteDoc(docSnap.ref));
                });
                await Promise.all(deletePromises);
                showFeedback('Todos os cards foram apagados.');
            } catch (e) {
                console.error("Erro ao limpar cards: ", e);
                showFeedback("Erro ao apagar cards.");
            }
        });
    }

    function flipCard() {
        if (cards.length === 0) return;
        isFlipped = !isFlipped;
        cardContainer.classList.toggle('is-flipped');
    }

    function nextCard() {
        if (currentCardIndex < cards.length - 1) {
            currentCardIndex++;
            updateCardView();
        }
    }

    function prevCard() {
        if (currentCardIndex > 0) {
            currentCardIndex--;
            updateCardView();
        }
    }

    function shuffleCards() {
        if (cards.length < 2) {
            showFeedback('Adicione pelo menos 2 cards para embaralhar.');
            return;
        }
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        currentCardIndex = 0;
        showFeedback('Cards embaralhados!');
        updateCardView();
    }

    addCardBtn.addEventListener('click', addCard);
    clearCardsBtn.addEventListener('click', clearCards);
    flipBtn.addEventListener('click', flipCard);
    nextBtn.addEventListener('click', nextCard);
    prevBtn.addEventListener('click', prevCard);
    shuffleBtn.addEventListener('click', shuffleCards);

    onSnapshot(flashcardsCollectionRef, (snapshot) => {
        cards = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (currentCardIndex >= cards.length) {
            currentCardIndex = 0;
        }
        updateCardView();
    });
}
