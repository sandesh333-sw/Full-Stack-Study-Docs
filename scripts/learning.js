// Learning Pages JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeLearningPage();
});

function initializeLearningPage() {
    initSmoothScrolling();
    initActiveNavigation();
    initCodeCopyButtons();
    initProgressTracking();
    initSearchInPage();
    initKeyboardShortcuts();
    initTableOfContents();
    highlightCurrentSection();
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.topic-nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offset = 120; // Account for fixed header
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active state
                updateActiveNavItem(this);
            }
        });
    });
}

// Update active navigation item
function updateActiveNavItem(activeLink) {
    // Remove active class from all links
    document.querySelectorAll('.topic-nav a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked link
    activeLink.classList.add('active');
}

// Highlight current section based on scroll position
function highlightCurrentSection() {
    const sections = document.querySelectorAll('.topic-section');
    const navLinks = document.querySelectorAll('.topic-nav a');
    
    function updateActiveSection() {
        let current = '';
        const scrollPos = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    // Throttle scroll events
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveSection();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial call
    updateActiveSection();
}

// Add copy buttons to code examples
function initCodeCopyButtons() {
    const codeBlocks = document.querySelectorAll('.code-example pre');
    
    codeBlocks.forEach(block => {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-btn';
        copyButton.innerHTML = '📋 Copy';
        copyButton.setAttribute('aria-label', 'Copy code to clipboard');
        
        // Create wrapper for positioning
        const wrapper = document.createElement('div');
        wrapper.className = 'code-wrapper';
        wrapper.style.position = 'relative';
        
        block.parentNode.insertBefore(wrapper, block);
        wrapper.appendChild(block);
        wrapper.appendChild(copyButton);
        
        copyButton.addEventListener('click', function() {
            const code = block.querySelector('code');
            const text = code ? code.textContent : block.textContent;
            
            navigator.clipboard.writeText(text).then(function() {
                copyButton.innerHTML = '✅ Copied!';
                copyButton.style.background = '#28a745';
                
                setTimeout(function() {
                    copyButton.innerHTML = '📋 Copy';
                    copyButton.style.background = '';
                }, 2000);
            }).catch(function() {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                
                try {
                    document.execCommand('copy');
                    copyButton.innerHTML = '✅ Copied!';
                } catch (err) {
                    copyButton.innerHTML = '❌ Failed';
                }
                
                document.body.removeChild(textArea);
                
                setTimeout(function() {
                    copyButton.innerHTML = '📋 Copy';
                }, 2000);
            });
        });
    });
}

// Track reading progress
function initProgressTracking() {
    const sections = document.querySelectorAll('.topic-section');
    const progressKey = `progress_${window.location.pathname}`;
    
    // Load saved progress
    const savedProgress = JSON.parse(localStorage.getItem(progressKey) || '{}');
    
    // Mark completed sections
    Object.keys(savedProgress).forEach(sectionId => {
        if (savedProgress[sectionId]) {
            markSectionComplete(sectionId);
        }
    });
    
    // Track section visibility
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                const sectionId = entry.target.getAttribute('id');
                const timeSpent = Date.now();
                
                // Mark as read after spending some time
                setTimeout(() => {
                    if (entry.target.getBoundingClientRect().top < window.innerHeight) {
                        markSectionAsRead(sectionId, progressKey);
                    }
                }, 3000); // 3 seconds
            }
        });
    }, {
        threshold: [0.5],
        rootMargin: '0px 0px -20% 0px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

function markSectionAsRead(sectionId, progressKey) {
    const progress = JSON.parse(localStorage.getItem(progressKey) || '{}');
    
    if (!progress[sectionId]) {
        progress[sectionId] = {
            completed: true,
            timestamp: Date.now()
        };
        
        localStorage.setItem(progressKey, JSON.stringify(progress));
        markSectionComplete(sectionId);
        showProgressNotification(`Section completed: ${formatSectionTitle(sectionId)}`);
    }
}

function markSectionComplete(sectionId) {
    const navLink = document.querySelector(`.topic-nav a[href="#${sectionId}"]`);
    if (navLink && !navLink.classList.contains('completed')) {
        navLink.classList.add('completed');
        navLink.innerHTML += ' ✓';
    }
}

function formatSectionTitle(sectionId) {
    return sectionId.replace(/-/g, ' ')
                   .replace(/\b\w/g, l => l.toUpperCase());
}

// Search within page content
function initSearchInPage() {
    // Add search box to sidebar
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'page-search';
        searchContainer.innerHTML = `
            <input type="text" 
                   class="page-search-input" 
                   placeholder="Search this page..." 
                   aria-label="Search page content">
            <div class="page-search-results"></div>
        `;
        
        sidebar.insertBefore(searchContainer, sidebar.firstChild);
        
        const searchInput = searchContainer.querySelector('.page-search-input');
        const searchResults = searchContainer.querySelector('.page-search-results');
        
        searchInput.addEventListener('input', function() {
            const query = this.value.trim().toLowerCase();
            if (query.length >= 2) {
                performPageSearch(query, searchResults);
            } else {
                searchResults.innerHTML = '';
                clearSearchHighlights();
            }
        });
    }
}

