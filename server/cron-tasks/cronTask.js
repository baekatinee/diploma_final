const cron = require('node-cron');
const clientController = require('../controllers/clientController');
const rentalController = require('../controllers/rentalController');


// Запускаем крон-задачу с интервалом в 24 часа (примерно каждый день)
const task = cron.schedule('*/2 * * * *', async () => {
    try {
        await rentalController.checkRentalExpiration()
        await clientController.updateHasPaidStatus(req, res, next);
    } catch (error) {
        // Обработка ошибок при выполнении задачи
        console.error('An error occurred while checking rental expiration:', error);
    }
}, {
    scheduled: true,
    timezone: 'your_timezone' // Укажите ваш часовой пояс
});

// Запускаем крон-задачу
task.start();