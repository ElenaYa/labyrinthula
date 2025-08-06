// ===== Main JavaScript for Labyrinthula =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Mobile Navigation Toggle =====
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // ===== Smooth Scroll for Anchor Links =====
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
    
    // ===== Contact Form Handler =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Here you would normally send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            showNotification('Vielen Dank für Ihre Nachricht! Wir melden uns innerhalb von 24 Stunden bei Ihnen.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // ===== FAQ Accordion =====
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
    
    // ===== Animate Numbers on Scroll =====
    const animateNumbers = () => {
        const numbers = document.querySelectorAll('.stat-number[data-target]');
        
        numbers.forEach(number => {
            const target = parseInt(number.getAttribute('data-target'));
            if (isNaN(target)) return;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !number.classList.contains('animated')) {
                        number.classList.add('animated');
                        animateCount(number, target);
                        observer.unobserve(number);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(number);
        });
    };
    
    function animateCount(element, target) {
        const duration = 2000; // 2 seconds
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (element.hasAttribute('data-suffix') ? element.getAttribute('data-suffix') : '') + (target === parseInt(element.getAttribute('data-target')) ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.hasAttribute('data-suffix') ? element.getAttribute('data-suffix') : '');
            }
        }, 16);
    }
    
    animateNumbers();
    
    // ===== Methods Slider =====
    const methodsWrapper = document.getElementById('methodsWrapper');
    
    // Only initialize slider if the elements exist
    if (methodsWrapper) {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const navDots = document.querySelectorAll('.nav-dot');
        let currentSlide = 0;
        const totalSlides = 4;
        let sliderInterval;
        
        function updateSlider() {
            const translateX = -(currentSlide * 25);
            methodsWrapper.style.transform = `translateX(${translateX}%)`;
            
            // Update nav dots
            navDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                // Reset interval when manually navigating
                clearInterval(sliderInterval);
                sliderInterval = setInterval(nextSlide, 5000);
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                // Reset interval when manually navigating
                clearInterval(sliderInterval);
                sliderInterval = setInterval(nextSlide, 5000);
            });
        }
        
        // Nav dots click handlers
        navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSlider();
                // Reset interval when manually navigating
                clearInterval(sliderInterval);
                sliderInterval = setInterval(nextSlide, 5000);
            });
        });
        
        // Start auto-play slider
        sliderInterval = setInterval(nextSlide, 5000);
        
        // Pause slider on hover
        methodsWrapper.addEventListener('mouseenter', () => {
            clearInterval(sliderInterval);
        });
        
        // Resume slider when mouse leaves
        methodsWrapper.addEventListener('mouseleave', () => {
            sliderInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // ===== Features Hover Effect =====
    const features = document.querySelectorAll('.feature-item');
    
    features.forEach(feature => {
        feature.addEventListener('mousemove', (e) => {
            const rect = feature.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / feature.clientWidth) * 100;
            const y = ((e.clientY - rect.top) / feature.clientHeight) * 100;
            
            feature.style.setProperty('--mouse-x', `${x}%`);
            feature.style.setProperty('--mouse-y', `${y}%`);
        });
    });
    
    // ===== Timeline Animation =====
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function animateTimeline() {
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 200 + 200);
        });
    }
    
    // Запуск анимации при загрузке
    if (timelineItems.length > 0) {
        animateTimeline();
    }
    
    // ===== Progress Items Hover Effect =====
    const progressItems = document.querySelectorAll('.progress-item');
    
    progressItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / item.clientWidth) * 100;
            const y = ((e.clientY - rect.top) / item.clientHeight) * 100;
            
            item.style.setProperty('--mouse-x', `${x}%`);
            item.style.setProperty('--mouse-y', `${y}%`);
        });
    });
    
    // ===== Path Steps Hover Effect =====
    const pathSteps = document.querySelectorAll('.path-step');
    
    pathSteps.forEach(step => {
        step.addEventListener('mousemove', (e) => {
            const rect = step.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / step.clientWidth) * 100;
            const y = ((e.clientY - rect.top) / step.clientHeight) * 100;
            
            step.style.setProperty('--mouse-x', `${x}%`);
            step.style.setProperty('--mouse-y', `${y}%`);
        });
    });
    
    // ===== Special Cards Hover Effect =====
    const specialCards = document.querySelectorAll('.special-card');
    
    specialCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
            const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
            
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
    });
    
    // ===== Level Cards Hover Effect =====
    const levelCards = document.querySelectorAll('.level-card');
    
    levelCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
            const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
            
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
    });
    
    // ===== Method Cards Hover Effect =====
    const methodCards = document.querySelectorAll('.method-detail-card');
    
    methodCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
            const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
            
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
    });
    
    // ===== Grammar Section Toggle =====
    const grammarCards = document.querySelectorAll('.grammar-card');
    grammarCards.forEach(card => {
        const header = card.querySelector('.grammar-header');
        const toggleBtn = card.querySelector('.toggle-btn');
        
        if (header && toggleBtn) {
            header.addEventListener('click', function() {
                // Close other cards
                grammarCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove('active');
                        const otherBtn = otherCard.querySelector('.toggle-btn');
                        if (otherBtn) {
                            otherBtn.classList.remove('active');
                            otherBtn.innerHTML = '<i class="fas fa-plus"></i>';
                        }
                    }
                });
                
                // Toggle current card
                card.classList.toggle('active');
                toggleBtn.classList.toggle('active');
                
                if (card.classList.contains('active')) {
                    toggleBtn.innerHTML = '<i class="fas fa-minus"></i>';
                } else {
                    toggleBtn.innerHTML = '<i class="fas fa-plus"></i>';
                }
            });
        }
    });
    
    // ===== Cookie Consent =====
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookies = document.getElementById('acceptCookies');
    
    // Show cookie consent if not already accepted
    if (cookieConsent && !localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookieConsent.style.display = 'block';
        }, 2000); // Show after 2 seconds
    }
    
    if (acceptCookies) {
        acceptCookies.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieConsent.style.animation = 'slideDown 0.3s ease';
            setTimeout(() => {
                cookieConsent.style.display = 'none';
            }, 300);
        });
    }
    
    // ===== Sticky Navigation Background =====
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12)';
                navbar.style.background = '#ffffff';
            }
        });
    }
    
    // ===== Notification Function =====
    function showNotification(message, type = 'success') {
        // Remove existing notification if any
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 9999;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        `;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            margin-left: 1rem;
        `;
        
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // ===== Add Animation Styles =====
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
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
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes slideDown {
            from {
                transform: translateY(0);
                opacity: 1;
            }
            to {
                transform: translateY(100%);
                opacity: 0;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    `;
    document.head.appendChild(style);
    
    // ===== Lazy Loading for Images =====
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ===== Form Validation Enhancement =====
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let errorMessage = '';
        
        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Dieses Feld ist erforderlich';
        }
        
        // Email validation
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
            }
        }
        
        // Phone validation
        if (type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Bitte geben Sie eine gültige Telefonnummer ein';
            }
        }
        
        // Show/hide error
        showFieldError(field, isValid, errorMessage);
        
        return isValid;
    }
    
    function showFieldError(field, isValid, errorMessage) {
        const parent = field.parentElement;
        let errorElement = parent.querySelector('.field-error');
        
        if (!isValid) {
            field.classList.add('error');
            field.style.borderColor = '#ef4444';
            
            if (!errorElement) {
                errorElement = document.createElement('span');
                errorElement.className = 'field-error';
                errorElement.style.cssText = `
                    color: #ef4444;
                    font-size: 0.875rem;
                    margin-top: 0.25rem;
                    display: block;
                `;
                parent.appendChild(errorElement);
            }
            errorElement.textContent = errorMessage;
        } else {
            field.classList.remove('error');
            field.style.borderColor = '';
            
            if (errorElement) {
                errorElement.remove();
            }
        }
    }
    
    // ===== Scroll to Top Button =====
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    
    document.body.appendChild(scrollButton);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== Add hover effect to scroll button =====
    scrollButton.addEventListener('mouseenter', () => {
        scrollButton.style.transform = 'translateY(-5px)';
        scrollButton.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
    });
    
    scrollButton.addEventListener('mouseleave', () => {
        scrollButton.style.transform = '';
        scrollButton.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    });
});

// ===== Utility function for debouncing =====
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