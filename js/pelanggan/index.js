/* ========================================
   INDEX PAGE JAVASCRIPT - PELANGGAN
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Add to Cart Buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            if (window.addToCart) {
                window.addToCart(this);
            }
        });
    });

    // Animate elements on scroll
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

    // Observe feature cards and product cards
    document.querySelectorAll('.feature-card, .product-card, .article-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

// Overlay hijau muncul saat scroll
window.addEventListener('scroll', function () {
    const hero = document.querySelector('.hero');
    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;

    const opacity = Math.min(scrollY / (heroHeight * 0.7), 1);

    hero.style.setProperty('--overlay-opacity', opacity);
});
});
