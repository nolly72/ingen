// Основные элементы интерфейса
const canvas = document.getElementById('canvas');
const widgets = document.querySelectorAll('.widget-item');
const inspector = document.getElementById('inspector');
const editorControls = document.getElementById('editor-controls');
const noSelectionMsg = document.getElementById('no-selection-msg');

// Поля управления в инспекторе
const propText = document.getElementById('prop-text');
const propColor = document.getElementById('prop-color');
const propSize = document.getElementById('prop-size');
const propMargin = document.getElementById('prop-margin');
const marginVal = document.getElementById('margin-val');
const deleteBtn = document.getElementById('delete-element');
const clearBtn = document.getElementById('clear-canvas');
const exportBtn = document.getElementById('export-btn');
const alignButtons = document.querySelectorAll('.align-btn');

let selectedElement = null;

// --- 1. ЛОГИКА ПЕРЕТАСКИВАНИЯ (DRAG & DROP) ---

widgets.forEach(widget => {
    widget.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('type', widget.getAttribute('data-type'));
        widget.style.opacity = '0.5';
    });
    
    widget.addEventListener('dragend', () => {
        widget.style.opacity = '1';
    });
});

canvas.addEventListener('dragover', (e) => {
    e.preventDefault(); // Позволяет сбросить элемент
});

canvas.addEventListener('drop', (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('type');
    
    // Удаляем подсказку, если она есть
    const placeholder = canvas.querySelector('.canvas-placeholder');
    if (placeholder) placeholder.remove();

    const newElement = createNewElement(type);
    canvas.appendChild(newElement);
    selectElement(newElement);
});

// --- 2. СОЗДАНИЕ ЭЛЕМЕНТОВ ---

function createNewElement(type) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('dropped-item');
    
    let content = '';
    
    switch(type) {
        case 'h1':
            content = '<h1 style="margin:0;">Новый заголовок</h1>';
            break;
        case 'p':
            content = '<p style="margin:0;">Введите ваш текст здесь...</p>';
            break;
        case 'button':
            content = '<a href="#" class="custom-btn">Нажми меня</a>';
            break;
        case 'image':
            content = '<div class="img-box"><i class="fas fa-image"></i> &nbsp; Место для фото</div>';
            break;
        case 'divider':
            content = '<div class="divider-line"></div>';
            break;
    }
    
    wrapper.innerHTML = content;

    // Клик по элементу для выбора
    wrapper.addEventListener('click', (e) => {
        e.stopPropagation();
        selectElement(wrapper);
    });

    return wrapper;
}

// --- 3. ВЫБОР И РЕДАКТИРОВАНИЕ ---

function selectElement(el) {
    // Снимаем выделение с предыдущего
    if (selectedElement) selectedElement.classList.remove('selected');
    
    selectedElement = el;
    selectedElement.classList.add('selected');

    // Показываем панель управления
    noSelectionMsg.style.display = 'none';
    editorControls.style.display = 'block';

    // Заполняем данные в инспекторе текущими значениями
    const target = selectedElement.firstChild;
    propText.value = target.innerText || "";
    propColor.value = rgbToHex(window.getComputedStyle(target).color);
    propSize.value = parseInt(window.getComputedStyle(target).fontSize);
    
    const currentMargin = parseInt(selectedElement.style.marginTop) || 0;
    propMargin.value = currentMargin;
    marginVal.innerText = currentMargin + 'px';
}

// Изменение текста
propText.addEventListener('input', (e) => {
    if (selectedElement) {
        const target = selectedElement.firstChild;
        if (target.tagName !== 'DIV') { // Не меняем текст у разделителей/картинок-заглушек
            target.innerText = e.target.value;
        }
    }
});

// Изменение цвета
propColor.addEventListener('input', (e) => {
    if (selectedElement) {
        selectedElement.firstChild.style.color = e.target.value;
        if(selectedElement.firstChild.classList.contains('custom-btn')) {
            selectedElement.firstChild.style.backgroundColor = e.target.value;
            selectedElement.firstChild.style.color = '#fff';
        }
    }
});

// Изменение размера
propSize.addEventListener('input', (e) => {
    if (selectedElement) {
        selectedElement.firstChild.style.fontSize = e.target.value + 'px';
    }
});

// Изменение отступа
propMargin.addEventListener('input', (e) => {
    if (selectedElement) {
        selectedElement.style.marginTop = e.target.value + 'px';
        marginVal.innerText = e.target.value + 'px';
    }
});

// Выравнивание
alignButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (selectedElement) {
            const align = btn.getAttribute('data-align');
            selectedElement.style.textAlign = align;
            
            alignButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }
    });
});

// Удаление элемента
deleteBtn.addEventListener('click', () => {
    if (selectedElement) {
        selectedElement.remove();
        selectedElement = null;
        editorControls.style.display = 'none';
        noSelectionMsg.style.display = 'block';
    }
});

// Очистка всего холста
clearBtn.addEventListener('click', () => {
    if(confirm('Вы уверены, что хотите очистить весь проект?')) {
        canvas.innerHTML = `
            <div class="canvas-placeholder">
                <i class="fas fa-plus-circle"></i>
                <p>Ваш будущий сайт начинается здесь</p>
            </div>`;
        editorControls.style.display = 'none';
        noSelectionMsg.style.display = 'block';
    }
});

// --- 4. ЭКСПОРТ В HTML ---

exportBtn.addEventListener('click', () => {
    const projectContent = canvas.innerHTML;
    
    // Создаем чистую разметку для итогового файла
    const fullHtml = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Сайт создан в NollyDevelop</title>
    <style>
        body { font-family: sans-serif; line-height: 1.6; color: #333; display: flex; justify-content: center; padding: 50px; background: #f4f4f9; }
        .container { background: white; width: 100%; max-width: 800px; padding: 60px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border-radius: 8px; }
        h1 { font-size: 3rem; margin-bottom: 20px; }
        p { font-size: 1.1rem; margin-bottom: 15px; }
        .custom-btn { background: #238636; color: white; padding: 14px 28px; border-radius: 8px; display: inline-block; text-decoration: none; font-weight: bold; }
        .divider-line { height: 1px; background: #eee; width: 100%; margin: 30px 0; }
        .img-box { width: 100%; height: 300px; background: #eee; display: flex; align-items: center; justify-content: center; border-radius: 12px; color: #aaa; }
        .dropped-item { position: relative; }
    </style>
</head>
<body>
    <div class="container">
        ${projectContent}
    </div>
</body>
</html>`;

    // Убираем служебные классы выделения перед скачиванием
    const cleanHtml = fullHtml.replace(/selected/g, '').replace(/canvas-placeholder/g, 'hidden');

    const blob = new Blob([cleanHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nolly-site.html';
    a.click();
});

// Вспомогательная функция для конвертации цвета
function rgbToHex(rgb) {
    if (!rgb) return "#000000";
    const res = rgb.match(/\d+/g);
    if (!res) return "#000000";
    return "#" + res.slice(0, 3).map(x => {
        const hex = parseInt(x).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }).join("");
}
