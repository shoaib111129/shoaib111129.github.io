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
    smoothScrollNavigation();
    animateOnScroll();
    cardHoverEffects();
    formAnimations();
    headerScrollEffect();
    logoAnimation();
    scrollProgressBar();
    backToTopButton();
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
            }
        });
    });
}

// ============================================
// 2. SIMPLIFIED ANIMATIONS (No Parallax)
// ============================================
function animateOnScroll() {
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
// 3. SIMPLIFIED CARD HOVER (No 3D Tilt)
// ============================================
function cardHoverEffects() {
    const cards = document.querySelectorAll('.service-card, .portfolio-item');
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.4s ease';
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