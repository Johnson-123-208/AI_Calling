// ===================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ===================================

// Configuration for Intersection Observer with different thresholds
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observerOptionsEarly = {
    threshold: 0.05,
    rootMargin: '0px 0px -50px 0px'
};

// Create observer for fade-in animations with stagger
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const cards = entry.target.parentElement.querySelectorAll('.problem-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 150);
            });
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptionsEarly);

// Create observer for slide-in animations with cascade effect
const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const cards = entry.target.parentElement.querySelectorAll('.feature-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 120);
            });
            slideObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Create observer for layer reveal animations
const layerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 180);
            layerObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Create observer for step reveal animations with alternating pattern
const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 200);
            stepObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Create observer for card reveal animations
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const cards = entry.target.parentElement.querySelectorAll('.process-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 100);
            });
            cardObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Create observer for fade-up animations
const fadeUpObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 120);
            fadeUpObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// ===================================
// INITIALIZE OBSERVERS ON DOM LOAD
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Observe problem cards - observe the grid container
    const problemGrid = document.querySelector('.problem-grid');
    if (problemGrid && problemGrid.children.length > 0) {
        fadeObserver.observe(problemGrid.children[0]);
    }

    // Observe feature cards - observe the grid container
    const featuresGrid = document.querySelector('.features-grid');
    if (featuresGrid && featuresGrid.children.length > 0) {
        slideObserver.observe(featuresGrid.children[0]);
    }

    // Observe technology layers
    const techLayers = document.querySelectorAll('.tech-layer');
    techLayers.forEach(layer => layerObserver.observe(layer));

    // Observe workflow steps
    const workflowSteps = document.querySelectorAll('.workflow-step');
    workflowSteps.forEach(step => stepObserver.observe(step));

    // Observe process cards - observe the grid container
    const processGrid = document.querySelector('.process-grid');
    if (processGrid && processGrid.children.length > 0) {
        cardObserver.observe(processGrid.children[0]);
    }

    // Observe outcome items
    const outcomeItems = document.querySelectorAll('.outcome-item');
    outcomeItems.forEach(item => fadeUpObserver.observe(item));
});

// ===================================
// PARALLAX SCROLLING EFFECTS
// ===================================

let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;

    // Parallax for hero section background
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const heroBackground = heroSection.querySelector('::before');
        heroSection.style.transform = `translateY(${scrolled * 0.3}px)`;
    }

    // Parallax for section backgrounds
    const sections = document.querySelectorAll('.problem-section, .proposed-section, .workflow-section');
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const offset = (window.innerHeight - rect.top) * 0.1;
            section.style.setProperty('--parallax-offset', `${offset}px`);
        }
    });

    // Animate waveform based on scroll
    const waveformBars = document.querySelectorAll('.waveform .bar');
    waveformBars.forEach((bar, index) => {
        const scrollFactor = Math.sin(scrolled * 0.01 + index) * 0.3 + 1;
        bar.style.transform = `scaleY(${scrollFactor})`;
    });

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// WAVEFORM ANIMATION ENHANCEMENT
// ===================================

// Add slight randomness to waveform animation for more natural feel
const waveformBars = document.querySelectorAll('.waveform .bar');
waveformBars.forEach((bar, index) => {
    const randomDelay = Math.random() * 0.3;
    bar.style.animationDelay = `${index * 0.1 + randomDelay}s`;

    // Add random duration variation
    const randomDuration = 1.2 + Math.random() * 0.6;
    bar.style.animationDuration = `${randomDuration}s`;
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Reduce animations on low-performance devices
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-smooth', 'none');
    document.documentElement.style.setProperty('--transition-slow', 'none');
}

// ===================================
// LAZY LOADING ENHANCEMENT
// ===================================

// Preload critical content
window.addEventListener('load', () => {
    // Add loaded class to body for any load-dependent styles
    document.body.classList.add('loaded');
});

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================

// Add keyboard navigation support for interactive elements
const interactiveCards = document.querySelectorAll('.problem-card, .feature-card, .process-card, .outcome-item');

interactiveCards.forEach(card => {
    card.setAttribute('tabindex', '0');

    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            card.click();
        }
    });
});

// ===================================
// VIEWPORT HEIGHT FIX FOR MOBILE
// ===================================

// Fix for mobile browsers where 100vh includes address bar
function setVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', setVH);

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log('%c🎯 AI Voice-Based Calling System', 'font-size: 20px; font-weight: bold; color: #5B7C99;');
console.log('%cWebsite loaded successfully', 'font-size: 14px; color: #6B6B6B;');
