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

// 2. Marquee Swipers (Ucapan & Promosi)
const marqueeConfig = {
    slidesPerView: "auto",
    spaceBetween: 30,
    loop: true,
    speed: 6000, 
    allowTouchMove: true, 
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
    },
};

const swiperUcapan = new Swiper(".swiper-ucapan", marqueeConfig);
const swiperPromosi = new Swiper(".swiper-promosi", { 
    ...marqueeConfig, 
    autoplay: { ...marqueeConfig.autoplay, reverseDirection: true }
});

// 3. Logika Global Click (Modal, Lightbox, & Navigasi Scroll)
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

    // B. LIGHTBOX (Zoom Gambar dari Marquee)
    if (e.target.closest('.design-card img')) {
        lightboxImg.src = e.target.closest('img').src;
        lightbox.classList.add('active');
    }
    if (e.target === lightbox || e.target.closest('.lightbox-close')) {
        lightbox.classList.remove('active');
    }

    // C. SCROLL DARI HERO (Akurat pake Alt Text)
    const slide = e.target.closest('.mySwiper .swiper-slide');
    if (slide) {
        const img = slide.querySelector('img');
        if (img && img.hasAttribute('alt')) {
            const imgAlt = img.getAttribute('alt').toLowerCase();
            
            if (imgAlt === 'ucapan') {
                document.getElementById('ucapan').scrollIntoView({ behavior: 'smooth' });
            } 
            else if (imgAlt === 'promo') {
                document.getElementById('promosi').scrollIntoView({ behavior: 'smooth' });
            } 
            else if (imgAlt === 'postingan') {
                document.getElementById('postingan').scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
});