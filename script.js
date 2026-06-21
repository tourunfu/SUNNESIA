// --- CONFIGURATION FOR TEACHER REPORTING ---
const TEACHER_CONFIG = {
    whatsappNumber: '628123456789', // Ganti dengan nomor WhatsApp guru (format internasional tanpa + atau spasi)
    emailAddress: 'guru@sekolah.com', // Ganti dengan email guru
    googleFormUrl: '', // (Opsional) URL Google Form action untuk silent logging ke Google Sheets (contoh: https://docs.google.com/forms/u/0/d/e/1FAIpQLSfxxxx/formResponse)
    googleFormEntryName: 'entry.123456789',  // ID field Nama di Google Form
    googleFormEntryTopic: 'entry.987654321', // ID field Materi di Google Form
    googleFormEntryScore: 'entry.111213141'  // ID field Skor di Google Form
};

// --- 1. HAMBURGER MENU (Untuk Mobile) ---
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Animasi tombol hamburger
        mobileMenu.classList.toggle('is-active');
    });
}

// Tutup menu saat link diklik (khusus mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// --- 2. SMOOTH SCROLL (Scroll Halus) ---
// Sebenarnya sudah ada di CSS (scroll-behavior: smooth), 
// tapi ini untuk memastikan navigasi bekerja baik di semua browser.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Daftarkan section yang ingin diberi efek muncul
const enhancedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
            entry.target.style.filter = 'blur(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(100px) scale(0.95)';
    section.style.filter = 'blur(15px)';
    section.style.transition = 'all 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)';
    enhancedObserver.observe(section);
});


// --- 4. PENANGANAN GAMBAR GAGAL MUAT ---
document.querySelectorAll('img').forEach(img => {
    img.onerror = function () {
        this.src = 'https://via.placeholder.com/400x300?text=Gambar+Belum+Tersedia'; // Gambar cadangan
        this.classList.add('error');
    };
});

// --- LOGIKA SLIDER TIM ---
const slider = document.getElementById('teamSlider');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
const cards = document.querySelectorAll('.team-slider .team-card');

let counter = 0;

if (nextBtn && prevBtn && slider && cards.length > 0) {
    nextBtn.addEventListener('click', () => {
        if (counter < cards.length - 1) {
            counter++;
            updateSlider();
        } else {
            // Balik ke awal jika sudah di akhir (opsional)
            counter = 0;
            updateSlider();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (counter > 0) {
            counter--;
            updateSlider();
        } else {
            // Ke akhir jika di awal (opsional)
            counter = cards.length - 1;
            updateSlider();
        }
    });
}

function updateSlider() {
    // Menggeser slider berdasarkan lebar kartu
    slider.style.transform = `translateX(${-counter * 100}%)`;
}

// --- LOGIKA SIMULASI LOGIN/LOGOUT DENGAN MODAL ---
function openLoginModal() {
    document.getElementById('loginModal').classList.add('active');
}

function closeLoginModal() {
    document.getElementById('loginModal').classList.remove('active');
}

function handleLogin(event) {
    event.preventDefault(); // Mencegah reload halaman

    // Ambil nilai email
    const emailInput = document.getElementById('loginEmail').value;

    if (emailInput) {
        // Ekstrak nama dari email (sebelum @)
        let namePart = emailInput.split('@')[0];

        // Bersihkan nama dari angka atau karakter aneh dan kapitalisasi
        namePart = namePart.replace(/[^a-zA-Z ]/g, " ");
        let displayName = namePart.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ').trim();
        if (!displayName) displayName = "User";

        // Simpan sesi login
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('displayName', displayName);

        // Update UI Profil
        document.getElementById('profileName').textContent = displayName;

        // Ganti avatar berdasarkan nama (menggunakan UI Avatars API)
        const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0d9488&color=fff&size=100`;
        document.getElementById('profileAvatar').src = avatarUrl;

        // Sembunyikan tombol login, tampilkan profil
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('profile-section').style.display = 'flex';

        // Tutup modal
        closeLoginModal();

        // Kosongkan form
        document.getElementById('loginForm').reset();

        // Tampilkan lencana & progres jika sebelumnya sudah dapat 100
        renderBadge();
        updateGlobalBadgeDisplay();
        updateProgressDashboard();
    }
}


function handleLogout() {
    // Hapus sesi login
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('displayName');

    // Hapus lencana dari layar jika ada
    const badge = document.getElementById('perfectBadge');
    if (badge) badge.remove();

    // Sembunyikan profil, tampilkan tombol login
    document.getElementById('auth-section').style.display = 'flex';
    document.getElementById('profile-section').style.display = 'none';

    // Reset lencana & progres di UI (karena sudah logout)
    updateGlobalBadgeDisplay();
    updateProgressDashboard();
}


// --- FUNGSI CEK STATUS LOGIN SAAT HALAMAN DIMUAT ---
function checkLoginState() {
    const authSection = document.getElementById('auth-section');
    const profileSection = document.getElementById('profile-section');
    const profileName = document.getElementById('profileName');
    const profileAvatar = document.getElementById('profileAvatar');

    if (localStorage.getItem('isLoggedIn') === 'true') {
        if (authSection && profileSection && profileName && profileAvatar) {
            const displayName = localStorage.getItem('displayName') || "User";
            profileName.textContent = displayName;
            const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0d9488&color=fff&size=100`;
            profileAvatar.src = avatarUrl;

            authSection.style.display = 'none';
            profileSection.style.display = 'flex';
        }
    } else {
        if (authSection && profileSection) {
            authSection.style.display = 'flex';
            profileSection.style.display = 'none';
        }
    }
}

