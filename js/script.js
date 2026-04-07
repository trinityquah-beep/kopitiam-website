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
if
