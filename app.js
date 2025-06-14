// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');

// Apply theme
document.documentElement.setAttribute('data-color-scheme', currentTheme);
themeToggle.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';

// Toggle theme
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-color-scheme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-color-scheme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
    
    // Update navbar background
    updateNavbarTheme();
});

// Update navbar background based on theme
function updateNavbarTheme() {
    const currentTheme = document.documentElement.getAttribute('data-color-scheme');
    const navbar = document.querySelector('.nav');
    
    if (currentTheme === 'dark') {
        navbar.style.background = 'rgba(31, 33, 33, 0.95)';
    } else {
        navbar.style.background = 'rgba(252, 252, 249, 0.95)';
    }
}

// Initialize navbar theme
updateNavbarTheme();

// Navigation functionality
const nav = document.querySelector('.nav');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav__links');

// Handle scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('nav--scrolled');
    } else {
        nav.classList.remove('nav--scrolled');
    }
});

// Handle mobile menu toggle
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('nav__links--open');
    menuToggle.setAttribute('aria-expanded', 
        menuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
    );
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && navLinks.classList.contains('nav__links--open')) {
        navLinks.classList.remove('nav__links--open');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});

// Close mobile menu when clicking on a nav link
navLinks.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('nav__links--open');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});

// Smooth Scrolling Navigation
document.querySelectorAll('.nav__link[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('section[id]');
const navLinksArray = Array.from(document.querySelectorAll('.nav__link'));

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinksArray.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.backgroundColor = 'var(--color-success)';
            break;
        case 'error':
            notification.style.backgroundColor = 'var(--color-error)';
            break;
        case 'warning':
            notification.style.backgroundColor = 'var(--color-warning)';
            break;
        default:
            notification.style.backgroundColor = 'var(--color-info)';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Navbar Background on Scroll
const navbar = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentTheme = document.documentElement.getAttribute('data-color-scheme');
    if (window.scrollY > 50) {
        navbar.style.background = currentTheme === 'dark'
            ? 'rgba(31, 33, 33, 0.98)'
            : 'rgba(252, 252, 249, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = currentTheme === 'dark'
            ? 'rgba(31, 33, 33, 0.95)'
            : 'rgba(252, 252, 249, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Intersection Observer for Animation on Scroll
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

// Observe elements for scroll animations
const animatedElements = document.querySelectorAll('.highlight, .skill-category, .job, .project-card, .education__item');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Skill Tags Hover Effect
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'scale(1.05) rotate(2deg)';
    });
    
    tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Project Card Tilt Effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        card.style.transform = 'translateY(-8px) rotateX(5deg)';
        card.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', (e) => {
        card.style.transform = 'translateY(0) rotateX(0deg)';
    });
});

// Timeline Item Animation
const timelineItems = document.querySelectorAll('.timeline__item');
timelineItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
});

// Hero CTA Buttons Hover Effect
const ctaButtons = document.querySelectorAll('.hero__cta .btn');
ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
        button.style.boxShadow = '0 8px 25px rgba(33, 128, 141, 0.3)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = 'none';
    });
});

// Typing Effect for Hero Title (Optional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on page load
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero__title');
    const originalText = heroTitle.textContent;
    
    // Only run typing effect on desktop
    if (window.innerWidth > 768) {
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
});

// Form Input Focus Effects
const formInputs = document.querySelectorAll('.form-control');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'scale(1.02)';
        input.parentElement.style.transition = 'transform 0.2s ease';
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'scale(1)';
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add Loading Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('nav--open');
    });
  }
});

// Smooth Scrolling for Hero CTA Buttons
const heroCtaLinks = document.querySelectorAll('.hero__cta .btn[href^="#"]');

heroCtaLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
        // Close mobile menu after click
        const nav = document.querySelector('.nav');
        if (nav.classList.contains('nav--open')) {
            nav.classList.remove('nav--open');
        }
    });
});

// Google Analytics Event Tracking
// Track button clicks
const trackedButtons = document.querySelectorAll('.btn, .nav__link');
trackedButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (typeof gtag === 'function') {
            gtag('event', 'button_click', {
                event_category: 'Button',
                event_label: btn.textContent || btn.getAttribute('href') || btn.className
            });
        }
    });
});

// Track form submissions
const contactForm = document.querySelector('.contact__form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        if (typeof gtag === 'function') {
            gtag('event', 'form_submit', {
                event_category: 'Form',
                event_label: 'Contact Form'
            });
        }
    });
}

// Track JavaScript errors
window.addEventListener('error', function(event) {
    if (typeof gtag === 'function') {
        gtag('event', 'js_error', {
            event_category: 'Error',
            event_label: event.message + ' at ' + event.filename + ':' + event.lineno
        });
    }
});