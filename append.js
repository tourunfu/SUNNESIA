const fs = require('fs');
const css = `
/* --- CLEAN MODERN STYLE OVERRIDES --- */
.navbar-clean {
    background: #ffffff !important;
    border-bottom: none !important;
    backdrop-filter: none !important;
    padding: 15px 0 !important;
    box-shadow: 0 2px 10px rgba(0,0,0,0.02) !important;
}

.nav-container-clean {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo-clean {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.5rem;
    font-weight: 700;
    text-decoration: none;
    letter-spacing: -0.5px;
}

.nav-links-clean {
    display: flex;
    list-style: none;
    gap: 30px;
    margin: 0;
}

.nav-links-clean li a {
    text-decoration: none;
    color: #000;
    font-weight: 500;
    font-size: 1rem;
    transition: color 0.2s;
}

.nav-links-clean li a:hover {
    color: #555;
}

.btn-black-small {
    background-color: #000;
    color: #fff;
    padding: 10px 24px;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    transition: 0.3s;
}

.btn-black-small:hover {
    background-color: #333;
    transform: translateY(-2px);
}

.hero-section-clean {
    padding-top: 150px;
    padding-bottom: 100px;
    background: #ffffff;
    min-height: 100vh;
    display: flex;
    align-items: center;
}

.hero-grid-clean {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 80px;
    align-items: center;
}

.hero-text-clean h1 {
    font-size: 4.5rem;
    font-weight: 700;
    line-height: 1.1;
    color: #000;
    margin-bottom: 24px;
    letter-spacing: -1.5px;
}

.description-clean {
    font-size: 1.15rem;
    color: #444;
    line-height: 1.6;
    margin-bottom: 40px;
    max-width: 90%;
}

.btn-black {
    background-color: #000;
    color: #fff;
    padding: 16px 36px;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 500;
    font-size: 1.1rem;
    border: none;
    cursor: pointer;
    display: inline-block;
    transition: 0.3s;
}

.btn-black:hover {
    background-color: #333;
    transform: translateY(-2px);
}

.trust-logos-clean {
    display: flex;
    gap: 40px;
    margin-top: 80px;
}

.trust-logo {
    display: flex;
    align-items: center;
    gap: 12px;
}

.trust-logo span {
    font-size: 0.9rem;
    font-weight: 600;
    color: #000;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Collage */
.hero-collage {
    position: relative;
    height: 600px;
    width: 100%;
}

.collage-item {
    position: absolute;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.collage-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.collage-item-1 {
    width: 250px;
    height: 250px;
    top: 50px;
    left: 20px;
    z-index: 2;
}

.collage-item-2 {
    width: 320px;
    height: 420px;
    top: 100px;
    right: 20px;
    z-index: 1;
}

.collage-item-3 {
    width: 200px;
    height: 200px;
    bottom: 50px;
    left: 100px;
    z-index: 3;
}

.floating-label {
    position: absolute;
    background: #fff;
    color: #000;
    padding: 8px 16px;
    font-size: 0.8rem;
    font-weight: 600;
    border-radius: 4px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    letter-spacing: 0.5px;
    white-space: nowrap;
}

.label-1 {
    bottom: -15px;
    left: -20px;
}

.label-2 {
    top: -15px;
    right: -20px;
}

@media (max-width: 992px) {
    .hero-grid-clean {
        grid-template-columns: 1fr;
    }
    .hero-collage {
        height: 400px;
    }
    .hero-text-clean h1 {
        font-size: 3rem;
    }
}
`;
fs.appendFileSync('style.css', css);
