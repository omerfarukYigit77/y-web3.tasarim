// js/bidb-slider.js
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.bidb-slide');
    const btnNext = document.getElementById('bidbNextBtn');
    const btnPrev = document.getElementById('bidbPrevBtn');
    const dotsContainer = document.getElementById('sliderDots');

    if (!slides.length) return;

    let current = 0;
    let timer;

    // Dot butonlarını oluştur
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => { goTo(i); resetTimer(); });
        dotsContainer.appendChild(dot);
    });

    function goTo(index) {
        slides[current].classList.remove('active');
        dotsContainer.children[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        dotsContainer.children[current].classList.add('active');
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }
    function resetTimer() { clearInterval(timer); timer = setInterval(next, 5000); }

    if (btnNext) btnNext.addEventListener('click', () => { next(); resetTimer(); });
    if (btnPrev) btnPrev.addEventListener('click', () => { prev(); resetTimer(); });

    goTo(0);
    timer = setInterval(next, 5000);
});
