/**
 * PERMINTAAN CUSTOM JAVASCRIPT
 * Handle form submission, localStorage operations, dan rendering request list
 *
 * PENJELASAN UNTUK PEMBELAJARAN:
 * 1. localStorage digunakan untuk menyimpan data permintaan secara persisten
 * 2. Struktur data: Array of Objects dengan key 'permintaanCustom'
 * 3. Setiap permintaan memiliki ID unik, detail pesanan, dan status
 * 4. Status flow: Menunggu -> Disetujui -> Diproses -> Siap
 */

// ========================================
// 1. KONFIGURASI & HELPER FUNCTIONS
// ========================================

/**
 * Key untuk localStorage - semua data permintaan disimpan di sini
 * Format: Array of Objects
 */
const STORAGE_KEY = 'permintaanCustom';

/**
 * Generate ID unik untuk permintaan baru
 * Format: PC-2026-XXX (PC = Permintaan Custom)
 */
function generateId() {
    const date = new Date();
    const year = date.getFullYear();
    const random = Math.floor(Math.random() * 900) + 100; // 3 digit random
    return `PC-${year}-${random}`;
}

/**
 * Format tanggal ke format Indonesia
 * @param {string} dateString - Tanggal dalam format YYYY-MM-DD
 * @param {boolean} withTime - Apakah menyertakan waktu
 * @returns {string} Tanggal dalam format "15 Jan 2026" atau "15 Jan 2026, 14:30"
 */
