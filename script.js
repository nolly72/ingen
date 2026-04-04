document.addEventListener('DOMContentLoaded', () => {
    // Элементы датчиков
    const tempVal = document.getElementById('tempValue');
    const tempBar = document.getElementById('tempProgress');
    const cpuVal = document.getElementById('cpuValue');
    const cpuBar = document.getElementById('cpuProgress');
    const netVal = document.getElementById('netValue');
    const netBar = document.getElementById('netProgress');
    const terminal = document.getElementById('logTerminal');

    // Кнопки
    const emergencyBtn = document.getElementById('emergencyBtn');
    const refreshBtn = document.getElementById('refreshBtn');

    // Функция для добавления строк в терминал
    function addLog(message, type = 'info') {
        const time = new Date().toLocaleTimeString();
        const line = document.createElement('div');
        line.className = 'term-line';
        
        let statusSpan = '';
        if (type === 'warn') statusSpan = 'class="warn"';
        
        line.innerHTML = `<span class="time">[${time}]</span> <span ${statusSpan}>${message}</span>`;
        terminal.appendChild(line);
        
        // Автопрокрутка терминала вниз
        terminal.scrollTop = terminal.scrollHeight;
    }

    // Имитация изменения данных
    function updateSensors() {
        // Температура (колебания вокруг 42 градусов)
        const t = (40 + Math.random() * 5).toFixed(1);
        tempVal.innerText = t;
        tempBar.style.width = (t * 1.5) + '%'; // Масштабируем для красоты

        // Нагрузка ЦПУ (прыгает от 10 до 40)
        const c = (10 + Math.random() * 30).toFixed(1);
        cpuVal.innerText = c;
        cpuBar.style.width = c + '%';

        // Трафик
        const n = Math.floor(700 + Math.random() * 200);
        netVal.innerText = n;
        netBar.style.width = (n / 10) + '%';
    }

    // Запускаем обновление каждые 3 секунды
    const sensorInterval = setInterval(updateSensors, 3000);

    // Обработка кнопки "Экстренная остановка"
    emergencyBtn.addEventListener('click', () => {
        addLog('ВНИМАНИЕ: Инициирована экстренная остановка!', 'warn');
        emergencyBtn.innerText = 'СИСТЕМА ОСТАНОВЛЕНА';
        emergencyBtn.style.background = '#da3633';
        
        // Меняем цвет всех индикаторов на красный
        document.querySelectorAll('.status-dot').forEach(dot => {
            dot.style.background = '#da3633';
            dot.style.boxShadow = '0 0 10px #da3633';
        });

        clearInterval(sensorInterval); // Останавливаем обновление данных
        addLog('Все процессы Sector-7 заморожены.', 'info');
    });

    // Кнопка обновления (ручной лог)
    refreshBtn.addEventListener('click', () => {
        addLog('Запрос к API: получение актуальных метаданных...');
        setTimeout(() => {
            addLog('Данные успешно синхронизированы.', 'info');
            updateSensors();
        }, 500);
    });

    // Приветственное сообщение
    setTimeout(() => {
        addLog('Система NOLLY OS запущена в штатном режиме.', 'info');
    }, 1000);
});
