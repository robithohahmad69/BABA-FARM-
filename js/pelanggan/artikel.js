/* ========================================
   ARTIKEL PAGE JAVASCRIPT - PELANGGAN
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Category Filter
    const categoryLinks = document.querySelectorAll('.category-link');
    const articles = document.querySelectorAll('.article-card');
    const articlesCount = document.querySelector('.articles-count');

    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Update active state
            categoryLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const category = link.dataset.category;
            let visibleCount = 0;

            articles.forEach(article => {
                if (category === 'all' || article.dataset.category === category) {
                    article.style.display = '';
                    visibleCount++;
                } else {
                    article.style.display = 'none';
                }
            });

            if (articlesCount) {
                articlesCount.textContent = `Menampilkan ${visibleCount} artikel`;
            }
        });
    });

    // Search Functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    function performSearch() {
        const query = searchInput.value.toLowerCase();
        let visibleCount = 0;

        articles.forEach(article => {
            const title = article.querySelector('h3').textContent.toLowerCase();
            const excerpt = article.querySelector('.article-excerpt').textContent.toLowerCase();

            if (title.includes(query) || excerpt.includes(query)) {
                article.style.display = '';
                visibleCount++;
            } else {
                article.style.display = 'none';
            }
        });

        if (articlesCount) {
            articlesCount.textContent = `Menampilkan ${visibleCount} artikel`;
        }

        // Reset category selection
        categoryLinks.forEach(l => l.classList.remove('active'));
        document.querySelector('[data-category="all"]').classList.add('active');
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }

    // Pagination (visual only)
    document.querySelectorAll('.pagination button').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('active') && !this.querySelector('i')) {
                document.querySelectorAll('.pagination button').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                window.scrollTo({ top: 400, behavior: 'smooth' });
            }
        });
    });
});
