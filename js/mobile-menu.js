// --- Módulo: Menu Mobile ---

export function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    const sidebar = document.getElementById('sidebar');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

    function openMenu() {
        sidebar.classList.remove('-translate-x-full');
        mobileMenuOverlay.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }

    function closeMenu() {
        sidebar.classList.add('-translate-x-full');
        mobileMenuOverlay.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }

    // Botão de abrir menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', openMenu);
    }

    // Botão de fechar menu na sidebar
    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', closeMenu);
    }

    // Overlay para fechar menu
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMenu);
    }

    // Fechar menu ao clicar em um link de navegação no mobile
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Só fecha no mobile
            if (window.innerWidth < 768) {
                closeMenu();
            }
        });
    });

    // Fechar menu quando a tela aumentar
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            closeMenu();
        }
    });
}
