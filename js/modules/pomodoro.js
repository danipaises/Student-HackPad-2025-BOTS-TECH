// --- Módulo: Timer Pomodoro (LOCAL) ---

export function initPomodoroApp() {
    const timerDisplay = document.getElementById('timerDisplay');
    const startBtn = document.getElementById('startPomodoroBtn');
    const resetBtn = document.getElementById('resetPomodoroBtn');
    const statusDisplay = document.getElementById('pomodoroStatus');
    const pomodoroCircle = document.getElementById('pomodoroCircle');

    const DURATION = 25 * 60;
    let secondsRemaining = DURATION;
    let timerInterval = null;
    let isPaused = true;

    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    }

    function updateDisplay() {
        timerDisplay.textContent = formatTime(secondsRemaining);
    }

    function startTimer() {
        isPaused = false;
        startBtn.textContent = 'Pausar';
        statusDisplay.textContent = 'Hora de focar!';
        pomodoroCircle.classList.add('pomodoro-active');
        timerInterval = setInterval(() => {
            secondsRemaining--;
            updateDisplay();
            if (secondsRemaining <= 0) {
                clearInterval(timerInterval);
                statusDisplay.textContent = 'Pausa! (5 min)';
                if (window.showGlobalFeedback) {
                    window.showGlobalFeedback('Pomodoro concluído! Hora de uma pausa.', 5000);
                }
                resetTimer(false);
            }
        }, 1000);
    }

    function pauseTimer() {
        isPaused = true;
        clearInterval(timerInterval);
        startBtn.textContent = 'Continuar';
        statusDisplay.textContent = 'Pausado';
        pomodoroCircle.classList.remove('pomodoro-active');
    }

    function resetTimer(showAlert = true) {
        clearInterval(timerInterval);
        isPaused = true;
        secondsRemaining = DURATION;
        updateDisplay();
        startBtn.textContent = 'Iniciar';
        statusDisplay.textContent = '\u00A0';
        pomodoroCircle.classList.remove('pomodoro-active');
        if (showAlert && window.showGlobalFeedback) {
            window.showGlobalFeedback('Timer resetado.');
        }
    }

    startBtn.addEventListener('click', () => {
        if (isPaused) {
            startTimer();
        } else {
            pauseTimer();
        }
    });
    resetBtn.addEventListener('click', () => resetTimer(true));
    updateDisplay();
}
