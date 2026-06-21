const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.startsWith('mad,') && f.endsWith('.html'));

const madList = [
    { 
        title: "Mad Thabi'i", 
        file: "mad,thabii.html", 
        id: "thabii", 
        videos: [{ label: "Video", url: "https://www.youtube.com/embed/ivSxkSnkXV0?si=765nuuBvyxKiVxA0" }] 
    },
    { 
        title: "Mad Wajib & Jaiz", 
        file: "mad,wajib.html", 
        id: "wajib", 
        videos: [] 
    },
    { 
        title: "Mad Lazim Mutsaqqal", 
        file: "mad,mustaqqal.html", 
        id: "mustaqqal", 
        videos: [
            { label: "Video Kilmi", url: "https://www.youtube.com/embed/yZC2rApiHAw?si=rWN1J_J9TXFDXqwu" },
            { label: "Video Harfi", url: "https://www.youtube.com/embed/5qveje5AgsE?si=Xv_dGLDOmVF-doCA" }
        ] 
    },
    { 
        title: "Mad Lazim Mukhaffaf", 
        file: "mad,mukhafaf.html", 
        id: "mukhafaf", 
        videos: [
            { label: "Video Kilmi", url: "https://www.youtube.com/embed/ywK7_SS0FhI?si=hqqZtcvTX8VnGvK7" },
            { label: "Video Harfi", url: "https://www.youtube.com/embed/zeZuCd-RUWs?si=Zrm3-9FhBQn9V9t5" }
        ] 
    },
    { 
        title: "Mad Iwadh", 
        file: "mad,iwadh.html", 
        id: "iwadh", 
        videos: [] 
    },
    { 
        title: "Mad Badal", 
        file: "mad,badal.html", 
        id: "badal", 
        videos: [{ label: "Video", url: "https://www.youtube.com/embed/N9SoeC6jG_0?si=ps226gJrkUOln0qT" }] 
    },
    { 
        title: "Mad 'Arid Lissukun", 
        file: "mad,Arif.html", 
        id: "arif", 
        videos: [{ label: "Video", url: "https://www.youtube.com/embed/VJ9SqPxiUnk?si=XbwyZQtkkR9n2T8F" }] 
    },
    { 
        title: "Mad Layin", 
        file: "mad,Layin.html", 
        id: "layin", 
        videos: [{ label: "Video", url: "https://www.youtube.com/embed/CqWiZfQlhNI?si=5d5hcbuLobOg0Qis" }] 
    },
    { 
        title: "Mad Farqi", 
        file: "mad,Farqi.html", 
        id: "farqi", 
        videos: [{ label: "Video", url: "https://www.youtube.com/embed/NPHwYaTF8uY?si=rmQIqFgTsH-t9itz" }] 
    },
    { 
        title: "Mad Shilah", 
        file: "mad,shilah.html", 
        id: "shilah", 
        videos: [{ label: "Video", url: "https://www.youtube.com/embed/xTqbYYnsdrw?si=pukF3pNZYno9bxVX" }] 
    },
    { 
        title: "Mad Tamkin", 
        file: "mad,tamkin.html", 
        id: "tamkin", 
        videos: [{ label: "Video", url: "https://www.youtube.com/embed/yyLg4MaNa0o?si=DE-o4gyX9YRTAWR2" }] 
    }
];

for (const file of files) {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');

    // Build the new sub-menu
    let newSubMenuHTML = `\n                    <ul class="sub-menu">\n`;
    for (const mad of madList) {
        if (mad.file === file) {
            newSubMenuHTML += `                        <li>
                            <div style="background: rgba(20, 184, 166, 0.05); border-radius: var(--radius-small); margin-bottom: 5px; overflow: hidden;">
                                <div onclick="toggleSubMenu('sub-${mad.id}', 'icon-${mad.id}')" style="display: flex; justify-content: space-between; align-items: center; cursor: pointer; padding: 10px 15px;">
                                    <span style="color: var(--primary-dark); font-weight: 700; font-size: 1.05rem;">${mad.title}</span>
                                    <span id="icon-${mad.id}" style="color: var(--primary-dark); font-size: 0.8rem; transition: transform 0.3s; transform: rotate(180deg);">▼</span>
                                </div>
                                <ul id="sub-${mad.id}" style="list-style: none; padding-left: 15px; margin-top: 0; border-left: 2px solid var(--primary-light); margin-left: 15px; margin-bottom: 10px; display: block;">`;
            
            // Add sub-section anchors for specific chapters if any
            if (mad.id === 'mustaqqal' || mad.id === 'mukhafaf') {
                newSubMenuHTML += `
                                    <li><a href="#kilmi" style="font-size: 0.95rem; padding: 5px 10px; display: block;">📖 Kilmi</a></li>
                                    <li><a href="#harfi" style="font-size: 0.95rem; padding: 5px 10px; display: block;">📖 Harfi</a></li>`;
            } else if (mad.id === 'shilah') {
                newSubMenuHTML += `
                                    <li><a href="#qashirah" style="font-size: 0.95rem; padding: 5px 10px; display: block;">📖 Qashirah</a></li>
                                    <li><a href="#thawilah" style="font-size: 0.95rem; padding: 5px 10px; display: block;">📖 Thawilah</a></li>`;
            }

            // Add video link(s)
            if (mad.videos.length === 0) {
                newSubMenuHTML += `
                                    <li><a href="javascript:void(0)" onclick="alert('Video pembelajaran belum tersedia untuk materi ini.')" style="font-size: 0.95rem; padding: 5px 10px; display: block; opacity: 0.5;">🎥 Video (Belum Tersedia)</a></li>`;
            } else if (mad.videos.length === 1) {
                newSubMenuHTML += `
                                    <li><a href="javascript:void(0)" onclick="openVideoModal('${mad.videos[0].url}')" style="font-size: 0.95rem; padding: 5px 10px; display: block;">🎥 Video</a></li>`;
            } else {
                // Multiple videos
                mad.videos.forEach(v => {
                    newSubMenuHTML += `
                                    <li><a href="javascript:void(0)" onclick="openVideoModal('${v.url}')" style="font-size: 0.95rem; padding: 5px 10px; display: block;">🎥 ${v.label}</a></li>`;
                });
            }

            // Add quiz link
            newSubMenuHTML += `
                                    <li><a href="#quiz" style="font-size: 0.95rem; padding: 5px 10px; display: block;">🎮 Quiz</a></li>
                                </ul>
                            </div>
                        </li>\n`;
        } else {
            newSubMenuHTML += `                        <li><a href="${mad.file}">${mad.title}</a></li>\n`;
        }
    }
    newSubMenuHTML += `                    </ul>\n`;

    // Replace everything between <ul class="sub-menu"> and the matching </ul>
    // using regex
    content = content.replace(/<ul class="sub-menu">[\s\S]*?<\/ul>\s*<\/li>\s*<\/ul>/, newSubMenuHTML + '                </li>\n            </ul>');

    fs.writeFileSync(path.join(dir, file), content, 'utf8');
}

console.log('Sidebar rebuild complete!');
