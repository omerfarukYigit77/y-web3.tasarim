document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-open');
        });
    }

    // Mobil menüde açılır menüleri kontrol etme
    const dropdowns = document.querySelectorAll('.nav-item-dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                // Eğer tıklandığında menü kapalıysa aç, açıksa kapat
                dropdown.classList.toggle('open');
            }
        });
    });
});
