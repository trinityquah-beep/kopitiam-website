// DOM Elements
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const tabBtns = document.querySelectorAll('.tab-btn');
const menuCategories = document.querySelectorAll('.menu-category');
const orderBtns = document.querySelectorAll('.btn-order, [href="#order"]');
const orderModal = document.getElementById('orderModal');
const closeModalBtns = document.querySelectorAll('.close-modal, .close-modal-btn');
const newsletterForm = document.getElementById('newsletterForm');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Animate hamburger to X
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        
        // Reset hamburger animation
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Menu Tab Switching
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and categories
        tabBtns.forEach(b => b.classList.remove('active'));
        menuCategories.forEach(category => category.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show corresponding category
        const categoryId = btn.getAttribute('data-category');
        document.getElementById(categoryId).classList.add('active');
    });
});

// Order Modal
orderBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (btn.getAttribute('href') === '#order') {
            e.preventDefault();
        }
        orderModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

// Close Modal
closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        orderModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === orderModal) {
        orderModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Newsletter Form Submission
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email) {
            // In a real application, you would send this to a server
            alert(`Thank you for subscribing with ${email}! You'll hear from us soon.`);
            emailInput.value = '';
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') return;
        
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#home') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = 'var(--white)';
        navbar.style.backdropFilter = 'none';
    }
});

// Initialize with scroll effect
window.dispatchEvent(new Event('scroll'));

// Add animation to menu items on scroll
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

// Observe menu items for animation
document.querySelectorAll('.menu-item, .feature, .gallery-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(item);
});

// Current year in footer (optional)
const currentYear = new Date().getFullYear();
const yearElement = document.querySelector('.footer-bottom p');
if (yearElement && yearElement.textContent.includes('2026')) {
    yearElement.innerHTML = yearElement.innerHTML.replace('2026', currentYear);
}

// Simple image lazy loading
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                if (src) {
                    img.setAttribute('src', src);
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        if (img.getAttribute('src').includes('unsplash')) {
            // For demo purposes, we're using direct URLs
            // In production, you might want to implement proper lazy loading
            img.setAttribute('loading', 'lazy');
        }
    });
});

// Add active class to nav links based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const headerHeight = document.querySelector('.navbar').offsetHeight;
        
        if (scrollY >= (sectionTop - headerHeight - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Reservation Form Handling
const reservationForm = document.getElementById('reservationForm');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');
const loadingSpinner = document.getElementById('loadingSpinner');
const formMessage = document.getElementById('formMessage');

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
document.getElementById('date').min = today;

if (reservationForm) {
    reservationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        submitText.style.display = 'none';
        loadingSpinner.style.display = 'inline-block';
        submitBtn.disabled = true;
        formMessage.textContent = '';
        formMessage.className = 'form-message';
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            people: document.getElementById('people').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            message: document.getElementById('message').value.trim(),
            timestamp: new Date().toISOString()
        };
        
        try {
            // Send to Google Sheets using Google Apps Script
            const response = await fetch('https://script.google.com/macros/s/AKfycbzD8BiRG1ziQjGm6JyYgEMp9bENT-Pz5cBDnuvZPqARX0e-Sl91zm0i_XrXd1PB3kCf/exec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            // Check if response is OK
            if (response.ok) {
                const result = await response.json();
                
                if (result.success) {
                    // Show success message
                    formMessage.textContent = '✅ Reservation submitted successfully! We will confirm via phone shortly.';
                    formMessage.className = 'form-message success';
                    
                    // Reset form
                    reservationForm.reset();
                    
                    // Set date to today again
                    document.getElementById('date').min = today;
                } else {
                    throw new Error(result.error || 'Unknown error');
                }
            } else {
                throw new Error(`Server responded with ${response.status}`);
            }
            
        } catch (error) {
            // Show error message
            formMessage.textContent = '❌ There was an error submitting your reservation. Please call us directly at +60 3-1234 5678.';
            formMessage.className = 'form-message error';
            console.error('Reservation error:', error);
        } finally {
            // Reset button state
            submitText.style.display = 'inline';
            loadingSpinner.style.display = 'none';
            submitBtn.disabled = false;
            
            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
}

// Add reservation link to navigation
const navMenu = document.getElementById('navMenu');
if (navMenu) {
    const reservationLink = document.createElement('li');
    reservationLink.innerHTML = '<a href="#reservation">Reservation</a>';
    
    // Insert before the Order Now button
    const orderBtn = document.querySelector('.btn-order').parentElement;
    navMenu.insertBefore(reservationLink, orderBtn);
}