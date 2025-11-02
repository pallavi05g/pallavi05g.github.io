// Smooth scrolling for navigation links
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

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Feature and result card hover effects
document.querySelectorAll('.feature-card, .result-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Stagger animations for cards
document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
    card.classList.add('animate-on-scroll');
});

document.querySelectorAll('.result-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
    card.classList.add('animate-on-scroll');
});

// Progress indicator for case study reading
function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    return progressBar;
}

const progressBar = createProgressBar();

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    progressBar.style.width = scrollPercent + '%';
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScroll = debounce(() => {
    const header = document.querySelector('header');
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Update progress bar
    progressBar.style.width = scrollPercent + '%';
    
    // Update header
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Loading animation
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
    
    // Animate case study sections in sequence
    const sections = document.querySelectorAll('.content-section');
    sections.forEach((section, index) => {
        section.classList.add('animate-on-scroll');
        section.style.animationDelay = `${index * 0.1}s`;
    });
});

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        console.log('Image failed to load:', this.src);
    });
});

// Add subtle parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.case-hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Intersection observer for section highlighting
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add any section-specific animations or effects here
            entry.target.style.opacity = '1';
        }
    });
}, {
    threshold: 0.3
});

// Observe all content sections
document.querySelectorAll('.content-section').forEach(section => {
    sectionObserver.observe(section);
});

// Add click handlers for announcement items
document.querySelectorAll('.announcement-item').forEach(item => {
    item.addEventListener('click', function() {
        // Simulate opening link (replace with actual URLs)
        console.log('Opening:', this.querySelector('.announcement-title').textContent);
        
        // Add click animation
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'translateY(-2px)';
        }, 150);
    });
});

// Add hover effects for better interactivity
document.querySelectorAll('.announcement-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Stagger animation on load
document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.announcement-item');
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Add reading time estimation
/*function calculateReadingTime() {
    const text = document.body.innerText;
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / wordsPerMinute);
    
    // Add reading time to header (optional)
    const readingTimeElement = document.createElement('div');
    readingTimeElement.textContent = `${readingTime} min read`;
    readingTimeElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 20px;
        font-size: 12px;
        z-index: 1002;
    `;
    document.body.appendChild(readingTimeElement);
}*/

/* Newly added code */

class SolutionSlider {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 3;
        this.cardsContainer = document.getElementById('cardsContainer');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.indicators = document.querySelectorAll('.indicator');
        
        this.init();
    }

    init() {
        this.updateSlide();
        this.bindEvents();
    }

    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlide();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlide();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlide();
    }

    updateSlide() {
        const translateX = -this.currentSlide * 100;
        this.cardsContainer.style.transform = `translateX(${translateX}%)`;
        
        this.updateControls();
        this.updateIndicators();
        this.updateCardNumbers();
    }

    updateControls() {
        this.prevBtn.disabled = this.currentSlide === 0;
        this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
    }

    updateIndicators() {
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }

    updateCardNumbers() {
        const cards = document.querySelectorAll('.solution-card');
        cards.forEach((card, index) => {
            const numberElement = card.querySelector('.card-number');
            if (numberElement) {
                numberElement.textContent = `${String(index + 1).padStart(2, '0')} / ${String(this.totalSlides).padStart(2, '0')}`;
            }
        });
    }
}

// Initialize slider when page loads
document.addEventListener('DOMContentLoaded', () => {
    new SolutionSlider();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        document.getElementById('prevBtn').click();
    } else if (e.key === 'ArrowRight') {
        document.getElementById('nextBtn').click();
    }
});

/* End of newly added code */

// Initialize reading time on load
document.addEventListener('DOMContentLoaded', calculateReadingTime);