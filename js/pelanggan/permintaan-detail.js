/**
 * PERMINTAAN DETAIL JAVASCRIPT
 * Handle detail view, update status, dan pembayaran
 *
 * PENJELASAN UNTUK PEMBELAJARAN:
 * 1. Membaca ID dari localStorage ('selectedPermintaanId')
 * 2. Mencari data permintaan dari array
 * 3. Render detail ke halaman
 * 4. Handle update status dan upload bukti bayar
 */

// ========================================
// 1. CONFIG & STATE
// ========================================

const STORAGE_KEY = 'permintaanCustom';
let currentRequest = null;
let uploadedFile = null;

/**
 * Data dummy static (sama seperti di permintaan.js)
 * Digunakan untuk inisialisasi jika localStorage kosong
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

// ========================================
// 2. HELPER FUNCTIONS (sama seperti permintaan.js)
// ========================================

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

function formatRupiah(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}

function getPermintaanData() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function savePermintaanData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

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

// ========================================
// 3. LOAD & RENDER DETAIL
// ========================================

/**
 * Load permintaan berdasarkan ID dari localStorage
 * @param {string} id - ID permintaan
 * @returns {Object|null} Permintaan object atau null jika tidak ditemukan
 */
function loadPermintaan(id) {
    const data = getPermintaanData();
    return data.find(item => item.id === id) || null;
}

/**
 * Render detail permintaan ke halaman
 * @param {Object} request - Permintaan object
 */
function renderDetail(request) {
    if (!request) {
        showNotFound();
        return;
    }

    currentRequest = request;

    // Update ID dan judul
    document.getElementById('requestId').textContent = request.id;
    document.getElementById('requestTitle').textContent = `Permintaan ${request.jenisLele}`;

    // Update status
    const statusBadge = document.getElementById('statusBadge');
    statusBadge.textContent = request.status;
    statusBadge.className = 'status-badge ' + getStatusClass(request.status);

    // Update tanggal
    document.getElementById('requestDate').textContent = formatDate(request.tanggalPermintaan, true);

    // Update info grid
    document.getElementById('detailJenis').textContent = request.jenisLele;
    document.getElementById('detailUkuran').textContent = request.ukuran;
    document.getElementById('detailJumlah').textContent = request.jumlah.toLocaleString('id-ID') + ' ekor';
    document.getElementById('detailEstimasi').textContent = formatDate(request.estimasiPanen);

    // Update catatan
    const catatanEl = document.getElementById('detailCatatan');
    if (request.catatan && request.catatan !== '-') {
        catatanEl.textContent = request.catatan;
        catatanEl.classList.remove('empty');
    } else {
        catatanEl.textContent = 'Tidak ada catatan khusus';
        catatanEl.classList.add('empty');
    }

    // Update harga
    updatePriceSection(request);

    // Update tombol aksi
    updateActionButtons(request);

    // Update timeline
    updateTimeline(request);

    // Update upload section
    updateUploadSection(request);
}

/**
 * Update section harga berdasarkan status dan harga tawaran
 * @param {Object} request - Permintaan object
 */
function updatePriceSection(request) {
    const priceSection = document.getElementById('priceSection');

    // Jika sudah disetujui atau lebih, tampilkan harga
    if (request.hargaTawaran > 0) {
        const hargaSatuan = Math.round(request.hargaTawaran / request.jumlah);

        document.getElementById('priceSatuan').textContent = formatRupiah(hargaSatuan) + ' / ekor';
        document.getElementById('priceSatuan').classList.remove('pending');

        document.getElementById('priceJumlah').textContent = request.jumlah.toLocaleString('id-ID') + ' ekor';

        document.getElementById('priceTotal').textContent = formatRupiah(request.hargaTawaran);
        document.getElementById('priceTotal').classList.remove('pending');
        document.getElementById('priceTotal').classList.add('highlight');

        priceSection.style.display = 'block';
    } else {
        // Reset ke pending state
        document.getElementById('priceSatuan').textContent = 'Menunggu penawaran';
        document.getElementById('priceSatuan').classList.add('pending');

        document.getElementById('priceJumlah').textContent = request.jumlah.toLocaleString('id-ID') + ' ekor';

        document.getElementById('priceTotal').textContent = 'Menunggu penawaran';
        document.getElementById('priceTotal').classList.add('pending');
        document.getElementById('priceTotal').classList.remove('highlight');

        priceSection.style.display = 'block';
    }
}

