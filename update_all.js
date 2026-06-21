const fs = require('fs');

// 1. Update mad,mustaqqal.html
let mutsaqqal = fs.readFileSync('mad,mustaqqal.html', 'utf8');
mutsaqqal = mutsaqqal.replace(
    /<p style="font-size: 1.25rem;">Mad Lazim Mutsaqqal Kilmi adalah mad yang terjadi apabila mad thabi'i bertemu dengan huruf bertasydid dalam satu kata. Dibaca panjang 6 harakat.<\/p>/,
    `<p style="font-size: 1.25rem;">Mad Lazim Mutsaqqal terbagi menjadi dua: <strong>Kilmi</strong> (bertemu huruf bertasydid dalam satu kata) dan <strong>Harfi</strong> (bertemu huruf bertasydid pada permulaan surah). Keduanya dibaca panjang 6 harakat.</p>`
);
fs.writeFileSync('mad,mustaqqal.html', mutsaqqal);

// 2. Update mad,mukhafaf.html
let mukhafaf = fs.readFileSync('mad,mukhafaf.html', 'utf8');
mukhafaf = mukhafaf.replace(
    /<p style="font-size: 1.25rem;">Mad Lazim Mukhaffaf Kilmi adalah mad thabi'i yang bertemu dengan huruf bersukun dalam satu kata. Dibaca panjang 6 harakat.<\/p>/,
    `<p style="font-size: 1.25rem;">Mad Lazim Mukhaffaf terbagi menjadi dua: <strong>Kilmi</strong> (bertemu huruf bersukun dalam satu kata) dan <strong>Harfi</strong> (bertemu huruf bersukun pada permulaan surah). Keduanya dibaca panjang 6 harakat.</p>`
);
fs.writeFileSync('mad,mukhafaf.html', mukhafaf);

// 3. Update index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');

// Remove trust-bar
indexHtml = indexHtml.replace(/<div class="trust-bar"[\s\S]*?<\/div>/, '');

// Add wave divider if it doesn't exist right after </header>
if (!indexHtml.includes('class="wave-container"')) {
    indexHtml = indexHtml.replace('</header>', `</header>\n    <!-- Wave Divider -->\n    <div class="wave-container">\n        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">\n            <path d="M0 30L60 25C120 20 240 10 360 15C480 20 600 40 720 45C840 50 960 40 1080 30C1200 20 1320 10 1380 5L1440 0V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V30Z" fill="#ffffff" />\n        </svg>\n    </div>`);
}

// Update Badges List
const newBadges = `
                                <div class="badge-item locked" data-id="Mad Thabi'i"><div class="badge-icon">🏆</div><span>Mad Thabi'i</span></div>
                                <div class="badge-item locked" data-id="Mad Wajib & Jaiz"><div class="badge-icon">💎</div><span>Mad Wajib & Jaiz</span></div>
                                <div class="badge-item locked" data-id="Mad Lazim Mutsaqqal"><div class="badge-icon">👑</div><span>Mad Mutsaqqal</span></div>
                                <div class="badge-item locked" data-id="Mad Lazim Mukhaffaf"><div class="badge-icon">🏆</div><span>Mad Mukhaffaf</span></div>
                                <div class="badge-item locked" data-id="Mad Iwadh"><div class="badge-icon">👑</div><span>Mad Iwadh</span></div>
                                <div class="badge-item locked" data-id="Mad Badal"><div class="badge-icon">🏆</div><span>Mad Badal</span></div>
                                <div class="badge-item locked" data-id="Mad 'Arid Lissukun"><div class="badge-icon">🌟</div><span>Mad 'Arid Lissukun</span></div>
                                <div class="badge-item locked" data-id="Mad Layin"><div class="badge-icon">💎</div><span>Mad Layin</span></div>
                                <div class="badge-item locked" data-id="Mad Farqi"><div class="badge-icon">🏆</div><span>Mad Farqi</span></div>
                                <div class="badge-item locked" data-id="Mad Shilah"><div class="badge-icon">✨</div><span>Mad Shilah</span></div>
                                <div class="badge-item locked" data-id="Mad Tamkin"><div class="badge-icon">👑</div><span>Mad Tamkin</span></div>
`;
indexHtml = indexHtml.replace(/<div class="badge-showcase" id="globalBadgeDisplay">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, `<div class="badge-showcase" id="globalBadgeDisplay">\n${newBadges}\n                            </div>\n                        </div>\n                    </div>`);

