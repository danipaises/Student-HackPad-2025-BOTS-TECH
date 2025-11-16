// --- Módulo: Tabelas & Gráficos (Firestore & LOCAL) ---
import { db } from '../firebase-config.js';
import {
    doc,
    setDoc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

export function initGraficosApp(appId, userId, showFeedback) {
    // Seção da Tabela
    const tableRowsInput = document.getElementById('tableRowsInput');
    const tableColsInput = document.getElementById('tableColsInput');
    const createTableBtn = document.getElementById('createTableBtn');
    const saveTableBtn = document.getElementById('saveTableBtn');
    const tableContainer = document.getElementById('tableContainer');

    // Seção do Gráfico
    const chartDataInput = document.getElementById('chartDataInput');
    const generateBarChartBtn = document.getElementById('generateBarChartBtn');
    const generatePieChartBtn = document.getElementById('generatePieChartBtn');
    const saveChartDataBtn = document.getElementById('saveChartDataBtn');
    const chartCanvas = document.getElementById('myChart');
    let myChartInstance = null;

    const tableDocRef = doc(db, `artifacts/${appId}/users/${userId}/tabelas/principal`);
    const chartDocRef = doc(db, `artifacts/${appId}/users/${userId}/graficos/principal`);

    // --- Lógica da Tabela ---
    createTableBtn.addEventListener('click', () => {
        const rows = parseInt(tableRowsInput.value) || 3;
        const cols = parseInt(tableColsInput.value) || 3;
        if (rows > 50 || cols > 20) {
            showFeedback("Limite de 50 linhas e 20 colunas.");
            return;
        }
        tableContainer.innerHTML = '';
        const table = document.createElement('table');
        table.className = "min-w-full divide-y divide-gray-300 border border-gray-300";
        const thead = document.createElement('thead');
        thead.className = "bg-gray-100";
        const trHead = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            const th = document.createElement('th');
            th.className = "p-3 border border-gray-300 text-left text-sm font-semibold text-gray-900";
            th.setAttribute('contenteditable', 'true');
            th.textContent = `Cabeçalho ${j + 1}`;
            trHead.appendChild(th);
        }
        thead.appendChild(trHead);
        table.appendChild(thead);
        const tbody = document.createElement('tbody');
        tbody.className = "divide-y divide-gray-200 bg-white";
        for (let i = 0; i < rows; i++) {
            const tr = document.createElement('tr');
            for (let j = 0; j < cols; j++) {
                const td = document.createElement('td');
                td.className = "p-3 border border-gray-300 text-sm text-gray-700";
                td.setAttribute('contenteditable', 'true');
                td.textContent = `Dado ${i + 1}-${j + 1}`;
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);
        tableContainer.appendChild(table);
        showFeedback("Tabela criada! Clique nas células para editar.");
    });

    // Salvar Tabela no Firebase
    saveTableBtn.addEventListener('click', async () => {
        try {
            await setDoc(tableDocRef, { html: tableContainer.innerHTML });
            showFeedback('Tabela Salva!');
        } catch (e) {
            console.error("Erro ao salvar tabela: ", e);
            showFeedback('Erro ao salvar tabela.');
        }
    });

    // Carregar Tabela do Firebase
    onSnapshot(tableDocRef, (docSnap) => {
        if (docSnap.exists() && docSnap.data().html) {
            tableContainer.innerHTML = docSnap.data().html;
        } else {
            tableContainer.innerHTML = '<p class="p-6 text-gray-500">Defina as linhas e colunas e clique em "Gerar Tabela" para começar.</p>';
        }
    });

    // --- Lógica do Gráfico ---
    function renderChart(type) {
        const dataLines = chartDataInput.value.trim().split('\n');
        const labels = [];
        const data = [];
        const backgroundColors = [];

        const defaultColors = ['#4f46e5', '#34d399', '#f59e0b', '#ec4899', '#0ea5e9', '#84cc16', '#d946ef', '#14b8a6'];

        dataLines.forEach((line, index) => {
            const parts = line.split(',');
            if (parts.length === 2) {
                labels.push(parts[0].trim());
                data.push(parseFloat(parts[1].trim()) || 0);
                backgroundColors.push(defaultColors[index % defaultColors.length]);
            }
        });

        if (labels.length === 0) {
            showFeedback("Dados do gráfico inválidos. Use o formato 'Nome, Valor'.");
            return;
        }

        if (myChartInstance) {
            myChartInstance.destroy();
        }

        const ctx = chartCanvas.getContext('2d');
        myChartInstance = new Chart(ctx, {
            type: type,
            data: {
                labels: labels,
                datasets: [{
                    label: 'Meu Gráfico',
                    data: data,
                    backgroundColor: backgroundColors,
                    borderColor: '#fff',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: (type === 'pie' ? 'top' : 'none'),
                    }
                }
            }
        });
    }

    generateBarChartBtn.addEventListener('click', () => renderChart('bar'));
    generatePieChartBtn.addEventListener('click', () => renderChart('pie'));

    // Salvar Dados do Gráfico no Firebase
    saveChartDataBtn.addEventListener('click', async () => {
        try {
            await setDoc(chartDocRef, { data: chartDataInput.value });
            showFeedback('Dados do Gráfico Salvos!');
        } catch (e) {
            console.error("Erro ao salvar dados do gráfico: ", e);
            showFeedback('Erro ao salvar dados.');
        }
    });

    // Carregar Dados do Gráfico do Firebase
    onSnapshot(chartDocRef, (docSnap) => {
        if (docSnap.exists() && docSnap.data().data) {
            chartDataInput.value = docSnap.data().data;
        }
    });
}
