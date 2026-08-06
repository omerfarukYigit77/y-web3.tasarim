// js/bidb-slider.js

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.bidb-slide');
    const btnNext = document.getElementById('bidbNextBtn');
    const btnPrev = document.getElementById('bidbPrevBtn');
    
    if (slides.length === 0) return;

    let currentSlideIndex = 0;
    let slideInterval;

    function showSlide(index) {
        // Remove active class from all
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Handle boundaries
        if (index >= slides.length) {
            currentSlideIndex = 0;
        } else if (index < 0) {
            currentSlideIndex = slides.length - 1;
        } else {
            currentSlideIndex = index;
        }
        
        // Add active class to current
        slides[currentSlideIndex].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlideIndex + 1);
    }

    function prevSlide() {
        showSlide(currentSlideIndex - 1);
    }

    // Event Listeners
    if (btnNext) btnNext.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    if (btnPrev) btnPrev.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    // Auto Play
    function startInterval() {
        slideInterval = setInterval(nextSlide, 5000); // 5 saniyede bir değişir
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    // Initialize
    showSlide(0);
    startInterval();
});
