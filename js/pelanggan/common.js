/* ========================================
   COMMON JAVASCRIPT - PELANGGAN (CUSTOMER)
   ======================================== */

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });
}

// Close mobile menu when clicking on a link
if (navLinks) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (mobileToggle) {
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Common cart functionality
const cartCountEl = document.getElementById('cartCount');
let cartCount = parseInt(cartCountEl?.textContent) || 0;

// Update cart count function
window.updateCartCount = function(count) {
    cartCount = count;
    if (cartCountEl) {
        cartCountEl.textContent = cartCount;
    }
};

// Get cart count function
window.getCartCount = function() {
    return cartCount;
};

// Add to cart with animation
window.addToCart = function(btn, callback) {
    cartCount++;
    if (cartCountEl) {
        cartCountEl.textContent = cartCount;
    }

    if (btn) {
        const originalHTML = btn.innerHTML;
        const originalBackground = btn.style.background;

        btn.innerHTML = '<i class="fas fa-check"></i> Masuk Keranjang';
        btn.style.background = 'rgba(45, 106, 79, 0.9)';

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = originalBackground;
        }, 1500);
    }

    if (callback) callback();
};
