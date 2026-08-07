document.addEventListener("DOMContentLoaded", function() {
    const chatBtn = document.getElementById("chatbotBtn");
    const chatWindow = document.getElementById("chatbotWindow");
    const chatClose = document.getElementById("chatbotClose");
    const chatInput = document.getElementById("chatbotInput");
    const chatSend = document.getElementById("chatbotSend");
    const chatMessages = document.getElementById("chatbotMessages");

    if(!chatBtn || !chatWindow) return;

    // Toggle Chat Window
    chatBtn.addEventListener("click", function() {
        chatWindow.classList.toggle("open");
        if(chatWindow.classList.contains("open")) {
            chatInput.focus();
        }
    });

    chatClose.addEventListener("click", function() {
        chatWindow.classList.remove("open");
    });

    // Send Message Logic
    function sendMessage() {
        const text = chatInput.value.trim();
        if(text === "") return;

        // User Message
        addMessage(text, "user");
        chatInput.value = "";

        // Scroll to bottom
        scrollToBottom();

        // Bot Response Delay
        setTimeout(function() {
            botReply(text);
        }, 600);
    }

    function addMessage(text, sender) {
        const msgDiv = document.createElement("div");
        msgDiv.classList.add("chatbot-msg", sender);
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function botReply(userText) {
        const lowerText = userText.toLowerCase();
        let reply = "Size tam olarak yardımcı olamıyorum. Detaylı bilgi için yalova.edu.tr adresinden İletişim bölümüne veya Öğrenci İşlerine başvurabilirsiniz.";

        if(lowerText.includes("merhaba") || lowerText.includes("selam")) {
            reply = "Merhaba! Size nasıl yardımcı olabilirim?";
        } else if(lowerText.includes("kayıt") || lowerText.includes("tarih")) {
            reply = "2026-2027 Eğitim Öğretim yılı kayıt tarihleri Ağustos ayı içerisinde açıklanacaktır. Lütfen duyuruları takip ediniz.";
        } else if(lowerText.includes("yemek")) {
            reply = "Aylık yemek menüsüne, yukarıdaki 'Öğrenci' menüsünün altından 'Aylık Yemek Menüsü'ne tıklayarak ulaşabilirsiniz.";
        } else if(lowerText.includes("bölüm") || lowerText.includes("fakülte")) {
            reply = "Üniversitemizde Hukuk, İİBF, İlahiyat, Mühendislik, Sanat ve Tasarım, Tıp ve Sağlık Bilimleri fakülteleri bulunmaktadır.";
        } else if(lowerText.includes("iletişim") || lowerText.includes("telefon")) {
            reply = "İletişim numaralarımız: 0226 815 50 00. Telefon rehberi için 'Öğrenci' -> 'Telefon Rehberi' sekmesini kullanabilirsiniz.";
        } else if(lowerText.includes("yaz okulu")) {
            reply = "Yaz okulu başvuru ve akademik takvim detayları Bahar dönemi sonunda ÖİDB sayfası üzerinden duyurulmaktadır.";
        }

        addMessage(reply, "bot");
        scrollToBottom();
    }

    // Event Listeners for Input
    chatSend.addEventListener("click", sendMessage);
    
    chatInput.addEventListener("keypress", function(e) {
        if(e.key === "Enter") {
            sendMessage();
        }
    });
});
