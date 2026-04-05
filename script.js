// Элементы интерфейса
const welcomeScreen = document.getElementById('welcome-screen');
const editorUi = document.getElementById('editor-ui');
const startBtn = document.getElementById('start-btn');
const canvas = document.getElementById('canvas');
const controls = document.getElementById('editor-controls');
const noSelectionHint = document.getElementById('no-selection-hint');

// Поля инспектора
const propColor = document.getElementById('prop-color');
const propSize = document.getElementById('prop-size');
const deleteBtn = document.getElementById('delete-btn');
const saveBtn = document.getElementById('save-btn');
const exportBtn = document.getElementById('export-btn');

let selectedElement = null;

// 1. ПЕРЕХОД В РЕДАКТОР
startBtn.onclick = () => {
    welcomeScreen.style.opacity = '0';
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        editorUi.style.display = 'flex';
    }, 400);
};

// 2. ЛОГИКА СОЗДАНИЯ БЛОКОВ
function createBlock(type) {
    const wrapper = document.createElement('div');
    wrapper.className = 'dropped-item';
    
    let el;
    if (type === 'h1') {
        el = document.createElement('h1');
        el.innerText = 'Ваш заголовок';
        el.contentEditable = true;
    } else if (type === 'p') {
        el = document.createElement('p');
        el.innerText = 'Кликните сюда, чтобы изменить текст описания...';
        el.contentEditable = true;
    } else if (type === 'button') {
        el = document.createElement('button');
        el.className = 'c-btn';
        el.innerText = 'Кнопка-ссылка';
        // РЕАЛЬНАЯ ФУНКЦИЯ: Установка ссылки
        el.onclick = (e) => {
            e.stopPropagation();
            const url = prompt("Введите адрес ссылки (URL):", el.dataset.link || "https://");
            if(url) el.dataset.link = url;
        };
    } else if (type === 'image') {
        el = document.createElement('img');
        el.src = 'https://placeholder.com';
        // РЕАЛЬНАЯ ФУНКЦИЯ: Установка фото
        el.onclick = (e) => {
            e.stopPropagation();
            const src = prompt("Введите прямую ссылку на изображение:", el.src);
            if(src) el.src = src;
        };
    } else {
        el = document.createElement('div');
        el.className = 'divider';
    }

    wrapper.appendChild(el);
    wrapper.onclick = (e) => {
        e.stopPropagation();
        selectElement(wrapper);
    };
    return wrapper;
}

// 3. DRAG & DROP
document.querySelectorAll('.widget-item').forEach(w => {
    w.ondragstart = (e) => e.dataTransfer.setData('type', w.dataset.type);
});

canvas.ondragover = (e) => e.preventDefault();
canvas.ondrop = (e) => {
    const type = e.dataTransfer.getData('type');
    canvas.appendChild(createBlock(type));
};

// 4. ИНСПЕКТОР СВОЙСТВ
function selectElement(wrapper) {
    if (selectedElement) selectedElement.classList.remove('selected');
    selectedElement = wrapper;
    selectedElement.classList.add('selected');
    
    controls.style.display = 'block';
    noSelectionHint.style.display = 'none';

    const child = selectedElement.firstChild;
    propSize.value = parseInt(window.getComputedStyle(child).fontSize);
    propColor.value = rgbToHex(window.getComputedStyle(child).color || window.getComputedStyle(child).backgroundColor);
}

propColor.oninput = (e) => {
    const child = selectedElement.firstChild;
    if(child.tagName === 'BUTTON') child.style.backgroundColor = e.target.value;
    else child.style.color = e.target.value;
};

propSize.oninput = (e) => {
    selectedElement.firstChild.style.fontSize = e.target.value + 'px';
};

document.querySelectorAll('.a-btn').forEach(btn => {
    btn.onclick = () => { if(selectedElement) selectedElement.style.textAlign = btn.dataset.align; };
});

deleteBtn.onclick = () => {
    selectedElement.remove();
    selectedElement = null;
    controls.style.display = 'none';
    noSelectionHint.style.display = 'block';
};

// 5. СОХРАНЕНИЕ И ЭКСПОРТ
saveBtn.onclick = () => {
    localStorage.setItem('nolly_backup', canvas.innerHTML);
    alert('Проект успешно сохранен в памяти браузера!');
};

exportBtn.onclick = () => {
    const siteHtml = canvas.innerHTML;
    const finalFile = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>NollyDevelop Website</title>
    <style>
        body { font-family: sans-serif; display: flex; justify-content: center; padding: 50px; background: #f0f2f5; }
        .page { background: white; width: 100%; max-width: 800px; padding: 60px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        h1 { font-size: 3rem; margin-bottom: 20px; }
        p { font-size: 1.1rem; color: #4b5563; line-height: 1.6; }
        .c-btn { background: #238636; color: white; padding: 14px 28px; border-radius: 8px; display: inline-block; text-decoration: none; font-weight: bold; border: none; cursor: pointer; }
        img { width: 100%; border-radius: 12px; margin: 15px 0; }
        .divider { height: 1px; background: #eee; margin: 25px 0; }
    </style>
</head>
<body>
    <div class="page">${siteHtml}</div>
    <script>
        document.querySelectorAll('.c-btn').forEach(btn => {
            btn.onclick = () => { if(btn.dataset.link) window.location.href = btn.dataset.link; };
        });
    <\/script>
</body>
</html>`;

    const blob = new Blob([finalFile.replace(/contenteditable="true"/g, '')], {type: 'text/html'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'index.html';
    a.click();
};

// Инструмент для цвета
function rgbToHex(rgb) {
    if (!rgb || rgb.indexOf('rgb') === -1) return "#000000";
    const vals = rgb.match(/\d+/g);
    return "#" + vals.slice(0,3).map(x => parseInt(x).toString(16).padStart(2, '0')).join("");
}

// Загрузка при старте
window.onload = () => {
    const saved = localStorage.getItem('nolly_backup');
    if(saved) {
        canvas.innerHTML = saved;
        // Переподключаем события ко всем загруженным элементам
        Array.from(canvas.children).forEach(item => {
            item.onclick = (e) => { e.stopPropagation(); selectElement(item); };
            const child = item.firstChild;
            if(child.tagName === 'BUTTON') child.onclick = (e) => {
                e.stopPropagation();
                const url = prompt("URL ссылки:", child.dataset.link);
                if(url) child.dataset.link = url;
            };
            if(child.tagName === 'IMG') child.onclick = (e) => {
                e.stopPropagation();
                const src = prompt("URL фото:", child.src);
                if(src) child.src = src;
            };
        });
    }
};
