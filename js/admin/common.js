// Admin Common JavaScript

// Mobile Toggle Sidebar
const mobileToggle = document.getElementById('mobileToggle');
const sidebar = document.getElementById('sidebar');

if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
}