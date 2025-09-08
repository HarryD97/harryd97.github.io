// Modern Jekyll Blog JavaScript

(function() {
  'use strict';

  // DOM utility functions
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  // Theme management
  class ThemeManager {
    constructor() {
      this.themeToggle = $('.theme-toggle');
      this.currentTheme = localStorage.getItem('theme') || 
                         (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      this.init();
    }

    init() {
      this.setTheme(this.currentTheme);
      
      if (this.themeToggle) {
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
      }
      
      // Listen for system theme changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
    }

    setTheme(theme) {
      this.currentTheme = theme;
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }

    toggleTheme() {
      const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
      this.setTheme(newTheme);
    }
  }

  // Search functionality
  class SearchManager {
    constructor() {
      this.searchToggle = $('.search-toggle');
      this.searchOverlay = $('.search-overlay');
      this.searchInput = $('.search-input');
      this.searchClose = $('.search-close');
      this.searchResults = $('.search-results-content');
      this.posts = [];
      this.isOpen = false;
      
      this.init();
    }

    async init() {
      if (!this.searchToggle) return;
      
      // Load search data
      await this.loadPosts();
      
      // Event listeners
      this.searchToggle.addEventListener('click', () => this.toggleSearch());
      this.searchClose.addEventListener('click', () => this.closeSearch());
      this.searchOverlay.addEventListener('click', (e) => {
        if (e.target === this.searchOverlay) this.closeSearch();
      });
      
      if (this.searchInput) {
        this.searchInput.addEventListener('input', (e) => {
          this.debounce(() => this.performSearch(e.target.value), 300)();
        });
      }

      // Keyboard shortcuts
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.closeSearch();
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault();
          this.toggleSearch();
        }
      });
    }

    async loadPosts() {
      try {
        // In a real implementation, you'd fetch from a JSON file
        // For now, we'll extract from the DOM
        const postCards = $$('.post-card');
        this.posts = Array.from(postCards).map(card => {
          const titleEl = card.querySelector('.post-title a');
          const excerptEl = card.querySelector('.post-excerpt');
          const tagsEl = card.querySelectorAll('.tag');
          
          return {
            title: titleEl?.textContent || '',
            url: titleEl?.href || '',
            excerpt: excerptEl?.textContent || '',
            tags: Array.from(tagsEl).map(tag => tag.textContent),
            content: card.textContent.toLowerCase()
          };
        });
      } catch (error) {
        console.error('Failed to load posts:', error);
      }
    }

    toggleSearch() {
      this.isOpen ? this.closeSearch() : this.openSearch();
    }

    openSearch() {
      if (!this.searchOverlay) return;
      
      this.isOpen = true;
      this.searchOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      setTimeout(() => {
        this.searchInput?.focus();
      }, 100);
    }

    closeSearch() {
      if (!this.searchOverlay) return;
      
      this.isOpen = false;
      this.searchOverlay.classList.remove('active');
      document.body.style.overflow = '';
      
      if (this.searchInput) {
        this.searchInput.value = '';
      }
      if (this.searchResults) {
        this.searchResults.innerHTML = '';
      }
    }

    performSearch(query) {
      if (!this.searchResults) return;
      
      if (!query || query.length < 2) {
        this.searchResults.innerHTML = '';
        return;
      }

      const results = this.posts.filter(post => 
        post.content.includes(query.toLowerCase()) ||
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 10);

      this.displayResults(results, query);
    }

    displayResults(results, query) {
      if (results.length === 0) {
        this.searchResults.innerHTML = `
          <div class="search-no-results">
            <p>No posts found for "${query}"</p>
          </div>
        `;
        return;
      }

      const resultsHTML = results.map(post => `
        <div class="search-result">
          <h4><a href="${post.url}">${this.highlightText(post.title, query)}</a></h4>
          <p>${this.highlightText(post.excerpt, query)}</p>
          ${post.tags.length > 0 ? `
            <div class="search-result-tags">
              ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
          ` : ''}
        </div>
      `).join('');

      this.searchResults.innerHTML = resultsHTML;
    }

    highlightText(text, query) {
      if (!query) return text;
      const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      return text.replace(regex, '<mark>$1</mark>');
    }

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
    }
  }

  // Mobile navigation
  class MobileNav {
    constructor() {
      this.toggle = $('.mobile-menu-toggle');
      this.menu = $('.nav-menu');
      this.isOpen = false;
      this.init();
    }

    init() {
      if (!this.toggle || !this.menu) return;
      
      this.toggle.addEventListener('click', () => this.toggleMenu());
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (this.isOpen && !this.toggle.contains(e.target) && !this.menu.contains(e.target)) {
          this.closeMenu();
        }
      });

      // Handle window resize
      window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && this.isOpen) {
          this.closeMenu();
        }
      });
    }

    toggleMenu() {
      this.isOpen ? this.closeMenu() : this.openMenu();
    }

    openMenu() {
      this.isOpen = true;
      this.menu.classList.add('mobile-active');
      this.toggle.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    closeMenu() {
      this.isOpen = false;
      this.menu.classList.remove('mobile-active');
      this.toggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Back to top functionality
  class BackToTop {
    constructor() {
      this.button = $('.back-to-top');
      this.init();
    }

    init() {
      if (!this.button) return;
      
      // Show/hide button based on scroll position
      window.addEventListener('scroll', () => {
        const shouldShow = window.pageYOffset > 300;
        this.button.classList.toggle('visible', shouldShow);
      });

      // Smooth scroll to top
      this.button.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  // Reading progress indicator
  class ReadingProgress {
    constructor() {
      this.progress = document.createElement('div');
      this.progress.className = 'reading-progress';
      this.init();
    }

    init() {
      // Only show on post pages
      if (!$('.post-content')) return;
      
      // Create progress bar
      this.progress.innerHTML = '<div class="reading-progress-bar"></div>';
      document.body.appendChild(this.progress);
      
      const progressBar = this.progress.querySelector('.reading-progress-bar');
      
      // Update progress on scroll
      window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        if (progressBar) {
          progressBar.style.width = Math.min(scrolled, 100) + '%';
        }
      });
      
      // Add CSS for progress bar
      const style = document.createElement('style');
      style.textContent = `
        .reading-progress {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: transparent;
          z-index: 1000;
          pointer-events: none;
        }
        .reading-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-color), var(--accent-hover));
          width: 0%;
          transition: width 0.1s ease;
        }
      `;
      document.head.appendChild(style);
    }
  }

  // Smooth scrolling for anchor links
  class SmoothScroll {
    constructor() {
      this.init();
    }

    init() {
      // Handle anchor links
      document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;
        
        const targetId = link.getAttribute('href');
        if (targetId === '#') return;
        
        const target = $(targetId);
        if (!target) return;
        
        e.preventDefault();
        
        const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      });
    }
  }

  // Image lazy loading with intersection observer
  class LazyImages {
    constructor() {
      this.images = $$('img[data-src]');
      this.init();
    }

    init() {
      if (!this.images.length || !('IntersectionObserver' in window)) {
        // Fallback for browsers without IntersectionObserver
        this.images.forEach(img => this.loadImage(img));
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage(entry.target);
            observer.unobserve(entry.target);
          }
        });
      });

      this.images.forEach(img => observer.observe(img));
    }

    loadImage(img) {
      const src = img.getAttribute('data-src');
      if (!src) return;
      
      img.src = src;
      img.removeAttribute('data-src');
      img.classList.add('loaded');
    }
  }

  // Language switcher enhancement
  class LanguageSwitcher {
    constructor() {
      this.switcher = $('.language-switcher');
      this.init();
    }

    init() {
      if (!this.switcher) return;
      
      // Store current page info for language switching
      const currentPath = window.location.pathname;
      const isEnglish = currentPath.startsWith('/en/');
      
      // Update language links to maintain current page structure
      const langOptions = this.switcher.querySelectorAll('.lang-option');
      langOptions.forEach(option => {
        const href = option.getAttribute('href');
        if (href && href !== '#') {
          option.addEventListener('click', (e) => {
            e.preventDefault();
            this.switchLanguage(href);
          });
        }
      });
    }

    switchLanguage(newPath) {
      // Add loading indicator
      const loader = document.createElement('div');
      loader.className = 'language-switch-loader';
      loader.innerHTML = 'Switching language...';
      document.body.appendChild(loader);
      
      // Navigate to new language
      setTimeout(() => {
        window.location.href = newPath;
      }, 300);
    }
  }

  // Performance monitoring
  class PerformanceMonitor {
    constructor() {
      this.init();
    }

    init() {
      if (!window.performance || !console.info) return;
      
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = window.performance.timing;
          const loadTime = perfData.loadEventEnd - perfData.navigationStart;
          const domReady = perfData.domContentLoadedEventEnd - perfData.navigationStart;
          
          console.info('Page Performance:', {
            'Total Load Time': `${loadTime}ms`,
            'DOM Ready': `${domReady}ms`,
            'First Paint': this.getFirstPaint()
          });
        }, 0);
      });
    }

    getFirstPaint() {
      if (!window.performance.getEntriesByType) return 'Not supported';
      
      const paintTiming = window.performance.getEntriesByType('paint');
      const firstPaint = paintTiming.find(entry => entry.name === 'first-paint');
      
      return firstPaint ? `${Math.round(firstPaint.startTime)}ms` : 'Not available';
    }
  }

  // Initialize all components when DOM is ready
  function initializeApp() {
    new ThemeManager();
    new SearchManager();
    new MobileNav();
    new BackToTop();
    new ReadingProgress();
    new SmoothScroll();
    new LazyImages();
    new LanguageSwitcher();
    new PerformanceMonitor();

    // Add fade-in animation to main content
    const main = $('.site-main');
    if (main) {
      main.classList.add('fade-in');
    }

    // Initialize any other interactive elements
    initializeInteractiveElements();
  }

  function initializeInteractiveElements() {
    // Copy code blocks functionality
    const codeBlocks = $$('pre code');
    codeBlocks.forEach(block => {
      const button = document.createElement('button');
      button.textContent = 'Copy';
      button.className = 'copy-code-btn';
      button.addEventListener('click', () => {
        navigator.clipboard.writeText(block.textContent).then(() => {
          button.textContent = 'Copied!';
          setTimeout(() => button.textContent = 'Copy', 2000);
        });
      });
      
      block.parentElement.appendChild(button);
    });

    // External links
    const externalLinks = $$('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
    externalLinks.forEach(link => {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
  } else {
    initializeApp();
  }

  // Service Worker registration for PWA capabilities
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('ServiceWorker registered:', registration.scope);
        })
        .catch(error => {
          console.log('ServiceWorker registration failed:', error);
        });
    });
  }

})();