document.addEventListener("DOMContentLoaded", function() {
    // Gecikmeli acilmasi icin (orn. 1.5 saniye) setTimeout kullaniyoruz
    setTimeout(function() {
        const popupOverlay = document.getElementById("welcomePopup");
        if (popupOverlay) {
            popupOverlay.classList.add("show");
        }
    }, 1500);

    const closeBtn = document.getElementById("popupCloseBtn");
    const overlay = document.getElementById("welcomePopup");

    function closePopup() {
        if (overlay) {
            overlay.classList.remove("show");
        }
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", closePopup);
    }

    // Disari (karanlik alana) tiklaninca da kapat
    if (overlay) {
        overlay.addEventListener("click", function(e) {
            if (e.target === overlay) {
                closePopup();
            }
        });
    }
});
