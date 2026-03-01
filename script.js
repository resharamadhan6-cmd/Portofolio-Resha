// Init AOS
AOS.init({ duration: 1000, once: false });

// Dark/Light Mode & Icon Toggle
const toggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
    initWormCanvas();
    initStarCanvas();
});

// --- Fungsi Interaktif Skill ---
function showSkill(element, name, percentage) {
    const bubble = document.getElementById('skill-stats');
    const fill = document.getElementById('stat-fill');
    const title = document.getElementById('stat-title');
    const percentTxt = document.getElementById('stat-percent');

    // Tutup dulu jika sedang terbuka untuk memicu animasi ulang
    bubble.classList.remove('active');
    
    setTimeout(() => {
        title.innerText = name;
        percentTxt.innerText = percentage;
        fill.style.width = '0%'; // Reset bar ke 0
        
        bubble.classList.add('active');
        
        // Animasi bar mengisi setelah bubble muncul
        setTimeout(() => {
            fill.style.width = percentage;
        }, 200);
    }, 150);
}

// Menutup bubble saat klik di area luar profil
document.addEventListener('click', (e) => {
    if (!e.target.closest('.skill-node') && !e.target.closest('.skill-stats-bubble')) {
        document.getElementById('skill-stats').classList.remove('active');
    }
});

// Slideshow Sertifikat
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
setInterval(() => {
    if (slides.length > 0) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
}, 3000);

// --- Efek Cacing (Neon Worms - Light Mode) ---
const wormCanvas = document.getElementById('wormCanvas');
const wormCtx = wormCanvas.getContext('2d');
let wormW, wormH, worms = [];

function initWormCanvas() {
    wormW = wormCanvas.width = window.innerWidth;
    wormH = wormCanvas.height = window.innerHeight;
    worms = [];
    for (let i = 0; i < 15; i++) worms.push(new Worm());
}

class Worm {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * wormW;
        this.y = Math.random() * wormH;
        this.segments = [];
        this.len = 25 + Math.random() * 20;
        this.speed = 0.5 + Math.random() * 1.5;
        this.angle = Math.random() * Math.PI * 2;
        this.turnSpeed = Math.random() * 0.05 - 0.025;
    }
    update() {
        this.angle += this.turnSpeed;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.segments.unshift({ x: this.x, y: this.y });
        if (this.segments.length > this.len) this.segments.pop();
        if (this.x < 0 || this.x > wormW || this.y < 0 || this.y > wormH) this.reset();
    }
    draw() {
        const rgb = getComputedStyle(document.documentElement).getPropertyValue('--worm-rgb').trim();
        wormCtx.beginPath();
        wormCtx.strokeStyle = `rgba(${rgb}, 0.4)`;
        wormCtx.lineWidth = 2;
        wormCtx.lineCap = 'round';
        for (let i = 0; i < this.segments.length - 1; i++) {
            wormCtx.lineTo(this.segments[i].x, this.segments[i].y);
        }
        wormCtx.stroke();
    }
}

function animateWorms() {
    wormCtx.clearRect(0, 0, wormW, wormH);
    worms.forEach(worm => { worm.update(); worm.draw(); });
    requestAnimationFrame(animateWorms);
}

// --- Efek Bintang (Starry Night - Dark Mode) ---
const starCanvas = document.getElementById('starCanvas');
const starCtx = starCanvas.getContext('2d');
let starW, starH, stars = [];

function initStarCanvas() {
    starW = starCanvas.width = window.innerWidth;
    starH = starCanvas.height = window.innerHeight;
    stars = [];
    const starCount = Math.floor(starW * starH / 10000) + 150; 
    for (let i = 0; i < starCount; i++) stars.push(new Star());
}

class Star {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * starW;
        this.y = Math.random() * starH;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedY = Math.random() * -0.5 - 0.1;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.twinkleSpeed = Math.random() * 0.03 + 0.01;
        this.twinklePhase = Math.random() * Math.PI * 2;
    }
    update() {
        this.y += this.speedY;
        this.twinklePhase += this.twinkleSpeed;
        this.opacity = 0.2 + Math.abs(Math.sin(this.twinklePhase)) * 0.7;
        if (this.y + this.size < 0) {
            this.reset();
            this.y = starCanvas.height + this.size;
        }
    }
    draw() {
        const rgb = getComputedStyle(document.documentElement).getPropertyValue('--star-rgb').trim();
        starCtx.fillStyle = `rgba(${rgb}, ${this.opacity})`;
        starCtx.beginPath();
        starCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        starCtx.fill();
    }
}

function animateStars() {
    starCtx.clearRect(0, 0, starW, starH);
    stars.forEach(star => { star.update(); star.draw(); });
    requestAnimationFrame(animateStars);
}

// Inisialisasi
window.addEventListener('resize', () => {
    initWormCanvas();
    initStarCanvas();
});

initWormCanvas();
animateWorms();
initStarCanvas();
animateStars();

// Smooth Scroll
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
        }
    });
});

// Tambahkan ini di bagian paling bawah script.js kamu
const mobileToggle = document.getElementById('mobile-toggle');
const navWrapper = document.getElementById('nav-wrapper');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navWrapper.classList.toggle('active');
        // Animasi icon menu ke close (X)
        const icon = mobileToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// Tutup menu otomatis kalau link diklik
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navWrapper.classList.remove('active');
        if(mobileToggle) mobileToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
    });
});