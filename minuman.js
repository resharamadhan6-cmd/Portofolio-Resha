// 1. BACKGROUND ANIMATION (FIREFLIES)
const canvas = document.getElementById('bg-animation');
const ctx = canvas.getContext('2d');

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setCanvasSize();

let particles = [];
class Particle {
    constructor() {
        this.init();
    }
    init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 0.6 - 0.3;
        this.speedY = Math.random() * 0.6 - 0.3;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = 'rgba(106, 193, 9, 0.3)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 50; i++) particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}

// 2. MODAL LOGIC
const overlay = document.getElementById('detail-overlay');
function openDetail(card) {
    card.classList.add('expanded');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDetail() {
    document.querySelectorAll('.sub-card').forEach(c => c.classList.remove('expanded'));
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// 3. SCROLL REVEAL
const scrollReveal = () => {
    document.querySelectorAll('.reveal').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
            el.classList.add('active');
        }
    });
};

// INITIALIZE
window.addEventListener('scroll', scrollReveal);
window.addEventListener('load', () => { 
    initParticles(); 
    animate(); 
    scrollReveal(); 
});
window.addEventListener('resize', () => { 
    setCanvasSize();
    initParticles(); 
});