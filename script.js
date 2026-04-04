/**
 * NOLLY ARCTIC OS - ЦЕНТРАЛЬНЫЙ ПРОЦЕССОР УПРАВЛЕНИЯ ВИДЖЕТАМИ
 */

// 1. Навигация (SPA Switcher)
function showPage(pageId) {
    // Скрываем все страницы
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => page.classList.remove('active'));

    // Деактивируем пункты меню
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    // Показываем целевую страницу
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        // Плавный скролл наверх
        document.querySelector('.main-area').scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Подсвечиваем активный пункт в сайдбаре
    const targetNav = document.getElementById('nav-' + pageId);
    if (targetNav) {
        targetNav.classList.add('active');
    }
}

// 2. Интеллектуальное обновление телеметрии
function updateWidgets() {
    // Выбираем все значения в активной области
    const widgets = document.querySelectorAll('.widget-value');
    
    widgets.forEach(val => {
        let text = val.innerText;

        // Обновление температуры (°C)
        if (text.includes('°C')) {
            let num = parseFloat(text);
            val.innerText = (num + (Math.random() * 0.2 - 0.1)).toFixed(1) + '°C';
        }
        
        // Обновление мощности (kW)
        if (text.includes('kW')) {
            let num = parseFloat(text);
            val.innerText = (num + (Math.random() * 0.1 - 0.05)).toFixed(1) + ' kW';
        }

        // Обновление давления (hPa / Bar)
        if (text.includes('hPa') || text.includes('Bar')) {
            let num = parseFloat(text);
            val.innerText = (num + (Math.random() * 0.4 - 0.2)).toFixed(1) + (text.includes('hPa') ? ' hPa' : ' Bar');
        }

        // Обновление связи (Mb / ms)
        if (text.includes('Mb') || text.includes('ms')) {
            let num = parseInt(text);
            val.innerText = (num + Math.floor(Math.random() * 4 - 2)) + (text.includes('Mb') ? ' Mb' : ' ms');
        }

        // Обновление процентов (%)
        if (text.includes('%') && !text.includes('EFF') && !text.includes('Sig')) {
            let num = parseInt(text);
            if (Math.random() > 0.7) {
                val.innerText = (num + (Math.random() > 0.5 ? 1 : -1)) + '%';
            }
        }
    });
}

// 3. Инициализация систем
document.addEventListener('DOMContentLoaded', () => {
    console.log("System Initialized: Nolly Arctic OS 8.0");

    // Запуск цикла обновления данных каждые 2.5 секунды
    setInterval(updateWidgets, 2500);

    // Добавляем звуковой визуальный эффект клика на виджеты
    const allWidgets = document.querySelectorAll('.widget');
    allWidgets.forEach(w => {
        w.addEventListener('click', () => {
            w.style.transform = 'scale(0.95)';
            w.style.borderColor = 'var(--accent)';
            setTimeout(() => {
                w.style.transform = 'translateY(-5px)';
            }, 100);
        });
    });
});

// Глобальный экспорт функции для HTML-атрибутов onclick
window.showPage = showPage;
