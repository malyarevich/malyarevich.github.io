/**
 * Main JavaScript file for Pavlo Malyarevich's portfolio website
 * Contains all interactive functionality including theme management, animations, and performance monitoring
 */

(function() {
    'use strict';

    // Auto-update copyright year
    function updateCopyrightYear() {
        const currentYearElement = document.getElementById('currentYear');
        if (currentYearElement) {
            const currentYear = new Date().getFullYear();
            currentYearElement.textContent = currentYear;
        }
    }
    
    // Update year on page load
    updateCopyrightYear();
    
    // Performance monitoring
    const startTime = performance.now();
    
    // Theme management
    let currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply theme on load
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        currentTheme = theme;
    }
    
    // Initialize theme
    applyTheme(currentTheme);
    
    // Add smooth scrolling for anchor links
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

    // Enhanced intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger effect for child elements
                const children = entry.target.querySelectorAll('.skill-category, .experience-item, .education-item, .language-item, .certification');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
        
        // Initialize child elements
        const children = section.querySelectorAll('.skill-category, .experience-item, .education-item, .language-item, .certification');
        children.forEach(child => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(20px)';
            child.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    });

    // Add print functionality
    function printResume() {
        window.print();
    }

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            printResume();
        }
    });

    // Add performance metrics
    window.addEventListener('load', () => {
        const loadTime = performance.now() - startTime;
        console.log(`🚀 Resume loaded in ${loadTime.toFixed(2)}ms`);
        
        // Send performance data to analytics (if available)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
                name: 'resume_load',
                value: Math.round(loadTime)
            });
        }
    });

    // Add hover effects for better UX
    document.querySelectorAll('.skill-category, .experience-item, .education-item, .language-item, .certification').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform.replace('translateY(0)', 'translateY(-8px)');
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace('translateY(-8px)', 'translateY(0)');
        });
    });

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
        z-index: 1000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // Create functional theme toggle
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Toggle theme');
    themeToggle.innerHTML = currentTheme === 'dark' ? '🌙' : '☀️';
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        themeToggle.innerHTML = newTheme === 'dark' ? '🌙' : '☀️';
        
        // Add animation effect
        themeToggle.style.transform = 'scale(1.2) rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
    });
    
    document.body.appendChild(themeToggle);
    
    // Add theme transition animation
    document.addEventListener('DOMContentLoaded', () => {
        // Add smooth transition for theme changes
        const style = document.createElement('style');
        style.textContent = `
            * {
                transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease !important;
            }
        `;
        document.head.appendChild(style);
    });

    // Export functions for external use
    window.updateCopyrightYear = updateCopyrightYear;
    window.applyTheme = applyTheme;
    window.printResume = printResume;

})(); 