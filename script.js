// Элементы интерфейса
const canvas = document.getElementById('canvas');
const widgets = document.querySelectorAll('.widget-item');
const inspector = document.getElementById('inspector');
const editorControls = document.getElementById('editor-controls');
const noSelectionMsg = document.getElementById('no-selection-msg');

// Контролы инспектора
const propColor = document.getElementById('prop-color');
const propSize = document.getElementById('prop-size');
const propMargin = document.getElementById('prop-margin');
const marginVal = document.getElementById('margin-val');
const deleteBtn = document.getElementById('delete-element');
const clearBtn = document.getElementById('clear-canvas');
const exportBtn = document.getElementById('export-btn');
const alignButtons = document.querySelectorAll('.align-btn');

let selectedElement = null;

// --- БАЗА ДАННЫХ ПРЕСЕТОВ (КОНТЕНТ ДЛЯ 10+ ВАРИАНТОВ) ---
const presets = {
    h1: {
        hero: "Создавайте Будущее С Нами",
        section: "Наши Преимущества",
    },
    h2: {
        section: "Как Это Работает"
    },
    h3: {
        about: "О Нашей Команде",
        price: "Тарифные Планы"
    },
    p: {
        desc: "Мы предлагаем инновационные решения для вашего бизнеса, используя передовые технологии программирования.",
        mission: "Наша миссия — сделать профессиональную разработку доступной каждому через удобные инструменты.",
        review: "«NollyDevelop — это лучший конструктор, который я когда-либо использовал. Скорость работы впечатляет!»",
        footer: "© 2026 NollyDevelop. Все права защищены. Сделано с любовью к коду."
    },
    button: {
        primary: "Начать Работу",
        outline: "Узнать Больше",
        buy: "Заказать Проект"
    },
    image: {
        banner: "ГЛАВНОЕ ИЗОБРАЖЕНИЕ"
    },
    divider: {
        line: "thin",
        bold: "bold"
    }
};

// --- 1. DRAG & DROP ---

widgets.forEach(widget => {
    widget.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('type', widget.getAttribute('data-type'));
        e.dataTransfer.setData('preset', widget.getAttribute('data-preset'));
    });
});

canvas.addEventListener('dragover', (e) => e.preventDefault());

canvas.addEventListener('drop', (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('type');
    const preset = e.dataTransfer.getData('preset');
    
    const placeholder = canvas.querySelector('.canvas-placeholder');
    if (placeholder) placeholder.remove();

    const newEl = createBlock(type, preset);
    canvas.appendChild(newEl);
    selectElement(newEl);
});

// --- 2. СОЗДАНИЕ БЛОКА ---

function createBlock(type, preset) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('dropped-item');
    
    let el = document.createElement(type);
    const content = presets[type][preset];

    if (type === 'button') {
        el = document.createElement('a');
        el.classList.add('custom-btn');
        el.href = "#";
        el.innerText = content;
    } else if (type === 'image') {
        el = document.createElement('div');
        el.classList.add('img-box');
        el.innerHTML = `<i class="fas fa-image"></i> &nbsp; ${content}`;
    } else if (type === 'divider') {
        el = document.createElement('div');
        el.classList.add(preset === 'bold' ? 'divider-bold' : 'divider-line');
    } else {
        el.innerText = content;
        // ВКЛЮЧАЕМ ПРЯМОЕ РЕДАКТИРОВАНИЕ ТЕКСТА
        el.setAttribute('contenteditable', 'true');
    }

    wrapper.appendChild(el);

    wrapper.addEventListener('click', (e) => {
        e.stopPropagation();
        selectElement(wrapper);
    });

    return wrapper;
}

// --- 3. ИНСПЕКТОР И СТИЛИ ---

function selectElement(wrapper) {
    if (selectedElement) selectedElement.classList.remove('selected');
    selectedElement = wrapper;
    selectedElement.classList.add('selected');

    noSelectionMsg.style.display = 'none';
    editorControls.style.display = 'block';

    const child = selectedElement.firstChild;
    const style = window.getComputedStyle(child);
    
    // Синхронизируем панель свойств
    propSize.value = parseInt(style.fontSize);
    propColor.value = rgbToHex(style.color);
    propMargin.value = parseInt(window.getComputedStyle(selectedElement).marginTop) || 0;
    marginVal.innerText = propMargin.value + 'px';
}

propColor.addEventListener('input', (e) => {
    const child = selectedElement.firstChild;
    if (child.classList.contains('custom-btn')) {
        child.style.backgroundColor = e.target.value;
    } else {
        child.style.color = e.target.value;
    }
});

propSize.addEventListener('input', (e) => {
    selectedElement.firstChild.style.fontSize = e.target.value + 'px';
});

propMargin.addEventListener('input', (e) => {
    selectedElement.style.marginTop = e.target.value + 'px';
    marginVal.innerText = e.target.value + 'px';
});

alignButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const align = btn.getAttribute('data-align');
        selectedElement.style.textAlign = align;
        alignButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

deleteBtn.addEventListener('click', () => {
    selectedElement.remove();
    editorControls.style.display = 'none';
    noSelectionMsg.style.display = 'block';
});

clearBtn.addEventListener('click', () => {
    if(confirm('Очистить проект?')) location.reload();
});

// --- 4. ЭКСПОРТ (СКАЧИВАНИЕ САЙТА) ---

exportBtn.addEventListener('click', () => {
    const content = canvas.innerHTML;
    const htmlFile = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>NollyDevelop Website</title>
    <style>
        body { font-family: sans-serif; display: flex; justify-content: center; padding: 50px; background: #f0f2f5; }
        .page { background: white; width: 100%; max-width: 800px; padding: 60px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        h1 { font-size: 3.5rem; margin-bottom: 20px; }
        p { font-size: 1.1rem; color: #4b5563; line-height: 1.6; }
        .custom-btn { background: #2563eb; color: white; padding: 15px 30px; border-radius: 8px; display: inline-block; text-decoration: none; font-weight: bold; }
        .divider-line { height: 1px; background: #eee; width: 100%; margin: 25px 0; }
        .img-box { width: 100%; height: 250px; background: #f3f4f6; display: flex; align-items: center; justify-content: center; border-radius: 12px; color: #94a3b8; }
    </style>
</head>
<body>
    <div class="page">${content}</div>
</body>
</html>`;

    const blob = new Blob([htmlFile.replace(/contenteditable="true"/g, '')], {type: 'text/html'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'index.html';
    a.click();
});

function rgbToHex(rgb) {
    if (!rgb || rgb.indexOf('rgb') === -1) return "#000000";
    const vals = rgb.match(/\d+/g);
    return "#" + vals.slice(0,3).map(x => parseInt(x).toString(16).padStart(2, '0')).join("");
}