/**
 * Update tombol aksi berdasarkan status
 * @param {Object} request - Permintaan object
 */
function updateActionButtons(request) {
    const btnSetuju = document.getElementById('btnSetuju');
    const btnTolak = document.getElementById('btnTolak');
    const btnUlangi = document.getElementById('btnUlangi');
    const bankInfo = document.getElementById('bankInfo');

    // Reset semua tombol
    btnSetuju.style.display = 'none';
    btnTolak.style.display = 'none';
    btnUlangi.style.display = 'none';
    bankInfo.style.display = 'none';

    // Tampilkan tombol berdasarkan status
    switch (request.status) {
        case 'Menunggu Konfirmasi':
            // Belum ada tombol khusus
            break;

        case 'Disetujui':
            // Tampilkan tombol setuju dan tolak (untuk respon terhadap harga)
            btnSetuju.style.display = 'inline-flex';
            btnTolak.style.display = 'inline-flex';

            // Setup event listener
            btnSetuju.onclick = () => handleSetuju();
            btnTolak.onclick = () => handleTolak();

            // Tampilkan info bank
            bankInfo.style.display = 'block';
            break;

        case 'Diproses':
        case 'Siap':
            // Tampilkan tombol ulangi
            btnUlangi.style.display = 'inline-flex';
            btnUlangi.onclick = () => handleUlangi();
            break;

        case 'Dibatalkan':
            // Tampilkan tombol ulangi
            btnUlangi.style.display = 'inline-flex';
            btnUlangi.onclick = () => handleUlangi();
            break;
    }
}

/**
 * Update timeline status
 * @param {Object} request - Permintaan object
 */
function updateTimeline(request) {
    const timeline = document.getElementById('timeline');

    // Definisi timeline berdasarkan status flow
    const statusFlow = [
        'Menunggu Konfirmasi',
        'Disetujui',
        'Diproses',
        'Siap'
    ];

    // Cari index status saat ini
    const currentIndex = statusFlow.indexOf(request.status);

    // Render timeline
    let html = '';
    statusFlow.forEach((status, index) => {
        let dotClass = 'timeline-dot';
        let icon = '⏳';

        if (index < currentIndex) {
            // Status sudah lewat
            dotClass += ' completed';
            icon = '✓';
        } else if (index === currentIndex) {
            // Status saat ini
            dotClass += ' active';
            icon = '●';
        } else {
            // Status belum tercapai
            icon = '○';
        }

        html += `
            <div class="timeline-item">
                <div class="${dotClass}"></div>
                <div class="timeline-content">
                    <h4>${status} ${index === currentIndex ? icon : ''}</h4>
                    <p>${index <= currentIndex ? formatDate(request.tanggalUpdate, true) : '-'}</p>
                </div>
            </div>
        `;
    });

    timeline.innerHTML = html;
}

/**
 * Update upload section berdasarkan status
 * @param {Object} request - Permintaan object
 */
function updateUploadSection(request) {
    const uploadSection = document.getElementById('uploadSection');

    // Hanya tampilkan upload jika status Disetujui dan belum ada bukti bayar
    if (request.status === 'Disetujui' && !request.buktiBayar) {
        uploadSection.style.display = 'block';
        setupUploadHandler();
    } else if (request.buktiBayar) {
        // Sudah ada bukti bayar
        uploadSection.style.display = 'none';
    } else {
        uploadSection.style.display = 'none';
    }
}

/**
 * Setup handler untuk upload file
 */
function setupUploadHandler() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const submitPaymentBtn = document.getElementById('submitPaymentBtn');

    // Click pada upload area
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    // File input change
    fileInput.addEventListener('change', (e) => {
        handleFileSelect(e.target.files[0]);
    });

    // Drag & drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    });

    // Submit payment button
    if (submitPaymentBtn) {
        submitPaymentBtn.addEventListener('click', submitBuktiBayar);
    }
}

