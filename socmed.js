// 1. Hero Swiper (Slider Atas)
const heroSwiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    speed: 800,
    loopedSlides: 5,
    grabCursor: true,
    coverflowEffect: {
        rotate: 35,
        stretch: -10,
        depth: 160,
        modifier: 1.2,
        slideShadows: false,
    },
});

// 2. Marquee Swipers
const marqueeConfig = {
    slidesPerView: "auto",
    spaceBetween: 30,
    loop: true,
    speed: 6000, 
    allowTouchMove: true, 
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
    },
};

const swiperUcapan = new Swiper(".swiper-ucapan", marqueeConfig);
const swiperPromosi = new Swiper(".swiper-promosi", { 
    ...marqueeConfig, 
    autoplay: { ...marqueeConfig.autoplay, reverseDirection: true }
});

// 3. Logika Global Click (Modal, Lightbox, & Scroll)
const menuModal = document.getElementById('menuModal');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

document.addEventListener('click', function(e) {
    // A. MODAL MENU
    if (e.target.closest('.menu-icon')) {
        menuModal.classList.add('active');
        return; // Stop execution biar gak bentrok
    }
    if (e.target.closest('#closeBtn') || e.target === menuModal) {
        menuModal.classList.remove('active');
        return;
    }

    // B. LIGHTBOX FIX (Super Priority & Lock Position)
    const clickedImg = e.target.closest('.design-card img');
    if (clickedImg) {
        e.preventDefault();
        e.stopPropagation(); // Stop event biar gak bocor ke elemen di bawahnya
        
        lightboxImg.src = clickedImg.src;
        lightbox.classList.add('active');
        
        // Kunci posisi scroll biar gak lari ke bawah pas foto dibuka
        const scrollY = window.scrollY;
        document.body.style.top = `-${scrollY}px`;
        document.body.classList.add('modal-open');
        return;
    }
    
    // Tutup Lightbox
    if (e.target === lightbox || e.target.closest('.lightbox-close')) {
        // Ambil kembali posisi scroll sebelum dikunci
        const scrollY = document.body.style.top;
        
        lightbox.classList.remove('active');
        document.body.classList.remove('modal-open');
        
        // Kembalikan posisi scroll layar
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);

        // Reset src biar gak ada bayangan foto lama pas buka foto baru
        setTimeout(() => { lightboxImg.src = ""; }, 300);
        return;
    }

    // C. SCROLL ACCURATE (Hanya jalan kalo lightbox gak aktif)
    if (!lightbox.classList.contains('active')) {
        const slide = e.target.closest('.mySwiper .swiper-slide');
        if (slide) {
            const img = slide.querySelector('img');
            if (img && img.hasAttribute('alt')) {
                const alt = img.getAttribute('alt').toLowerCase();
                let targetId = "";
                
                if (alt.includes('ucapan')) targetId = "ucapan";
                else if (alt.includes('promo')) targetId = "promosi";
                else if (alt.includes('postingan')) targetId = "postingan";

                const element = document.getElementById(targetId);
                if (element) {
                    const offset = 20; 
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        }
    }
});

// Refresh Swiper pas resize biar layout gak berantakan di HP
window.addEventListener('resize', () => {
    heroSwiper.update();
    swiperUcapan.update();
    swiperPromosi.update();
});