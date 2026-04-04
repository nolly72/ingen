/**
 * NOLLY ARCTIC OS - CORE MODULE
 * Управление интерфейсом и живой телеметрией
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. УМНАЯ НАВИГАЦИЯ (SPA) ---
    window.showPage = function(pageId) {
        // Скрываем все разделы
        const pages = document.querySelectorAll('.page-content');
        pages.forEach(page => page.classList.remove('active'));

        // Снимаем выделение с кнопок меню
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => item.classList.remove('active'));

        // Активируем нужную страницу
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // Подсвечиваем кнопку в меню
        const targetNav = document.getElementById('nav-' + pageId);
        if (targetNav) {
            targetNav.classList.add('active');
        }

        // Плавный скролл вверх (важно для мобильных устройств)
        const mainArea = document.querySelector('.main-area');
        mainArea.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // --- 2. ЖИВАЯ ТЕЛЕМЕТРИЯ (ДИНАМИКА 60 ВИДЖЕТОВ) ---
    function updateTelemetry() {
        // Ищем все числовые значения в активных виджетах
        const values = document.querySelectorAll('.widget-value');
        
        values.forEach(el => {
            let text = el.innerText;

            // Обновление Температуры (°C)
            if (text.includes('°C')) {
                let n = parseFloat(text);
                let change = (Math.random() * 0.4 - 0.2); // колебание +/- 0.2
                el.innerText = (n + change).toFixed(1) + '°C';
            }
            
            // Обновление Мощности (kW)
            if (text.includes('kW')) {
                let n = parseFloat(text);
                let change = (Math.random() * 0.1 - 0.05);
                el.innerText = (n + change).toFixed(1) + ' kW';
            }

            // Обновление Пинга (ms)
            if (text.includes('ms')) {
                let n = parseInt(text);
                let change = Math.floor(Math.random() * 4 - 2);
                if (n > 20) el.innerText = (n + change) + ' ms';
            }

            // Обновление Давления (hPa)
            if (text.includes('hPa')) {
                let n = parseInt(text);
                let change = Math.floor(Math.random() * 2 - 1);
                el.innerText = (n + change) + ' hPa';
            }

            // Обновление Процентов (%)
            if (text.includes('%') && !text.includes('EFF')) {
                let n = parseInt(text);
                if (Math.random() > 0.8) { // меняем редко для реализма
                    let change = Math.random() > 0.5 ? 1 : -1;
                    if (n > 5 && n < 99) el.innerText = (n + change) + '%';
                }
            }
        });
    }

    // Запускаем цикл обновления данных каждые 2.5 секунды
    setInterval(updateTelemetry, 2500);

    // Добавляем визуальный отклик при нажатии на виджет (scale эффект)
    const widgets = document.querySelectorAll('.widget');
    widgets.forEach(w => {
        w.addEventListener('mousedown', () => {
            w.style.transform = 'scale(0.97) translateY(0)';
        });
        w.addEventListener('mouseup', () => {
            w.style.transform = '';
        });
    });

    console.log("Nolly Arctic OS: Все системы запущены. Режим мониторинга: Активен.");
});
