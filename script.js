// ============================================
// PROFESSIONAL WEBSITE ANIMATIONS & EFFECTS
// ============================================

// Page Load Animation
window.addEventListener('load', function() {
    // Hide loading screen
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 800);
        }, 1500);
    }

    document.body.style.opacity = '1';
    initializeAllEffects();
});

// Initialize all effects
function initializeAllEffects() {
    mobileMenu();
    smoothScrollNavigation();
    navScrollSpy();
    rotateServiceWords();
    animateCounters();
    animateOnScroll();
    revealCardsOnScroll();
    cardHoverEffects();
    formAnimations();
    headerScrollEffect();
    logoAnimation();
    scrollProgressBar();
    backToTopButton();
}

// ============================================
// 1A. NAV ACTIVE LINK SCROLLSPY
// ============================================
function navScrollSpy() {
    const navLinks = Array.from(document.querySelectorAll('nav a[href^="#"]'));
    if (!navLinks.length) return;

    const linkMap = new Map(
        navLinks.map((link) => [link.getAttribute('href').replace('#', ''), link])
    );

    const setActiveLink = (sectionId) => {
        navLinks.forEach((link) => {
            link.classList.toggle('active-link', link === linkMap.get(sectionId));
        });
    };

    if (!('IntersectionObserver' in window)) {
        setActiveLink('home');
        return;
    }

    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setActiveLink(entry.target.id);
            }
        });
    }, {
        rootMargin: '-40% 0px -45% 0px',
        threshold: 0
    });

    sections.forEach((section) => observer.observe(section));
}

// ============================================
// 1B. HERO KEYWORD ROTATOR
// ============================================
function rotateServiceWords() {
    const target = document.getElementById('serviceWord');
    if (!target) return;

    const words = [
        'electrical fault repair',
        'computer troubleshooting',
        'wiring and safety upgrade',
        'software and network setup'
    ];

    let index = 0;
    setInterval(() => {
        target.style.opacity = '0';

        setTimeout(() => {
            index = (index + 1) % words.length;
            target.textContent = words[index];
            target.style.opacity = '1';
        }, 180);
    }, 2600);
}

// ============================================
// 1C. COUNTER ANIMATION
// ============================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (!counters.length) return;

    const runCounter = (counter) => {
        if (counter.dataset.counted === 'true') return;
        counter.dataset.counted = 'true';

        const target = Number.parseInt(counter.dataset.target, 10) || 0;
        const suffix = counter.dataset.suffix || '';
        const duration = 1400;
        const start = performance.now();

        const update = (time) => {
            const progress = Math.min((time - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.round(target * eased);

            counter.textContent = `${value}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };

        requestAnimationFrame(update);
    };

    if (!('IntersectionObserver' in window)) {
        counters.forEach((counter) => {
            counter.textContent = `${counter.dataset.target || '0'}${counter.dataset.suffix || ''}`;
        });
        return;
    }

    const observer = new IntersectionObserver((entries, observerRef) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                runCounter(entry.target);
                observerRef.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.6
    });

    counters.forEach((counter) => observer.observe(counter));
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================
function closeMobileMenu() {
    const menuButton = document.getElementById('mobileMenuBtn');
    const mobileMenuPanel = document.getElementById('mobileMenu');

    if (!menuButton || !mobileMenuPanel) return;

    mobileMenuPanel.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
}

function mobileMenu() {
    const menuButton = document.getElementById('mobileMenuBtn');
    const mobileMenuPanel = document.getElementById('mobileMenu');

    if (!menuButton || !mobileMenuPanel) return;

    menuButton.addEventListener('click', (event) => {
        event.stopPropagation();

        const isOpen = mobileMenuPanel.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        document.body.classList.toggle('menu-open', isOpen);
    });

    mobileMenuPanel.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    document.addEventListener('click', () => {
        closeMobileMenu();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMobileMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
}

// ============================================
// 0. SCROLL PROGRESS BAR with Throttling
// ============================================
function scrollProgressBar() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (!progressBar) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrolled = (window.pageYOffset / scrollHeight) * 100;
                progressBar.style.transform = `scaleX(${scrolled / 100})`;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ============================================
// 1. SMOOTH SCROLL NAVIGATION
// ============================================
function smoothScrollNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                closeMobileMenu();
            }
        });
    });
}

// ============================================
// 2. SIMPLIFIED ANIMATIONS (No Parallax)
// ============================================
function animateOnScroll() {
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'none';
        });
        return;
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        if (section.id !== 'home') {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        }
    });
}

// ============================================
// 3. CARD REVEAL ON SCROLL
// ============================================
function revealCardsOnScroll() {
    const cards = document.querySelectorAll('.service-card, .portfolio-item');
    if (!cards.length) return;

    if (!('IntersectionObserver' in window)) {
        cards.forEach((card) => {
            card.classList.add('is-visible');
        });
        return;
    }

    const observer = new IntersectionObserver((entries, observerRef) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observerRef.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    cards.forEach((card, index) => {
        card.classList.add('reveal-card');
        card.style.setProperty('--reveal-delay', `${(index % 3) * 90}ms`);
        observer.observe(card);
    });
}

// ============================================
// 4. CARD HOVER GLOW
// ============================================
function cardHoverEffects() {
    const cards = document.querySelectorAll('.service-card, .portfolio-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('card-glow');
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('card-glow');
        });
    });
}

// ============================================
// 5. SIMPLIFIED FORM ANIMATIONS
// ============================================
function formAnimations() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.background = 'rgba(255, 255, 255, 0.15)';
        });

        input.addEventListener('blur', function() {
            this.style.background = 'rgba(255, 255, 255, 0.1)';
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        button.textContent = 'Sending...';
        button.disabled = true;

        setTimeout(() => {
            button.textContent = '✓ Message Sent!';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                form.reset();
            }, 2000);
        }, 1500);
    });
}

// ============================================
// 6. OPTIMIZED HEADER SCROLL with Throttling
// ============================================
function headerScrollEffect() {
    const header = document.querySelector('header');
    if (!header) return;

    let lastScroll = 0;
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > 100) {
                    header.style.padding = '0.5rem 0';
                } else {
                    header.style.padding = '1rem 0';
                }
                
                if (currentScroll > lastScroll && currentScroll > 500) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
                
                lastScroll = currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ============================================
// 7. LOGO ANIMATION
// ============================================
function logoAnimation() {
    const logo = document.querySelector('.logo');
    if (!logo) return;

    logo.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'shimmer 1s ease-in-out';
        }, 10);
    });

    // Continuous subtle animation
    setInterval(() => {
        logo.style.transform = 'scale(1.05)';
        setTimeout(() => {
            logo.style.transform = 'scale(1)';
        }, 200);
    }, 5000);
}

// ============================================
// 9. ADD CSS FOR ANIMATIONS
// ============================================
const style = document.createElement('style');
style.textContent = `
    .shine-effect {
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        animation: shine 0.6s ease-in-out;
        pointer-events: none;
    }

    @keyframes shine {
        100% {
            left: 100%;
        }
    }

    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    header {
        transition: transform 0.3s ease, padding 0.3s ease, box-shadow 0.3s ease;
    }

    .focused label {
        color: #007bff !important;
        transform: translateY(-5px);
    }
`;
document.head.appendChild(style);

// ============================================
// 10. SMOOTH PAGE TRANSITIONS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// 11. BACK TO TOP BUTTON
// ============================================
function backToTopButton() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.pageYOffset > 300) {
                    backToTop.classList.add('show');
                } else {
                    backToTop.classList.remove('show');
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

console.log('✅ Website optimized and loaded successfully!');