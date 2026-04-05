document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ПЕРЕКЛЮЧЕНИЕ СТРАНИЦ (SPA LOGIC) ---
    window.showPage = function(pageId) {
        const pages = document.querySelectorAll('.page-content');
        pages.forEach(page => page.classList.remove('active'));

        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => item.classList.remove('active'));

        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        const targetNav = document.getElementById('nav-' + pageId);
        if (targetNav) {
            targetNav.classList.add('active');
        }

        const mainArea = document.querySelector('.main-area');
        mainArea.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // --- 2. ЖИВАЯ ТЕЛЕМЕТРИЯ (ДИНАМИКА 60 ВИДЖЕТОВ) ---
    function simulateTelemetry() {
        const values = document.querySelectorAll('.widget-value');
        
        values.forEach(el => {
            let currentText = el.innerText;

            if (currentText.includes('°C')) {
                let val = parseFloat(currentText);
                let change = (Math.random() * 0.6 - 0.3);
                el.innerText = (val + change).toFixed(1) + '°C';
            }
            
            if (currentText.includes('kW')) {
                let val = parseFloat(currentText);
                let change = (Math.random() * 0.2 - 0.1); 
                el.innerText = (val + change).toFixed(1) + ' kW';
            }

            if (currentText.includes('%') && !currentText.includes('EFF')) {
                let val = parseInt(currentText);
                if (Math.random() > 0.8) {
                    let change = Math.random() > 0.5 ? 1 : -1;
                    if (val > 5 && val < 99) el.innerText = (val + change) + '%';
                }
            }

            if (currentText.includes('ms')) {
                let val = parseInt(currentText);
                let change = Math.floor(Math.random() * 4 - 2);
                if (val > 20) el.innerText = (val + change) + ' ms';
            }

            if (currentText.includes('hPa') || currentText.includes('Bar')) {
                let val = parseFloat(currentText);
                let change = (Math.random() * 0.2 - 0.1);
                let unit = currentText.includes('hPa') ? ' hPa' : ' Bar';
                el.innerText = (val + change).toFixed(currentText.includes('hPa') ? 0 : 2) + unit;
            }
        });
    }

    setInterval(simulateTelemetry, 2500);

    // --- 3. ВИЗУАЛЬНЫЙ ОТКЛИК ---
    const widgets = document.querySelectorAll('.widget');
    widgets.forEach(w => {
        w.addEventListener('mousedown', () => {
            w.style.transform = 'scale(0.96) translateY(0px)';
        });
        w.addEventListener('mouseup', () => {
            w.style.transform = '';
        });
    });
});
