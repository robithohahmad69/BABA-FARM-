// Admin Common JavaScript

// Mobile Toggle Sidebar
const mobileToggle = document.getElementById('mobileToggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function openSidebar() {
    sidebar?.classList.add('active');
    sidebarOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    sidebar?.classList.remove('active');
    sidebarOverlay?.classList.remove('active');
    document.body.style.overflow = '';
}

if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
        if (sidebar.classList.contains('active')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });
}

// Close sidebar when clicking overlay
if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
}

// Close sidebar on window resize if open
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768) {
            closeSidebar();
        }
    }, 250);
});

// Close sidebar when clicking menu item on mobile
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            closeSidebar();
        }
    });
});

// Close sidebar with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar?.classList.contains('active')) {
        closeSidebar();
    }
});
