// Файл: promise-chain.js

// Функция для имитации запроса к API с задержкой 2 секунды
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

// Начало цепочки Promise
console.log('Запуск приложения');

fetchData('https://api.example.com/users')
    .then(users => {
        console.log('Получен список пользователей:', users);

        // Проверка наличия пользователей в списке
        if (users.length === 0) {
            throw new Error('Список пользователей пуст');
        }

        // Берем первого пользователя и делаем новый запрос
        const firstUser = users[0];
        console.log(`Запрашиваем подробную информацию о пользователе: ${firstUser.name}`);

        // Возвращаем новый Promise для продолжения цепочки
        return fetchData(`https://api.example.com/user/${firstUser.id}`);
    })
    .then(userDetails => {
        console.log('Получена подробная информация о пользователе:');
        console.log(userDetails);
        console.log('Все запросы выполнены успешно');
    })
    .catch(error => {
        // Обработка любых ошибок, возникших в цепочке Promise
        console.error('Произошла ошибка:', error.message);
    })
    .finally(() => {
        // Код, который выполнится независимо от успеха или неудачи
        console.log('Завершение работы приложения');
    });

fetchData('https://api.example.com/invalid-url')
    .then(data => console.log('Этот код не выполнится при ошибке'))
    .catch(error => console.error('Перехвачена ошибка:', error.message))
    ;
