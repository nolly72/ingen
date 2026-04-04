/**
 * NOLLY ARCTIC OS - ЦЕНТРАЛЬНЫЙ ПРОЦЕССОР УПРАВЛЕНИЯ
 */

// 1. Навигация между модулями (SPA Logic)
function showPage(pageId) {
    // Скрываем все разделы
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => page.classList.remove('active'));

    // Снимаем выделение с кнопок меню
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    // Активируем нужный раздел
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        // Плавная прокрутка наверх при переключении
        document.querySelector('.main-area').scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Подсвечиваем активную кнопку
    const targetNav = document.getElementById('nav-' + pageId);
    if (targetNav) {
        targetNav.classList.add('active');
    }
}

// 2. Имитация живых системных данных
function updateLiveTelemetry() {
    // Находим все числовые значения в активных карточках
    const values = document.querySelectorAll('.data-value');
    
    values.forEach(el => {
        const text = el.innerText;
        
        // Обновляем только температуры (°C)
        if (text.includes('°C')) {
            let current = parseFloat(text);
            let change = (Math.random() * 0.4 - 0.2); // Колебание +/- 0.2
            el.innerText = (current + change).toFixed(1) + '°C';
        }
        
        // Обновляем мощность (kW)
        if (text.includes('kW')) {
            let current = parseFloat(text);
            let change = (Math.random() * 0.2 - 0.1); 
            el.innerText = (current + change).toFixed(1) + ' kW';
        }

        // Обновляем скорость связи (Mbps)
        if (text.includes('Mbps')) {
            let current = parseFloat(text);
            let change = Math.floor(Math.random() * 10 - 5);
            el.innerText = (current + change) + ' Mbps';
        }

        // Обновляем заряд АКБ (%)
        if (text.includes('%') && !text.includes('Signal')) {
            let current = parseInt(text);
            // Имитируем мизерный расход или заряд
            if (Math.random() > 0.8) {
                el.innerText = (current + (Math.random() > 0.5 ? 1 : -1)) + '%';
            }
        }
    });
}

// 3. Инициализация системы
document.addEventListener('DOMContentLoaded', () => {
    console.log("NOLLY ARCTIC OS: Инициализация ядра...");
    
    // Запуск цикла обновления телеметрии (раз в 3 секунды)
    setInterval(updateLiveTelemetry, 3000);

    // Добавляем звуковой визуальный отклик (hover-эффект на карточках)
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 0 20px var(--accent-glow)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = 'none';
        });
    });

    // Выводим приветствие в консоль браузера (для тех, кто будет смотреть код)
    console.log("%c NOLLY ARCTIC v4.8.2 ", "background: #38bdf8; color: #000; font-weight: bold;");
});

// Глобальный доступ для кнопок внутри HTML
window.showPage = showPage;