// Update Progress Dashboard List
const newProgress = `
<div class="progress-item" data-topic="Mad Thabi'i"><div class="progress-info"><span>Mad Thabi'i</span><span class="progress-percent">0%</span></div><div class="progress-bar-bg"><div class="progress-bar-fill" style="width: 0%;"></div></div></div>
<div class="progress-item" data-topic="Mad Wajib & Jaiz"><div class="progress-info"><span>Mad Wajib & Jaiz</span><span class="progress-percent">0%</span></div><div class="progress-bar-bg"><div class="progress-bar-fill" style="width: 0%;"></div></div></div>
<div class="progress-item" data-topic="Mad Lazim Mutsaqqal"><div class="progress-info"><span>Mad Lazim Mutsaqqal</span><span class="progress-percent">0%</span></div><div class="progress-bar-bg"><div class="progress-bar-fill" style="width: 0%;"></div></div></div>
<div class="progress-item" data-topic="Mad Lazim Mukhaffaf"><div class="progress-info"><span>Mad Lazim Mukhaffaf</span><span class="progress-percent">0%</span></div><div class="progress-bar-bg"><div class="progress-bar-fill" style="width: 0%;"></div></div></div>
<div class="progress-item" data-topic="Mad Iwadh"><div class="progress-info"><span>Mad Iwadh</span><span class="progress-percent">0%</span></div><div class="progress-bar-bg"><div class="progress-bar-fill" style="width: 0%;"></div></div></div>
<div class="progress-item" data-topic="Mad Badal"><div class="progress-info"><span>Mad Badal</span><span class="progress-percent">0%</span></div><div class="progress-bar-bg"><div class="progress-bar-fill" style="width: 0%;"></div></div></div>
<div class="progress-item" data-topic="Mad 'Arid Lissukun"><div class="progress-info"><span>Mad 'Arid Lissukun</span><span class="progress-percent">0%</span></div><div class="progress-bar-bg"><div class="progress-bar-fill" style="width: 0%;"></div></div></div>
<div class="progress-item" data-topic="Mad Layin"><div class="progress-info"><span>Mad Layin</span><span class="progress-percent">0%</span></div><div class="progress-bar-bg"><div class="progress-bar-fill" style="width: 0%;"></div></div></div>
<div class="progress-item" data-topic="Mad Farqi"><div class="progress-info"><span>Mad Farqi</span><span class="progress-percent">0%</span></div><div class="progress-bar-bg"><div class="progress-bar-fill" style="width: 0%;"></div></div></div>
<div class="progress-item" data-topic="Mad Shilah"><div class="progress-info"><span>Mad Shilah</span><span class="progress-percent">0%</span></div><div class="progress-bar-bg"><div class="progress-bar-fill" style="width: 0%;"></div></div></div>
<div class="progress-item" data-topic="Mad Tamkin"><div class="progress-info"><span>Mad Tamkin</span><span class="progress-percent">0%</span></div><div class="progress-bar-bg"><div class="progress-bar-fill" style="width: 0%;"></div></div></div>
`;
indexHtml = indexHtml.replace(/<div class="progress-dashboard" id="progressDashboard">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, `<div class="progress-dashboard" id="progressDashboard">\n${newProgress}\n                            </div>\n                        </div>\n                    </div>`);

fs.writeFileSync('index.html', indexHtml);
console.log('Update Complete!');
