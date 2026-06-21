const fs = require('fs');
const css = `
/* --- ANIMATIONS FOR LIVELY HOMEPAGE --- */
@keyframes floatPhoto {
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(2deg); }
    100% { transform: translateY(0px) rotate(0deg); }
}

.collage-item-1 {
    animation: floatPhoto 6s ease-in-out infinite;
}
.collage-item-2 {
    animation: floatPhoto 8s ease-in-out infinite alternate-reverse;
}
.collage-item-3 {
    animation: floatPhoto 7s ease-in-out infinite;
    animation-delay: 1s;
}

/* Ensure blobs are positioned correctly within the hero grid */
.blob {
    pointer-events: none;
}
`;
fs.appendFileSync('style.css', css);
console.log('Animations added to CSS');
