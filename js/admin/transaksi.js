/* Admin Transaksi JavaScript */

function viewDetail(orderId) {
    document.getElementById('modalTitle').textContent = `Detail Transaksi ${orderId}`;
    document.getElementById('detailModal').classList.add('active');
}

function closeModal() {
    document.getElementById('detailModal').classList.remove('active');
}

function updateStatus(btn) {
    const row = btn.closest('tr');
    const orderId = row.querySelector('.order-id').textContent;
    viewDetail(orderId);
}

function saveStatus() {
    const newStatus = document.getElementById('statusSelect').value;
    alert(`Status berhasil diubah ke ${newStatus}`);
    closeModal();
}

document.getElementById('detailModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

const statusFilter = document.getElementById('statusFilter');
if (statusFilter) {
    statusFilter.addEventListener('change', function() {
        const status = this.value;
        document.querySelectorAll('#transactionTable tr').forEach(row => {
            if (status === 'all' || row.dataset.status === status) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        document.querySelectorAll('#transactionTable tr').forEach(row => {
            const orderId = row.querySelector('.order-id').textContent.toLowerCase();
            const customer = row.querySelector('.customer-info h5').textContent.toLowerCase();
            if (orderId.includes(query) || customer.includes(query)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}