// --- LOGIKA HYBRID QUIZ (MC + MATCHING) & LENCANA ---
const quizzes = {
    "Mad Thabi'i - SUNNESIA": [
        { type: "mc", q: "Apa pengertian dari Mad Thabi'i secara bahasa?", options: ["Panjang Asli/Biasa", "Dengung", "Samar", "Jelas"], answer: 0 },
        { type: "mc", q: "Berapa panjang ketukan bacaan Mad Thabi'i?", options: ["1 Alif (2 Harakat)", "2 Alif (4 Harakat)", "3 Alif (6 Harakat)", "Setengah Alif (1 Harakat)"], answer: 0 },
        { type: "mc", q: "Syarat terjadinya Mad Thabi'i dengan huruf Ya' (ي) adalah jika didahului harakat...", options: ["Fathah", "Kasrah", "Dhammah", "Sukun"], answer: 1 },
        { type: "mc", q: "Syarat terjadinya Mad Thabi'i dengan huruf Wawu (و) adalah jika didahului harakat...", options: ["Fathah", "Kasrah", "Dhammah", "Sukun"], answer: 2 },
        { type: "mc", q: "Syarat terjadinya Mad Thabi'i dengan huruf Alif (ا) adalah jika didahului harakat...", options: ["Fathah", "Kasrah", "Dhammah", "Sukun"], answer: 0 },
        { type: "mc", q: "Manakah di bawah ini yang merupakan contoh bacaan Mad Thabi'i?", options: ["نُوْحِيْهَا", "قُرَيْشٍ", "سَوَآءٌ", "جَآءَ"], answer: 0 },
        { type: "mc", q: "Hukum membaca Mad Thabi'i adalah...", options: ["Wajib 2 harakat", "Jaiz 2-6 harakat", "Sunnah 2 harakat", "Boleh dibaca pendek"], answer: 0 },
        { type: "match", q: "Cocokkan pasangan huruf dan harakatnya agar membentuk Mad Thabi'i!", pairs: [{ id: "p1", term: "Huruf Alif (ا)", answer: "Didahului Fathah" }, { id: "p2", term: "Huruf Wawu (و)", answer: "Didahului Dhammah" }, { id: "p3", term: "Huruf Ya' (ي)", answer: "Didahului Kasrah" }, { id: "p4", term: "Contoh Bacaan", answer: "نُوْحِيْهَا" }] }
    ],
    "Mad Wajib & Jaiz - SUNNESIA": [
        { type: "mc", q: "Apa ciri utama Mad Wajib Muttasil?", options: ["Bertemu hamzah dalam satu kata", "Bertemu hamzah di lain kata", "Bertemu huruf mati", "Bertemu tasydid"], answer: 0 },
        { type: "mc", q: "Berapa panjang bacaan Mad Wajib Muttasil?", options: ["2 Harakat", "4-5 Harakat", "6 Harakat", "1 Harakat"], answer: 1 },
        { type: "mc", q: "Apa perbedaan Mad Jaiz Munfasil dengan Mad Wajib?", options: ["Bertemu hamzah di kata terpisah", "Bertemu tasydid", "Dibaca lebih pendek", "Tidak ada bedanya"], answer: 0 },
        { type: "mc", q: "Apa arti dari 'Muttasil'?", options: ["Terpisah", "Bersambung (1 kata)", "Panjang", "Pendek"], answer: 1 },
        { type: "mc", q: "Apa arti dari 'Munfasil'?", options: ["Terpisah (Beda kata)", "Bersambung", "Panjang", "Pendek"], answer: 0 },
        { type: "mc", q: "Manakah contoh bacaan Mad Wajib Muttasil?", options: ["سَوَآءٌ", "بِمَآ أُنْزِلَ", "نُوْحِيْهَا", "قُرَيْشٍ"], answer: 0 },
        { type: "mc", q: "Manakah contoh bacaan Mad Jaiz Munfasil?", options: ["سَوَآءٌ", "بِمَآ أُنْزِلَ", "جَآءَ", "نُوْحِيْهَا"], answer: 1 },
        { type: "match", q: "Cocokkan pasangan Mad Wajib & Jaiz!", pairs: [{ id: "p1", term: "Mad Wajib", answer: "Dalam satu kata" }, { id: "p2", term: "Mad Jaiz", answer: "Kata yang terpisah" }, { id: "p3", term: "Panjang Wajib", answer: "4-5 Harakat" }, { id: "p4", term: "Panjang Jaiz", answer: "Bisa 2, 4, 5 Harakat" }] }
    ],
    "Mad Lazim Mutsaqqal - SUNNESIA": [
        { type: "mc", q: "Apa arti dari 'Mutsaqqal'?", options: ["Ringan", "Diberatkan", "Panjang", "Pendek"], answer: 1 },
        { type: "mc", q: "Berapa harakat membaca Mad Lazim Mutsaqqal Kilmi?", options: ["2 Harakat", "4 Harakat", "6 Harakat", "8 Harakat"], answer: 2 },
        { type: "mc", q: "Syarat Mad Lazim Mutsaqqal Kilmi adalah Mad Thabi'i bertemu dengan...", options: ["Huruf berharakat sukun", "Huruf bertasydid", "Huruf hamzah", "Huruf alif"], answer: 1 },
        { type: "mc", q: "Hukum membaca Mad Lazim Mutsaqqal adalah...", options: ["Wajib 6 Harakat", "Jaiz 2-6 Harakat", "Sunnah 4 Harakat", "Wajib 2 Harakat"], answer: 0 },
        { type: "mc", q: "Manakah contoh bacaan Mad Lazim Mutsaqqal Kilmi?", options: ["وَلَا الضَّآلِّينَ", "ءَآلْـٰٔنَ", "نُوْحِيْهَا", "سَوَآءٌ"], answer: 0 },
        { type: "mc", q: "Apa penyebab utama dinamakan Mutsaqqal (diberatkan)?", options: ["Ada tasydid setelah huruf mad", "Hurufnya sulit dibaca", "Panjangnya 6 harakat", "Bertemu huruf hamzah"], answer: 0 },
        { type: "mc", q: "Kata 'Kilmi' berarti...", options: ["Dalam satu kata", "Dalam satu huruf", "Diberatkan", "Diringankan"], answer: 0 },
        { type: "match", q: "Cocokkan konsep Mad Lazim Mutsaqqal!", pairs: [{ id: "p1", term: "Mutsaqqal", answer: "Diberatkan" }, { id: "p2", term: "Kilmi", answer: "Dalam bentuk kata" }, { id: "p3", term: "Panjang Ketukan", answer: "6 Harakat" }, { id: "p4", term: "Penyebab", answer: "Huruf Bertasydid" }] }
    ],
    "Mad Lazim Mukhaffaf - SUNNESIA": [
        { type: "mc", q: "Apa pengertian dari hukum bacaan Mad Lazim Kilmi Mukhaffaf?", options: ["Mad bertemu huruf bertasydid", "Mad bertemu sukun asli dalam 1 kata", "Mad bertemu hamzah beda kata", "Mad di akhir ayat"], answer: 1 },
        { type: "mc", q: "Berapa panjang harakat wajib saat membaca Mad Lazim Kilmi Mukhaffaf?", options: ["2 harakat", "4 harakat", "5 harakat", "6 harakat"], answer: 3 },
        { type: "mc", q: "Kata 'Kilmi' pada nama tajwid ini memiliki arti...", options: ["Diringankan", "Diberatkan", "Dalam satu kata", "Dalam satu huruf"], answer: 2 },
        { type: "mc", q: "Sedangkan kata 'Mukhaffaf' memiliki arti...", options: ["Diringankan (tanpa tasydid)", "Diberatkan (ada tasydid)", "Disamarkan", "Dipantulkan"], answer: 0 },
        { type: "mc", q: "Di dalam Al-Qur'an, contoh Mad Lazim Kilmi Mukhaffaf terdapat pada surah...", options: ["Al-Fatihah", "Al-Baqarah", "Yunus", "Yasin"], answer: 2 },
        { type: "mc", q: "Pada surah Yunus, di ayat ke berapakah letak hukum bacaan ini?", options: ["Ayat 1 & 2", "Ayat 51 & 91", "Ayat 10 & 20", "Ayat 50 & 90"], answer: 1 },
        { type: "mc", q: "Lafaz manakah yang merupakan satu-satunya contoh hukum bacaan ini?", options: ["الضَّآلِّينَ", "ءَآلْـٰٔنَ", "الحَآقَّةُ", "طٓسٓمٓ"], answer: 1 },
        { type: "match", q: "Cocokkan pasangan Mad Lazim Mukhaffaf!", pairs: [{ id: "p1", term: "Mukhaffaf", answer: "Ringan / Tanpa Tasydid" }, { id: "p2", term: "Penyebab", answer: "Sukun Asli" }, { id: "p3", term: "Contoh Kilmi", answer: "ءَآلْـٰٔنَ" }, { id: "p4", term: "Panjang Ketukan", answer: "6 Harakat" }] }
    ],
    "Mad Liin - SUNNESIA": [
        { type: "mc", q: "Apa arti 'Liin' secara bahasa?", options: ["Keras", "Lembut/Lunak", "Panjang", "Pendek"], answer: 1 },
        { type: "mc", q: "Kapan Mad Liin terjadi?", options: ["Wawu/Ya sukun setelah Fathah & diwaqafkan", "Alif setelah Fathah", "Wawu sukun setelah Dhammah", "Ya sukun setelah Kasrah"], answer: 0 },
        { type: "mc", q: "Manakah contoh bacaan Mad Liin?", options: ["نُوْحِيْهَا", "قُرَيْشٍ", "سَوَآءٌ", "جَآءَ"], answer: 1 },
        { type: "mc", q: "Hukum bacaan Mad Liin bisa dibaca sepanjang...", options: ["2 Harakat", "4 Harakat", "6 Harakat", "Semua jawaban benar"], answer: 3 },
        { type: "mc", q: "Berapa banyak huruf Liin?", options: ["1 huruf (Alif)", "2 huruf (Wawu sukun & Ya sukun)", "3 huruf (Alif, Wawu, Ya)", "4 huruf"], answer: 1 },
        { type: "mc", q: "Apa syarat harakat sebelum huruf Liin?", options: ["Fathah", "Kasrah", "Dhammah", "Sukun"], answer: 0 },
        { type: "mc", q: "Jika dibaca washal (disambung/tidak berhenti), apakah Mad Liin tetap dibaca panjang?", options: ["Ya, tetap dibaca panjang", "Tidak, dibaca pendek", "Bergantung pada kata setelahnya", "Dibaca panjang 6 harakat"], answer: 1 },
        { type: "match", q: "Cocokkan konsep Mad Liin!", pairs: [{ id: "p1", term: "Arti Liin", answer: "Lembut/Lunak" }, { id: "p2", term: "Huruf Liin", answer: "Wawu & Ya' Sukun" }, { id: "p3", term: "Syarat Harakat", answer: "Didahului Fathah" }, { id: "p4", term: "Contoh Bacaan", answer: "خَوْفٍ" }] }
    ],
    "Mad Iwadh - SUNNESIA": [
        { type: "mc", q: "Apa arti 'Iwadh' secara bahasa?", options: ["Pengganti", "Panjang", "Berhenti", "Samar"], answer: 0 },
        { type: "mc", q: "Kapan Mad Iwadh terjadi?", options: ["Berhenti pada Fathatain", "Berhenti pada Kasratain", "Berhenti pada Dhammatain", "Bertemu huruf hijaiyah"], answer: 0 },
        { type: "mc", q: "Berapa panjang bacaan Mad Iwadh?", options: ["1 Harakat", "2 Harakat", "4 Harakat", "6 Harakat"], answer: 1 },
        { type: "mc", q: "Jika huruf diakhiri dengan Ta Marbuthah berharakat Fathatain (ـةً), apakah terjadi Mad Iwadh?", options: ["Ya, dibaca panjang", "Tidak, berubah menjadi Ha (ـه) mati", "Berubah menjadi alif", "Tetap dibaca an"], answer: 1 },
        { type: "mc", q: "Manakah contoh bacaan Mad Iwadh?", options: ["عَلِيمًا", "قُرَيْشٍ", "خَوْفٍ", "بَصِيرٌ"], answer: 0 },
        { type: "mc", q: "Mad Iwadh hanya berlaku ketika...", options: ["Washal (disambung)", "Waqaf (berhenti)", "Berada di awal ayat", "Di tengah kalimat"], answer: 1 },
        { type: "mc", q: "Apakah bacaan 'an' pada Fathatain masih dibunyikan pada Mad Iwadh?", options: ["Ya, tetap dibunyikan", "Tidak, diganti menjadi bunyi 'a' panjang", "Diganti bunyi 'u'", "Diganti bunyi 'i'"], answer: 1 },
        { type: "match", q: "Cocokkan konsep Mad Iwadh!", pairs: [{ id: "p1", term: "Arti Iwadh", answer: "Pengganti" }, { id: "p2", term: "Kondisi", answer: "Waqaf (Berhenti)" }, { id: "p3", term: "Harakat Asli", answer: "Fathatain (-ً)" }, { id: "p4", term: "Dibaca Menjadi", answer: "Seperti Mad Thabi'i" }] }
    ],
    "Mad Badal - SUNNESIA": [
        { type: "mc", q: "Apa arti 'Badal' secara bahasa?", options: ["Memanjang", "Mengganti", "Menggabung", "Memisah"], answer: 1 },
        { type: "mc", q: "Apa ciri khas Mad Badal?", options: ["Hamzah bertemu huruf Mad", "Huruf Mad di akhir kata", "Bertemu sukun", "Bertemu tasydid"], answer: 0 },
        { type: "mc", q: "Berapa harakat membaca Mad Badal?", options: ["1 Harakat", "2 Harakat", "4 Harakat", "6 Harakat"], answer: 1 },
        { type: "mc", q: "Manakah contoh bacaan Mad Badal?", options: ["ءَامَنُوْا", "قُرَيْشٍ", "عَلِيمًا", "سَوَآءٌ"], answer: 0 },
        { type: "mc", q: "Kenapa dinamakan Badal?", options: ["Karena huruf mad menggantikan posisi hamzah yang mati", "Karena berada di akhir kata", "Karena mengganti harakat", "Karena mengganti panjang bacaan"], answer: 0 },
        { type: "mc", q: "Posisi Hamzah pada Mad Badal adalah...", options: ["Setelah huruf mad", "Sebelum huruf mad", "Di tengah huruf mad", "Di akhir kalimat"], answer: 1 },
        { type: "mc", q: "Apakah panjang Mad Badal sama dengan Mad Thabi'i?", options: ["Sama, 2 harakat", "Berbeda, lebih panjang", "Berbeda, lebih pendek", "Tergantung posisi di kalimat"], answer: 0 },
        { type: "match", q: "Cocokkan konsep Mad Badal!", pairs: [{ id: "p1", term: "Arti Badal", answer: "Mengganti" }, { id: "p2", term: "Posisi Huruf", answer: "Hamzah di depan Mad" }, { id: "p3", term: "Contoh", answer: "ءَامَنُوْا" }, { id: "p4", term: "Panjang", answer: "2 Harakat" }] }
    ],
    "Mad Shilah - SUNNESIA": [
        { type: "mc", q: "Huruf apa yang menjadi fokus dalam Mad Shilah?", options: ["Ta' Marbuthah", "Ha' Dhamir (Kata Ganti)", "Wawu Mati", "Ya' Mati"], answer: 1 },
        { type: "mc", q: "Ada berapa jenis Mad Shilah?", options: ["1 (Qashirah)", "2 (Qashirah & Thawilah)", "3 jenis", "Tidak ada pembagian"], answer: 1 },
        { type: "mc", q: "Apa perbedaan Shilah Thawilah dengan Qashirah?", options: ["Thawilah bertemu Hamzah", "Qashirah lebih panjang", "Tidak ada bedanya", "Thawilah harus diwaqafkan"], answer: 0 },
        { type: "mc", q: "Berapa panjang bacaan Mad Shilah Qashirah?", options: ["2 Harakat", "4 Harakat", "6 Harakat", "8 Harakat"], answer: 0 },
        { type: "mc", q: "Berapa panjang bacaan Mad Shilah Thawilah?", options: ["2 Harakat", "Boleh 2, 4, 5 Harakat", "Pasti 6 Harakat", "1 Harakat"], answer: 1 },
        { type: "mc", q: "Syarat terjadinya Mad Shilah adalah Ha Dhamir harus...", options: ["Diapit oleh huruf mati", "Diapit oleh huruf hidup (berharakat)", "Berada di awal kalimat", "Berada di akhir ayat"], answer: 1 },
        { type: "mc", q: "Manakah contoh bacaan Mad Shilah Qashirah?", options: ["إِنَّهُ كَانَ", "عِنْدَهُ إِلَّا", "سَوَآءٌ", "ءَامَنُوْا"], answer: 0 },
        { type: "match", q: "Cocokkan konsep Mad Shilah!", pairs: [{ id: "p1", term: "Huruf Utama", answer: "Ha' Dhamir (ـه / ـهِ)" }, { id: "p2", term: "Qashirah", answer: "2 Harakat (Pendek)" }, { id: "p3", term: "Thawilah", answer: "Bertemu Hamzah" }, { id: "p4", term: "Syarat", answer: "Diapit huruf hidup" }] }
    ],
    "Mad 'Arid Lissukun - SUNNESIA": [
        { type: "mc", q: "Apa arti 'Arid Lissukun' secara istilah?", options: ["Panjang karena bertemu hamzah", "Panjang karena huruf mati yang baru (waqaf)", "Panjang karena tasydid", "Panjang karena sukun asli"], answer: 1 },
        { type: "mc", q: "Kapan Mad 'Arid Lissukun terjadi?", options: ["Huruf mad bertemu huruf hidup yang diwaqafkan", "Huruf mad bertemu hamzah", "Huruf mad bertemu tasydid", "Huruf mad di awal surah"], answer: 0 },
        { type: "mc", q: "Berapa panjang bacaan Mad 'Arid Lissukun?", options: ["Wajib 2 harakat", "Wajib 6 harakat", "Boleh 2, 4, atau 6 harakat", "Wajib 4 harakat"], answer: 2 },
        { type: "mc", q: "Mengapa disebut 'Arid (baru)?", options: ["Karena sukun-nya baru muncul akibat waqaf", "Karena huruf mad-nya baru", "Karena hukumnya baru ditemukan", "Karena posisinya di awal kata"], answer: 0 },
        { type: "mc", q: "Mad 'Arid Lissukun hanya berlaku ketika...", options: ["Washal (disambung)", "Waqaf (berhenti)", "Di tengah ayat", "Di awal ayat"], answer: 1 },
        { type: "mc", q: "Jika dibaca washal (tidak berhenti), apa yang terjadi?", options: ["Tetap dibaca panjang 6 harakat", "Berubah menjadi Mad Thabi'i (2 harakat)", "Tidak dibaca sama sekali", "Berubah menjadi Mad Lazim"], answer: 1 },
        { type: "mc", q: "Manakah contoh bacaan Mad 'Arid Lissukun?", options: ["نَسْتَعِيْنُ (saat waqaf)", "سَوَآءٌ", "ءَامَنُوْا", "الضَّآلِّينَ"], answer: 0 },
        { type: "match", q: "Cocokkan konsep Mad 'Arid Lissukun!", pairs: [{ id: "p1", term: "Arti 'Arid", answer: "Baru / Mendadak" }, { id: "p2", term: "Penyebab Sukun", answer: "Waqaf (Berhenti)" }, { id: "p3", term: "Panjang Bacaan", answer: "2, 4, atau 6 Harakat" }, { id: "p4", term: "Jika Washal", answer: "Kembali ke Mad Thabi'i" }] }
    ],
    "Mad Farqi - SUNNESIA": [
        { type: "mc", q: "Apa arti 'Farqi' secara bahasa?", options: ["Pembeda", "Panjang", "Pendek", "Samar"], answer: 0 },
        { type: "mc", q: "Mad Farqi berfungsi untuk membedakan antara...", options: ["Kalimat tanya (istifham) dan kalimat berita (khabar)", "Huruf mati dan huruf hidup", "Mad panjang dan mad pendek", "Bacaan washal dan waqaf"], answer: 0 },
        { type: "mc", q: "Berapa panjang bacaan Mad Farqi?", options: ["2 Harakat", "4 Harakat", "6 Harakat", "8 Harakat"], answer: 2 },
        { type: "mc", q: "Mad Farqi terjadi pada hamzah istifham yang masuk pada...", options: ["Alif lam ta'rif (ال)", "Huruf jarr", "Kata kerja", "Akhir ayat"], answer: 0 },
        { type: "mc", q: "Alif yang dimasuki hamzah istifham pada Mad Farqi dibaca...", options: ["Pendek biasa", "Panjang 6 harakat", "Tidak dibaca", "Dengung"], answer: 1 },
        { type: "mc", q: "Mad Farqi termasuk jenis mad...", options: ["Mad Thabi'i", "Mad Far'i (cabang)", "Mad Asli", "Mad Silah"], answer: 1 },
        { type: "mc", q: "Manakah contoh bacaan Mad Farqi?", options: ["ءَآلذَّكَرَيْنِ", "نُوْحِيْهَا", "سَوَآءٌ", "عَلِيمًا"], answer: 0 },
        { type: "match", q: "Cocokkan konsep Mad Farqi!", pairs: [{ id: "p1", term: "Arti Farqi", answer: "Pembeda" }, { id: "p2", term: "Fungsi", answer: "Membedakan Istifham & Khabar" }, { id: "p3", term: "Panjang", answer: "6 Harakat" }, { id: "p4", term: "Masuk Pada", answer: "Alif Lam Ta'rif (ال)" }] }
    ],
    "Mad Tamkin - SUNNESIA": [
        { type: "mc", q: "Apa arti 'Tamkin' secara bahasa?", options: ["Penguatan/Pemantapan", "Pelemahan", "Pemanjangan", "Pemendekan"], answer: 0 },
        { type: "mc", q: "Kapan Mad Tamkin terjadi?", options: ["Dua huruf Ya' bertemu, yang pertama bertasydid berkasrah dan yang kedua sukun", "Huruf mad bertemu hamzah", "Huruf mad bertemu sukun", "Huruf mad di akhir ayat"], answer: 0 },
        { type: "mc", q: "Berapa panjang bacaan Mad Tamkin?", options: ["2 Harakat", "4 Harakat", "6 Harakat", "1 Harakat"], answer: 0 },
        { type: "mc", q: "Tujuan Mad Tamkin adalah untuk...", options: ["Memantapkan/memperjelas bacaan agar tidak terjadi idgham", "Memperpanjang bacaan", "Menghilangkan tasydid", "Membedakan istifham dan khabar"], answer: 0 },
        { type: "mc", q: "Manakah contoh bacaan Mad Tamkin?", options: ["حُيِّيْتُمْ", "نُوْحِيْهَا", "سَوَآءٌ", "ءَامَنُوْا"], answer: 0 },
        { type: "mc", q: "Mad Tamkin termasuk kategori mad...", options: ["Mad Thabi'i", "Mad Far'i (cabang)", "Mad Lazim", "Mad Wajib"], answer: 1 },
        { type: "mc", q: "Apa yang terjadi jika Mad Tamkin tidak dibaca dengan benar?", options: ["Bacaan menjadi idgham (melebur) padahal seharusnya tidak", "Bacaan menjadi lebih panjang", "Tidak ada pengaruh", "Bacaan menjadi dengung"], answer: 0 },
        { type: "match", q: "Cocokkan konsep Mad Tamkin!", pairs: [{ id: "p1", term: "Arti Tamkin", answer: "Penguatan/Pemantapan" }, { id: "p2", term: "Huruf", answer: "Ya' Tasydid + Ya' Sukun" }, { id: "p3", term: "Panjang", answer: "2 Harakat" }, { id: "p4", term: "Tujuan", answer: "Mencegah Idgham" }] }
    ],
    "default": [
        { type: "mc", q: "Siapkah Anda memulai kuis?", options: ["Siap!", "Tentu", "Pasti", "Ayo"], answer: 0 }
    ]
};

