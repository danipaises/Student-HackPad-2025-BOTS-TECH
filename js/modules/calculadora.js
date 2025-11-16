// --- Módulo: Calculadora de Média (LOCAL) ---

export function initCalculadoraApp() {
    const addNotaBtn = document.getElementById('addNotaBtn');
    const notasContainer = document.getElementById('notasContainer');
    const calcularMediaBtn = document.getElementById('calcularMediaBtn');
    const mediaResultado = document.getElementById('mediaResultado');

    let notaCount = 2;

    addNotaBtn.addEventListener('click', () => {
        notaCount++;
        const div = document.createElement('div');
        div.className = "flex items-center gap-2";
        div.innerHTML = `
            <label for="nota-${notaCount}" class="text-sm font-medium text-gray-700 w-12">Nota ${notaCount}:</label>
            <input type="number" id="nota-${notaCount}" class="nota-input w-full p-2 border border-gray-300 rounded-lg" placeholder="0.0">
        `;
        notasContainer.appendChild(div);
    });

    calcularMediaBtn.addEventListener('click', () => {
        const inputs = document.querySelectorAll('.nota-input');
        let total = 0;
        let count = 0;
        inputs.forEach(input => {
            const value = parseFloat(input.value);
            if (!isNaN(value)) {
                total += value;
                count++;
            }
        });

        if (count > 0) {
            const media = total / count;
            mediaResultado.textContent = `Sua média é: ${media.toFixed(2)}`;
            mediaResultado.classList.remove('text-red-600');
            mediaResultado.classList.add('text-green-600');
        } else {
            mediaResultado.textContent = 'Por favor, insira pelo menos uma nota válida.';
            mediaResultado.classList.add('text-red-600');
            mediaResultado.classList.remove('text-green-600');
        }
    });
}
