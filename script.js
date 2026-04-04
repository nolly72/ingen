/**
 * Arctic Node OS - Логика управления интерфейсом
 */

// Основная функция переключения страниц
function showPage(pageId) {
    // 1. Скрываем все страницы и убираем активный класс
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // 2. Деактивируем все пункты меню
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });

    // 3. Активируем нужную страницу
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // 4. Подсвечиваем соответствующий пункт в меню
    const targetNav = document.getElementById('nav-' + pageId);
    if (targetNav) {
        targetNav.classList.add('active');
    }

    // 5. Прокручиваем контент вверх при переключении
    document.querySelector('.main-area').scrollTop = 0;
}

// Имитация динамических данных (чтобы сайт выглядел "живым")
function simulateLiveDiagnostics() {
    // Обновляем температуру, если мы на дашборде
    const tempElement = document.querySelector('#dashboard .card:first-child b');
    if (tempElement) {
        const randomTemp = (-40 - Math.random() * 5).toFixed(1);
        tempElement.innerText = randomTemp + '°C';
    }

    // Обновляем мощность, если мы в энергосистеме
    const powerElement = document.querySelector('#power .card:first-child b');
    if (powerElement) {
        const randomPower = (5.5 + Math.random() * 0.8).toFixed(1);
        powerElement.innerText = randomPower + ' kW';
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    console.log("Arctic Node OS: System Ready");

    // Запускаем обновление данных каждые 5 секунд
    setInterval(simulateLiveDiagnostics, 5000);

    // Добавляем эффект мягкого появления для карточек при наведении
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = 'var(--accent)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = 'var(--glass-border)';
        });
    });
});
