// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.getElementById('nav');
    
    mobileMenuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    
    // Close menu when clicking on links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
        });
    });
    
    // Scroll to sections smoothly
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if(targetSection) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Sticky header
    const header = document.getElementById('header');
    
    function handleScroll() {
        if(window.scrollY > 50) {
            header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.background = '#fff';
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Form submission
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simulate form submission
            const formElements = contactForm.elements;
            let formData = {};
            
            for(let i = 0; i < formElements.length; i++) {
                const element = formElements[i];
                if(element.name) {
                    formData[element.name] = element.value;
                }
            }
            
            // Show success message
            contactForm.innerHTML = '<div style="text-align: center; padding: 2rem;"><h3 style="color: #3498db; margin-bottom: 1rem;">Thank You!</h3><p>Your message has been received. We\'ll get back to you shortly.</p></div>';
        });
    }
    
    // Add animation to service cards when scrolled into view
    const observerOptions = {
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});