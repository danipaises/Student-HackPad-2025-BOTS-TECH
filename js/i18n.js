// --- Módulo: Internacionalização (i18n) ---

const translations = {
    en: {
        // Login Page
        'app.title': 'StudyHub 🚀',
        'login.subtitle': 'Your central hub of tools for HackPad 2025.',
        'login.button': 'Sign in with Google',

        // Navigation Menu
        'nav.panel': 'Dashboard',
        'nav.tasks': 'Tasks',
        'nav.goals': 'Daily Goals',
        'nav.habits': 'Habits',
        'nav.flashcards': 'Flashcards',
        'nav.calendar': 'Calendar',
        'nav.charts': 'Tables & Charts',
        'nav.pomodoro': 'Pomodoro Timer',
        'nav.notes': 'Notepad',
        'nav.links': 'Quick Links',
        'nav.calculator': 'Grade Calculator',
        'nav.music': 'Focus Music',
        'nav.credits': 'Credits', // NOVO
        'nav.logout': 'Logout',

        // Dashboard Panel
        'panel.welcome': 'Welcome to your StudyHub!',
        'panel.subtitle': 'Choose a tool below to get started.',
        'panel.card.tasks': 'Tasks',
        'panel.card.tasks.desc': 'Organize your work.',
        'panel.card.calendar': 'Calendar',
        'panel.card.calendar.desc': 'Schedule exams and events.',
        'panel.card.charts': 'Tables & Charts',
        'panel.card.charts.desc': 'Create tables and charts.',
        'panel.card.flashcards': 'Flashcards',
        'panel.card.flashcards.desc': 'Create cards and study.',
        'panel.card.pomodoro': 'Pomodoro Timer',
        'panel.card.pomodoro.desc': '25-minute focus timer.',
        'panel.card.notes': 'Notepad',
        'panel.card.notes.desc': 'Quick notes.',
        'panel.card.habits': 'Habits',
        'panel.card.habits.desc': 'Track daily habits.',
        'panel.card.links': 'Quick Links',
        'panel.card.links.desc': 'Useful study links.',
        'panel.card.calculator': 'Grade Calculator',
        'panel.card.calculator.desc': 'Calculate your average.',
        'panel.card.credits': 'Credits', // NOVO
        'panel.card.credits.desc': 'See the developers.', // NOVO

        // Common
        'common.back': 'Back',
        'common.add': 'Add',
        'common.delete': 'Delete',
        'common.save': 'Save',
        'common.cancel': 'Cancel',
        'common.edit': 'Edit',
        'common.confirm': 'Confirm',

        // Tasks
        'tasks.title': 'Task List',
        'tasks.placeholder': 'Ex: Submit project...',
        'tasks.empty': 'No tasks yet.',

        // Goals
        'goals.title': 'Daily Goals',
        'goals.subtitle': 'What are your 3 priorities for today?',
        'goals.placeholder': '1. ...\n2. ...\n3. ...',
        'goals.empty': 'No goals set for today.',

        // Habits
        'habits.title': 'Habit Tracker',
        'habits.placeholder': 'Ex: Study 1h of JS',
        'habits.button': 'Add Habit',
        'habits.empty': 'No habits tracked yet.',
        'habits.helper': 'Click the habit to mark/unmark. Habits are reset manually.',

        // Flashcards
        'flashcards.title': 'Flashcards',
        'flashcards.create.title': 'Create New Card',
        'flashcards.front': 'Front (Question)',
        'flashcards.front.placeholder': 'Ex: What is the capital of Brazil?',
        'flashcards.back': 'Back (Answer)',
        'flashcards.back.placeholder': 'Ex: Brasília',
        'flashcards.study.title': 'Study Cards',
        'flashcards.study.start': 'Create a card to get started!',
        'flashcards.study.shuffle': 'Shuffle Cards',
        'flashcards.flip': 'Flip Card',
        'flashcards.empty': 'No flashcards created yet.',
        'flashcards.confirm.delete': 'Are you sure you want to delete this flashcard?',

        // Calendar
        'calendar.title': 'Event Calendar',
        'calendar.event': 'Event Name (ex: Physics Exam)',
        'calendar.date': 'Date',
        'calendar.button': 'Add Event',
        'calendar.empty': 'No events scheduled.',

        // Tables & Charts
        'charts.title': 'Tables & Charts',
        'charts.table.title': 'Table Creator',
        'charts.rows': 'Rows',
        'charts.cols': 'Columns',
        'charts.create.table': 'Create Table',
        'charts.table.helper': 'Click any cell in the generated table to edit the content.',
        'charts.chart.title': 'Chart Generator',
        'charts.chart.data': 'Data (format: Label, Value):',
        'charts.chart.placeholder': 'Ex: Exam 1, 7.5\nExam 2, 9.0\nProject, 10.0',
        'charts.add.row': 'Add Row',
        'charts.bar.chart': 'Bar Chart',
        'charts.pie.chart': 'Pie Chart',
        'charts.save.image': 'Save as Image',

        // Pomodoro
        'pomodoro.title': 'Pomodoro Timer',
        'pomodoro.mode.focus': 'Focus Time',
        'pomodoro.subtitle': '25 minutes of focused work',
        'pomodoro.start': 'Start',
        'pomodoro.reset': 'Reset',

        // Notes
        'notes.title': 'Notepad',
        'notes.placeholder': 'Start typing your notes here...',

        // Links
        'links.title': 'Quick Links',
        'links.name': 'Site Name (ex: Google)',
        'links.url': 'URL (https://...)',
        'links.button': 'Add Link',
        'links.empty': 'No links saved yet.',

        // Calculator
        'calculator.title': 'Grade Calculator',
        'calculator.subtitle': 'Calculate your grade average',
        'calculator.grade': 'Grade',
        'calculator.placeholder': '0.0',
        'calculator.weight': 'Weight',
        'calculator.add.grade': 'Add Grade',
        'calculator.calculate': 'Calculate Average',
        'calculator.result': 'Weighted Average',
        'calculator.empty': 'Add grades to calculate your average.',

        // Music
        'music.title': 'Focus Music',
        'music.subtitle': 'Click a style to open a YouTube playlist and start focusing.',
        'music.lofi': '🎵 Lo-Fi Beats',
        'music.classical': '🎻 Classical Music',
        'music.rain': '🌧️ Rain Sounds',
        'music.ocean': '🌊 Ocean Waves',
        
        // Credits (NOVO)
        'credits.title': 'Credits',
        'credits.subtitle': 'This project was developed by:',

        // Feedback Messages
        'feedback.task.required': 'Please enter a task.',
        'feedback.goal.required': 'Please enter a goal.',
        'feedback.habit.required': 'Please enter a habit.',
        'feedback.flashcard.required': 'Fill in both front and back of the card.',
        'feedback.event.required': 'Fill in the event name and date.',
        'feedback.link.required': 'Fill in the link name and URL.',
        'feedback.grade.required': 'Fill in both grade and weight.',
        'feedback.save.error': 'Error saving data.',
    },
    pt: {
        // Login Page
        'app.title': 'StudyHub 🚀',
        'login.subtitle': 'Sua central de ferramentas para o HackPad 2025.',
        'login.button': 'Entrar com Google',

        // Navigation Menu
        'nav.panel': 'Painel',
        'nav.tasks': 'Tarefas',
        'nav.goals': 'Metas Diárias',
        'nav.habits': 'Hábitos',
        'nav.flashcards': 'Flashcards',
        'nav.calendar': 'Calendário',
        'nav.charts': 'Tabelas & Gráficos',
        'nav.pomodoro': 'Timer Pomodoro',
        'nav.notes': 'Bloco de Notas',
        'nav.links': 'Links Rápidos',
        'nav.calculator': 'Calculadora Média',
        'nav.music': 'Música Foco',
        'nav.credits': 'Créditos', // NOVO
        'nav.logout': 'Sair',

        // Dashboard Panel
        'panel.welcome': 'Bem-vindo(a) ao seu StudyHub!',
        'panel.subtitle': 'Escolha uma ferramenta abaixo para começar.',
        'panel.card.tasks': 'Tarefas',
        'panel.card.tasks.desc': 'Organize seus trabalhos.',
        'panel.card.calendar': 'Calendário',
        'panel.card.calendar.desc': 'Agende provas e eventos.',
        'panel.card.charts': 'Tabelas & Gráficos',
        'panel.card.charts.desc': 'Crie tabelas e gráficos.',
        'panel.card.flashcards': 'Flashcards',
        'panel.card.flashcards.desc': 'Crie cards e estude.',
        'panel.card.pomodoro': 'Timer Pomodoro',
        'panel.card.pomodoro.desc': 'Timer de foco de 25 min.',
        'panel.card.notes': 'Bloco de Notas',
        'panel.card.notes.desc': 'Anote ideias rápidas.',
        'panel.card.habits': 'Hábitos',
        'panel.card.habits.desc': 'Acompanhe hábitos diários.',
        'panel.card.links': 'Links Rápidos',
        'panel.card.links.desc': 'Links úteis de estudo.',
        'panel.card.calculator': 'Calculadora Média',
        'panel.card.calculator.desc': 'Calcule sua média.',
        'panel.card.credits': 'Créditos', // NOVO
        'panel.card.credits.desc': 'Veja os desenvolvedores.', // NOVO

        // Common
        'common.back': 'Voltar',
        'common.add': 'Adicionar',
        'common.delete': 'Excluir',
        'common.save': 'Salvar',
        'common.cancel': 'Cancelar',
        'common.edit': 'Editar',
        'common.confirm': 'Confirmar',

        // Tasks
        'tasks.title': 'Lista de Tarefas',
        'tasks.placeholder': 'Ex: Entregar projeto de...',
        'tasks.empty': 'Nenhuma tarefa ainda.',

        // Goals
        'goals.title': 'Metas Diárias',
        'goals.subtitle': 'Quais são suas 3 prioridades para hoje?',
        'goals.placeholder': '1. ...\n2. ...\n3. ...',
        'goals.empty': 'Nenhuma meta definida para hoje.',

        // Habits
        'habits.title': 'Acompanhamento de Hábitos',
        'habits.placeholder': 'Ex: Estudar 1h de JS',
        'habits.button': 'Adicionar Hábito',
        'habits.empty': 'Nenhum hábito acompanhado ainda.',
        'habits.helper': 'Clique no hábito para marcar/desmarcar. Os hábitos são resetados manually.',

        // Flashcards
        'flashcards.title': 'Flashcards',
        'flashcards.create.title': 'Criar Novo Card',
        'flashcards.front': 'Frente (Pergunta)',
        'flashcards.front.placeholder': 'Ex: Qual a capital do Brasil?',
        'flashcards.back': 'Verso (Resposta)',
        'flashcards.back.placeholder': 'Ex: Brasília',
        'flashcards.study.title': 'Estudar Cards',
        'flashcards.study.start': 'Crie um card para começar!',
        'flashcards.study.shuffle': 'Embaralhar Cards',
        'flashcards.flip': 'Virar Card',
        'flashcards.empty': 'Nenhum flashcard criado ainda.',
        'flashcards.confirm.delete': 'Tem certeza que deseja excluir este flashcard?',

        // Calendar
        'calendar.title': 'Calendário de Eventos',
        'calendar.event': 'Nome do Evento (ex: Prova de Física)',
        'calendar.date': 'Data',
        'calendar.button': 'Adicionar Evento',
        'calendar.empty': 'Nenhum evento agendado.',

        // Tables & Charts
        'charts.title': 'Tabelas & Gráficos',
        'charts.table.title': 'Criador de Tabela',
        'charts.rows': 'Linhas',
        'charts.cols': 'Colunas',
        'charts.create.table': 'Criar Tabela',
        'charts.table.helper': 'Clique em qualquer célula da tabela gerada para editar o conteúdo.',
        'charts.chart.title': 'Gerador de Gráfico',
        'charts.chart.data': 'Dados (formato: Nome, Valor):',
        'charts.chart.placeholder': 'Ex: Prova 1, 7.5\nProva 2, 9.0\nTrabalho, 10.0',
        'charts.add.row': 'Adicionar Linha',
        'charts.bar.chart': 'Gráfico de Barras',
        'charts.pie.chart': 'Gráfico de Pizza',
        'charts.save.image': 'Salvar como Imagem',

        // Pomodoro
        'pomodoro.title': 'Timer Pomodoro',
        'pomodoro.mode.focus': 'Tempo de Foco',
        'pomodoro.subtitle': '25 minutos de trabalho focado',
        'pomodoro.start': 'Iniciar',
        'pomodoro.reset': 'Resetar',

        // Notes
        'notes.title': 'Bloco de Notas',
        'notes.placeholder': 'Comece a digitar suas notas aqui...',

        // Links
        'links.title': 'Links Rápidos',
        'links.name': 'Nome do site (ex: Google)',
        'links.url': 'URL (https://...)',
        'links.button': 'Adicionar Link',
        'links.empty': 'Nenhum link salvo ainda.',

        // Calculator
        'calculator.title': 'Calculadora de Média',
        'calculator.subtitle': 'Calcule sua média de notas',
        'calculator.grade': 'Nota',
        'calculator.placeholder': '0.0',
        'calculator.weight': 'Peso',
        'calculator.add.grade': 'Adicionar Nota',
        'calculator.calculate': 'Calcular Média',
        'calculator.result': 'Média Ponderada',
        'calculator.empty': 'Adicione notas para calcular sua média.',

        // Music
        'music.title': 'Música Foco',
        'music.subtitle': 'Clique em um estilo para abrir uma playlist no YouTube e começar a focar.',
        'music.lofi': '🎵 Lo-Fi Beats',
        'music.classical': '🎻 Música Clássica',
        'music.rain': '🌧️ Som de Chuva',
        'music.ocean': '🌊 Ondas do Mar',
        
        // Credits (NOVO)
        'credits.title': 'Créditos',
        'credits.subtitle': 'Este projeto foi desenvolvido por:',

        // Feedback Messages
        'feedback.task.required': 'Por favor, insira uma tarefa.',
        'feedback.goal.required': 'Por favor, insira uma meta.',
        'feedback.habit.required': 'Por favor, insira um hábito.',
        'feedback.flashcard.required': 'Preencha frente e verso do card.',
        'feedback.event.required': 'Preencha o nome do evento e a data.',
        'feedback.link.required': 'Preencha o nome do link e a URL.',
        'feedback.grade.required': 'Preencha nota e peso.',
        'feedback.save.error': 'Erro ao salvar dados.',
    }
};