let currentQuestion = 0;
let score = 0;
let maxPossibleScore = 0;
let quizActive = false;

// Variables for Matching Game
let matchPairsTotal = 0;
let matchPairsFound = 0;
let selectedTerm = null;
let selectedAnswer = null;

function startQuiz() {
    if (!document.getElementById('kahootModal')) {
        const quizHTML = `
        <div id="kahootModal" class="quiz-modal">
            <div class="quiz-header">
                <span id="quizScore">Skor: 0</span>
                <span id="quizCounter">Soal 1/5</span>
            </div>
            <div class="quiz-body" id="quizBody">
                <!-- Content injected dynamically -->
            </div>
            <div id="quizFeedback" class="quiz-feedback">✅</div>
        </div>
        `;
        document.body.insertAdjacentHTML('beforeend', quizHTML);
    }

    const activeQuiz = quizzes[document.title] || quizzes["default"];
    maxPossibleScore = 0;
    activeQuiz.forEach(q => {
        if (q.type === 'mc') maxPossibleScore += 20;
        else if (q.type === 'match') maxPossibleScore += (q.pairs.length * 10);
    });

    currentQuestion = 0;
    score = 0;
    quizActive = true;
    document.getElementById('kahootModal').classList.add('active');
    document.getElementById('quizScore').textContent = `Skor: 0`;
    loadQuestion();
}

