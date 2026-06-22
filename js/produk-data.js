/**
 * PRODUK DATA - BABA FARM
 * Semua data produk tersimpan di sini.
 * Dipanggil di katalog.html dan detail-produk.html
 */

const PRODUK_DATA = {
    'Benih Lele Sangkuriang': {
        nama: 'Benih Lele Sangkuriang',
        kategori: 'Benih',
        harga: 'Rp 150.000',
        hargaLama: 'Rp 180.000',
        satuan: '/ 1.000 ekor',
        badge: 'Baru',
        rating: 4.5,
        jumlahUlasan: 45,
        stok: 250,
        deskripsiSingkat: 'Benih lele sangkuriang ukuran 5-7 cm, sehat dan aktif. Cocok untuk pembesaran.',
        deskripsiLengkap: `Benih Lele Sangkuriang merupakan varietas unggul hasil seleksi Balai Besar Pengembangan Budidaya Air Tawar (BBPBAT) Sukabumi. Dikenal dengan pertumbuhan yang cepat dan tingkat kelangsungan hidup yang tinggi.

Keunggulan Benih Lele Sangkuriang:
• Pertumbuhan lebih cepat dibanding varietas biasa
• Tahan terhadap berbagai penyakit umum
• Ukuran seragam dan sehat
• FCR (Feed Conversion Ratio) lebih efisien
• Cocok untuk budidaya kolam tanah maupun terpal`,
        spesifikasi: {
            'Ukuran': '5-7 cm',
            'Umur Benih': '3-4 minggu',
            'Asal': 'BBPBAT Sukabumi',
            'Min. Pemesanan': '500 ekor',
            'Garansi Hidup': '80%',
        }
    },

    'Benih Lele Phyton': {
        nama: 'Benih Lele Phyton',
        kategori: 'Benih',
        harga: 'Rp 200.000',
        hargaLama: 'Rp 250.000',
        satuan: '/ 1.000 ekor',
        badge: 'Promo',
        rating: 5,
        jumlahUlasan: 89,
        stok: 150,
        deskripsiSingkat: 'Benih lele phyton super growth. Tumbuh lebih cepat 30% dari varietas lain.',
        deskripsiLengkap: `Benih Lele Phyton adalah varietas premium dengan teknologi seleksi genetik terkini. Mampu tumbuh 30% lebih cepat dibanding varietas konvensional dengan efisiensi pakan yang lebih baik.

Keunggulan Benih Lele Phyton:
• Pertumbuhan super cepat, panen lebih singkat
• Konversi pakan sangat efisien (FCR 0.8-1.0)
• Daya tahan tubuh tinggi terhadap penyakit
• Ukuran panen lebih besar dan seragam
• Cocok untuk skala komersial`,
        spesifikasi: {
            'Ukuran': '5-7 cm',
            'Umur Benih': '3-4 minggu',
            'Keunggulan': 'Super Growth +30%',
            'Min. Pemesanan': '500 ekor',
            'Garansi Hidup': '85%',
        }
    },

    'Benih Lele Mesir': {
        nama: 'Benih Lele Mesir',
        kategori: 'Benih',
        harga: 'Rp 120.000',
        hargaLama: null,
        satuan: '/ 1.000 ekor',
        badge: null,
        rating: 4.5,
        jumlahUlasan: 38,
        stok: 300,
        deskripsiSingkat: 'Benih lele mesir dengan pertumbuhan stabil dan tahan penyakit.',
        deskripsiLengkap: `Benih Lele Mesir (Clarias gariepinus) adalah varietas yang dikenal dengan ketahanannya terhadap kondisi lingkungan yang kurang ideal. Sangat cocok untuk pembudidaya pemula.

Keunggulan Benih Lele Mesir:
• Sangat tahan terhadap perubahan kualitas air
• Adaptasi lingkungan yang baik
• Pertumbuhan stabil dan konsisten
• Harga terjangkau untuk pemula
• Cocok untuk kolam tanah, terpal, maupun beton`,
        spesifikasi: {
            'Ukuran': '5-7 cm',
            'Jenis': 'Clarias gariepinus',
            'Ketahanan': 'Tinggi',
            'Min. Pemesanan': '500 ekor',
            'Garansi Hidup': '80%',
        }
    },

    'Pakan Pelet 781-2': {
        nama: 'Pakan Pelet 781-2',
        kategori: 'Pakan',
        harga: 'Rp 85.000',
        hargaLama: null,
        satuan: '/ karung (50kg)',
        badge: 'Best Seller',
        rating: 5,
        jumlahUlasan: 128,
        stok: 500,
        deskripsiSingkat: 'Pakan pelet premium dengan protein 32%. Ukuran 3-5 mm, 1 karung 50kg.',
        deskripsiLengkap: `Pakan Pelet 781-2 adalah pakan standar industri yang paling banyak digunakan oleh pembudidaya lele di Indonesia. Formula khusus dengan kandungan protein tinggi untuk pertumbuhan optimal.

Kandungan Nutrisi:
• Protein minimal 32%
• Lemak minimal 5%
• Serat kasar maksimal 6%
• Kadar air maksimal 12%
• Abu maksimal 13%

Cocok untuk fase pembesaran lele ukuran 10 cm ke atas.`,
        spesifikasi: {
            'Ukuran Pelet': '3-5 mm',
            'Berat': '50 kg / karung',
            'Protein': '32%',
            'Fase': 'Pembesaran',
            'Merek': 'Hi-Pro Vite 781-2',
        }
    },

    'Pakan Pelet Grower': {
        nama: 'Pakan Pelet Grower',
        kategori: 'Pakan',
        harga: 'Rp 75.000',
        hargaLama: null,
        satuan: '/ karung (50kg)',
        badge: null,
        rating: 4,
        jumlahUlasan: 24,
        stok: 200,
        deskripsiSingkat: 'Pakan pelet untuk fase pembesaran dengan protein 28%. Ukuran 6-8 mm.',
        deskripsiLengkap: `Pakan Pelet Grower dirancang khusus untuk fase pembesaran akhir menuju panen. Ukuran pelet lebih besar sesuai bukaan mulut lele dewasa.

Kandungan Nutrisi:
• Protein minimal 28%
• Lemak minimal 4%
• Serat kasar maksimal 8%
• Kadar air maksimal 12%

Direkomendasikan untuk lele ukuran 15 cm ke atas atau 2-3 minggu menjelang panen.`,
        spesifikasi: {
            'Ukuran Pelet': '6-8 mm',
            'Berat': '50 kg / karung',
            'Protein': '28%',
            'Fase': 'Grower / Menjelang Panen',
            'Merek': 'Grower Pro',
        }
    },

    'Pakan Pelet Starter': {
        nama: 'Pakan Pelet Starter',
        kategori: 'Pakan',
        harga: 'Rp 55.000',
        hargaLama: 'Rp 65.000',
        satuan: '/ karung (25kg)',
        badge: 'Diskon',
        rating: 4,
        jumlahUlasan: 19,
        stok: 150,
        deskripsiSingkat: 'Pakan pelet untuk benih ukuran kecil dengan protein 40%. Ukuran 1-2 mm.',
        deskripsiLengkap: `Pakan Pelet Starter adalah pakan khusus untuk benih lele berukuran kecil (pendederan). Kandungan protein sangat tinggi untuk mendukung pertumbuhan awal yang optimal.

Kandungan Nutrisi:
• Protein minimal 40%
• Lemak minimal 6%
• Serat kasar maksimal 4%
• Vitamin dan mineral lengkap

Gunakan untuk benih ukuran 2-5 cm. Berikan 3-4 kali sehari secukupnya.`,
        spesifikasi: {
            'Ukuran Pelet': '1-2 mm',
            'Berat': '25 kg / karung',
            'Protein': '40%',
            'Fase': 'Pendederan / Starter',
            'Merek': 'Starter Pro',
        }
    },

    'Pakan Cincing': {
        nama: 'Pakan Cincing',
        kategori: 'Pakan',
        harga: 'Rp 95.000',
        hargaLama: null,
        satuan: '/ liter',
        badge: null,
        rating: 4.5,
        jumlahUlasan: 53,
        stok: 80,
        deskripsiSingkat: 'Pakan alami cincing/kultur cacing sutra untuk pakan alternatif berkualitas.',
        deskripsiLengkap: `Pakan Cincing adalah cacing sutra (Tubifex sp.) yang dikultur secara higienis. Merupakan pakan alami terbaik untuk benih lele fase awal karena sangat disukai dan mudah dicerna.

Keunggulan Pakan Cincing:
• Protein alami sangat tinggi (sekitar 57%)
• Gerakan cacing merangsang nafsu makan benih
• Meningkatkan pertumbuhan benih secara signifikan
• Bebas dari kontaminan berbahaya
• Dikemas segar dan higienis`,
        spesifikasi: {
            'Jenis': 'Cacing Sutra (Tubifex sp.)',
            'Protein': '±57% (alami)',
            'Kemasan': '1 liter',
            'Kondisi': 'Segar / Hidup',
            'Penggunaan': 'Benih 1-5 cm',
        }
    },

    'Vitamin Ikan Grow': {
        nama: 'Vitamin Ikan Grow',
        kategori: 'Suplemen',
        harga: 'Rp 45.000',
        hargaLama: null,
        satuan: '/ botol (500ml)',
        badge: null,
        rating: 4,
        jumlahUlasan: 32,
        stok: 100,
        deskripsiSingkat: 'Suplemen vitamin untuk mempercepat pertumbuhan dan meningkatkan daya tahan.',
        deskripsiLengkap: `Vitamin Ikan Grow adalah suplemen cair yang diformulasikan khusus untuk mempercepat pertumbuhan ikan lele. Mengandung kombinasi vitamin, mineral, dan asam amino esensial.

Kandungan Utama:
• Vitamin B kompleks untuk metabolisme energi
• Vitamin C untuk kekebalan tubuh
• Asam amino esensial untuk pertumbuhan otot
• Mineral mikro untuk keseimbangan elektrolit

Cara pakai: Campurkan 5ml per kg pakan, aduk rata, berikan setelah pakan sedikit lembab.`,
        spesifikasi: {
            'Volume': '500 ml / botol',
            'Dosis': '5 ml / kg pakan',
            'Frekuensi': '2-3x seminggu',
            'Bentuk': 'Cair',
            'Kandungan': 'Vitamin B, C, Asam Amino',
        }
    },

    'Booster Imun': {
        nama: 'Booster Imun',
        kategori: 'Suplemen',
        harga: 'Rp 38.000',
        hargaLama: null,
        satuan: '/ botol (250ml)',
        badge: null,
        rating: 4.5,
        jumlahUlasan: 41,
        stok: 90,
        deskripsiSingkat: 'Suplemen penambah kekebalan tubuh ikan. Meningkatkan ketahanan terhadap penyakit.',
        deskripsiLengkap: `Booster Imun adalah suplemen khusus untuk meningkatkan sistem kekebalan tubuh ikan lele. Sangat direkomendasikan saat pergantian musim atau kondisi cuaca ekstrem.

Manfaat Utama:
• Meningkatkan produksi antibodi alami ikan
• Mengurangi risiko kematian massal akibat penyakit
• Mempercepat pemulihan ikan yang sakit
• Cocok digunakan sebagai tindakan preventif
• Aman dan tidak meninggalkan residu berbahaya`,
        spesifikasi: {
            'Volume': '250 ml / botol',
            'Dosis': '3 ml / kg pakan',
            'Frekuensi': '2x seminggu',
            'Bentuk': 'Cair',
            'Kandungan': 'Beta Glucan, Vitamin C, Ekstrak Herbal',
        }
    },

    'Obat Organik Amankan': {
        nama: 'Obat Organik Amankan',
        kategori: 'Obat',
        harga: 'Rp 35.000',
        hargaLama: null,
        satuan: '/ botol (100ml)',
        badge: null,
        rating: 4.5,
        jumlahUlasan: 67,
        stok: 75,
        deskripsiSingkat: 'Obat organik untuk mengatasi berbagai penyakit ikan lele. Aman dan tanpa efek samping.',
        deskripsiLengkap: `Obat Organik Amankan adalah solusi pengobatan berbahan dasar herbal alami yang efektif mengatasi berbagai penyakit umum pada ikan lele tanpa meninggalkan residu kimia berbahaya.

Efektif untuk mengatasi:
• Penyakit jamur (Saprolegnia sp.)
• Bakteri Aeromonas (penyakit borok/luka)
• Parasit ektoparasit ringan
• Penyakit merah pada sirip dan badan

Cara pakai: Larutkan 5ml per 100 liter air kolam. Ulangi 3 hari berturut-turut.`,
        spesifikasi: {
            'Volume': '100 ml / botol',
            'Dosis': '5 ml / 100 liter air',
            'Bahan': 'Ekstrak Herbal Organik',
            'Penggunaan': 'Perendaman / Penetesan',
            'Aman untuk': 'Semua ukuran ikan',
        }
    },

    'Probiotik Bakteri': {
        nama: 'Probiotik Bakteri',
        kategori: 'Obat',
        harga: 'Rp 42.000',
        hargaLama: null,
        satuan: '/ botol (250ml)',
        badge: null,
        rating: 5,
        jumlahUlasan: 56,
        stok: 120,
        deskripsiSingkat: 'Probiotik untuk mengurai limbah dan menjaga kualitas air kolam.',
        deskripsiLengkap: `Probiotik Bakteri mengandung kultur bakteri menguntungkan yang membantu mengurai limbah organik di kolam, menjaga kualitas air tetap optimal, dan mengurangi gas beracun seperti amonia.

Manfaat Probiotik Bakteri:
• Mengurai amonia dan nitrit berbahaya
• Mengurangi bau busuk pada kolam
• Menjaga keseimbangan ekosistem kolam
• Mencegah pertumbuhan bakteri patogen
• Menghemat biaya penggantian air

Aplikasikan setiap 1-2 minggu sekali untuk hasil optimal.`,
        spesifikasi: {
            'Volume': '250 ml / botol',
            'Dosis': '10 ml / 1000 liter air',
            'Kandungan': 'Bacillus sp., Lactobacillus sp.',
            'Frekuensi': 'Setiap 1-2 minggu',
            'Simpan di': 'Tempat sejuk & gelap',
        }
    },

    'Garam Krosok': {
        nama: 'Garam Krosok',
        kategori: 'Obat',
        harga: 'Rp 28.000',
        hargaLama: null,
        satuan: '/ kg',
        badge: null,
        rating: 4,
        jumlahUlasan: 28,
        stok: 400,
        deskripsiSingkat: 'Garam krosok untuk pencegahan dan pengobatan penyakit parasit.',
        deskripsiLengkap: `Garam Krosok (garam kasar non-yodium) adalah solusi tradisional yang terbukti efektif untuk pencegahan dan pengobatan penyakit parasit pada ikan lele. Murah, aman, dan mudah diaplikasikan.

Kegunaan Garam Krosok:
• Mengobati penyakit kutu ikan (Argulus)
• Mencegah infeksi jamur dan bakteri ringan
• Membantu proses moulting / pergantian lendir
• Menstabilkan osmosis tubuh ikan yang sakit
• Meningkatkan produksi lendir pelindung ikan

Dosis pengobatan: 3-5 gram per liter air. Dosis pencegahan: 1-2 gram per liter.`,
        spesifikasi: {
            'Jenis': 'Garam Kasar Non-Yodium',
            'Kemasan': '1 kg',
            'Dosis Obat': '3-5 gram / liter',
            'Dosis Cegah': '1-2 gram / liter',
            'Waktu Rendam': '30-60 menit',
        }
    },
};

