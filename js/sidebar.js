/* =========================================
   YALOVA ÜNİVERSİTESİ — SIDEBAR JAVASCRIPT
   ========================================= */

'use strict';

// ---- MENÜ AÇ / KAPAT (HOVER İLE) ----
let menuTimeout;

function openMenu(key) {
    clearTimeout(menuTimeout);
    const navItem = document.getElementById('nav-' + key);
    const submenu = document.getElementById('submenu-' + key);

    if (!navItem || !submenu) return;

    // Diğer açık menüleri kapat
    document.querySelectorAll('.nav-item.has-sub.open').forEach(item => {
        if (item.id !== 'nav-' + key) {
            item.classList.remove('open', 'active');
            let nextEl = document.getElementById(item.id.replace('nav-', 'submenu-'));
            if(nextEl) nextEl.classList.remove('open');
        }
    });

    navItem.classList.add('open', 'active');
    submenu.classList.add('open');
}

function closeMenu(key) {
    menuTimeout = setTimeout(() => {
        const navItem = document.getElementById('nav-' + key);
        const submenu = document.getElementById('submenu-' + key);
        if (navItem) navItem.classList.remove('open', 'active');
        if (submenu) submenu.classList.remove('open');
    }, 150); // Ufak bir gecikme ekliyoruz ki fare submenu'ye geçerken kapanmasın
}

document.addEventListener('DOMContentLoaded', function() {
    // Hover eventlerini ekle
    const navItems = document.querySelectorAll('.nav-item.has-sub');
    navItems.forEach(item => {
        const key = item.id.replace('nav-', '');
        const submenu = document.getElementById('submenu-' + key);
        
        item.addEventListener('mouseenter', () => openMenu(key));
        item.addEventListener('mouseleave', () => closeMenu(key));
        
        if (submenu) {
            submenu.addEventListener('mouseenter', () => {
                clearTimeout(menuTimeout);
            });
            submenu.addEventListener('mouseleave', () => closeMenu(key));
        }
    });
    
    // Sayfa Yüklendiğinde Giriş Animasyonu
    const allNavItems = document.querySelectorAll('.nav-item');
    allNavItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-16px)';
        setTimeout(() => {
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 80 + index * 60);
    });
});

// Artık onclick'e gerek kalmadığı için toggleMenu boş bırakılabilir veya onlara dokunmuyoruz.
function toggleMenu(key) {
    // Eski tıklama bazlı sistem, hover eklendiği için iptal.
}

// ---- SUB-GROUP AÇ / KAPAT ----
function toggleSubGroup(key) {
    const group    = document.getElementById('subgroup-' + key);
    const arrow    = document.getElementById('subarrow-' + key);
    const groupEl  = group ? group.closest('.submenu-group') : null;

    if (!group || !groupEl) return;

    const isOpen = groupEl.classList.contains('open');
    groupEl.classList.toggle('open', !isOpen);
}

// ---- MOBİL SIDEBAR ----
function openSidebar() {
    const sidebar  = document.getElementById('sidebar');
    const overlay  = document.getElementById('sidebarOverlay');
    const hamburger = document.getElementById('hamburgerBtn');

    sidebar.classList.add('open');
    overlay.classList.add('active');
    hamburger.style.display = 'none';
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    const sidebar   = document.getElementById('sidebar');
    const overlay   = document.getElementById('sidebarOverlay');
    const hamburger = document.getElementById('hamburgerBtn');

    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    hamburger.style.display = '';
    document.body.style.overflow = '';
}

// ---- DİL SEÇİCİ ----
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        console.log('Dil seçildi:', this.textContent.trim());
    });
});

// ---- ARAMA FİLTRELEME ----
const searchInput = document.getElementById('sidebarSearch');
if (searchInput) {
    searchInput.addEventListener('input', function () {
        const query = this.value.trim().toLowerCase();

        if (!query) {
            // Arama temizlenince tüm menü öğelerini göster
            document.querySelectorAll('.nav-item').forEach(item => {
                item.style.display = '';
            });
            return;
        }

        document.querySelectorAll('.nav-item').forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(query) ? '' : 'none';

            // Eşleşen öğeler varsa aç
            if (text.includes(query)) {
                item.classList.add('open');
            }
        });
    });
}

// ---- ESCAPE TUŞU ile Kapat ----
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeSidebar();
    }
});

// Removed duplicate DOMContentLoaded