function loadQuestion() {
    const activeQuiz = quizzes[document.title] || quizzes["default"];
    if (currentQuestion >= activeQuiz.length) {
        showResults();
        return;
    }

    const qData = activeQuiz[currentQuestion];
    document.getElementById('quizCounter').textContent = `Bagian ${currentQuestion + 1}/${activeQuiz.length}`;
    
    let displayScore = maxPossibleScore > 0 ? Math.max(0, Math.round((score / maxPossibleScore) * 100)) : 0;
    document.getElementById('quizScore').textContent = `Skor: ${displayScore}`;

    const body = document.getElementById('quizBody');

    if (qData.type === "mc") {
        body.innerHTML = `
            <div class="quiz-question" id="quizQuestion">${qData.q}</div>
            <div class="quiz-options">
                <button class="quiz-btn color-1" onclick="checkAnswer(0)">${qData.options[0]}</button>
                <button class="quiz-btn color-2" onclick="checkAnswer(1)">${qData.options[1]}</button>
                <button class="quiz-btn color-3" onclick="checkAnswer(2)">${qData.options[2]}</button>
                <button class="quiz-btn color-4" onclick="checkAnswer(3)">${qData.options[3]}</button>
            </div>
        `;
        quizActive = true;
    } else if (qData.type === "match") {
        matchPairsTotal = qData.pairs.length;
        matchPairsFound = 0;
        selectedTerm = null;
        selectedAnswer = null;

        // Shuffle terms and answers
        let terms = [...qData.pairs].sort(() => Math.random() - 0.5);
        let answers = [...qData.pairs].sort(() => Math.random() - 0.5);

        let termsHTML = terms.map(p => `<div class="match-card term-card" onclick="selectCard('term', '${p.id}', this)">${p.term}</div>`).join('');
        let answersHTML = answers.map(p => `<div class="match-card answer-card" onclick="selectCard('answer', '${p.id}', this)">${p.answer}</div>`).join('');

        body.innerHTML = `
            <div class="quiz-question" style="margin-bottom: 30px; font-size: 2rem;">🧩 ${qData.q}</div>
            <div class="match-board">
                <div class="match-column">${termsHTML}</div>
                <div class="match-column">${answersHTML}</div>
            </div>
        `;
    }
}

function checkAnswer(selectedIndex) {
    if (!quizActive) return;
    quizActive = false;

    const activeQuiz = quizzes[document.title] || quizzes["default"];
    const qData = activeQuiz[currentQuestion];
    const isCorrect = selectedIndex === qData.answer;

    showFeedback(isCorrect);

    if (isCorrect) score += 20;
    else score = Math.max(0, score - 5); // Penalti salah di MC

    let displayScore = maxPossibleScore > 0 ? Math.max(0, Math.round((score / maxPossibleScore) * 100)) : 0;
    document.getElementById('quizScore').textContent = `Skor: ${displayScore}`;

    setTimeout(() => {
        document.getElementById('quizFeedback').classList.remove('show');
        currentQuestion++;
        loadQuestion();
    }, 1200);
}

function selectCard(type, id, el) {
    if (el.classList.contains('matched')) return;

    if (type === 'term') {
        document.querySelectorAll('.term-card').forEach(c => c.classList.remove('selected'));
        el.classList.add('selected');
        selectedTerm = { id, el };
    } else {
        document.querySelectorAll('.answer-card').forEach(c => c.classList.remove('selected'));
        el.classList.add('selected');
        selectedAnswer = { id, el };
    }

    if (selectedTerm && selectedAnswer) {
        checkMatch();
    }
}

