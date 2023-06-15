const {Sequelize}=require('sequelize')
module.exports=new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect:'postgres',
        host:process.env.DB_HOST,
        port:process.env.DB_PORT,
    }
)

const cron = require('node-cron');
const nodemailer = require('nodemailer');
const { Pool } = require('pg');
const clientController = require('./controllers/clientController');
const rentalController = require('./controllers/rentalController');
const { Client } = require('./models/models');

const task = cron.schedule('* * * * *', async () => {
  try {
    await rentalController.checkRentalExpiration();
    // Получаем список клиентов, для которых нужно обновить статус hasPaid
    const clients = await Client.findAll();

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
  timezone: 'Europe/Minsk' // Укажите ваш часовой пояс, например, 'Europe/Minsk' для Беларуси
});


// // Настройки для отправки почты
// const transport = nodemailer.createTransport({
//   service: 'mail',
//   auth: {
//     user: 'art.petr1302@mail.ru', // email адрес отправителя
//     pass: 'htc3305509313', // пароль от email отправителя
//   },
// });

// Функция для выборки email адресов из базы данных
// const getEmailsFromDB = async () => {
//   const client = await sequelize.connect();
//   const result = await client.query('SELECT email FROM clients'); // users - название таблицы с email адресами
//   client.release();
//   return result.rows.map(row => row.email);
// };

// Функция для отправки письма на email адреса
// const sendEmails = async () => {
//  // const emails = await getEmailsFromDB();
//   const message = {
//     from: 'baekatineework@gmail.com', // email адрес отправителя
//     to: 'hakekwork@gmail.com',
//     //to: emails.join(','), // email адреса получателей, разделенные запятой
//     subject: 'Тестовое письмо', // тема письма
//     text: 'Привет, это тестовое письмо!', // текст письма
//   };
//   transporter.sendMail(message, (err, info) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log('Письма отправлены: ' + info.response);
//     }
//   });
// };
// const message = {
//     from: 'art.petr1302@mail.ru', // email адрес отправителя
//     to: 'hakekwork@gmail.com',
//     //to: emails.join(','), // email адреса получателей, разделенные запятой
//     subject: 'Тестовое письмо', // тема письма
//     text: 'Привет, это тестовое письмо!', // текст письма
//   };
//   transport.sendMail(message);
// Запускаем таску cron для отправки писем каждый 10-й день месяца в 10:00
// cron.schedule('58 21 4-31/4 * *', () => {
//   console.log('Отправка писем...');
//   transporter.sendMail(message);
// });