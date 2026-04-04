document.addEventListener('DOMContentLoaded', () => {
    const logList = document.getElementById('log-list');
    
    // Универсальная функция логов
    function addSystemLog(message, status = 'INFO') {
        if (!logList) return;
        const time = new Date().toLocaleTimeString();
        const li = document.createElement('li');
        li.className = 'log-item';
        li.innerHTML = `
            <span class="log-time">[${time}]</span>
            <span class="log-msg">${message}</span>
            <span class="log-status" style="color: ${status === 'WARN' ? 'var(--warning)' : 'var(--success)'}">${status}</span>
        `;
        logList.prepend(li);
        if (logList.children.length > 6) logList.lastElementChild.remove();
    }

    // ЛОГИКА ГЛАВНОЙ СТРАНИЦЫ (index.html)
    if (document.getElementById('tempVal')) {
        const actionBtn = document.getElementById('actionBtn');
        
        function updateMainSensors() {
            const t = (21 + Math.random() * 2).toFixed(1);
            document.getElementById('tempVal').innerHTML = `${t}<span class="card-unit">°C</span>`;
            document.getElementById('tempProgress').style.width = (t * 2) + '%';
            
            const p = Math.floor(85 + Math.random() * 5);
            document.getElementById('powerVal').innerHTML = `${p}<span class="card-unit">%</span>`;
            document.getElementById('powerProgress').style.width = p + '%';
        }

        setInterval(updateMainSensors, 4000);

        actionBtn.addEventListener('click', () => {
            addSystemLog('Запуск полной диагностики узла...', 'INIT');
            actionBtn.disabled = true;
            setTimeout(() => {
                addSystemLog('Все датчики откалиброваны.', 'OK');
                actionBtn.disabled = false;
            }, 2000);
        });
    }

    // ЛОГИКА СТРАНИЦЫ ЭНЕРГИИ (power.html)
    if (document.getElementById('solarVal')) {
        const boostBtn = document.getElementById('boostBtn');

        function updatePowerSensors() {
            const s = (1 + Math.random() * 0.5).toFixed(2);
            document.getElementById('solarVal').innerHTML = `${s}<span class="card-unit">kW</span>`;
            document.getElementById('solarProgress').style.width = (s * 50) + '%';

            const l = (2 + Math.random() * 2).toFixed(1);
            document.getElementById('loadVal').innerHTML = `${l}<span class="card-unit">kW</span>`;
            document.getElementById('loadProgress').style.width = (l * 20) + '%';
        }

        setInterval(updatePowerSensors, 3000);

        boostBtn.addEventListener('click', () => {
            addSystemLog('Форсирование мощности РИТЭГ...', 'BOOST');
            boostBtn.style.background = 'var(--warning)';
            setTimeout(() => {
                addSystemLog('Стабилизация потока выполнена.', 'DONE');
                boostBtn.style.background = 'var(--accent)';
            }, 1500);
        });
    }
});