function checkMatch() {
    const isMatch = selectedTerm.id === selectedAnswer.id;
    const tEl = selectedTerm.el;
    const aEl = selectedAnswer.el;

    selectedTerm = null;
    selectedAnswer = null;

    if (isMatch) {
        tEl.classList.remove('selected'); tEl.classList.add('matched');
        aEl.classList.remove('selected'); aEl.classList.add('matched');
        score += 10;
        let displayScore = maxPossibleScore > 0 ? Math.max(0, Math.round((score / maxPossibleScore) * 100)) : 0;
        document.getElementById('quizScore').textContent = `Skor: ${displayScore}`;
        showFeedback(true);

        matchPairsFound++;
        if (matchPairsFound >= matchPairsTotal) {
            setTimeout(() => {
                document.getElementById('quizFeedback').classList.remove('show');
                currentQuestion++;
                loadQuestion();
            }, 1200);
        } else {
            setTimeout(() => { document.getElementById('quizFeedback').classList.remove('show'); }, 800);
        }
    } else {
        tEl.classList.add('error'); aEl.classList.add('error');
        score = Math.max(0, score - 5); // Penalti salah pasangan
        let displayScore = maxPossibleScore > 0 ? Math.max(0, Math.round((score / maxPossibleScore) * 100)) : 0;
        document.getElementById('quizScore').textContent = `Skor: ${displayScore}`;
        showFeedback(false);

        setTimeout(() => {
            tEl.classList.remove('selected', 'error');
            aEl.classList.remove('selected', 'error');
            document.getElementById('quizFeedback').classList.remove('show');
        }, 800);
    }
}

function showFeedback(isCorrect) {
    const fb = document.getElementById('quizFeedback');
    fb.textContent = isCorrect ? '✅' : '❌';
    fb.classList.add('show');
}

let currentReportData = null;

function sendWaReport() {
    if (!currentReportData) return;
    
    let rawNum = document.getElementById('targetWaNumber').value.trim();
    if (!rawNum) {
        alert('Silakan masukkan nomor WhatsApp penerima terlebih dahulu.');
        return;
    }
    
    // Clean number: remove all non-digits
    let cleanedNum = rawNum.replace(/\D/g, '');
    
    // Convert 08... to 628...
    if (cleanedNum.startsWith('0')) {
        cleanedNum = '62' + cleanedNum.substring(1);
    }
    
    if (cleanedNum.length < 9) {
        alert('Nomor WhatsApp tidak valid. Silakan periksa kembali.');
        return;
    }
    
    // Save to localStorage so they don't have to re-enter
    localStorage.setItem('lastWaNumber', rawNum);
    
    // Create WhatsApp message link
    const encodedMsg = encodeURIComponent(currentReportData.message);
    const waUrl = `https://api.whatsapp.com/send?phone=${cleanedNum}&text=${encodedMsg}`;
    window.open(waUrl, '_blank');
}

