document.addEventListener('DOMContentLoaded', function() {
    // Photo Overlay
    const photoItems = document.querySelectorAll('.photo-item');
    const photoOverlay = document.getElementById('photo-overlay');
    const overlayImage1 = document.getElementById('overlay-image-1');
    const overlayImage2 = document.getElementById('overlay-image-2');
    const overlayTitle = document.getElementById('overlay-title');
    const overlayDescription = document.getElementById('overlay-description');
    const closeOverlay = document.querySelector('.close-overlay');

    photoItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc1 = item.querySelector('.flip-front img').src;
            const imgSrc2 = item.querySelector('.flip-back img').src;
            const title = item.querySelector('.flip-content h3').textContent;
            const description = item.querySelector('.flip-content p').textContent;
            overlayImage1.src = imgSrc1;
            overlayImage2.src = imgSrc2;
            overlayTitle.textContent = title;
            overlayDescription.textContent = description;
            photoOverlay.classList.add('active');
        });
    });

    closeOverlay.addEventListener('click', function() {
        photoOverlay.classList.remove('active');
    });

    photoOverlay.addEventListener('click', function(event) {
        if (event.target === photoOverlay) {
            photoOverlay.classList.remove('active');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Gallery hover effect enhancement
    document.querySelectorAll('.photo-item').forEach(item => {
        item.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.style.setProperty('--x', `${x}px`);
            this.style.setProperty('--y', `${y}px`);
        });
    });
});
