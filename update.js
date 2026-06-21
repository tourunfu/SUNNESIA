const fs = require('fs');
const path = require('path');

const dir = __dirname;

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const descriptions = {
    'mad,thabii.html': { title: "Mad Thabi'i", desc: "Mad Thabi'i adalah mad asli (huruf alif, wawu sukun, atau ya' sukun) yang dibaca panjang dua harakat secara alami." },
    'mad,wajib.html': { title: 'Mad Wajib & Jaiz', desc: "Mad Wajib Muttasil adalah mad thabi'i yang bertemu hamzah dalam satu kata. Mad Jaiz Munfasil adalah mad thabi'i bertemu hamzah di kata berbeda." },
    'mad,mustaqqal.html': { title: 'Mad Lazim Mutsaqqal', desc: "Mad Lazim Mutsaqqal Kilmi adalah mad yang terjadi apabila mad thabi'i bertemu dengan huruf bertasydid dalam satu kata. Dibaca panjang 6 harakat." },
    'mad,mukhafaf.html': { title: 'Mad Lazim Mukhaffaf', desc: "Mad Lazim Mukhaffaf Kilmi adalah mad thabi'i yang bertemu dengan huruf bersukun dalam satu kata. Dibaca panjang 6 harakat." },
    'mad,iwadh.html': { title: 'Mad Iwadh', desc: "Mad Iwadh adalah mad yang terjadi apabila ada huruf berharakat fathatain pada akhir kata yang diwaqafkan (berhenti). Dibaca panjang 2 harakat." },
    'mad,badal.html': { title: 'Mad Badal', desc: "Mad Badal terjadi saat terkumpulnya dua hamzah, yang pertama hidup dan kedua mati, lalu hamzah kedua diganti huruf mad. Dibaca panjang 2 harakat." },
    'mad,shilah.html': { title: 'Mad Shilah', desc: "Mad Shilah adalah mad yang terjadi pada huruf ha' dhamir (kata ganti) yang berada di antara dua huruf yang berharakat hidup." },
    'mad,Arif.html': { title: "Mad 'Arid Lissukun", desc: "Mad 'Arid Lissukun adalah mad yang terjadi apabila ada huruf mad (alif, wawu, ya) bertemu dengan huruf hidup yang dibaca mati karena waqaf." },
    'mad,Farqi.html': { title: 'Mad Farqi', desc: "Mad Farqi adalah mad yang terjadi untuk membedakan antara kalimat tanya (istifham) dengan kalimat berita (khabar), dibaca panjang 6 harakat." },
    'mad,tamkin.html': { title: 'Mad Tamkin', desc: "Mad Tamkin adalah mad yang terjadi apabila ada huruf ya' bertasydid kasrah bertemu dengan huruf ya' sukun. Dibaca panjang 2 harakat." }
};

for (const file of files) {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');

    // Remove Mad Layin / Liin from sidebars
    content = content.replace(/<li><a href="mad,liin\.html">.*?<\/a><\/li>\s*/gi, '');
    content = content.replace(/<li><a href="mad,Layin\.html">.*?<\/a><\/li>\s*/gi, '');

    // Remove Audio link
    content = content.replace(/<li><a href="#audio"[\s\S]*?🎧 Audio<\/a>\s*<\/li>\s*/gi, '');

    // Remove Audio section
    content = content.replace(/<!-- Step 2: Audio -->\s*<section id="audio"[\s\S]*?<\/section>/gi, '');
    content = content.replace(/<section id="audio"[\s\S]*?<\/section>/gi, '');

    if (file === 'index.html') {
        // Remove Mad Layin feature card
        content = content.replace(/<div class="feature-card">\s*<a href="mad,Layin\.html"[\s\S]*?<\/div>/gi, '');
    }

    if (file.startsWith('mad,')) {
        // Update Title and Description in the header
        const data = descriptions[file];
        if (data) {
            // regex to match header content:
            // <h1>...</h1>
            // <p...>...</p>
            content = content.replace(/(<header.*?>[\s\S]*?<h1>).*?(<\/h1>[\s\S]*?<p.*?>)[\s\S]*?(<\/p>)/, `$1${data.title}$2${data.desc}$3`);
        }
        
        // Ensure steps numbers are updated if Step 2 was removed
        // The quiz step should be changed from 3 to 2
        content = content.replace(/(<!-- Step 3: Quiz -->\s*<section id="quiz"[\s\S]*?<div class="step-number">)3(<\/div>)/i, '$12$2');
        content = content.replace(/(<section id="quiz"[\s\S]*?<div class="step-number">)3(<\/div>)/i, '$12$2');
    }

    fs.writeFileSync(path.join(dir, file), content, 'utf8');
}
console.log('Update complete!');