function sendEmailReport() {
    if (!currentReportData) return;
    
    let email = document.getElementById('targetEmailAddress').value.trim();
    if (!email) {
        alert('Silakan masukkan alamat email penerima terlebih dahulu.');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Format email tidak valid. Silakan periksa kembali.');
        return;
    }
    
    // Save to localStorage
    localStorage.setItem('lastEmailAddress', email);
    
    // Create/inject the modal if it doesn't exist
    if (!document.getElementById('emailOptionModal')) {
        const modalHTML = `
        <div id="emailOptionModal" class="modal-overlay" style="z-index: 11000;">
            <div class="modal-content" style="max-width: 420px; text-align: center; border-radius: 24px; padding: 35px 30px; box-shadow: 0 20px 40px rgba(0,0,0,0.15); position: relative;">
                <span class="close-modal" onclick="closeEmailOptionModal()">&times;</span>
                <h3 class="modal-title" style="font-size: 1.6rem; color: var(--text-main); margin-bottom: 8px; display: flex; align-items: center; justify-content: center; gap: 10px; font-weight: 800;">
                    ✉️ Laporan via Email
                </h3>
                <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 24px; line-height: 1.5;">Pilih cara pengiriman email yang paling sesuai untuk perangkat Anda:</p>
                
                <div style="display: flex; flex-direction: column; gap: 14px;">
                    <!-- Option 1: Gmail Web -->
                    <button onclick="sendEmailViaGmail()" class="email-opt-btn" style="display: flex; align-items: center; gap: 14px; width: 100%; padding: 14px 18px; border: 2px solid #e2e8f0; border-radius: 16px; background: var(--white); font-size: 1rem; font-weight: 600; color: var(--text-main); cursor: pointer; text-align: left; transition: all 0.25s ease;">
                        <span style="font-size: 1.8rem; background: rgba(239, 68, 68, 0.1); width: 45px; height: 45px; display: flex; align-items: center; justify-content: center; border-radius: 12px; flex-shrink: 0;">🌐</span>
                        <div style="flex: 1;">
                            <div style="font-weight: 700; font-size: 1.05rem; margin-bottom: 2px;">Gmail Web (Browser)</div>
                            <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 400; line-height: 1.3;">Membuka Gmail di tab browser baru (Rekomendasi)</div>
                        </div>
                    </button>

                    <!-- Option 2: Default Mail App -->
                    <button onclick="sendEmailViaMailto()" class="email-opt-btn" style="display: flex; align-items: center; gap: 14px; width: 100%; padding: 14px 18px; border: 2px solid #e2e8f0; border-radius: 16px; background: var(--white); font-size: 1rem; font-weight: 600; color: var(--text-main); cursor: pointer; text-align: left; transition: all 0.25s ease;">
                        <span style="font-size: 1.8rem; background: rgba(59, 130, 246, 0.1); width: 45px; height: 45px; display: flex; align-items: center; justify-content: center; border-radius: 12px; flex-shrink: 0;">💻</span>
                        <div style="flex: 1;">
                            <div style="font-weight: 700; font-size: 1.05rem; margin-bottom: 2px;">Aplikasi Email Default</div>
                            <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 400; line-height: 1.3;">Membuka Outlook, Mail App, dll. di perangkat</div>
                        </div>
                    </button>

                    <!-- Option 3: Copy Report Text -->
                    <button onclick="copyEmailReportText()" class="email-opt-btn" style="display: flex; align-items: center; gap: 14px; width: 100%; padding: 14px 18px; border: 2px solid #e2e8f0; border-radius: 16px; background: var(--white); font-size: 1rem; font-weight: 600; color: var(--text-main); cursor: pointer; text-align: left; transition: all 0.25s ease;">
                        <span style="font-size: 1.8rem; background: rgba(16, 185, 129, 0.1); width: 45px; height: 45px; display: flex; align-items: center; justify-content: center; border-radius: 12px; flex-shrink: 0;">📋</span>
                        <div style="flex: 1;">
                            <div style="font-weight: 700; font-size: 1.05rem; margin-bottom: 2px;">Salin Teks Laporan</div>
                            <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 400; line-height: 1.3;">Menyalin isi laporan ke clipboard perangkat Anda</div>
                        </div>
                    </button>
                </div>
                <div id="copySuccessMsg" style="margin-top: 20px; color: #10b981; font-weight: 700; font-size: 0.95rem; display: none; transition: 0.3s; padding: 10px; background-color: rgba(16, 185, 129, 0.08); border-radius: 12px; border: 1px solid rgba(16, 185, 129, 0.2);">
                    ✓ Laporan berhasil disalin ke clipboard!
                </div>
            </div>
            <style>
                .email-opt-btn {
                    border: 2px solid rgba(0, 0, 0, 0.08) !important;
                }
                .email-opt-btn:hover {
                    background-color: rgba(20, 184, 166, 0.05) !important;
                    border-color: var(--primary-color) !important;
                    transform: translateY(-2px);
                }
                .email-opt-btn:active {
                    transform: translateY(0);
                }
                [data-theme="dark"] .email-opt-btn {
                    border-color: rgba(255, 255, 255, 0.1) !important;
                }
                [data-theme="dark"] .email-opt-btn:hover {
                    background: rgba(20, 184, 166, 0.1) !important;
                    border-color: var(--primary-light) !important;
                }
            </style>
        </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
    
    // Show the modal
    document.getElementById('emailOptionModal').classList.add('active');
}

function closeEmailOptionModal() {
    const modal = document.getElementById('emailOptionModal');
    if (modal) {
        modal.classList.remove('active');
        const copyMsg = document.getElementById('copySuccessMsg');
        if (copyMsg) copyMsg.style.display = 'none';
    }
}

function sendEmailViaGmail() {
    if (!currentReportData) return;
    const email = localStorage.getItem('lastEmailAddress') || '';
    const subject = encodeURIComponent(`Laporan Kuis Tahsin SUNNESIA - ${currentReportData.studentName}`);
    let plainMsg = currentReportData.message;
    plainMsg = plainMsg.replace(/\*/g, ''); // Hapus tanda bintang markdown agar bersih di email
    const body = encodeURIComponent(plainMsg);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
    closeEmailOptionModal();
}

function sendEmailViaMailto() {
    if (!currentReportData) return;
    const email = localStorage.getItem('lastEmailAddress') || '';
    const subject = encodeURIComponent(`Laporan Kuis Tahsin SUNNESIA - ${currentReportData.studentName}`);
    let plainMsg = currentReportData.message;
    plainMsg = plainMsg.replace(/\*/g, ''); // Hapus tanda bintang markdown
    const body = encodeURIComponent(plainMsg);
    const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;
    
    const a = document.createElement('a');
    a.href = mailtoUrl;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
    }, 100);
    closeEmailOptionModal();
}

function copyEmailReportText() {
    if (!currentReportData) return;
    const plainMsg = currentReportData.message;
    
    navigator.clipboard.writeText(plainMsg).then(() => {
        const copyMsg = document.getElementById('copySuccessMsg');
        if (copyMsg) {
            copyMsg.style.display = 'block';
            setTimeout(() => {
                copyMsg.style.display = 'none';
            }, 3000);
        }
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        alert('Gagal menyalin teks. Silakan salin secara manual.');
    });
}

function showResults() {
    const body = document.getElementById('quizBody');
    let finalScore100 = maxPossibleScore > 0 ? Math.max(0, Math.round((score / maxPossibleScore) * 100)) : 0;
    const studentName = localStorage.getItem('displayName') || "Siswa SUNNESIA";
    const topic = document.title.replace(' - SUNNESIA', '');
    
    let badgeMsg = finalScore100 === 100 ? `<p style="color: #f59e0b; font-weight: bold; font-size: 1.5rem; margin-top: 15px;">🌟 Sempurna! Lencana Emas Didapatkan! 🌟</p>` : `<p style="color: #ef4444; margin-top: 15px;">Coba lagi untuk mendapatkan 100 tanpa salah!</p>`;

    // Generate reporting links
    const reportMessage = `*LAPORAN HASIL KUIS TAHSIN - SUNNESIA*\n\n` +
                          `👤 *Nama Siswa:* ${studentName}\n` +
                          `📖 *Materi Kuis:* ${topic}\n` +
                          `🏆 *Skor Kuis:* ${finalScore100}/100\n` +
                          `📅 *Tanggal:* ${new Date().toLocaleString('id-ID')}\n` +
                          `✨ *Status:* ${finalScore100 === 100 ? 'Lulus Sempurna (100/100)' : 'Sudah Menyelesaikan Kuis'}\n\n` +
                          `Sunnesia - Belajar Tahsin Lebih Menyenangkan.`;

    currentReportData = {
        studentName: studentName,
        message: reportMessage
    };

    body.innerHTML = `
        <div class="quiz-result">
            <h2>Kuis Selesai! 🎉</h2>
            <p style="font-size: 1.2rem; color: #666; margin-bottom: 10px;">Skor Akhir Kamu:</p>
            <div class="final-score">${finalScore100}</div>
            ${badgeMsg}
            
            <div class="report-section" style="margin-top: 25px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
                <p style="font-size: 1rem; color: #4b5563; margin-bottom: 15px; font-weight: 600;">📢 Kirim Laporan Nilai:</p>
                <div style="margin-bottom: 15px; text-align: left; max-width: 350px; margin-left: auto; margin-right: auto; display: flex; flex-direction: column; gap: 10px;">
                    <div>
                        <label style="display: block; font-size: 0.9rem; font-weight: 500; color: #4b5563; margin-bottom: 5px; text-align: left;">No. WhatsApp Penerima (Guru / Ortu):</label>
                        <input type="tel" id="targetWaNumber" class="form-input" style="padding: 10px 14px; font-size: 0.95rem; border-radius: 10px; width: 100%; border: 1px solid #d1d5db;" placeholder="Contoh: 08123456789">
                    </div>
                    <div>
                        <label style="display: block; font-size: 0.9rem; font-weight: 500; color: #4b5563; margin-bottom: 5px; text-align: left;">Email Penerima (Guru / Ortu):</label>
                        <input type="email" id="targetEmailAddress" class="form-input" style="padding: 10px 14px; font-size: 0.95rem; border-radius: 10px; width: 100%; border: 1px solid #d1d5db;" placeholder="Contoh: guru@sekolah.com">
                    </div>
                </div>
                <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                    <button onclick="sendWaReport()" class="btn btn-wa" style="border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; padding: 12px 20px; font-size: 1rem; font-weight: bold; border-radius: 50px; background-color: #25d366; color: white; transition: 0.3s; box-shadow: 0 4px 10px rgba(37, 211, 102, 0.3);">
                        💬 Kirim via WhatsApp
                    </button>
                    <button onclick="sendEmailReport()" class="btn btn-mail" style="border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; padding: 12px 20px; font-size: 1rem; font-weight: bold; border-radius: 50px; background-color: #ef4444; color: white; transition: 0.3s; box-shadow: 0 4px 10px rgba(239, 68, 68, 0.3);">
                        ✉️ Kirim via Email
                    </button>
                </div>
            </div>
            
            <br>
            <button class="btn btn-primary" style="padding: 15px 40px; font-size: 1.2rem; margin-top: 20px;" onclick="closeQuiz()">Selesai & Kembali</button>
        </div>
    `;

    // Populate inputs with last stored values
    const savedWa = localStorage.getItem('lastWaNumber') || TEACHER_CONFIG.whatsappNumber || '';
    const savedEmail = localStorage.getItem('lastEmailAddress') || TEACHER_CONFIG.emailAddress || '';
    document.getElementById('targetWaNumber').value = savedWa;
    document.getElementById('targetEmailAddress').value = savedEmail;

    // Simpan skor 100 ke localStorage untuk badge
    if (finalScore100 === 100) {
        localStorage.setItem('badge_' + document.title, 'true');
    }

    // Simpan skor tertinggi ke localStorage untuk progres kuis
    if (localStorage.getItem('isLoggedIn') === 'true') {
        const currentHigh = parseInt(localStorage.getItem('quiz_score_' + document.title) || '0', 10);
        if (finalScore100 > currentHigh) {
            localStorage.setItem('quiz_score_' + document.title, finalScore100);
        }
    }

    // Silent logging to Google Form if configured
    silentLogToGoogleSheets(studentName, topic, finalScore100);
}

// --- 12. SILENT LOGGING TO GOOGLE SHEETS ---
function silentLogToGoogleSheets(studentName, topic, finalScore100) {
    if (!TEACHER_CONFIG.googleFormUrl) return;

    const formData = new FormData();
    formData.append(TEACHER_CONFIG.googleFormEntryName, studentName);
    formData.append(TEACHER_CONFIG.googleFormEntryTopic, topic);
    formData.append(TEACHER_CONFIG.googleFormEntryScore, finalScore100.toString());

    fetch(TEACHER_CONFIG.googleFormUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
    }).then(() => {
        console.log('Score logged to Google Sheets silently.');
    }).catch(err => {
        console.error('Failed silent logging to Google Sheets:', err);
    });
}

function closeQuiz() {
    document.getElementById('kahootModal').classList.remove('active');
    // Jika mereka dapat 100, langsung refresh fungsi badge di halaman
    renderBadge();
}

// --- LOGIKA MENAMPILKAN BADGE DI HALAMAN UTAMA ---
function renderBadge() {
    // Lencana HANYA muncul jika pengguna sudah Login
    if (localStorage.getItem('isLoggedIn') !== 'true') return;

    if (localStorage.getItem('badge_' + document.title) === 'true') {
        const quizContainer = document.querySelector('#quiz .step-content');
        if (quizContainer && !document.getElementById('perfectBadge')) {
            quizContainer.insertAdjacentHTML('afterbegin', '<div id="perfectBadge" class="badge-perfect-main">🌟 Lulus Kuis Sempurna (100/100) 🌟</div><br><br>');
        }
    }
}

// Jalankan saat halaman dimuat
function initPage() {
    checkLoginState();
    renderBadge();
    updateGlobalBadgeDisplay();
    updateProgressDashboard();
    trackVisit();
    setupMobileSidebar();
    setupMobileBackButton();
    initFooterRating();
}

function trackVisit() {
    if (localStorage.getItem('isLoggedIn') !== 'true') return;
    const title = document.title;
    if (title.includes('Mad')) {
        localStorage.setItem('visited_' + title, 'true');
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}

// --- 6. FEATURE CARD INTERACTION ANIMATIONS ---
function triggerFeatureAnimation(type, card, event) {
    // Create container for particles if not exists
    let particleContainer = card.querySelector('.animation-container');
    if (!particleContainer) {
        particleContainer = document.createElement('div');
        particleContainer.className = 'animation-container';
        particleContainer.style.position = 'absolute';
        particleContainer.style.top = '0';
        particleContainer.style.left = '0';
        particleContainer.style.width = '100%';
        particleContainer.style.height = '100%';
        particleContainer.style.pointerEvents = 'none';
        particleContainer.style.zIndex = '100';
        card.appendChild(particleContainer);
    }

    // Ambil koordinat klik relatif terhadap kartu
    const rect = card.getBoundingClientRect();
    let spawnX, spawnY;

    if (event) {
        spawnX = event.clientX - rect.left;
        spawnY = event.clientY - rect.top;
    } else {
        spawnX = rect.width / 2;
        spawnY = rect.height / 2;
    }

    if (type === 'paper') {
        for (let i = 0; i < 15; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.width = Math.random() * 10 + 5 + 'px';
            p.style.height = Math.random() * 10 + 8 + 'px';
            p.style.backgroundColor = ['#fff', '#f1f5f9', '#e2e8f0'][Math.floor(Math.random() * 3)];
            p.style.border = '1px solid rgba(0,0,0,0.1)';
            p.style.left = spawnX + 'px';
            p.style.top = spawnY + 'px';
            p.style.setProperty('--tx', `${(Math.random() - 0.5) * 300}px`);
            p.style.setProperty('--ty', `${(Math.random() - 0.5) * 300}px`);
            p.style.setProperty('--tr', `${Math.random() * 1080}deg`);
            p.style.animation = `fly-paper ${0.6 + Math.random() * 0.6}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
            particleContainer.appendChild(p);
            setTimeout(() => p.remove(), 1200);
        }
    } else if (type === 'star') {
        for (let i = 0; i < 15; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.innerHTML = ['⭐', '✨', '🌟'][Math.floor(Math.random() * 3)];
            p.style.fontSize = Math.random() * 15 + 15 + 'px';
            p.style.left = spawnX + 'px';
            p.style.top = spawnY + 'px';
            p.style.setProperty('--tx', `${(Math.random() - 0.5) * 350}px`);
            p.style.setProperty('--ty', `${(Math.random() - 0.5) * 350}px`);
            p.style.animation = `burst-star ${0.7 + Math.random() * 0.5}s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards`;
            particleContainer.appendChild(p);
            setTimeout(() => p.remove(), 1200);
        }
    } else if (type === 'game') {
        for (let i = 0; i < 15; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.innerHTML = ['🎮', '🕹️', '👾', '🎯', '✨'][Math.floor(Math.random() * 5)];
            p.style.fontSize = Math.random() * 15 + 15 + 'px';
            p.style.left = spawnX + 'px';
            p.style.top = spawnY + 'px';
            p.style.setProperty('--tx', `${(Math.random() - 0.5) * 350}px`);
            p.style.setProperty('--ty', `${(Math.random() - 0.5) * 350}px`);
            p.style.animation = `burst-star ${0.7 + Math.random() * 0.5}s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards`;
            particleContainer.appendChild(p);
            setTimeout(() => p.remove(), 1200);
        }
    }
}



