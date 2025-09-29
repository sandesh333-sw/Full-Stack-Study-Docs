// Main JavaScript for Web Development Learning Hub

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all features
    initSmoothScrolling();
    initProgressTracking();
    initThemeToggle();
    initMobileMenu();
    showWelcomeMessage();
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Track learning progress
function initProgressTracking() {
    // Check for existing progress in localStorage
    const progress = getProgress();
    updateProgressDisplay(progress);
    
    // Add click tracking for learning materials
    const learningLinks = document.querySelectorAll('.skill-btn, .project-link');
    
    learningLinks.forEach(link => {
        link.addEventListener('click', function() {
            const section = this.closest('.learning-card, .project-card');
            const title = section ? section.querySelector('h3, h4').textContent : 'Unknown';
            const level = this.textContent.trim();
            
            trackProgress(title, level);
            showProgressNotification(title, level);
        });
    });
}

function getProgress() {
    const saved = localStorage.getItem('webdev-progress');
    return saved ? JSON.parse(saved) : {};
}

function trackProgress(title, level) {
    const progress = getProgress();
    
    if (!progress[title]) {
        progress[title] = [];
    }
    
    if (!progress[title].includes(level)) {
        progress[title].push(level);
        localStorage.setItem('webdev-progress', JSON.stringify(progress));
    }
}

function updateProgressDisplay(progress) {
    // Add progress indicators to completed sections
    Object.keys(progress).forEach(title => {
        const levels = progress[title];
        levels.forEach(level => {
            const button = findButtonByText(title, level);
            if (button) {
                button.classList.add('completed');
                button.innerHTML += ' ✓';
            }
        });
    });
}

function findButtonByText(title, level) {
    const cards = document.querySelectorAll('.learning-card, .project-card');
    
    for (let card of cards) {
        const cardTitle = card.querySelector('h3, h4');
        if (cardTitle && cardTitle.textContent.includes(title)) {
            const buttons = card.querySelectorAll('.skill-btn, .project-link');
            for (let button of buttons) {
                if (button.textContent.includes(level)) {
                    return button;
                }
            }
        }
    }
    return null;
}

function showProgressNotification(title, level) {
    // Create and show a notification
    const notification = createNotification(`Started: ${title} - ${level}`, 'success');
    showNotification(notification);
}

// Theme toggle functionality
function initThemeToggle() {
    // Add theme toggle button to navigation
    const nav = document.querySelector('.nav');
    if (nav) {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '🌙';
        themeToggle.setAttribute('aria-label', 'Toggle dark mode');
        
        nav.appendChild(themeToggle);
        
        themeToggle.addEventListener('click', toggleTheme);
        
        // Load saved theme
        const savedTheme = localStorage.getItem('webdev-theme');
        if (savedTheme === 'dark') {
            enableDarkMode();
        }
    }
}

function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-mode');
    
    if (isDark) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
}

function enableDarkMode() {
    document.body.classList.add('dark-mode');
    localStorage.setItem('webdev-theme', 'dark');
    updateThemeToggleIcon('☀️');
}

function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('webdev-theme', 'light');
    updateThemeToggleIcon('🌙');
}

function updateThemeToggleIcon(icon) {
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
        toggle.innerHTML = icon;
    }
}

// Simplified - search functionality removed for cleaner experience

// Mobile menu functionality
function initMobileMenu() {
    const nav = document.querySelector('.nav');
    if (nav) {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.innerHTML = '☰';
        menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
        
        const navLinks = nav.querySelector('.nav-links');
        nav.insertBefore(menuToggle, navLinks);
        
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('nav-open');
            this.innerHTML = navLinks.classList.contains('nav-open') ? '✕' : '☰';
        });
        
        // Close menu when clicking on a link
        navLinks.addEventListener('click', function() {
            this.classList.remove('nav-open');
            menuToggle.innerHTML = '☰';
        });
    }
}

// Notification system
function createNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <button class="notification-close" aria-label="Close notification">✕</button>
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        hideNotification(notification);
    });
    
    return notification;
}

function showNotification(notification) {
    const container = getNotificationContainer();
    container.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('notification-show');
    }, 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
}

function hideNotification(notification) {
    notification.classList.remove('notification-show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function getNotificationContainer() {
    let container = document.querySelector('.notification-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
    return container;
}

// Welcome message
function showWelcomeMessage() {
    const hasVisited = localStorage.getItem('webdev-visited');
    if (!hasVisited) {
        setTimeout(() => {
            const notification = createNotification(
                'Welcome to your Web Development Learning Hub! 🚀',
                'success'
            );
            showNotification(notification);
            localStorage.setItem('webdev-visited', 'true');
        }, 2000);
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Escape to close search
    if (e.key === 'Escape') {
        const searchResults = document.querySelector('.search-results');
        if (searchResults) {
            searchResults.style.display = 'none';
        }
    }
});

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all cards and features
    const animatedElements = document.querySelectorAll('.learning-card, .project-card, .feature');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Initialize scroll animations after a short delay
setTimeout(initScrollAnimations, 500);

// Export functions for potential use in other modules
window.WebDevHub = {
    trackProgress,
    showNotification: (message, type) => {
        const notification = createNotification(message, type);
        showNotification(notification);
    },
    toggleTheme
};
