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
    }
    if (e.target.closest('#closeBtn') || e.target === menuModal) {
        menuModal.classList.remove('active');
    }

    // B. LIGHTBOX FIX (Anti Meledak & Lock Scroll & Anti-Swiper-Conflict)
    const clickedImg = e.target.closest('.design-card img');
    if (clickedImg) {
        e.stopImmediatePropagation(); // STOP perintah ke Swiper biar gak conflict layout
        lightboxImg.src = clickedImg.src;
        lightbox.classList.add('active');
        document.body.classList.add('modal-open');
    }
    
    // Tutup Lightbox
    if (e.target === lightbox || e.target.closest('.lightbox-close')) {
        lightbox.classList.remove('active');
        document.body.classList.remove('modal-open');
        // Reset src pas tutup biar gak 'kedip' pas buka foto lain
        setTimeout(() => { lightboxImg.src = ""; }, 300);
    }

    // C. SCROLL ACCURATE (Hanya jalan kalo lightbox gak aktif)
    const slide = e.target.closest('.mySwiper .swiper-slide');
    if (slide && !lightbox.classList.contains('active')) {
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
});

// Refresh Swiper pas resize
window.addEventListener('resize', () => {
    heroSwiper.update();
    swiperUcapan.update();
    swiperPromosi.update();
});