// --- 7. BADGE SYNCHRONIZATION ---
function updateGlobalBadgeDisplay() {
    const display = document.getElementById('globalBadgeDisplay');
    if (!display) return;

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const badges = display.querySelectorAll('.badge-item');
    badges.forEach(badge => {
        if (!isLoggedIn) {
            badge.classList.add('locked');
            return;
        }
        const title = badge.getAttribute('data-id');

        // Check for various potential keys in localStorage
        const keys = [
            'badge_' + title,
            'badge_' + title + ' - SUNNESIA',
            'badge_' + title.replace("'", "&#39;")
        ];

        const isEarned = keys.some(key => localStorage.getItem(key) === 'true');

        if (isEarned) {
            badge.classList.remove('locked');
        }
    });
}

// --- 7a. UPDATE PROGRESS DASHBOARD ---
function updateProgressDashboard() {
    const dashboard = document.getElementById('progressDashboard');
    if (!dashboard) return;

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const items = dashboard.querySelectorAll('.progress-item');
    
    items.forEach(item => {
        if (!isLoggedIn) {
            const percentText = item.querySelector('.progress-percent');
            const barFill = item.querySelector('.progress-bar-fill');
            if (percentText) percentText.textContent = '0%';
            if (barFill) barFill.style.width = '0%';
            return;
        }

        const topic = item.getAttribute('data-topic'); // e.g. "Mad Thabi'i"
        
        // Cek apakah video sudah diputar atau halaman dikunjungi
        const visitedKey1 = 'visited_' + topic;
        const visitedKey2 = 'visited_' + topic + ' - SUNNESIA';
        const videoKey1 = 'video_' + topic;
        const videoKey2 = 'video_' + topic + ' - SUNNESIA';

        const isVisited = localStorage.getItem(visitedKey1) === 'true' || 
                          localStorage.getItem(visitedKey2) === 'true' ||
                          localStorage.getItem(videoKey1) === 'true' ||
                          localStorage.getItem(videoKey2) === 'true';

        // Cek skor tertinggi kuis
        const scoreKey1 = 'quiz_score_' + topic;
        const scoreKey2 = 'quiz_score_' + topic + ' - SUNNESIA';
        
        let quizScore = 0;
        const savedScore1 = localStorage.getItem(scoreKey1);
        const savedScore2 = localStorage.getItem(scoreKey2);
        
        if (savedScore1 !== null) {
            quizScore = Math.max(quizScore, parseInt(savedScore1, 10) || 0);
        }
        if (savedScore2 !== null) {
            quizScore = Math.max(quizScore, parseInt(savedScore2, 10) || 0);
        }

        // Jika mereka mendapat badge, berarti skor kuis adalah 100
        const badgeKey1 = 'badge_' + topic;
        const badgeKey2 = 'badge_' + topic + ' - SUNNESIA';
        if (localStorage.getItem(badgeKey1) === 'true' || localStorage.getItem(badgeKey2) === 'true') {
            quizScore = 100;
        }

        // Hitung persentase progres:
        // Video/Visit = 50%
        // Skor Kuis = proporsional sampai 50% (skor * 0.5)
        let videoProgress = isVisited ? 50 : 0;
        let quizProgress = Math.round(quizScore * 0.5);
        let totalProgress = videoProgress + quizProgress;

        const percentText = item.querySelector('.progress-percent');
        const barFill = item.querySelector('.progress-bar-fill');
        if (percentText) percentText.textContent = totalProgress + '%';
        if (barFill) barFill.style.width = totalProgress + '%';
    });
}

// --- 7b. DYNAMIC MOBILE SIDEBAR COLLAPSIBLE ---
function setupMobileSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    const title = sidebar.querySelector('h3');
    if (!title) return;

    let caret = title.querySelector('.sidebar-caret');
    if (!caret) {
        title.style.cursor = 'pointer';
        title.style.display = 'flex';
        title.style.justifyContent = 'space-between';
        title.style.alignItems = 'center';

        caret = document.createElement('span');
        caret.className = 'sidebar-caret';
        caret.textContent = '▼';
        caret.style.transition = 'transform 0.3s';
        title.appendChild(caret);
        
        const list = sidebar.querySelector('ul');
        if (list) {
            title.addEventListener('click', () => {
                if (window.innerWidth <= 992) {
                    const isCollapsed = list.style.display === 'none' || list.style.display === '';
                    list.style.display = isCollapsed ? 'block' : 'none';
                    caret.style.transform = isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)';
                }
            });
        }
    }

    const list = sidebar.querySelector('ul');
    if (list) {
        if (window.innerWidth > 992) {
            list.style.display = 'block';
            caret.style.display = 'none';
        } else {
            list.style.display = 'none';
            caret.style.display = 'inline-block';
            caret.style.transform = 'rotate(0deg)';
        }
    }
}

// --- 13. DYNAMIC BACK BUTTON TEXT ON MOBILE ---
function setupMobileBackButton() {
    const btnBack = document.querySelector('.btn-back');
    if (btnBack) {
        btnBack.innerHTML = '<span style="margin-right: 6px; font-size: 1.2rem;">←</span><span class="back-text">Beranda</span>';
    }
}

// Event listener untuk perubahan ukuran layar (sidebar)
window.addEventListener('resize', setupMobileSidebar);

// --- 8. PENCAPAIAN SLIDER SWITCHER ---
function switchPencapaian(type, btn) {
    const slider = document.getElementById('pencapaianSlider');
    if (!slider) return;

    // Update active tab styling
    const tabs = document.querySelectorAll('.pencapaian-tabs .tab-btn');
    tabs.forEach(t => t.classList.remove('active'));
    btn.classList.add('active');

    // Slide transition
    if (type === 'badge') {
        slider.style.transform = 'translateX(0%)';
    } else if (type === 'progress') {
        slider.style.transform = 'translateX(-33.3333%)';
    } else if (type === 'game') {
        slider.style.transform = 'translateX(-66.6666%)';
    }
}
// --- 9. REGISTER SERVICE WORKER (PWA) ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then(reg => {
            console.log('Service Worker terdaftar:', reg.scope);
        }).catch(err => {
            console.log('Pendaftaran Service Worker gagal:', err);
        });
    });
}