function formatDate(dateString, withTime = false) {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    if (withTime) {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day} ${month} ${year}, ${hours}:${minutes}`;
    }

    return `${day} ${month} ${year}`;
}

/**
 * Format angka ke format Rupiah
 * @param {number} amount - Jumlah uang
 * @returns {string} Format "Rp 2.500.000"
 */
function formatRupiah(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}

/**
 * Mendapatkan semua data permintaan dari localStorage
 * @returns {Array} Array of permintaan objects
 */
function getPermintaanData() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

/**
 * Menyimpan data permintaan ke localStorage
 * @param {Array} data - Array of permintaan objects
 */
function savePermintaanData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ========================================
// 2. FORM HANDLING - BUAT PERMINTAAN BARU
// ========================================

/**
 * Update jumlah dengan tombol +/-
 * @param {number} change - Nilai penambahan/pengurangan
 */
function updateJumlah(change) {
    const input = document.getElementById('jumlah');
    let value = parseInt(input.value) || 1000;

    // Tambahkan atau kurangkan
    value += change;

    // Pastikan minimal 1000 dan kelipatan 100
    value = Math.max(1000, Math.min(999999, value));
    value = Math.round(value / 100) * 100; // Round ke kelipatan 100 terdekat

    input.value = value;
}

/**
 * Set minimum date untuk estimasi panen (30 hari dari hari ini)
 */
function setMinDate() {
    const dateInput = document.getElementById('estimasiPanen');
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 30); // Minimal 30 hari

    const minDateStr = minDate.toISOString().split('T')[0];
    dateInput.min = minDateStr;
    dateInput.value = minDateStr; // Set default value
}

/**
 * Validasi form sebelum submit
 * @returns {boolean} True jika valid, False jika tidak
 */
function validateForm() {
    const jenisLele = document.getElementById('jenisLele');
    const ukuran = document.getElementById('ukuran');
    const jumlah = document.getElementById('jumlah');
    const estimasiPanen = document.getElementById('estimasiPanen');

    let isValid = true;

    // Reset error states
    document.querySelectorAll('.form-group').forEach(el => el.classList.remove('error'));
    document.querySelectorAll('.form-error').forEach(el => el.classList.remove('show'));

    // Validasi jenis lele
    if (!jenisLele.value) {
        jenisLele.closest('.form-group').classList.add('error');
        isValid = false;
    }

    // Validasi ukuran
    if (!ukuran.value) {
        ukuran.closest('.form-group').classList.add('error');
        isValid = false;
    }

    // Validasi jumlah
    const jumlahValue = parseInt(jumlah.value);
    if (!jumlahValue || jumlahValue < 1000) {
        jumlah.closest('.form-group').classList.add('error');
        isValid = false;
    }

    // Validasi estimasi panen
    if (!estimasiPanen.value) {
        estimasiPanen.closest('.form-group').classList.add('error');
        isValid = false;
    }

    return isValid;
}

/**
 * Submit form - buat permintaan baru
 * Ini dipanggil saat form dikirim
 */
function submitPermintaan(e) {
    e.preventDefault(); // Mencegah refresh halaman

    // Validasi form
    if (!validateForm()) {
        // Scroll ke field pertama yang error
        const firstError = document.querySelector('.form-group.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }

    // Ambil nilai form
    const jenisLele = document.getElementById('jenisLele').value;
    const ukuran = document.getElementById('ukuran').value;
    const jumlah = parseInt(document.getElementById('jumlah').value);
    const estimasiPanen = document.getElementById('estimasiPanen').value;
    const catatan = document.getElementById('catatan').value.trim();

    // Buat object permintaan baru
    const permintaanBaru = {
        id: generateId(),
        jenisLele: jenisLele,
        ukuran: ukuran,
        jumlah: jumlah,
        estimasiPanen: estimasiPanen,
        catatan: catatan || '-',
        status: 'Menunggu Konfirmasi',
        hargaTawaran: 0,
        buktiBayar: null,
        tanggalPermintaan: new Date().toISOString(),
        tanggalUpdate: new Date().toISOString()
    };

    // Simpan ke localStorage
    const data = getPermintaanData();
    data.unshift(permintaanBaru); // Tambah di awal array
    savePermintaanData(data);

    // Tampilkan animasi sukses pada tombol
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Permintaan Terkirim!';
    submitBtn.classList.add('success');
    submitBtn.disabled = true;

    // Reset form setelah 2 detik
    setTimeout(() => {
        document.getElementById('permintaanForm').reset();
        setMinDate();
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Permintaan';
        submitBtn.classList.remove('success');
        submitBtn.disabled = false;

        // Refresh list
        renderRequestList();
    }, 2000);

    // Tampilkan notifikasi
    showNotification('Permintaan berhasil dikirim! Tim kami akan menghubungi Anda dalam 1x24 jam.');
}

// ========================================
// 3. RENDERING - TAMPILKAN LIST PERMINTAAN
// ========================================

/**
 * Mendapatkan class CSS untuk status badge
 * @param {string} status - Status permintaan
 * @returns {string} CSS class untuk badge
 */
function getStatusClass(status) {
    const statusMap = {
        'Menunggu Konfirmasi': 'status-waiting',
        'Disetujui': 'status-approved',
        'Diproses': 'status-processing',
        'Siap': 'status-ready',
        'Dibatalkan': 'status-cancelled'
    };
    return statusMap[status] || 'status-waiting';
}

/**
 * Render single request card
 * @param {Object} request - Permintaan object
 * @returns {string} HTML string untuk card
 */
function renderRequestCard(request) {
    const statusClass = getStatusClass(request.status);
    const hargaText = request.hargaTawaran > 0
        ? formatRupiah(request.hargaTawaran)
        : 'Menunggu penawaran';
    const hargaClass = request.hargaTawaran > 0 ? '' : 'pending';

    return `
        <div class="request-card glass" onclick="goToDetail('${request.id}')">
            <div class="request-header">
                <span class="request-id">${request.id}</span>
                <span class="status-badge ${statusClass}">${request.status}</span>
            </div>
            <div class="request-body">
                <div class="request-info">
                    <span class="label">Jenis Lele</span>
                    <span class="value">${request.jenisLele}</span>
                </div>
                <div class="request-info">
                    <span class="label">Ukuran</span>
                    <span class="value">${request.ukuran}</span>
                </div>
                <div class="request-info">
                    <span class="label">Jumlah</span>
                    <span class="value">${request.jumlah.toLocaleString('id-ID')} ekor</span>
                </div>
                <div class="request-info">
                    <span class="label">Estimasi Panen</span>
                    <span class="value">${formatDate(request.estimasiPanen)}</span>
                </div>
            </div>
            <div class="request-footer">
                <span class="request-price ${hargaClass}">${hargaText}</span>
                <span class="request-date">${formatDate(request.tanggalPermintaan)}</span>
            </div>
        </div>
    `;
}

/**
 * Render list permintaan berdasarkan filter
 * @param {string} filter - Filter status (all, Menunggu Konfirmasi, dll)
 */
function renderRequestList(filter = 'all') {
    const container = document.getElementById('requestList');
    const emptyState = document.getElementById('emptyState');

    // Ambil data dari localStorage
    const data = getPermintaanData();

    // Filter data
    let filteredData = data;
    if (filter !== 'all') {
        filteredData = data.filter(item => item.status === filter);
    }

    // Tampilkan empty state atau list
    if (filteredData.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
        container.innerHTML = filteredData.map(renderRequestCard).join('');
    }
}

/**
 * Navigasi ke halaman detail
 * Simpan ID permintaan ke localStorage sementara
 * @param {string} id - ID permintaan
 */
function goToDetail(id) {
    // Simpan ID ke localStorage untuk halaman detail
    localStorage.setItem('selectedPermintaanId', id);

    // Navigasi ke halaman detail
    window.location.href = 'detail-permintaan.html';
}

// ========================================
// 4. FILTER & TAB HANDLING
// ========================================

/**
 * Handle click pada filter tab
 * @param {Event} e - Click event
 */
function handleFilterClick(e) {
    if (!e.target.classList.contains('filter-tab')) return;

    // Update active tab
    document.querySelectorAll('.filter-tab').forEach(tab => tab.classList.remove('active'));
    e.target.classList.add('active');

    // Render list dengan filter baru
    const filter = e.target.dataset.filter;
    renderRequestList(filter);
}

// ========================================
// 5. NOTIFICATION SYSTEM
// ========================================

/**
 * Tampilkan notifikasi sederhana
 * @param {string} message - Pesan notifikasi
 */
function showNotification(message) {
    // Cek apakah sudah ada notifikasi
    let notification = document.querySelector('.notification-toast');

    // Buat jika belum ada
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification-toast';
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(82, 183, 136, 0.9);
            color: #1B4332;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            z-index: 3000;
            font-weight: 500;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s;
        `;
        document.body.appendChild(notification);
    }

    // Update pesan dan tampilkan
    notification.textContent = message;
    notification.style.transform = 'translateY(0)';
    notification.style.opacity = '1';

    // Sembunyikan setelah 4 detik
    setTimeout(() => {
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
    }, 4000);
}

