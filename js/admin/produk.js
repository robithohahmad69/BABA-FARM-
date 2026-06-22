/* Admin Products JavaScript */

// Modal Functions
function openModal() {
    document.getElementById('productModal').classList.add('active');
    document.getElementById('modalTitle').textContent = 'Tambah Produk Baru';
    document.getElementById('productForm').reset();
}

function closeModal() {
    document.getElementById('productModal').classList.remove('active');
}

function editProduct(btn) {
    document.getElementById('productModal').classList.add('active');
    document.getElementById('modalTitle').textContent = 'Edit Produk';
}

function viewProduct(btn) {
    alert('Melihat detail produk...');
}

function deleteProduct(btn) {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
        const card = btn.closest('.product-card');
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        setTimeout(() => card.remove(), 300);
    }
}

function saveProduct() {
    alert('Produk berhasil disimpan!');
    closeModal();
}

// Close modal on backdrop click
document.getElementById('productModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Filter Functions
const categoryFilter = document.getElementById('categoryFilter');
if (categoryFilter) {
    categoryFilter.addEventListener('change', function() {
        const category = this.value;
        document.querySelectorAll('.product-card').forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

const stockFilter = document.getElementById('stockFilter');
if (stockFilter) {
    stockFilter.addEventListener('change', function() {
        const filter = this.value;
        document.querySelectorAll('.product-card').forEach(card => {
            if (filter === 'all') {
                card.style.display = '';
            } else {
                const stock = card.dataset.stock;
                if (filter === 'available' && stock !== 'out') {
                    card.style.display = '';
                } else if (filter === 'low' && stock === 'low') {
                    card.style.display = '';
                } else if (filter === 'out' && stock === 'out') {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
}

// Search
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        document.querySelectorAll('.product-card').forEach(card => {
            const name = card.querySelector('.product-name').textContent.toLowerCase();
            if (name.includes(query)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
}