let currentLanguage = 'en'; // Default language is English

// Load language preference from localStorage
export function initI18n() {
    const savedLang = localStorage.getItem('studyhub-language');
    if (savedLang && (savedLang === 'en' || savedLang === 'pt')) {
        currentLanguage = savedLang;
    }
    applyTranslations();
    updateLanguageButton();
}

// Apply translations to all elements with data-i18n attribute
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = translations[currentLanguage][key];

        if (translation) {
            // Check if element is an input with placeholder
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if(element.placeholder) {
                     element.placeholder = translation;
                }
            } else {
                element.textContent = translation;
            }
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage === 'en' ? 'en' : 'pt-br';
}

// Toggle between languages
export function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'pt' : 'en';
    localStorage.setItem('studyhub-language', currentLanguage);
    applyTranslations();
    updateLanguageButton();
}

// Update language button text
function updateLanguageButton() {
    const langButton = document.getElementById('languageToggle');
    const langButtonMobile = document.getElementById('languageToggleMobile');
    const text = currentLanguage === 'en' ? 'PT-BR' : 'EN-US';
    const title = currentLanguage === 'en' ? 'Mudar para Português' : 'Switch to English';

    if (langButton) {
        langButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" /></svg> <span>${text}</span>`;
        langButton.title = title;
    }
    if (langButtonMobile) {
        langButtonMobile.textContent = text;
        langButtonMobile.title = title;
    }
}

// Get translation by key (for use in JavaScript)
export function t(key) {
    return translations[currentLanguage][key] || key;
}

// Get current language
export function getCurrentLanguage() {
    return currentLanguage;
}