// --- Utilitários de UI ---

// Gerenciador de Navegação (SPA)
export function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const appViews = document.querySelectorAll('.app-view');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetId = link.dataset.target;
            appViews.forEach(view => view.classList.add('hidden'));
            document.getElementById(targetId).classList.remove('hidden');
            navLinks.forEach(nav => nav.classList.remove('active'));

            // Encontra o link de navegação que corresponde ao target e o ativa
            const linkToActivate = document.querySelector(`.nav-link[data-target="${targetId}"]`);
            if (linkToActivate) {
                linkToActivate.classList.add('active');
            }
        });
    });
}

// Gerenciador de Feedback Global
export function initFeedbackSystem() {
    const feedbackModal = document.getElementById('feedbackModal');
    const feedbackMessage = document.getElementById('feedbackMessage');
    let feedbackTimeout;

    function showFeedback(message, duration = 1500) {
        clearTimeout(feedbackTimeout);
        feedbackMessage.textContent = message;
        feedbackModal.classList.remove('hidden');
        feedbackTimeout = setTimeout(() => {
            feedbackModal.classList.add('hidden');
        }, duration);
    }

    // Disponibiliza globalmente
    window.showGlobalFeedback = showFeedback;

    return showFeedback;
}

// Gerenciador de Confirmação Global
export function initConfirmSystem() {
    const confirmModal = document.getElementById('confirmModal');
    const confirmMessage = document.getElementById('confirmMessage');
    const confirmBtnYes = document.getElementById('confirmBtnYes');
    const confirmBtnNo = document.getElementById('confirmBtnNo');

    function showConfirm(message, onConfirm) {
        confirmMessage.textContent = message;
        confirmModal.classList.remove('hidden');

        const newConfirmBtnYes = confirmBtnYes.cloneNode(true);
        confirmBtnYes.parentNode.replaceChild(newConfirmBtnYes, confirmBtnYes);

        const newConfirmBtnNo = confirmBtnNo.cloneNode(true);
        confirmBtnNo.parentNode.replaceChild(newConfirmBtnNo, confirmBtnNo);

        newConfirmBtnYes.addEventListener('click', () => {
            onConfirm();
            confirmModal.classList.add('hidden');
        });
        newConfirmBtnNo.addEventListener('click', () => {
            confirmModal.classList.add('hidden');
        });
    }

    return showConfirm;
}
