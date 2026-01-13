document.addEventListener('DOMContentLoaded', function() {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }
    setTimeout(() => {
        AOS.init({
            duration: 600,
            easing: 'ease-out',
            once: true,
            offset: 50,
            delay: 0,
            disable: false,
            startEvent: 'DOMContentLoaded',
            useClassNames: false,
            disableMutationObserver: false,
            debounceDelay: 50,
            throttleDelay: 99,
            // Configurações específicas para mobile
            ...(window.innerWidth <= 768 && {
                duration: 400,
                offset: 30
            })
        });
    }, 100);

    // Inicializar funcionalidades
    initMobileMenu();
    initScrollEffects();
    initFormHandler();
    initPhoneMask();
    initSmoothScroll();
    initHeaderScroll();
    
    setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
    }, 200);
});

function initMobileMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu a");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
            document.body.classList.toggle("menu-open");
        });

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
                document.body.classList.remove("menu-open");
            });
        });

        document.addEventListener("click", (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
                document.body.classList.remove("menu-open");
            }
        });
    }
}

function initScrollEffects() {
    let ticking = false;

    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const heroBackground = document.querySelector('.hero-bg');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${rate}px)`;
        }

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
}

function initHeaderScroll() {
    const header = document.querySelector(".header");
    let lastScrollTop = 0;
    let ticking = false;

    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = "rgba(255, 255, 255, 0.95)";
            header.style.backdropFilter = "blur(10px)";
            header.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
        } else {
            header.style.background = "rgba(255, 255, 255, 0.95)";
            header.style.backdropFilter = "blur(10px)";
            header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
        }

        if (window.innerWidth > 768) {
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.style.transform = "translateY(-100%)";
            } else {
                header.style.transform = "translateY(0)";
            }
        } else {
            header.style.transform = "translateY(0)";
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }

    window.addEventListener("scroll", requestTick, { passive: true });
}

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initFormHandler() {
    const form = document.querySelector('.form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const nome = this.querySelector('input[type="text"]').value;
            const telefoneFormatado = this.querySelector('input[type="tel"]').value;
            const telefone = telefoneFormatado.replace(/\D/g, ''); // Remove formatação para validação
            const servico = this.querySelector('select').value;
            const descricao = this.querySelector('textarea').value;
            
            if (!nome || !telefone || !servico) {
                showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            // Validar telefone (deve ter pelo menos 10 dígitos)
            if (telefone.length < 10) {
                showNotification('Por favor, insira um telefone válido.', 'error');
                return;
            }
            
            const mensagem = `Olá! Gostaria de solicitar um orçamento.
            
*Nome:* ${nome}
*Telefone para Contato:* ${telefoneFormatado}
*Serviço:* ${getServiceName(servico)}
*Descrição:* ${descricao || 'Não informado'}`;
            
            const whatsappUrl = `https://wa.me/556299271152?text=${encodeURIComponent(mensagem)}`;
            window.open(whatsappUrl, '_blank');
            
            this.reset();
            showNotification('Redirecionando para o WhatsApp...', 'success');
        });
    }
}

// ===== MÁSCARA DE TELEFONE =====
function initPhoneMask() {
    const phoneInput = document.getElementById('telefone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
            
            // Limita a 11 dígitos (celular com DDD)
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            
            // Aplica a máscara
            if (value.length <= 10) {
                // Telefone fixo: (99) 9999-9999
                value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
            } else {
                // Celular: (99) 9 9999-9999
                value = value.replace(/^(\d{2})(\d{1})(\d{4})(\d{0,4}).*/, '($1) $2 $3-$4');
            }
            
            e.target.value = value;
        });
        
        // Permite apenas números, backspace, delete e tab
        phoneInput.addEventListener('keydown', function(e) {
            const allowedKeys = [
                'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
                'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'
            ];
            
            if (allowedKeys.includes(e.key) || 
                (e.key >= '0' && e.key <= '9') ||
                (e.ctrlKey && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase()))) {
                return;
            }
            
            e.preventDefault();
        });
        
        // Remove formatação ao colar
        phoneInput.addEventListener('paste', function(e) {
            e.preventDefault();
            const paste = (e.clipboardData || window.clipboardData).getData('text');
            const numbersOnly = paste.replace(/\D/g, '');
            
            if (numbersOnly.length <= 11) {
                phoneInput.value = numbersOnly;
                phoneInput.dispatchEvent(new Event('input'));
            }
        });
    }
}

function getServiceName(value) {
    const services = {
        'construcao': 'Construção',
        'reforma': 'Reformas e Reparos',
        'eletrica': 'Instalação Elétrica',
        'hidraulica': 'Instalação Hidráulica',
        'pintura': 'Pintura',
        'desentupimento': 'Desentupimento',
        'pisos': 'Pisos e Revestimentos',
        'telhados': 'Manutenção de Telhados',
        'outros': 'Outros serviços'
    };
    return services[value] || value;
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function initCardAnimations() {
    const cards = document.querySelectorAll('.service-card, .value-card, .gallery-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observerOptions = {
        threshold: 0.7
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 segundos
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

document.addEventListener('DOMContentLoaded', function() {
    initCardAnimations();
    initCounters();
    initLazyLoading();
});

window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--secondary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', debounce(() => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    }, 100));
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

document.addEventListener('DOMContentLoaded', initScrollToTop);

document.getElementById("year").textContent = new Date().getFullYear();