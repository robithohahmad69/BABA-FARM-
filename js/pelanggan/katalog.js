/* ========================================
   KATALOG PRODUK - PAGE SPECIFIC JAVASCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Category Filter
    const categoryLinks = document.querySelectorAll('.category-link');
    const products = document.querySelectorAll('.product-card');
    const productsCount = document.querySelector('.products-count');

    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            categoryLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const category = link.dataset.category;
            let visibleCount = 0;

            products.forEach(product => {
                if (category === 'all' || product.dataset.category === category) {
                    product.style.display = '';
                    visibleCount++;
                } else {
                    product.style.display = 'none';
                }
            });

            if (productsCount) {
                productsCount.textContent = `Menampilkan ${visibleCount} produk`;
            }
        });
    });

    // Price Filter
    const priceFilter = document.getElementById('priceFilter');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');

    if (priceFilter) {
        priceFilter.addEventListener('click', () => {
            const minPrice = parseInt(minPriceInput.value) || 0;
            const maxPrice = parseInt(maxPriceInput.value) || 999999;
            let visibleCount = 0;

            products.forEach(product => {
                const price = parseInt(product.dataset.price);
                if (price >= minPrice && price <= maxPrice) {
                    product.style.display = '';
                    visibleCount++;
                } else {
                    product.style.display = 'none';
                }
            });

            if (productsCount) {
                productsCount.textContent = `Menampilkan ${visibleCount} produk`;
            }
        });
    }

    // Search Functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    function performSearch() {
        const query = searchInput.value.toLowerCase();
        let visibleCount = 0;

        products.forEach(product => {
            const name = product.dataset.name.toLowerCase();
            if (name.includes(query)) {
                product.style.display = '';
                visibleCount++;
            } else {
                product.style.display = 'none';
            }
        });

        if (productsCount) {
            productsCount.textContent = `Menampilkan ${visibleCount} produk`;
        }
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }

    // Sort Functionality
    const sortSelect = document.getElementById('sortSelect');
    const productsGrid = document.getElementById('productsGrid');

    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const sortValue = sortSelect.value;
            const productsArray = Array.from(products);

            productsArray.sort((a, b) => {
                switch(sortValue) {
                    case 'price-low':
                        return parseInt(a.dataset.price) - parseInt(b.dataset.price);
                    case 'price-high':
                        return parseInt(b.dataset.price) - parseInt(a.dataset.price);
                    case 'name':
                        return a.dataset.name.localeCompare(b.dataset.name);
                    default:
                        return 0;
                }
            });

            productsArray.forEach(product => productsGrid.appendChild(product));
        });
    }

    // View Toggle
    const gridView = document.getElementById('gridView');
    const listView = document.getElementById('listView');

    if (gridView) {
        gridView.addEventListener('click', () => {
            productsGrid.classList.remove('list-view');
            gridView.classList.add('active');
            if (listView) listView.classList.remove('active');
        });
    }

    if (listView) {
        listView.addEventListener('click', () => {
            productsGrid.classList.add('list-view');
            listView.classList.add('active');
            if (gridView) gridView.classList.remove('active');
        });
    }

    // Add to Cart
    let cartCount = 3;
    const cartCountEl = document.getElementById('cartCount');

    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            cartCount++;
            if (cartCountEl) cartCountEl.textContent = cartCount;

            this.innerHTML = '<i class="fas fa-check"></i> Masuk Keranjang';
            this.style.background = 'rgba(45, 106, 79, 0.9)';

            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-cart-plus"></i> Keranjang';
                this.style.background = '';
            }, 1500);
        });
    });

    // Pagination (visual only)
    document.querySelectorAll('.pagination button').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('active') && !this.querySelector('i')) {
                document.querySelectorAll('.pagination button').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                window.scrollTo({ top: 500, behavior: 'smooth' });
            }
        });
    });
});
