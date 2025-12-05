document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Animação de Scroll (Aparecer ao rolar)
    const observerOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    document.querySelectorAll('.fade-up, .fade-in').forEach(el => observer.observe(el));

    // 2. Menu Mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const icon = hamburger.querySelector('i');

    function toggleMenu() {
        navMenu.classList.toggle('active');
        if(navMenu.classList.contains('active')) {
            icon.classList.replace('ph-list', 'ph-x');
            document.body.style.overflow = 'hidden';
        } else {
            icon.classList.replace('ph-x', 'ph-list');
            document.body.style.overflow = 'auto';
        }
    }
    hamburger.addEventListener('click', toggleMenu);
    navLinks.forEach(link => {
        link.addEventListener('click', () => { if(navMenu.classList.contains('active')) toggleMenu(); });
    });

    // 3. LÓGICA DO MODAL (EVOLUÇÕES)
    const modal = document.getElementById('modal-evolucao');
    const btnClose = document.querySelector('.modal-close');
    const modalImg = document.getElementById('modal-img-alvo');
    const modalTitulo = document.getElementById('modal-titulo-alvo');
    const modalTag = document.getElementById('modal-tag-alvo');
    const modalDesc = document.getElementById('modal-desc-alvo');

    const cardsEvolucao = document.querySelectorAll('.card-evolucao');

    // Função para abrir
    const abrirModal = (card) => {
        // Pega os dados dos atributos data- do HTML
        const nome = card.getAttribute('data-nome');
        const tag = card.getAttribute('data-tag');
        const img = card.getAttribute('data-img');
        const texto = card.getAttribute('data-texto');

        // Preenche o Modal
        modalTitulo.textContent = nome;
        modalTag.textContent = tag;
        modalImg.src = img;
        modalDesc.textContent = texto;

        // Mostra o Modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Trava a rolagem do fundo
    };

    // Função para fechar
    const fecharModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Libera a rolagem
    };

    // Adiciona o clique em cada card
    cardsEvolucao.forEach(card => {
        card.addEventListener('click', () => abrirModal(card));
    });

    // Eventos de fechamento
    btnClose.addEventListener('click', fecharModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) fecharModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) fecharModal();
    });

});