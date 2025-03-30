document.addEventListener('DOMContentLoaded', function() {
    // Original preloader functionality
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', function() {
        preloader.style.display = 'none';
    });

    // Lightbox functionality (existing implementation)
    
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'block';
            lightboxImg.src = img.src;
        });
    });

    document.querySelector('.close').addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Scroll-to-top button
    const scrollButton = document.getElementById('scroll-to-top');
    window.addEventListener('scroll', () => {
        scrollButton.style.display = window.scrollY > 500 ? 'block' : 'none';
    });

    // Updated animation observer with original functionality
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.25 });

    document.querySelectorAll('[data-animate]').forEach(element => {
        animationObserver.observe(element);
    });

    // Scroll-triggered animations
    const animateOnScroll = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25 });

        document.querySelectorAll('[data-animate]').forEach(element => {
            observer.observe(element);
        });
    };

    // Contact Form Handling
    document.getElementById('contactForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const form = e.target;
        const button = form.querySelector('button[type="submit"]');
        const originalButtonText = button.innerHTML;
        
        // Simple validation
        const name = form.elements.name.value.trim();
        const email = form.elements.email.value.trim();
        const message = form.elements.message.value.trim();
        
        if (!name || !email || !message) {
            alert('Please fill in all required fields');
            return;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Show loading state
        button.innerHTML = 'Sending...';
        button.disabled = true;
        
        // Using Formspree.io for form submission
        fetch('https://formspree.io/f/xvojnzqw', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: form.elements.phone.value.trim(),
                message: message
            })
        })
        .then(response => {
            if (response.ok) {
                form.reset();
                alert('Message sent successfully! We\'ll get back to you soon.');
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            alert('There was a problem sending your message. Please try again.');
        })
        .finally(() => {
            button.innerHTML = originalButtonText;
            button.disabled = false;
// Initialize Intersection Observer for scroll animations
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, {
    rootMargin: '0px',
    threshold: 0.25
});

// Observe all elements with data-animate attribute
document.querySelectorAll('[data-animate]').forEach(element => {
    animationObserver.observe(element);
});

// Reset animations when elements leave view (optional)
// animationObserver.unobserve(entry.target);
        });
    });

    // Initialize scroll animations
    animateOnScroll();

    // Scroll to Top Button
    const scrollToTopButton = document.getElementById('scroll-to-top');
    window.addEventListener('scroll', function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollToTopButton.classList.add('show');
        } else {
            scrollToTopButton.classList.remove('show');
        }
    });

    scrollToTopButton.addEventListener('click', function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryItems = document.querySelectorAll('.gallery-item img');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            lightbox.style.display = 'block';
            lightboxImg.src = this.src;
        });
    });

    lightbox.addEventListener('click', function(event) {
        if (event.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    document.querySelector('.close').addEventListener('click', function() {
        lightbox.style.display = 'none';
    });

    // Intro Cards Hover Effect with Overlay
    const introCards = document.querySelectorAll('.intro-card');
    const overlay = document.getElementById('overlay');
    const overlayTitle = document.getElementById('overlay-title');
    const overlayDescription = document.getElementById('overlay-description');
    const overlayGallery = document.getElementById('overlay-gallery');
    const closeOverlay = document.querySelector('.close-overlay');

    const contentData = {
        photography: {
            title: "Our Photography Services",
            description: "Capture the essence of your special day with our professional photography services. From candid moments to artistic portraits, we ensure every detail is preserved.",
            images: [
                "assets/media/img1.jpg",
                "assets/media/img2.jpg",
                "assets/media/img3.jpg"
            ]
        }
        // Add more categories as needed
    };

    introCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const category = card.getAttribute('data-category');
            if (contentData[category]) {
                overlayTitle.textContent = contentData[category].title;
                overlayDescription.textContent = contentData[category].description;
                overlayGallery.innerHTML = contentData[category].images.map(src => `<img src="${src}" alt="Gallery Image">`).join('');
                overlay.classList.add('show');
            }
        });

        card.addEventListener('mouseleave', function() {
            overlay.classList.remove('show');
        });
    });

    closeOverlay.addEventListener('click', function() {
        overlay.classList.remove('show');
    });

    overlay.addEventListener('click', function(event) {
        if (event.target === overlay) {
            overlay.classList.remove('show');
        }
    });
});
