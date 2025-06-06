// Função para carregar o header
function loadHeader() {
    fetch('./estruturas/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
            
            // Reativar funcionalidades do menu após carregar
            initializeMenu();
        })
        .catch(error => {
            console.error('Erro ao carregar header:', error);
        });
}

// Função para carregar o footer
function loadFooter() {
    fetch('./estruturas/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => {
            console.error('Erro ao carregar footer:', error);
        });
}

// Função para inicializar o menu mobile
function initializeMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Função para inicializar categorias do menu (se existir)
function initializeMenuCategories() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    if (categoryBtns.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-category');
                
                // Remove active class from all buttons and categories
                categoryBtns.forEach(b => b.classList.remove('active'));
                menuCategories.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked button and corresponding category
                btn.classList.add('active');
                const targetCategory = document.querySelector(`.menu-category.${category}`);
                if (targetCategory) {
                    targetCategory.classList.add('active');
                }
            });
        });
    }
}

// Carregar estruturas quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
    
    // Inicializar funcionalidades após um pequeno delay
    setTimeout(() => {
        initializeMenuCategories();
    }, 100);
});

// Smooth scrolling para links internos
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Header Background on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
    }
});

// Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.menu-item, .info-item, .about-text, .about-image').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// WhatsApp Button Animation
const whatsappBtn = document.querySelector('.whatsapp-float');
let isAnimating = false;

setInterval(() => {
    if (!isAnimating) {
        isAnimating = true;
        whatsappBtn.style.animation = 'pulse 1s ease-in-out';
        setTimeout(() => {
            whatsappBtn.style.animation = '';
            isAnimating = false;
        }, 1000);
    }
}, 5000);

// Add pulse animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);


// Product Click Handler - Open Product Detail Page
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const productData = {
                id: this.getAttribute('data-product-id'),
                name: this.getAttribute('data-product-name'),
                price: this.getAttribute('data-product-price'),
                weight: this.getAttribute('data-product-weight'),
                image: this.getAttribute('data-product-image'),
                description: this.getAttribute('data-product-description')
            };
            
            // Store product data in localStorage
            localStorage.setItem('selectedProduct', JSON.stringify(productData));
            
            // Redirect to product detail page
            window.location.href = 'produto.html';
        });
    });
});