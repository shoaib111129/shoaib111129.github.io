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
    siteSearch();
    navScrollSpy();
    rotateServiceWords();
    animateCounters();
    animateOnScroll();
    revealCardsOnScroll();
    cardHoverEffects();
    formAnimations();
    authFormEnhancements();
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
// 1D. QUICK SITE SEARCH
// ============================================
function siteSearch() {
    const searchInput = document.getElementById('siteSearchInput');
    const clearButton = document.getElementById('clearSiteSearch');
    const resultsContainer = document.getElementById('siteSearchResults');

    if (!searchInput || !clearButton || !resultsContainer) return;

    const searchItems = buildSearchIndex();
    let currentResults = [];
    let activeIndex = -1;

    const typeLabels = {
        page: 'Page',
        service: 'Service',
        project: 'Project',
        info: 'Info',
        account: 'Account'
    };

    const escapeHtml = (value = '') => value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

    const escapeRegExp = (value = '') => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const highlightTerms = (text, terms) => {
        let output = escapeHtml(text || '');

        terms
            .filter((term) => term.length > 1)
            .forEach((term) => {
                const termRegex = new RegExp(`(${escapeRegExp(term)})`, 'ig');
                output = output.replace(termRegex, '<mark>$1</mark>');
            });

        return output;
    };

    const rankItems = (query) => {
        const normalizedQuery = query.trim().toLowerCase();
        if (!normalizedQuery) return [];

        const terms = normalizedQuery.split(/\s+/).filter(Boolean);

        const ranked = searchItems
            .map((item) => {
                const searchable = `${item.title} ${item.description} ${item.keywords}`.toLowerCase();
                const title = item.title.toLowerCase();
                let score = 0;

                if (title.includes(normalizedQuery)) score += 8;
                if (searchable.includes(normalizedQuery)) score += 5;

                terms.forEach((term) => {
                    if (title.startsWith(term)) score += 4;
                    if (title.includes(term)) score += 2;
                    if (searchable.includes(term)) score += 1;
                });

                return {
                    ...item,
                    score
                };
            })
            .filter((item) => item.score > 0)
            .sort((a, b) => b.score - a.score);

        return ranked.slice(0, 8);
    };

    const updateActiveCard = (nextIndex) => {
        const cards = resultsContainer.querySelectorAll('.search-result-item');

        cards.forEach((card, index) => {
            card.classList.toggle('is-active', index === nextIndex);
        });

        if (nextIndex >= 0 && cards[nextIndex]) {
            cards[nextIndex].scrollIntoView({
                block: 'nearest',
                behavior: 'smooth'
            });
        }
    };

    const scrollToSearchTarget = (item) => {
        if (item.url) {
            window.location.href = item.url;
            return;
        }

        if (!item.target) return;

        const header = document.querySelector('header');
        const headerOffset = header ? header.offsetHeight + 14 : 90;
        const offsetTop = item.target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: Math.max(offsetTop, 0),
            behavior: 'smooth'
        });

        item.target.classList.add('search-target-flash');
        setTimeout(() => {
            item.target.classList.remove('search-target-flash');
        }, 1100);

        closeMobileMenu();
    };

    const renderIdleState = () => {
        resultsContainer.innerHTML = '<p class="search-status">Start typing to find matching services, projects, and sections.</p>';
        currentResults = [];
        activeIndex = -1;
    };

    const renderNoMatchState = (query) => {
        resultsContainer.innerHTML = `<p class="search-empty">No match found for "${escapeHtml(query)}". Try keywords like wiring, repair, network, or contact.</p>`;
        currentResults = [];
        activeIndex = -1;
    };

    const renderResults = (results, terms) => {
        const markup = results.map((result, index) => {
            const type = typeLabels[result.type] || 'Result';
            const title = highlightTerms(result.title, terms);
            const description = highlightTerms(result.description, terms);

            return `
                <li class="search-result-item" data-result-index="${index}">
                    <button type="button" class="search-result-action">
                        <span class="search-meta">${type}</span>
                        <span class="search-result-title">${title}</span>
                        <span class="search-result-desc">${description}</span>
                    </button>
                </li>
            `;
        }).join('');

        resultsContainer.innerHTML = `<ul class="search-list">${markup}</ul>`;

        resultsContainer.querySelectorAll('.search-result-action').forEach((button) => {
            button.addEventListener('click', (event) => {
                const card = event.currentTarget.closest('[data-result-index]');
                if (!card) return;

                const resultIndex = Number.parseInt(card.dataset.resultIndex, 10);
                const selected = currentResults[resultIndex];
                if (!selected) return;

                scrollToSearchTarget(selected);
            });
        });
    };

    const applySearch = () => {
        const query = searchInput.value.trim();
        if (!query) {
            renderIdleState();
            return;
        }

        const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
        const results = rankItems(query);

        if (!results.length) {
            renderNoMatchState(query);
            return;
        }

        currentResults = results;
        activeIndex = -1;
        renderResults(results, terms);
    };

    searchInput.addEventListener('input', applySearch);

    searchInput.addEventListener('keydown', (event) => {
        if (!currentResults.length) return;

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            activeIndex = (activeIndex + 1) % currentResults.length;
            updateActiveCard(activeIndex);
            return;
        }

        if (event.key === 'ArrowUp') {
            event.preventDefault();
            activeIndex = activeIndex <= 0 ? currentResults.length - 1 : activeIndex - 1;
            updateActiveCard(activeIndex);
            return;
        }

        if (event.key === 'Enter') {
            event.preventDefault();
            const selected = currentResults[activeIndex >= 0 ? activeIndex : 0];
            if (selected) {
                scrollToSearchTarget(selected);
            }
            return;
        }

        if (event.key === 'Escape') {
            event.preventDefault();
            searchInput.value = '';
            renderIdleState();
        }
    });

    clearButton.addEventListener('click', () => {
        searchInput.value = '';
        renderIdleState();
        searchInput.focus();
    });

    renderIdleState();
}