/**
 * Simpan data produk ke localStorage saat tombol Detail diklik
 * Dipanggil dari onclick di HTML, atau bisa dipanggil manual
 */
function simpanProdukDipilih(namaProduk) {
    const data = PRODUK_DATA[namaProduk];
    if (data) {
        localStorage.setItem('selectedProduct', namaProduk);
        localStorage.setItem('selectedProductData', JSON.stringify(data));
    }
}

/**
 * Render data produk ke halaman detail-produk.html
 * Dipanggil di dalam setupDetailProductPage() pada image-config.js
 */
function renderDetailProduk() {
    const raw = localStorage.getItem('selectedProductData');
    if (!raw) return;

    const data = JSON.parse(raw);

    // Judul
    const elNama = document.querySelector('.product-title, h1.product-name, .detail-product-title');
    if (elNama) elNama.textContent = data.nama;

    // Kategori badge
    const elKategori = document.querySelectorAll('.product-category, .detail-category');
    elKategori.forEach(el => el.textContent = data.kategori);

    // Harga
    const elHarga = document.querySelector('.product-price, .detail-price');
    if (elHarga) elHarga.textContent = `${data.harga} ${data.satuan}`;

    // Harga lama / coret
    const elHargaLama = document.querySelector('.product-old-price, .detail-old-price');
    if (elHargaLama) {
        if (data.hargaLama) {
            elHargaLama.textContent = data.hargaLama;
            elHargaLama.style.display = '';
        } else {
            elHargaLama.style.display = 'none';
        }
    }

    // Badge (Baru / Best Seller / Promo / dll)
    const elBadge = document.querySelector('.product-badge, .detail-badge');
    if (elBadge) {
        if (data.badge) {
            elBadge.textContent = data.badge;
            elBadge.style.display = '';
        } else {
            elBadge.style.display = 'none';
        }
    }

    // Deskripsi singkat
    const elDeskrip = document.querySelector('.product-description, .detail-description-short');
    if (elDeskrip) elDeskrip.textContent = data.deskripsiSingkat;

    // Deskripsi lengkap / tab deskripsi
    const elDeskripLengkap = document.querySelector('.product-desc-full, .tab-content-description, #deskripsi');
    if (elDeskripLengkap) elDeskripLengkap.innerText = data.deskripsiLengkap;

    // Rating bintang
    const elRatingText = document.querySelector('.rating-count, .detail-rating-count');
    if (elRatingText) elRatingText.textContent = `(${data.jumlahUlasan} ulasan)`;

    // Stok
    const elStok = document.querySelector('.product-stock, .detail-stock');
    if (elStok) elStok.textContent = `Stok: ${data.stok}`;

    // Spesifikasi (tabel)
    const elSpesTable = document.querySelector('.spec-table, .product-specs, #spesifikasi table, .spesifikasi-table');
    if (elSpesTable && data.spesifikasi) {
        elSpesTable.innerHTML = '';
        Object.entries(data.spesifikasi).forEach(([key, val]) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${key}</td><td>${val}</td>`;
            elSpesTable.appendChild(tr);
        });
    }

    // Judul tab / breadcrumb
    const elBreadcrumb = document.querySelector('.breadcrumb-current, .detail-breadcrumb span:last-child');
    if (elBreadcrumb) elBreadcrumb.textContent = data.nama;

    // Page title
    document.title = `${data.nama} - BABA FARM`;
}