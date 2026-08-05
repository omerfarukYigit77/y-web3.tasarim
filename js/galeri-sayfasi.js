// js/galeri-sayfasi.js

document.addEventListener('DOMContentLoaded', () => {
    // Fotoğraf Veri Tabanı (Mock Data)
    // Elimizdeki 5 fotoğrafı kullanarak sistemi kurguluyoruz
    const galleryData = [
        { id: 1, category: 'kampus', img: 'images/galeri1.jpg', title: 'Merkez Kampüs', desc: 'DOĞA İLE İÇ İÇE' },
        { id: 2, category: 'akademik', img: 'images/galeri2.jpg', title: 'Merkez Kütüphane', desc: '7/24 BİLGİYE ERİŞİM' },
        { id: 3, category: 'yasam', img: 'images/galeri3.jpg', title: 'Sosyal Yaşam', desc: 'CANLI VE DİNAMİK' },
        { id: 4, category: 'akademik', img: 'images/galeri4.jpg', title: 'Laboratuvarlar', desc: 'MODERN ALTYAPI' },
        { id: 5, category: 'etkinlik', img: 'images/galeri5.jpg', title: 'Mezuniyet Sevinci', desc: 'GELECEĞE İLK ADIM' },
        
        // Sayfalama (Pagination) mekanizmasının çalıştığını görmek için verileri çoğaltıyoruz
        { id: 6, category: 'kampus', img: 'images/galeri1.jpg', title: 'Rektörlük Binası', desc: 'YÖNETİM MERKEZİ' },
        { id: 7, category: 'yasam', img: 'images/galeri3.jpg', title: 'Bahar Şenlikleri', desc: 'MÜZİK VE EĞLENCE' },
        { id: 8, category: 'etkinlik', img: 'images/galeri5.jpg', title: 'Kariyer Fuarı', desc: 'İŞ DÜNYASIYLA BULUŞMA' },
        { id: 9, category: 'akademik', img: 'images/galeri4.jpg', title: 'Bilgisayar Laboratuvarı', desc: 'KODLAMA EĞİTİMİ' },
        { id: 10, category: 'kampus', img: 'images/galeri1.jpg', title: 'Spor Salonu', desc: 'SAĞLIKLI YAŞAM' },
        { id: 11, category: 'etkinlik', img: 'images/galeri2.jpg', title: 'Uluslararası Konferans', desc: 'BİLİMSEL GELİŞMELER' },
        { id: 12, category: 'yasam', img: 'images/galeri3.jpg', title: 'Öğrenci Kulüpleri', desc: 'SOSYALLEŞME' },
        { id: 13, category: 'kampus', img: 'images/galeri1.jpg', title: 'Merkez Yemekhane', desc: 'ÖĞLE ARASI' },
        { id: 14, category: 'akademik', img: 'images/galeri4.jpg', title: 'Mühendislik Fakültesi', desc: 'AR-GE ÇALIŞMALARI' },
        { id: 15, category: 'etkinlik', img: 'images/galeri5.jpg', title: 'Ödül Töreni', desc: 'BAŞARIYI KUTLAMA' },
    ];

    const ITEMS_PER_PAGE = 6;
    let currentPage = 1;
    let currentCategory = 'all';
    
    const gridContainer = document.getElementById('galleryGrid');
    const paginationContainer = document.getElementById('galleryPagination');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Kategoriyi isme çeviren yardımcı fonksiyon
    function getCategoryName(key) {
        const names = {
            'kampus': 'Kampüs',
            'akademik': 'Akademik',
            'etkinlik': 'Etkinlikler',
            'yasam': 'Öğrenci Yaşamı'
        };
        return names[key] || 'Kategori Yok';
    }

    // Galeri Render Fonksiyonu
    function renderGallery() {
        if (!gridContainer) return; // Sayfada element yoksa hata vermemesi için

        // 1. Filtreleme İşlemi
        let filteredData = galleryData;
        if (currentCategory !== 'all') {
            filteredData = galleryData.filter(item => item.category === currentCategory);
        }

        // 2. Toplam sayfa hesaplama
        const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE) || 1;
        
        // Sınır kontrolleri
        if (currentPage > totalPages) currentPage = totalPages;
        if (currentPage < 1) currentPage = 1;

        // 3. Dilimleme (Sayfa Başına Düşenleri Alma)
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const pageData = filteredData.slice(startIndex, endIndex);

        // 4. Grid'i Temizle
        gridContainer.innerHTML = '';

        // 5. Kartları Ekrana Bas
        if (pageData.length === 0) {
            gridContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--clr-text); font-weight: 500;">Bu kategoride fotoğraf bulunamadı.</p>';
        } else {
            pageData.forEach(item => {
                const card = document.createElement('div');
                card.className = 'gallery-card';
                card.innerHTML = `
                    <img src="${item.img}" alt="${item.title}">
                    <div class="gallery-card-overlay">
                        <p class="gallery-card-category">${getCategoryName(item.category)}</p>
                        <h3 class="gallery-card-title">${item.title}</h3>
                        <p style="margin: 0; font-size: 13px; opacity: 0.8;">${item.desc}</p>
                    </div>
                `;
                gridContainer.appendChild(card);
            });
        }

        // 6. Sayfalamayı Güncelle
        renderPagination(totalPages);
    }

    // Sayfalama (Pagination) Butonlarını Oluşturma
    function renderPagination(totalPages) {
        if (!paginationContainer) return;

        paginationContainer.innerHTML = '';

        if (totalPages <= 1) return; // Sayfa sayısı 1 ise sayfalama gizlenir

        // Geri Butonu
        const prevBtn = document.createElement('button');
        prevBtn.className = 'page-btn';
        prevBtn.innerHTML = '<i class="bi bi-chevron-left"></i>';
        prevBtn.disabled = currentPage === 1;
        prevBtn.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                renderGallery();
            }
        };
        paginationContainer.appendChild(prevBtn);

        // Numaralı Butonlar
        for (let i = 1; i <= totalPages; i++) {
            const numBtn = document.createElement('button');
            numBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
            numBtn.innerText = i;
            numBtn.onclick = () => {
                currentPage = i;
                renderGallery();
            };
            paginationContainer.appendChild(numBtn);
        }

        // İleri Butonu
        const nextBtn = document.createElement('button');
        nextBtn.className = 'page-btn';
        nextBtn.innerHTML = '<i class="bi bi-chevron-right"></i>';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.onclick = () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderGallery();
            }
        };
        paginationContainer.appendChild(nextBtn);
    }

    // Filtre Butonları Tıklama Olayı (Event Listener)
    if (filterBtns) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Aktif sınıfı güncelle
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                // Seçilen kategoriyi al
                currentCategory = e.target.getAttribute('data-filter');
                currentPage = 1; // Kategori değiştiğinde her zaman 1. sayfaya dön
                renderGallery();
            });
        });
    }

    // İlk Yüklemede Galeriyi Çalıştır
    renderGallery();
});