function buildSearchIndex() {
    const items = [];

    const addItem = (item) => {
        if (!item || !item.title) return;

        items.push({
            title: item.title,
            description: item.description || '',
            keywords: item.keywords || '',
            target: item.target || null,
            url: item.url || '',
            type: item.type || 'info'
        });
    };

    document.querySelectorAll('nav a[href^="#"]').forEach((link) => {
        const href = link.getAttribute('href');
        if (!href) return;

        const target = document.querySelector(href);
        if (!target) return;

        const title = (link.textContent || '').trim();
        if (!title) return;

        addItem({
            title,
            description: `Jump to the ${title} section.`,
            keywords: `${title} page section navigation`,
            target,
            type: 'page'
        });
    });

    document.querySelectorAll('#services .service-card').forEach((card) => {
        const title = (card.querySelector('h3')?.textContent || '').trim();
        const description = (card.querySelector('p')?.textContent || '').trim();
        if (!title) return;

        addItem({
            title,
            description,
            keywords: `${title} ${description} service support repair`,
            target: card,
            type: 'service'
        });
    });

    document.querySelectorAll('#portfolio .portfolio-item').forEach((item) => {
        const title = (item.querySelector('h3')?.textContent || '').trim();
        const description = (item.querySelector('p')?.textContent || '').trim();
        if (!title) return;

        addItem({
            title,
            description,
            keywords: `${title} ${description} portfolio project work`,
            target: item,
            type: 'project'
        });
    });

    document.querySelectorAll('#contact .contact-item').forEach((item) => {
        const title = (item.querySelector('h3')?.textContent || '').trim();
        const description = (item.querySelector('p')?.textContent || '').trim().replace(/\s+/g, ' ');
        if (!title || !description) return;

        addItem({
            title,
            description,
            keywords: `${title} ${description} contact phone email address`,
            target: item,
            type: 'info'
        });
    });

    document.querySelectorAll('.header-auth a[href]').forEach((link) => {
        const title = (link.textContent || '').trim();
        const href = link.getAttribute('href');
        if (!title || !href) return;

        addItem({
            title,
            description: `Open ${title} page.`,
            keywords: `${title} account authentication`,
            url: href,
            type: 'account'
        });
    });

    return items;
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
// 5B. AUTH FORM ENHANCEMENTS
// ============================================
function authFormEnhancements() {
    const authForms = document.querySelectorAll('.auth-form');
    if (!authForms.length) return;

    setupPasswordToggles();

    authForms.forEach((form) => {
        const responseElement = form.querySelector('.auth-response');

        if (form.id === 'signupForm') {
            const signupPassword = form.querySelector('#signupPassword');
            const confirmPassword = form.querySelector('#signupConfirmPassword');

            const syncPasswordValidation = () => {
                if (!signupPassword || !confirmPassword) return;

                if (confirmPassword.value && signupPassword.value !== confirmPassword.value) {
                    confirmPassword.setCustomValidity('Passwords do not match.');
                } else {
                    confirmPassword.setCustomValidity('');
                }
            };

            if (signupPassword && confirmPassword) {
                signupPassword.addEventListener('input', syncPasswordValidation);
                confirmPassword.addEventListener('input', syncPasswordValidation);
            }
        }

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            clearAuthResponse(responseElement);

            if (!form.checkValidity()) {
                form.reportValidity();
                setAuthResponse(responseElement, 'Please complete all required fields correctly.', 'error');
                return;
            }

            const submitButton = form.querySelector('button[type="submit"]');
            const originalLabel = submitButton ? submitButton.textContent : '';

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Please wait...';
            }

            setTimeout(() => {
                if (submitButton) {
                    submitButton.textContent = originalLabel;
                    submitButton.disabled = false;
                }

                const successMessage = form.dataset.successMessage || 'Form submitted successfully.';
                setAuthResponse(responseElement, successMessage, 'success');
                form.reset();

                form.querySelectorAll('input[type="password"]').forEach((input) => {
                    input.type = 'password';
                });

                form.querySelectorAll('.password-toggle').forEach((toggle) => {
                    toggle.textContent = 'Show';
                });
            }, 850);
        });
    });
}

function setupPasswordToggles() {
    const toggles = document.querySelectorAll('.password-toggle[data-password-target]');

    toggles.forEach((toggle) => {
        toggle.addEventListener('click', () => {
            const targetId = toggle.getAttribute('data-password-target');
            const targetInput = targetId ? document.getElementById(targetId) : null;

            if (!targetInput) return;

            const isVisible = targetInput.type === 'text';
            targetInput.type = isVisible ? 'password' : 'text';
            toggle.textContent = isVisible ? 'Show' : 'Hide';
        });
    });
}

function setAuthResponse(target, message, type) {
    if (!target) return;

    target.classList.remove('success', 'error');
    target.textContent = message;

    if (type === 'success' || type === 'error') {
        target.classList.add(type);
    }
}

function clearAuthResponse(target) {
    if (!target) return;

    target.classList.remove('success', 'error');
    target.textContent = '';
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