/**
 * Handle file selection
 * @param {File} file - File yang dipilih
 */
function handleFileSelect(file) {
    if (!file) return;

    // Validasi tipe file
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
        showNotification('Format file harus JPG, PNG, atau PDF!');
        return;
    }

    // Validasi ukuran (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        showNotification('Ukuran file maksimal 5MB!');
        return;
    }

    uploadedFile = file;

    // Tampilkan preview
    const preview = document.getElementById('filePreview');
    const fileName = document.getElementById('fileName');
    const fileSize = document.getElementById('fileSize');
    const submitBtn = document.getElementById('submitPaymentBtn');

    fileName.textContent = file.name;
    fileSize.textContent = (file.size / 1024).toFixed(1) + ' KB';

    // Update icon berdasarkan tipe
    const icon = preview.querySelector('.file-icon i');
    if (file.type.includes('pdf')) {
        icon.className = 'fas fa-file-pdf';
    } else {
        icon.className = 'fas fa-file-image';
    }

    preview.classList.add('show');
    submitBtn.style.display = 'inline-flex';

    // Simpan file untuk submit nanti
    uploadedFile = file;
}

/**
 * Hapus file yang dipilih
 */
function removeFile() {
    uploadedFile = null;

    const preview = document.getElementById('filePreview');
    const submitBtn = document.getElementById('submitPaymentBtn');
    const fileInput = document.getElementById('fileInput');

    preview.classList.remove('show');
    submitBtn.style.display = 'none';
    fileInput.value = '';
}

/**
 * Submit bukti bayar
 */
function submitBuktiBayar() {
    if (!uploadedFile || !currentRequest) return;

    // Simulasi upload (karena belum ada backend)
    const reader = new FileReader();

    reader.onload = function(e) {
        // Update data permintaan
        const data = getPermintaanData();
        const index = data.findIndex(item => item.id === currentRequest.id);

        if (index !== -1) {
            // Simpan bukti bayar (base64 untuk simulasi)
            data[index].buktiBayar = e.target.result; // Di production, ini akan menjadi URL dari server
            data[index].status = 'Diproses';
            data[index].tanggalUpdate = new Date().toISOString();

            savePermintaanData(data);

            // Show notifikasi
            showNotification('Bukti pembayaran berhasil diupload! Status: Diproses');

            // Refresh halaman
            currentRequest = data[index];
            renderDetail(currentRequest);
        }
    };

    reader.readAsDataURL(uploadedFile);
}

// ========================================
// 4. ACTION HANDLERS
// ========================================

/**
 * Handle tombol setuju (menerima penawaran)
 */
function handleSetuju() {
    if (!currentRequest) return;

    // Update status ke Diproses
    const data = getPermintaanData();
    const index = data.findIndex(item => item.id === currentRequest.id);

    if (index !== -1) {
        data[index].status = 'Diproses';
        data[index].tanggalUpdate = new Date().toISOString();

        savePermintaanData(data);

        // Show notifikasi
        showNotification('Penawaran diterima! Silakan upload bukti pembayaran.');

        // Refresh
        currentRequest = data[index];
        renderDetail(currentRequest);
    }
}

/**
 * Handle tombol tolak (menolak penawaran)
 */
function handleTolak() {
    if (!currentRequest) return;

    if (confirm('Apakah Anda yakin ingin menolak penawaran ini? Permintaan akan dibatalkan.')) {
        // Update status ke Dibatalkan
        const data = getPermintaanData();
        const index = data.findIndex(item => item.id === currentRequest.id);

        if (index !== -1) {
            data[index].status = 'Dibatalkan';
            data[index].tanggalUpdate = new Date().toISOString();

            savePermintaanData(data);

            // Show notifikasi
            showNotification('Penawaran ditolak. Permintaan dibatalkan.');

            // Refresh
            currentRequest = data[index];
            renderDetail(currentRequest);
        }
    }
}

/**
 * Handle tombol ulangi (buat permintaan baru dengan data sama)
 */
function handleUlangi() {
    if (!currentRequest) return;

    // Redirect ke halaman permintaan-custom dengan data pre-filled
    // Simpan data sementara di localStorage
    localStorage.setItem('ulangiPermintaan', JSON.stringify(currentRequest));

    // Redirect
    window.location.href = 'permintaan-custom.html';
}

