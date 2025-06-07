// Portfolio JavaScript - Modern ES6+ Implementation

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupTypingAnimation();
        this.setupScrollNavigation();
        this.setupScrollAnimations();
        this.setupSkillBarAnimations();
        this.setupSmoothScrolling();
    }

    // Typing Animation for Hero Section
    setupTypingAnimation() {
        const typingElement = document.querySelector('.typing-text');
        const cursor = document.querySelector('.cursor');
        
        const phrases = [
            'Software Engineer',
            'Android Developer',
            'Full-Stack Developer'
        ];
        
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const typeText = () => {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500; // Pause before next phrase
            }

            setTimeout(typeText, typingSpeed);
        };

        // Start typing animation
        setTimeout(typeText, 1000);
    }

    // Scroll Navigation with Active Section Highlighting
    setupScrollNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');

        const updateActiveNav = () => {
            let currentSection = '';
            const scrollY = window.pageYOffset;

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    currentSection = sectionId;
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        };

        // Update on scroll
        window.addEventListener('scroll', updateActiveNav);
        
        // Update on load
        updateActiveNav();
    }

    // Scroll-triggered Animations using Intersection Observer
    setupScrollAnimations() {
        const animateElements = document.querySelectorAll('[data-animate]');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationType = element.getAttribute('data-animate');
                    
                    switch (animationType) {
                        case 'slide-up':
                            element.classList.add('animate');
                            break;
                        case 'fade-in':
                            element.classList.add('fade-in');
                            break;
                        default:
                            element.classList.add('animate');
                    }
                    
                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        animateElements.forEach(element => {
            observer.observe(element);
        });

        // Add initial classes for CSS transitions
        animateElements.forEach(element => {
            const animationType = element.getAttribute('data-animate');
            if (animationType === 'slide-up') {
                element.classList.add('slide-up');
            }
        });
    }

    // Progressive Skill Bar Animations
    setupSkillBarAnimations() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const targetWidth = skillBar.getAttribute('data-width');
                    
                    // Animate skill bar with delay for staggered effect
                    setTimeout(() => {
                        skillBar.style.width = `${targetWidth}%`;
                    }, 200);
                    
                    skillObserver.unobserve(skillBar);
                }
            });
        }, observerOptions);

        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }

    // Smooth Scrolling for Navigation Links
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = 70; // Fixed nav height
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Smooth scroll for hero buttons
        const heroButtons = document.querySelectorAll('.hero-buttons a[href^="#"]');
        heroButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = button.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = 70;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Enhanced Glassmorphic Hover Effects
    setupGlassmorphicEffects() {
        const glassmorphicElements = document.querySelectorAll('.glassmorphic');
        
        glassmorphicElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-5px) scale(1.02)';
                element.style.boxShadow = '0 20px 40px rgba(100, 255, 218, 0.15)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translateY(0) scale(1)';
                element.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.37)';
            });
        });
    }

    // Parallax Effect for Background Shapes
    setupParallaxEffect() {
        const shapes = document.querySelectorAll('.shape');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            shapes.forEach((shape, index) => {
                const speed = parallaxSpeed * (index + 1) * 0.2;
                const yPos = -(scrolled * speed);
                shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
            });
        });
    }

    // Enhanced Contact Link Interactions
    setupContactInteractions() {
        const contactLinks = document.querySelectorAll('.contact-link');
        
        contactLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateX(10px)';
                link.style.borderColor = 'var(--accent-primary)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateX(0)';
                link.style.borderColor = 'rgba(100, 255, 218, 0.2)';
            });
        });
    }

    // Tech Tag Hover Effects
    setupTechTagEffects() {
        const techTags = document.querySelectorAll('.tech-tag');
        
        techTags.forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                tag.style.transform = 'scale(1.1)';
                tag.style.background = 'rgba(100, 255, 218, 0.2)';
                tag.style.borderColor = 'var(--accent-primary)';
            });
            
            tag.addEventListener('mouseleave', () => {
                tag.style.transform = 'scale(1)';
                tag.style.background = 'rgba(100, 255, 218, 0.1)';
                tag.style.borderColor = 'rgba(100, 255, 218, 0.3)';
            });
        });
    }

    // Performance Optimized Scroll Handler
    setupOptimizedScrolling() {
        let ticking = false;
        
        const updateOnScroll = () => {
            // Add scroll-based effects here
            const scrollY = window.pageYOffset;
            const nav = document.querySelector('.nav-fixed');
            
            if (scrollY > 100) {
                nav.style.background = 'rgba(10, 25, 47, 0.95)';
                nav.style.backdropFilter = 'blur(15px)';
            } else {
                nav.style.background = 'rgba(10, 25, 47, 0.9)';
                nav.style.backdropFilter = 'blur(10px)';
            }
            
            ticking = false;
        };

        const requestScrollUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateOnScroll);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestScrollUpdate);
    }

    // Initialize Enhanced Effects
    initializeEnhancedEffects() {
        this.setupGlassmorphicEffects();
        this.setupParallaxEffect();
        this.setupContactInteractions();
        this.setupTechTagEffects();
        this.setupOptimizedScrolling();
    }
}

// Utility Functions
const utils = {
    // Debounce function for performance optimization
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Loading Animation
const showLoadingComplete = () => {
    document.body.classList.add('loaded');
    
    // Add entrance animation to hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.opacity = '0';
        heroSection.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroSection.style.transition = 'all 0.8s ease-out';
            heroSection.style.opacity = '1';
            heroSection.style.transform = 'translateY(0)';
        }, 100);
    }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    // Create main app instance
    const app = new PortfolioApp();
    
    // Initialize enhanced effects after DOM is loaded
    setTimeout(() => {
        app.initializeEnhancedEffects();
    }, 500);
    
    // Show loading complete
    showLoadingComplete();
    
    // Add resize handler for responsive behavior
    window.addEventListener('resize', utils.debounce(() => {
        // Handle responsive adjustments if needed
        app.setupScrollNavigation();
    }, 250));
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioApp, utils };
}