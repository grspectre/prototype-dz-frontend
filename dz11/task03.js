// Файл: async-await.js

// Функция для имитации запроса к API с задержкой
function fetchData(url) {
    return new Promise((resolve, reject) => {
        console.log(`Запрос к ${url}...`);

        // Имитация сетевого запроса с задержкой 2 секунды
        setTimeout(() => {
            // Для демонстрации обработки ошибок
            if (url.includes('invalid')) {
                reject(new Error(`Ошибка загрузки данных из ${url}`));
                return;
            }

            if (url.includes('users')) {
                // Имитация ответа для первого запроса - список пользователей
                resolve([
                    { id: 1, name: 'Иван Петров', email: 'ivan@example.com' },
                    { id: 2, name: 'Анна Сидорова', email: 'anna@example.com' },
                    { id: 3, name: 'Петр Иванов', email: 'petr@example.com' }
                ]);
            } else if (url.includes('user/1')) {
                // Имитация ответа для второго запроса - данные о конкретном пользователе
                resolve({
                    id: 1,
                    name: 'Иван Петров',
                    email: 'ivan@example.com',
                    phone: '+7 (999) 123-45-67',
                    address: 'г. Москва, ул. Примерная, д. 1'
                });
            } else {
                // Общий ответ для других запросов
                resolve({ message: 'Данные успешно получены' });
            }
        }, 2000);
    });
}

// Функция задержки, использующая Promise
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Основная асинхронная функция с использованием async/await
async function loadUserData() {
    console.log('Запуск приложения (async/await версия)');

    try {
        // Первый запрос - получение списка пользователей
        const users = await fetchData('https://api.example.com/users');
        console.log('Получен список пользователей:', users);

        // Проверка наличия пользователей
        if (users.length === 0) {
            throw new Error('Список пользователей пуст');
        }

        // Добавляем искусственную задержку между запросами (1 секунда)
        console.log('Ожидание 1 секунду перед следующим запросом...');
        await delay(1000);

        // Второй запрос - получение данных о конкретном пользователе
        const firstUser = users[0];
        console.log(`Запрашиваем подробную информацию о пользователе: ${firstUser.name}`);

        const userDetails = await fetchData(`https://api.example.com/user/${firstUser.id}`);
        console.log('Получена подробная информация о пользователе:');
        console.log(userDetails);

        // Еще одна задержка для демонстрации
        console.log('Ожидание 1 секунду...');
        await delay(1000);

        console.log('Все запросы выполнены успешно');
        return userDetails; // Возвращаем результат, если он нужен вызывающему коду

    } catch (error) {
        // Обработка любых ошибок, возникших в блоке try
        console.error('Произошла ошибка:', error.message);
        throw error; // Перебрасываем ошибку, если это необходимо
    } finally {
        // Код, который выполнится в любом случае
        console.log('Завершение работы приложения');
    }
}

// Запуск асинхронной функции
loadUserData()
    .then(result => {
        // Этот блок выполнится, только если функция завершится успешно
        console.log('Получен результат:', result.name);
    })
    .catch(error => {
        // Этот блок перехватит ошибки, если они не были обработаны в самой функции
        console.error('Необработанная ошибка:', error.message);
    });

// Пример функции с ошибкой для демонстрации
async function loadInvalidData() {
    try {
        const data = await fetchData('https://api.example.com/invalid-url');
        console.log('Этот код не выполнится при ошибке');
    } catch (error) {
        console.error('Перехвачена ошибка в loadInvalidData:', error.message);
    }
}

// Раскомментируйте, чтобы проверить обработку ошибок
loadInvalidData();
