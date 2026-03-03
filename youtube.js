    // --- 1. ANIMASI BACKGROUND (PARTIKEL RAME & TERHUBUNG) ---
    const canvas = document.getElementById('bg-animation');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.8 - 0.4;
            this.speedY = Math.random() * 0.8 - 0.4;
            this.color = Math.random() > 0.5 ? 'rgba(255, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.3)';
        }
        update() {
            this.x += this.speedX; this.y += this.speedY;
            if (this.x > canvas.width) this.x = 0; if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0; if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < 120; i++) particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        
        for(let a=0; a<particles.length; a++){
            for(let b=a; b<particles.length; b++){
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let dist = Math.sqrt(dx*dx + dy*dy);
                if(dist < 100){
                    ctx.strokeStyle = `rgba(255,255,255, ${1 - dist/100 * 0.15})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    // --- 2. SEARCH ENGINE LOGIC ---
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const videoCards = document.querySelectorAll('.video-card');

    function performSearch() {
        const keyword = searchInput.value.toLowerCase();
        videoCards.forEach(card => {
            const title = card.getAttribute('data-title').toLowerCase();
            if (title.includes(keyword)) {
                card.classList.remove('hidden');
                card.style.animation = "fadeIn 0.5s ease forwards";
            } else {
                card.classList.add('hidden');
            }
        });
    }

    searchBtn.onclick = performSearch;
    searchInput.onkeypress = (e) => { if (e.key === 'Enter') performSearch(); };
    searchInput.oninput = () => { if (searchInput.value === "") videoCards.forEach(c => c.classList.remove('hidden')); };

    // --- 3. NAVBAR LOGIC ---
    const openMenu = document.getElementById('openMenu');
    const closeBtn = document.getElementById('closeBtn');
    const mobileOverlay = document.getElementById('mobile-menu');

    if (openMenu) {
        openMenu.onclick = () => {
            mobileOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        };
    }
    if (closeBtn) {
        closeBtn.onclick = () => {
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        };
    }

    // Tambahan Animasi FadeIn
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`;
    document.head.appendChild(styleSheet);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth; canvas.height = window.innerHeight;
        initParticles();
    });

    initParticles();
    animate();