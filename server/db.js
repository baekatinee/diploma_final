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