function performPageSearch(query, resultsContainer) {
    clearSearchHighlights();
    
    const sections = document.querySelectorAll('.topic-section');
    const results = [];
    
    sections.forEach(section => {
        const title = section.querySelector('h2').textContent;
        const content = section.textContent.toLowerCase();
        
        if (content.includes(query)) {
            const sectionId = section.getAttribute('id');
            results.push({
                id: sectionId,
                title: title,
                section: section
            });
            
            // Highlight matches in this section
            highlightMatches(section, query);
        }
    });
    
    displayPageSearchResults(results, resultsContainer);
}

function highlightMatches(section, query) {
    const walker = document.createTreeWalker(
        section,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const textNodes = [];
    let node;
    
    while (node = walker.nextNode()) {
        if (node.parentElement.tagName !== 'SCRIPT' && 
            node.parentElement.tagName !== 'STYLE' &&
            !node.parentElement.closest('.code-example')) {
            textNodes.push(node);
        }
    }
    
    textNodes.forEach(textNode => {
        const text = textNode.textContent;
        const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
        
        if (regex.test(text)) {
            const highlightedText = text.replace(regex, '<mark class="search-highlight">$1</mark>');
            const wrapper = document.createElement('span');
            wrapper.innerHTML = highlightedText;
            textNode.parentNode.replaceChild(wrapper, textNode);
        }
    });
}

function clearSearchHighlights() {
    const highlights = document.querySelectorAll('.search-highlight');
    highlights.forEach(highlight => {
        const parent = highlight.parentNode;
        parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
        parent.normalize();
    });
}

function displayPageSearchResults(results, container) {
    if (results.length === 0) {
        container.innerHTML = '<div class="search-no-results">No results found</div>';
    } else {
        container.innerHTML = results.map(result => `
            <a href="#${result.id}" class="page-search-result">
                ${result.title}
            </a>
        `).join('');
        
        // Add click handlers
        container.querySelectorAll('.page-search-result').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Keyboard shortcuts
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + F for page search
        if ((e.ctrlKey || e.metaKey) && e.key === 'f' && e.shiftKey) {
            e.preventDefault();
            const searchInput = document.querySelector('.page-search-input');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Escape to clear search
        if (e.key === 'Escape') {
            const searchInput = document.querySelector('.page-search-input');
            if (searchInput && searchInput === document.activeElement) {
                searchInput.value = '';
                clearSearchHighlights();
                document.querySelector('.page-search-results').innerHTML = '';
            }
        }
        
        // Arrow keys for navigation
        if (e.altKey) {
            if (e.key === 'ArrowLeft') {
                const prevLink = document.querySelector('.nav-btn.prev');
                if (prevLink) window.location.href = prevLink.href;
            } else if (e.key === 'ArrowRight') {
                const nextLink = document.querySelector('.nav-btn.next');
                if (nextLink) window.location.href = nextLink.href;
            }
        }
    });
}

// Generate table of contents
function initTableOfContents() {
    const sections = document.querySelectorAll('.topic-section');
    const tocContainer = document.querySelector('.topic-nav ul');
    
    if (tocContainer && sections.length > 0) {
        // Clear existing items if any
        tocContainer.innerHTML = '';
        
        sections.forEach(section => {
            const heading = section.querySelector('h2');
            const sectionId = section.getAttribute('id');
            
            if (heading && sectionId) {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                
                link.href = `#${sectionId}`;
                link.textContent = heading.textContent;
                
                listItem.appendChild(link);
                tocContainer.appendChild(listItem);
            }
        });
    }
}

// Show progress notification
function showProgressNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'progress-notification';
    notification.innerHTML = `
        <span class="notification-icon">🎉</span>
        <span class="notification-text">${message}</span>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Estimate reading time
function estimateReadingTime() {
    const content = document.querySelector('.content');
    if (content) {
        const text = content.textContent;
        const words = text.split(/\s+/).length;
        const readingTime = Math.ceil(words / 200); // Average reading speed
        
        const timeDisplay = document.createElement('div');
        timeDisplay.className = 'reading-time';
        timeDisplay.innerHTML = `📖 Estimated reading time: ${readingTime} min`;
        
        const pageHeader = document.querySelector('.page-header .container');
        if (pageHeader) {
            pageHeader.appendChild(timeDisplay);
        }
    }
}

// Initialize reading time estimation
estimateReadingTime();

// Export functions for global use
window.LearningPage = {
    markSectionComplete,
    showProgressNotification,
    clearSearchHighlights,
    highlightMatches
};