// --- 10. PWA INSTALL BUTTON ---
let deferredPrompt;

// Sembunyikan tombol jika aplikasi sudah terinstal (dibuka via shortcut)
if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
    document.querySelectorAll('.installAppBtn').forEach(btn => btn.style.display = 'none');
}

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

document.addEventListener('click', async (e) => {
    if (e.target && e.target.classList.contains('installAppBtn')) {
        e.preventDefault();
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            deferredPrompt = null;
            document.querySelectorAll('.installAppBtn').forEach(btn => btn.style.display = 'none');
        } else {
            alert('Aplikasi sedang disiapkan, perangkat tidak mendukung, atau sudah terinstal. Tunggu sebentar dan coba lagi!');
        }
    }
});

// Scroll to top on page load to prevent scroll restoration issues
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.addEventListener('load', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Scroll Reveal Animation via IntersectionObserver
document.addEventListener('DOMContentLoaded', () => {
    // Add reveal classes dynamically to elements we want to animate
    document.querySelectorAll('.card, .section-title, .progress-item, .team-member, .feature-box, .tab-btn').forEach(el => {
        el.classList.add('reveal');
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });
});

// --- 11. VIDEO MODAL UTILITY ---
function openVideoModal(url) {
    if (!url) {
        alert('Video pembelajaran belum tersedia untuk materi ini.');
        return;
    }
    
    // Simpan status bahwa video telah diputar untuk progres
    if (localStorage.getItem('isLoggedIn') === 'true') {
        localStorage.setItem('video_' + document.title, 'true');
        updateProgressDashboard();
    }
    
    // Create modal element if it doesn't exist
    let modal = document.getElementById('videoModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'videoModal';
        modal.className = 'video-modal';
        modal.innerHTML = `
            <div class="video-modal-backdrop" onclick="closeVideoModal()"></div>
            <div class="video-modal-content">
                <button class="video-modal-close" onclick="closeVideoModal()">&times;</button>
                <div class="video-modal-body">
                    <iframe id="videoModalFrame" src="" frameborder="0" allowfullscreen allow="autoplay; encrypted-media"></iframe>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    const frame = document.getElementById('videoModalFrame');
    // Force autoplay if possible
    let autoplayUrl = url;
    if (autoplayUrl.includes('?')) {
        if (!autoplayUrl.includes('autoplay=1')) {
            autoplayUrl += '&autoplay=1';
        }
    } else {
        autoplayUrl += '?autoplay=1';
    }
    frame.src = autoplayUrl;
    
    // Add active class to animate
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Disable scroll on background
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    if (modal) {
        modal.classList.remove('active');
        const frame = document.getElementById('videoModalFrame');
        if (frame) {
            frame.src = ''; // Clear source to stop playback
        }
        document.body.style.overflow = ''; // Enable scroll again
    }
}


// --- LANDSCAPE ORIENTATION OVERLAY ---
(function() {
    const overlay = document.getElementById('landscapeOverlay');
    const dismissBtn = document.getElementById('dismissLandscape');
    
    if (!overlay || !dismissBtn) return;
    
    // Check if already dismissed this session
    if (sessionStorage.getItem('landscapeDismissed') === 'true') {
        overlay.classList.add('dismissed');
        return;
    }
    
    // Dismiss button handler
    dismissBtn.addEventListener('click', function() {
        overlay.classList.add('dismissed');
        sessionStorage.setItem('landscapeDismissed', 'true');
    });
    
    // Auto-hide when orientation changes to landscape
    function checkOrientation() {
        if (window.innerWidth > window.innerHeight || window.innerWidth > 768) {
            overlay.style.display = 'none';
        } else if (!overlay.classList.contains('dismissed')) {
            overlay.style.display = 'flex';
            overlay.style.opacity = '1';
        }
    }
    
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', function() {
        setTimeout(checkOrientation, 100);
    });
})();


// --- DARK/LIGHT MODE TOGGLE ---
(function() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;
    
    // Check for saved preference or system preference
    function getPreferredTheme() {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;
        
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }
    
    // Apply theme
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
    
    // Initialize theme
    const currentTheme = getPreferredTheme();
    applyTheme(currentTheme);
    
    // Toggle handler
    toggle.addEventListener('click', function() {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });
    
    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            if (!localStorage.getItem('theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
})();

// --- FOOTER RATING SYSTEM LOGIC ---
function initFooterRating() {
    const starsContainer = document.getElementById('footerStars');
    const statusText = document.getElementById('footerRatingStatus');
    const numDisplay = document.getElementById('footerRatingNum');
    const countDisplay = document.getElementById('footerRatingCount');
    const ratingCard = document.getElementById('footerRatingCard');

    if (!starsContainer || !statusText || !numDisplay || !countDisplay) return;

    const stars = starsContainer.querySelectorAll('.footer-star');
    
    // Baseline stats
    const BASE_AVERAGE = 0.0;
    const BASE_COUNT = 0;

    // Load state from localStorage or use baseline
    let currentRating = parseInt(localStorage.getItem('userRating') || '0', 10);
    let totalCount = parseInt(localStorage.getItem('totalRatingCount') || BASE_COUNT, 10);
    let avgRating = parseFloat(localStorage.getItem('avgRating') || BASE_AVERAGE, 10);

    // Update displays
    numDisplay.textContent = avgRating.toFixed(1);
    countDisplay.textContent = `(${totalCount} ulasan)`;

    // Update star visual based on current rating
    updateStarDisplay(currentRating);

    if (currentRating > 0) {
        statusText.textContent = `Terima kasih! Kamu memberikan ${currentRating} bintang.`;
        statusText.style.color = '#14b8a6'; // Accent color for thank you message
    }

    // Star interaction event listeners
    stars.forEach(star => {
        // Hover effect
        star.addEventListener('mouseover', function() {
            const hoverVal = parseInt(this.getAttribute('data-value'), 10);
            highlightStars(hoverVal);
            statusText.textContent = getRatingMessage(hoverVal);
            statusText.style.color = 'rgba(255, 255, 255, 0.8)';
        });

        // Mouse out effect
        star.addEventListener('mouseout', function() {
            updateStarDisplay(currentRating);
            if (currentRating > 0) {
                statusText.textContent = `Terima kasih! Kamu memberikan ${currentRating} bintang.`;
                statusText.style.color = '#14b8a6';
            } else {
                statusText.textContent = 'Pilih bintang untuk memberi rating';
                statusText.style.color = 'rgba(255, 255, 255, 0.6)';
            }
        });

        // Click selection
        star.addEventListener('click', function(event) {
            const newRating = parseInt(this.getAttribute('data-value'), 10);
            const oldRating = currentRating;
            currentRating = newRating;

            // Recalculate average and count
            if (oldRating === 0) {
                // New reviewer
                const prevCount = totalCount;
                totalCount += 1;
                avgRating = ((avgRating * prevCount) + newRating) / totalCount;
            } else {
                // Changing existing review
                avgRating = totalCount > 0 ? (((avgRating * totalCount) - oldRating + newRating) / totalCount) : newRating;
            }

            // Save to localStorage
            localStorage.setItem('userRating', currentRating.toString());
            localStorage.setItem('totalRatingCount', totalCount.toString());
            localStorage.setItem('avgRating', avgRating.toString());

            // Update displays
            numDisplay.textContent = avgRating.toFixed(1);
            countDisplay.textContent = `(${totalCount} ulasan)`;
            updateStarDisplay(currentRating);

            // Thank you status message
            statusText.textContent = `Terima kasih! Kamu memberikan ${currentRating} bintang.`;
            statusText.style.color = '#14b8a6';

            // Trigger particle burst effect using the existing function!
            if (typeof triggerFeatureAnimation === 'function') {
                // Calculate position relative to ratingCard for centering burst
                const rect = ratingCard.getBoundingClientRect();
                const fakeEvent = {
                    clientX: rect.left + rect.width / 2,
                    clientY: rect.top + rect.height / 3
                };
                triggerFeatureAnimation('star', ratingCard, fakeEvent);
            }
        });
    });

    function highlightStars(val) {
        stars.forEach(star => {
            const starVal = parseInt(star.getAttribute('data-value'), 10);
            if (starVal <= val) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    function updateStarDisplay(val) {
        highlightStars(val);
    }

    function getRatingMessage(val) {
        switch (val) {
            case 1: return 'Sangat Kurang 😞';
            case 2: return 'Kurang 😕';
            case 3: return 'Cukup 🙂';
            case 4: return 'Bagus 😄';
            case 5: return 'Sangat Bagus! 😍';
            default: return 'Pilih bintang untuk memberi rating';
        }
    }
}
