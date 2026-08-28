/* ============================================
   FRANCIS FX ACADEMY - JAVASCRIPT FUNCTIONALITY
   ============================================ */

// ============================================
// MOBILE MENU TOGGLE
// ============================================
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

function closeMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.remove('active');
}

// Close mobile menu when window is resized to desktop size
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        document.getElementById('navMenu').classList.remove('active');
    }
});

// ============================================
// SMOOTH SCROLLING
// ============================================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        closeMenu();
    }
}

// ============================================
// CURRICULUM TABS
// ============================================
function showTab(tabId) {
    // Hide all tabs
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active class from all buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Add active class to clicked button
    event.target.classList.add('active');
}

// Set first tab as active by default
document.addEventListener('DOMContentLoaded', function() {
    const firstTabBtn = document.querySelector('.tab-btn');
    if (firstTabBtn) {
        firstTabBtn.classList.add('active');
    }
    const firstTab = document.querySelector('.tab-content');
    if (firstTab) {
        firstTab.classList.add('active');
    }
});

// ============================================
// ENROLLMENT MODAL
// ============================================
const modal = document.getElementById('enrollmentModal');

function enrollCourse(courseLevel) {
    modal.style.display = 'block';
    document.getElementById('selectedCourse').textContent = `Enrolling in: ${courseLevel} Level Course`;
    
    // Add animation
    modal.style.animation = 'none';
    setTimeout(() => {
        modal.style.animation = 'modalFadeIn 0.3s ease';
    }, 10);
}

function closeModal() {
    modal.style.display = 'none';
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

// ============================================
// ENROLLMENT FORM HANDLING
// ============================================
function handleEnrollment(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const experience = form.querySelector('select').value;
    const goals = form.querySelector('textarea').value;

    // Validate form
    if (!name || !email || !experience || !goals) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Show success message
    showNotification(`Thank you ${name}! We've received your enrollment. Check your email at ${email} for next steps.`, 'success');
    
    // Clear form
    form.reset();
    
    // Close modal after 2 seconds
    setTimeout(() => {
        closeModal();
    }, 2000);
}

// ============================================
// CONTACT FORM HANDLING
// ============================================
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const inputs = form.querySelectorAll('input, textarea');
    
    let isValid = true;
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#d33b27';
        } else {
            input.style.borderColor = '#dadce0';
        }
    });

    if (!isValid) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const subject = form.querySelectorAll('input')[2].value;

    // Show success message
    showNotification(`Message received! We'll get back to you soon at ${email}`, 'success');
    
    // Clear form
    form.reset();
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    const styles = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        background-color: ${type === 'success' ? '#34a853' : type === 'error' ? '#d33b27' : '#1a73e8'};
        color: white;
        z-index: 3000;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    
    notification.setAttribute('style', styles);
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Add animations to document
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeIn 0.6s ease forwards`;
            entry.target.style.opacity = '0';
            setTimeout(() => {
                entry.target.style.opacity = '1';
            }, 50);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all course cards and feature items on page load
document.addEventListener('DOMContentLoaded', function() {
    const elementsToObserve = document.querySelectorAll('.course-card, .feature-item, .testimonial-card, .curriculum-item, .about-feature');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
});

// ============================================
// COUNTER ANIMATION FOR STATS
// ============================================
let hasAnimated = false;

function animateCounters() {
    if (hasAnimated) return;
    
    const statCards = document.querySelectorAll('.stat-card h3');
    
    statCards.forEach(card => {
        const targetText = card.textContent;
        const targetNumber = parseInt(targetText.replace(/\D/g, ''));
        const suffix = targetText.replace(/[0-9]/g, '').trim();
        
        let current = 0;
        const increment = Math.ceil(targetNumber / 50);
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetNumber) {
                current = targetNumber;
                clearInterval(timer);
            }
            card.textContent = current.toLocaleString() + suffix;
        }, 30);
    });
    
    hasAnimated = true;
}

// Trigger counter animation when stats section is in view
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ============================================
// COURSE CARD HOVER EFFECT
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add a subtle glow effect
            this.style.boxShadow = '0 12px 40px rgba(26, 115, 232, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        });
    });
});

// ============================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// ============================================
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = 'var(--text-dark)';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        }
    });
});

// ============================================
// FORM INPUT ANIMATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// ============================================
// LAZY LOADING FOR IMAGES
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ============================================
// ACCESSIBILITY - KEYBOARD NAVIGATION
// ============================================
document.addEventListener('keydown', function(event) {
    // Close modal on Escape key
    if (event.key === 'Escape') {
        modal.style.display = 'none';
    }
    
    // Close mobile menu on Escape
    if (event.key === 'Escape') {
        document.getElementById('navMenu').classList.remove('active');
    }
});

// ============================================
// UTILITY FUNCTION - SMOOTH SCROLL POLYFILL
// ============================================
if (!('scrollBehavior' in document.documentElement.style)) {
    console.log('Smooth scroll not supported, adding polyfill');
    // Basic fallback for browsers that don't support smooth scroll
}

// ============================================
// PAGE PERFORMANCE OPTIMIZATION
// ============================================

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

// Optimize scroll events
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Scroll event handler here
            ticking = false;
        });
        ticking = true;
    }
});

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Francis FX Academy Website loaded successfully!');
    
    // Initialize tooltips
    initializeTooltips();
    
    // Add smooth transitions
    addSmoothTransitions();
});

function initializeTooltips() {
    // Add tooltips to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.setAttribute('role', 'button');
        btn.setAttribute('tabindex', '0');
    });
}

function addSmoothTransitions() {
    // Add CSS transitions to all elements
    const elements = document.querySelectorAll('*');
    elements.forEach(el => {
        if (!el.style.transition) {
            el.style.transition = 'all 0.3s ease';
        }
    });
}

// ============================================
// DYNAMIC YEAR IN FOOTER
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const year = new Date().getFullYear();
    const footerText = document.querySelector('.footer-bottom p:first-child');
    if (footerText) {
        footerText.textContent = `© ${year} Francis FX Academy. All rights reserved. | Designed with ❤️ for traders`;
    }
});

// ============================================
// GOOGLE ANALYTICS (Optional - Add your tracking ID)
// ============================================
// Replace 'GA_ID' with your actual Google Analytics ID
// window.dataLayer = window.dataLayer || [];
// function gtag(){dataLayer.push(arguments);}
// gtag('js', new Date());
// gtag('config', 'GA_ID');

// ============================================
// CONVERSION TRACKING
// ============================================
function trackEnrollment(courseLevel) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'enrollment', {
            'course_level': courseLevel,
            'timestamp': new Date().toISOString()
        });
    }
}

function trackContactSubmit() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'contact_form_submit', {
            'timestamp': new Date().toISOString()
        });
    }
}

// ============================================
// FEATURE DETECTION
// ============================================
function checkBrowserSupport() {
    const features = {
        'CSS Grid': CSS.supports('display', 'grid'),
        'Flexbox': CSS.supports('display', 'flex'),
        'CSS Variables': CSS.supports('--test', '0'),
        'Local Storage': typeof(Storage) !== 'undefined'
    };
    
    return features;
}

// ============================================
// ERROR LOGGING
// ============================================
window.addEventListener('error', function(event) {
    console.error('Error:', event.error);
    // Send to error logging service
    // logError(event.error);
});

// ============================================
// PERFORMANCE MONITORING
// ============================================
if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time: ' + pageLoadTime + 'ms');
    });
}

// ============================================
// END OF SCRIPT
// ============================================
