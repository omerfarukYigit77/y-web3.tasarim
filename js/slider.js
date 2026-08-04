/* =========================================
   YALOVA ÜNİVERSİTESİ — SLIDER JAVASCRIPT
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.nav-dot-container');
    const SLIDE_DURATION = 6000; // 6 seconds per slide
    let currentSlide = 0;
    let slideInterval;
    let progressInterval;
    let startTime;

    if (slides.length === 0) return;

    function goToSlide(index) {
        // Eski slide'ı temizle
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        // Progress barı sıfırla
        const oldFill = dots[currentSlide].querySelector('.nav-dot-fill');
        if(oldFill) oldFill.style.height = '0%';

        // Yeni slide'a geç
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');

        startProgress();
    }

    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }

    function prevSlide() {
        let prev = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prev);
    }

    function startProgress() {
        clearInterval(progressInterval);
        startTime = Date.now();
        const activeFill = dots[currentSlide].querySelector('.nav-dot-fill');
        
        progressInterval = setInterval(() => {
            let elapsed = Date.now() - startTime;
            let percentage = (elapsed / SLIDE_DURATION) * 100;
            
            if (percentage >= 100) {
                percentage = 100;
                clearInterval(progressInterval);
                nextSlide();
            }
            
            if(activeFill) activeFill.style.height = `${percentage}%`;
        }, 16); // 60fps update
    }

    // Dot'lara tıklama eventi
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (currentSlide === index) return;
            clearInterval(progressInterval);
            goToSlide(index);
        });
    });

    // Ok butonları
    const btnPrev = document.getElementById('heroPrev');
    const btnNext = document.getElementById('heroNext');

    if (btnPrev && btnNext) {
        btnPrev.addEventListener('click', () => {
            clearInterval(progressInterval);
            prevSlide();
        });
        btnNext.addEventListener('click', () => {
            clearInterval(progressInterval);
            nextSlide();
        });
    }

    // İlk slide'ı başlat
    setTimeout(() => {
        slides[0].classList.add('active');
        dots[0].classList.add('active');
        startProgress();
    }, 100);
});