document.addEventListener("DOMContentLoaded", () => {
    // 1. IP ve Konum Çekme
    fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
            document.getElementById('visitor-ip').innerText = data.ip || 'Bilinmiyor';
            document.getElementById('visitor-location').innerText = `${data.city}, ${data.region}, ${data.country_name}` || 'Bilinmiyor';
        })
        .catch(() => {
            document.getElementById('visitor-ip').innerText = '127.0.0.1';
            document.getElementById('visitor-location').innerText = 'Bursa, Türkiye';
        });

    // 2. Tarayıcı Tespiti
    let ua = navigator.userAgent;
    let browser = "Bilinmiyor";
    if (ua.includes("Firefox")) browser = "Firefox";
    else if (ua.includes("SamsungBrowser")) browser = "Samsung Internet";
    else if (ua.includes("Opera") || ua.includes("OPR")) browser = "Opera";
    else if (ua.includes("Edge")) browser = "Edge";
    else if (ua.includes("Chrome")) browser = "Chrome";
    else if (ua.includes("Safari")) browser = "Safari";
    document.getElementById('visitor-browser').innerText = browser;

    // 3. Cihaz ve İşletim Sistemi Tespiti
    let os = "Bilinmiyor";
    if (ua.includes("Win")) os = "Windows";
    else if (ua.includes("Mac")) os = "MacOS";
    else if (ua.includes("Linux")) os = "Linux";
    else if (ua.includes("Android")) os = "Android";
    else if (ua.includes("like Mac")) os = "iOS";

    document.getElementById('visitor-os').innerText = os;
    document.getElementById('visitor-device').innerText = /Mobi|Android/i.test(ua) ? "Mobile" : "Desktop";

    // 4. Ekran Çözünürlüğü
    document.getElementById('visitor-screen').innerText = `${window.screen.width} × ${window.screen.height}`;

    // 5. Ziyaret Sayısı (LocalStorage)
    let visits = localStorage.getItem('visit_count');
    let firstDate = localStorage.getItem('first_visit_date');
    let today = new Date().toLocaleDateString('tr-TR');

    if (!visits) {
        visits = 1;
        firstDate = today;
        localStorage.setItem('first_visit_date', firstDate);
    } else {
        visits = parseInt(visits) + 1;
    }
    localStorage.setItem('visit_count', visits);

    document.getElementById('visitor-count').innerText = visits;
    document.getElementById('visitor-date').innerText = firstDate;
});