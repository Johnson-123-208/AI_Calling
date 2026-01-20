// ===================================
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