// ========================================
// 6. INIT - JALANKAN SAAT PAGE LOAD
// ========================================

/**
 * Data dummy static untuk permintaan custom
 * Digunakan saat pertama kali load jika localStorage kosong
 */
const DUMMY_PERMINTAAN = [
    {
        id: 'PC-2026-001',
        jenisLele: 'Benih Lele Sangkuriang',
        ukuran: '5-7 cm',
        jumlah: 5000,
        estimasiPanen: '2026-04-15',
        catatan: 'Packing khusus untuk jarak jauh, butuh oksigen tambahan',
        status: 'Siap',
        hargaTawaran: 7500000,
        buktiBayar: 'confirmed',
        tanggalPermintaan: '2026-01-10T10:30:00.000Z',
        tanggalUpdate: '2026-01-18T14:20:00.000Z'
    },
    {
        id: 'PC-2026-002',
        jenisLele: 'Benih Lele Phyton',
        ukuran: '7-10 cm',
        jumlah: 3000,
        estimasiPanen: '2026-05-20',
        catatan: 'Butuh sertifikasi kesehatan dari karantina ikan',
        status: 'Diproses',
        hargaTawaran: 5400000,
        buktiBayar: 'confirmed',
        tanggalPermintaan: '2026-01-12T09:15:00.000Z',
        tanggalUpdate: '2026-01-20T11:30:00.000Z'
    },
    {
        id: 'PC-2026-003',
        jenisLele: 'Benih Lele Mesir',
        ukuran: '4-6 cm',
        jumlah: 10000,
        estimasiPanen: '2026-06-01',
        catatan: 'Order untuk kolam baru, mohon advice teknis juga',
        status: 'Disetujui',
        hargaTawaran: 12000000,
        buktiBayar: null,
        tanggalPermintaan: '2026-01-15T14:45:00.000Z',
        tanggalUpdate: '2026-01-19T09:00:00.000Z'
    },
    {
        id: 'PC-2026-004',
        jenisLele: 'Benih Lele Sangkuriang',
        ukuran: '3-5 cm',
        jumlah: 2000,
        estimasiPanen: '2026-04-01',
        catatan: '-',
        status: 'Menunggu Konfirmasi',
        hargaTawaran: 0,
        buktiBayar: null,
        tanggalPermintaan: '2026-01-20T08:00:00.000Z',
        tanggalUpdate: '2026-01-20T08:00:00.000Z'
    },
    {
        id: 'PC-2026-005',
        jenisLele: 'Lele Konsumsi (Ukuran Pakan)',
        ukuran: '8-12 cm',
        jumlah: 500,
        estimasiPanen: '2026-03-01',
        catatan: 'Untuk bahan baku olahan lele goreng',
        status: 'Menunggu Konfirmasi',
        hargaTawaran: 0,
        buktiBayar: null,
        tanggalPermintaan: '2026-01-21T16:30:00.000Z',
        tanggalUpdate: '2026-01-21T16:30:00.000Z'
    }
];

/**
 * Initialize halaman saat load
 */
function init() {
    // Initialize dummy data jika localStorage kosong
    if (!localStorage.getItem(STORAGE_KEY)) {
        savePermintaanData(DUMMY_PERMINTAAN);
        console.log('🐟 Dummy data permintaan custom telah dimuat!');
    }

    // Set minimum date untuk estimasi panen
    setMinDate();

    // Render list permintaan
    renderRequestList();

    // Setup form listener
    const form = document.getElementById('permintaanForm');
    if (form) {
        form.addEventListener('submit', submitPermintaan);
    }

    // Setup filter tabs listener
    const filterTabs = document.querySelector('.filter-tabs');
    if (filterTabs) {
        filterTabs.addEventListener('click', handleFilterClick);
    }

    // Update cart count (jika ada fungsi dari common.js)
    if (typeof updateCartCount === 'function') {
        // Cart count di-handle oleh common.js
    }
}

// Jalankan init saat DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ========================================
// 7. EXPORT FUNCTIONS (untuk digunakan file lain)
// ========================================

// Export functions agar bisa dipanggil dari file lain
window.getPermintaanData = getPermintaanData;
window.savePermintaanData = savePermintaanData;
window.renderRequestList = renderRequestList;
