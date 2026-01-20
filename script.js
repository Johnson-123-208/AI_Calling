// ===================================
<<<<<<< HEAD
// SCROLL REVEAL ANIMATIONS
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    // Observe all elements with 'reveal' class
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(element => {
        observer.observe(element);
    });
    
    // ===================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ===================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    // ENHANCED CARD INTERACTIONS
    // ===================================
    
    // Add subtle tilt effect on hover for cards (desktop only)
    if (window.innerWidth > 768) {
        const cards = document.querySelectorAll('.problem-card, .system-card, .outcome-item');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                card.style.transform = '';
            });
        });
    }
    
    // ===================================
    // STAGGERED ANIMATIONS FOR GRIDS
    // ===================================
    
    function staggerAnimation(container, itemSelector, delay = 100) {
        const items = container.querySelectorAll(itemSelector);
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('active');
            }, index * delay);
        });
    }
    
    // Apply staggered animation when sections come into view
    const gridObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                
                if (entry.target.classList.contains('problem-grid')) {
                    staggerAnimation(entry.target, '.problem-card', 150);
                } else if (entry.target.classList.contains('system-grid')) {
                    staggerAnimation(entry.target, '.system-card', 150);
                } else if (entry.target.classList.contains('outcome-grid')) {
                    staggerAnimation(entry.target, '.outcome-item', 150);
                }
            }
        });
    }, { threshold: 0.2 });
    
    const grids = document.querySelectorAll('.problem-grid, .system-grid, .outcome-grid');
    grids.forEach(grid => gridObserver.observe(grid));
    
    // ===================================
    // WAVEFORM INTERACTION
    // ===================================
    
    const waveform = document.querySelector('.waveform');
    if (waveform) {
        waveform.addEventListener('mouseenter', function() {
            const bars = waveform.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.animationDuration = '0.6s';
            });
        });
        
        waveform.addEventListener('mouseleave', function() {
            const bars = waveform.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.animationDuration = '1.2s';
            });
        });
    }
    
    // ===================================
    // PROGRESS INDICATOR (OPTIONAL)
    // ===================================
    
    // Create a subtle scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--color-accent);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
    
    // ===================================
    // PERFORMANCE OPTIMIZATION
    // ===================================
    
    // Debounce function for scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Optimize scroll performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                // Any scroll-based updates can go here
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // ===================================
    // ACCESSIBILITY ENHANCEMENTS
    // ===================================
    
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Disable animations for users who prefer reduced motion
        document.querySelectorAll('.reveal, .fade-in, .fade-in-delay, .fade-in-delay-2').forEach(element => {
            element.style.animation = 'none';
            element.style.transition = 'none';
            element.classList.add('active');
            element.style.opacity = '1';
            element.style.transform = 'none';
        });
        
        // Stop waveform animation
        if (waveform) {
            waveform.querySelectorAll('.bar').forEach(bar => {
                bar.style.animation = 'none';
            });
        }
    }
    
    // ===================================
    // LAZY LOADING OPTIMIZATION
    // ===================================
    
    // Add loading attribute to any future images
    document.querySelectorAll('img').forEach(img => {
        img.loading = 'lazy';
    });
    
    // ===================================
    // CONSOLE MESSAGE (OPTIONAL)
    // ===================================
    
    console.log('%c🎓 AI Voice-Based Calling System', 'font-size: 20px; font-weight: bold; color: #4A90E2;');
    console.log('%cUniversity Project - Built with modern web technologies', 'font-size: 12px; color: #5A5A5A;');
    
});
=======
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
>>>>>>> e3757bd2099721731beefecb38e7b2f47dbb2fb0
