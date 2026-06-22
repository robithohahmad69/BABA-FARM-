/* ========================================
   COMMON JAVASCRIPT - PELANGGAN (CUSTOMER)
   ======================================== */

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
const mobileOverlay = document.getElementById('mobileOverlay');

function openMobileMenu() {
    navLinks?.classList.add('active');
    mobileOverlay?.classList.add('active');
    mobileToggle?.classList.add('active');
    const icon = mobileToggle?.querySelector('i');
    if (icon) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    }
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    navLinks?.classList.remove('active');
    mobileOverlay?.classList.remove('active');
    mobileToggle?.classList.remove('active');
    const icon = mobileToggle?.querySelector('i');
    if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    }
    document.body.style.overflow = '';
}

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        if (navLinks?.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
}

// Close mobile menu when clicking overlay
if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
}

// Close mobile menu when clicking on a link
if (navLinks) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
}

// Close mobile menu on window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    }, 250);
});

// Close mobile menu with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks?.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

// Add touch-friendly hover effects
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}
