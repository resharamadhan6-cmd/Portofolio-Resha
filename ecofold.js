document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.box');
    const overlay = document.getElementById('overlayBg');

    // Klik Box Pop-up
    boxes.forEach(box => {
        box.addEventListener('click', () => {
            boxes.forEach(b => b.classList.remove('active'));
            box.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Tutup Pop-up via Overlay
    overlay.addEventListener('click', () => {
        boxes.forEach(box => box.classList.remove('active'));
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});