document.getElementById('start-button').addEventListener('click', startTask);

function startTask() {
    // Отключаем кнопку во время выполнения задачи
    const startButton = document.getElementById('start-button');
    startButton.disabled = true;

    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const statusElement = document.getElementById('status');

    // Сбрасываем прогресс-бар и статус
    progressBar.style.width = '0%';
    progressText.textContent = '0%';
    statusElement.textContent = 'Выполнение задачи...';

    let progress = 0;
    const totalTime = 5; // 5 секунд
    const interval = 1000; // 1 секунда
    const increment = 100 / totalTime; // 20% за секунду

    // Обновляем прогресс-бар каждую секунду
    const timer = setInterval(() => {
        progress += increment;
        const currentProgress = Math.min(progress, 100); // Не больше 100%

        progressBar.style.width = currentProgress + '%';
        progressText.textContent = Math.round(currentProgress) + '%';

        // Проверяем, закончилась ли задача
        if (progress >= 100) {
            clearInterval(timer);
            statusElement.textContent = 'Готово!';
            startButton.disabled = false;
        }
    }, interval);
}
