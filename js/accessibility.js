// js/accessibility.js
document.addEventListener('DOMContentLoaded', () => {
    const a11yTrigger = document.getElementById('a11yTrigger');
    const a11yPanel = document.getElementById('a11yPanel');
    const a11yClose = document.getElementById('a11yClose');
    const body = document.body;

    if (!a11yTrigger || !a11yPanel) return;

    // Panel Aç/Kapa
    a11yTrigger.addEventListener('click', () => {
        a11yPanel.classList.toggle('open');
    });

    a11yClose.addEventListener('click', () => {
        a11yPanel.classList.remove('open');
    });

    // Sayfa dışına tıklayınca kapat
    document.addEventListener('click', (e) => {
        if (!a11yPanel.contains(e.target) && !a11yTrigger.contains(e.target)) {
            a11yPanel.classList.remove('open');
        }
    });

    // Erişilebilirlik Özellikleri ve ID'leri
    const features = [
        { id: 'btnHighContrast', class: 'a11y-high-contrast', key: 'a11y_contrast' },
        { id: 'btnLargeText', class: 'a11y-large-text', key: 'a11y_large_text' },
        { id: 'btnReadableFont', class: 'a11y-readable-font', key: 'a11y_font' },
        { id: 'btnHighlightLinks', class: 'a11y-highlight-links', key: 'a11y_links' },
        { id: 'btnStopAnimations', class: 'a11y-stop-animations', key: 'a11y_animations' }
    ];

    // Sayfa yüklendiğinde LocalStorage'dan ayarları çek
    features.forEach(feature => {
        const btn = document.getElementById(feature.id);
        const isActive = localStorage.getItem(feature.key) === 'true';

        if (isActive) {
            body.classList.add(feature.class);
            if (btn) btn.classList.add('active');
        }

        // Buton tıklama olayı
        if (btn) {
            btn.addEventListener('click', () => {
                const isCurrentlyActive = body.classList.contains(feature.class);
                
                if (isCurrentlyActive) {
                    body.classList.remove(feature.class);
                    btn.classList.remove('active');
                    localStorage.setItem(feature.key, 'false');
                } else {
                    body.classList.add(feature.class);
                    btn.classList.add('active');
                    localStorage.setItem(feature.key, 'true');
                }
            });
        }
    });

    // Ayarları Sıfırla
    const btnReset = document.getElementById('btnA11yReset');
    if (btnReset) {
        btnReset.addEventListener('click', () => {
            features.forEach(feature => {
                body.classList.remove(feature.class);
                const btn = document.getElementById(feature.id);
                if (btn) btn.classList.remove('active');
                localStorage.setItem(feature.key, 'false');
            });
            a11yPanel.classList.remove('open');
        });
    }
});
