// Dark mode functionality
(function() {
    // Get saved theme or default to system preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    // If no saved theme, let CSS prefers-color-scheme handle it
})();

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    // Dark mode toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            let newTheme;
            
            if (currentTheme === 'dark') {
                newTheme = 'light';
            } else if (currentTheme === 'light') {
                newTheme = 'dark';
            } else {
                // No manual theme set, check system preference
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                newTheme = prefersDark ? 'light' : 'dark';
            }
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
    
    // Function to initialize dropdown functionality
    function initializeDropdowns() {
        const dropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');
        
        dropdownToggles.forEach(toggle => {
            // Remove existing listeners to avoid duplicates
            toggle.removeEventListener('click', handleDropdownClick);
            toggle.addEventListener('click', handleDropdownClick);
        });
    }
    
    // Dropdown click handler
    function handleDropdownClick(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const dropdown = this.closest('.nav-dropdown');
        const isOpen = dropdown.classList.contains('open');
        
        // Find parent dropdown container (if any)
        const parentDropdownContent = dropdown.parentElement.closest('.nav-dropdown-content');
        
        // Close all sibling dropdowns (at the same level)
        const siblingContainer = parentDropdownContent || dropdown.parentElement;
        siblingContainer.querySelectorAll(':scope > .nav-dropdown').forEach(d => {
            if (d !== dropdown) {
                d.classList.remove('open');
                // Also close all nested dropdowns within siblings
                d.querySelectorAll('.nav-dropdown').forEach(nested => {
                    nested.classList.remove('open');
                });
            }
        });
        
        // Toggle current dropdown
        dropdown.classList.toggle('open', !isOpen);
    }
    
    // Initialize dropdowns
    initializeDropdowns();
    
    // Prevent dropdown closing when clicking on nav-items inside dropdowns
    document.querySelectorAll('.nav-dropdown-content .nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
    
    // Mobile menu toggle
    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        });
    }
    
    // Auto-expand dropdown if current page is inside it
    const currentUrl = window.location.pathname;
    const activeNavItem = document.querySelector(`.nav-item[href="${currentUrl}"]`);
    if (activeNavItem) {
        // Find all parent dropdowns and open them
        let currentElement = activeNavItem;
        while (currentElement) {
            const parentDropdown = currentElement.closest('.nav-dropdown');
            if (parentDropdown) {
                parentDropdown.classList.add('open');
                currentElement = parentDropdown.parentElement;
            } else {
                break;
            }
        }
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Decode the URL to handle accented characters
            const href = this.getAttribute('href');
            const decodedHref = decodeURIComponent(href);
            
            try {
                const target = document.querySelector(decodedHref);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL hash without jumping
                    history.pushState(null, null, href);
                }
            } catch (e) {
                // If selector is still invalid, try using getElementById
                const id = decodedHref.substring(1);
                const target = document.getElementById(id);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    history.pushState(null, null, href);
                }
            }
        });
    });
    
    // Search functionality
    let searchIndex = null;
    let searchInput = document.querySelector('.search-input');
    let searchResults = document.getElementById('searchResults');
    
    // Load search index
    searchResults.innerHTML = '<div class="search-loading">Chargement de l\'index...</div>';
    const pathPrefix = window.SITE_PATH_PREFIX || '';
    fetch(pathPrefix + '/search-index.json')
        .then(response => response.json())
        .then(data => {
            searchIndex = data;
            searchResults.innerHTML = '';
        })
        .catch(error => {
            console.error('Error loading search index:', error);
            searchResults.innerHTML = '';
        });
    
    // Search function
    function performSearch(query) {
        if (!query || query.length < 2) {
            searchResults.classList.remove('active');
            return;
        }
        
        if (!searchIndex) {
            searchResults.innerHTML = '<div class="search-loading">Chargement...</div>';
            searchResults.classList.add('active');
            return;
        }
        
        const lowerQuery = query.toLowerCase();
        const results = [];
        
        // Search in documents and sections
        searchIndex.documents.forEach(doc => {
            // Search in document title and content
            const docTitleMatch = doc.title.toLowerCase().includes(lowerQuery);
            const docContentMatch = doc.content.toLowerCase().includes(lowerQuery);
            
            if (docTitleMatch) {
                results.push({
                    title: doc.title,
                    url: doc.url,
                    excerpt: extractExcerpt(doc.content, lowerQuery),
                    score: 10,
                    type: 'document'
                });
            } else if (docContentMatch) {
                results.push({
                    title: doc.title,
                    url: doc.url,
                    excerpt: extractExcerpt(doc.content, lowerQuery),
                    score: 5,
                    type: 'document'
                });
            }
            
            // Search in sections
            if (doc.sections && doc.sections.length > 0) {
                doc.sections.forEach(section => {
                    const sectionTitleMatch = section.title.toLowerCase().includes(lowerQuery);
                    const sectionContentMatch = section.content.toLowerCase().includes(lowerQuery);
                    
                    if (sectionTitleMatch || sectionContentMatch) {
                        results.push({
                            title: doc.title,
                            section: section.title,
                            url: doc.url + '#' + section.id,
                            excerpt: extractExcerpt(section.content, lowerQuery),
                            score: sectionTitleMatch ? 8 : 3,
                            type: 'section'
                        });
                    }
                });
            }
        });
        
        // Sort by score and limit results
        const sortedResults = results
            .sort((a, b) => b.score - a.score)
            .slice(0, 15);
        
        displaySearchResults(sortedResults, query);
    }
    
    // Extract excerpt around the match
    function extractExcerpt(content, query) {
        if (!content) return '';
        
        const lowerContent = content.toLowerCase();
        const index = lowerContent.indexOf(query.toLowerCase());
        
        if (index === -1) return content.substring(0, 150) + '...';
        
        const start = Math.max(0, index - 80);
        const end = Math.min(content.length, index + query.length + 80);
        let excerpt = content.substring(start, end);
        
        if (start > 0) excerpt = '...' + excerpt;
        if (end < content.length) excerpt = excerpt + '...';
        
        // Highlight the match
        const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
        excerpt = excerpt.replace(regex, '<mark>$1</mark>');
        
        return excerpt;
    }
    
    // Escape regex special characters
    function escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    // Display search results
    function displaySearchResults(results, query) {
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-no-results">Aucun résultat pour "' + escapeHtml(query) + '"</div>';
            searchResults.classList.add('active');
            return;
        }
        
        const pathPrefix = window.SITE_PATH_PREFIX || '';
        const html = results.map(result => {
            const breadcrumb = result.type === 'section' ? 
                `<div class="search-result-breadcrumb">${escapeHtml(result.title)} › ${escapeHtml(result.section)}</div>` :
                '';
            
            const sectionBadge = result.type === 'section' ?
                `<span class="search-result-section">→ ${escapeHtml(result.section)}</span>` :
                '';
            
            return `
                <a href="${pathPrefix}${result.url}" class="search-result-item">
                    ${breadcrumb}
                    <div class="search-result-header">
                        <div class="search-result-title">${result.type === 'section' ? '' : escapeHtml(result.title)}${sectionBadge}</div>
                    </div>
                    ${result.excerpt ? `<div class="search-result-excerpt">${result.excerpt}</div>` : ''}
                </a>
            `;
        }).join('');
        
        searchResults.innerHTML = html;
        searchResults.classList.add('active');
    }
    
    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Search input event listener
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function(e) {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch(e.target.value);
            }, 300);
        });
        
        // Close search results when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-container')) {
                searchResults.classList.remove('active');
            }
        });
        
        // Keyboard navigation for search
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                searchResults.classList.remove('active');
                searchInput.blur();
            }
        });
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu and dropdowns
    if (e.key === 'Escape') {
        document.querySelector('.sidebar')?.classList.remove('open');
        document.querySelectorAll('.nav-dropdown.open').forEach(dropdown => {
            dropdown.classList.remove('open');
        });
    }
});