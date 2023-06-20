const cron = require('node-cron');
const clientController = require('../controllers/clientController');
const rentalController = require('../controllers/rentalController');

// Запускаем крон-задачу в 12:36 каждый день
const task = cron.schedule('* * * * *', async () => {
  try {
    await rentalController.checkRentalExpiration();
    // Получаем список клиентов, для которых нужно обновить статус hasPaid
    const clients = await clientController.getAll(req, res, next);

    // Обновляем статус hasPaid для каждого клиента
    for (const client of clients) {
      await clientController.updateHasPaidStatus(client.id);
    }
    console.log('Cron task executed at 12:36');
  } catch (error) {
    console.error('An error occurred while executing the cron task:', error);
  }
}, {
  scheduled: true,
  timezone: 'Europe/Minsk' 
});