// ========================================
// 5. ADMIN SIMULATION FUNCTIONS
// ========================================

/**
 * Update status (simulasi admin)
 * @param {string} newStatus - Status baru
 */
function updateStatus(newStatus) {
    if (!currentRequest) return;

    const data = getPermintaanData();
    const index = data.findIndex(item => item.id === currentRequest.id);

    if (index !== -1) {
        data[index].status = newStatus;
        data[index].tanggalUpdate = new Date().toISOString();

        savePermintaanData(data);

        // Show notifikasi
        showNotification(`Status diubah ke: ${newStatus}`);

        // Refresh
        currentRequest = data[index];
        renderDetail(currentRequest);
    }
}

/**
 * Buka modal set harga
 */
function setHargaModal() {
    const modal = document.getElementById('hargaModal');
    const hargaInput = document.getElementById('hargaTawaran');

    // Pre-fill jika sudah ada harga
    if (currentRequest && currentRequest.hargaTawaran > 0) {
        hargaInput.value = currentRequest.hargaTawaran;
    } else {
        hargaInput.value = '';
    }

    modal.classList.add('active');
}

/**
 * Tutup modal set harga
 */
function closeHargaModal() {
    const modal = document.getElementById('hargaModal');
    modal.classList.remove('active');
}

/**
 * Simpan harga tawaran
 */
function saveHarga() {
    const hargaInput = document.getElementById('hargaTawaran');
    const harga = parseInt(hargaInput.value);

    if (!harga || harga <= 0) {
        showNotification('Masukkan harga yang valid!');
        return;
    }

    const data = getPermintaanData();
    const index = data.findIndex(item => item.id === currentRequest.id);

    if (index !== -1) {
        data[index].hargaTawaran = harga;
        data[index].tanggalUpdate = new Date().toISOString();

        savePermintaanData(data);

        // Show notifikasi
        showNotification(`Penawaran harga: ${formatRupiah(harga)}`);

        // Tutup modal dan refresh
        closeHargaModal();
        currentRequest = data[index];
        renderDetail(currentRequest);
    }
}

// ========================================
// 6. UTILITY FUNCTIONS
// ========================================

/**
 * Tampilkan pesan not found
 */
function showNotFound() {
    document.querySelector('.main-content .container').innerHTML = `
        <div style="text-align: center; padding: 4rem;">
            <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: rgba(255,255,255,0.3); margin-bottom: 1rem;"></i>
            <h2 style="margin-bottom: 0.5rem;">Permintaan Tidak Ditemukan</h2>
            <p style="color: rgba(255,255,255,0.6); margin-bottom: 2rem;">Data permintaan yang Anda cari tidak ditemukan atau telah dihapus.</p>
            <a href="permintaan-custom.html" class="btn btn-primary">
                <i class="fas fa-arrow-left"></i> Kembali ke Daftar
            </a>
        </div>
    `;
}

/**
 * Tampilkan notifikasi
 * @param {string} message - Pesan notifikasi
 */
function showNotification(message) {
    let notification = document.querySelector('.notification-toast');

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

    notification.textContent = message;
    notification.style.transform = 'translateY(0)';
    notification.style.opacity = '1';

    setTimeout(() => {
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
    }, 4000);
}

// ========================================
// 7. INIT - JALANKAN SAAT PAGE LOAD
// ========================================

/**
 * Initialize halaman detail
 */
function init() {
    // Initialize dummy data jika localStorage kosong
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DUMMY_PERMINTAAN));
        console.log('🐟 Dummy data permintaan custom telah dimuat!');
    }

    // Ambil ID dari localStorage
    const selectedId = localStorage.getItem('selectedPermintaanId');

    if (!selectedId) {
        showNotFound();
        return;
    }

    // Load permintaan
    const request = loadPermintaan(selectedId);
    renderDetail(request);
}

// Jalankan init saat DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export functions untuk admin simulation
window.updateStatus = updateStatus;
window.setHargaModal = setHargaModal;
window.closeHargaModal = closeHargaModal;
window.saveHarga = saveHarga;
window.removeFile = removeFile;
