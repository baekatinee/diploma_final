const cron = require('node-cron');
const nodemailer = require('nodemailer');
const { Pool } = require('pg');



// Настройки для отправки почты
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'example@gmail.com', // email адрес отправителя
    pass: 'password', // пароль от email отправителя
  },
});

// Функция для выборки email адресов из базы данных
const getEmailsFromDB = async () => {
  const client = await pool.connect();
  const result = await client.query('SELECT email FROM users'); // users - название таблицы с email адресами
  client.release();
  return result.rows.map(row => row.email);
};

// Функция для отправки письма на email адреса
const sendEmails = async () => {
  const emails = await getEmailsFromDB();
  const message = {
    from: 'example@gmail.com', // email адрес отправителя
    to: emails.join(','), // email адреса получателей, разделенные запятой
    subject: 'Тестовое письмо', // тема письма
    text: 'Привет, это тестовое письмо!', // текст письма
  };
  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Письма отправлены: ' + info.response);
    }
  });
};

// Запускаем таску cron для отправки писем каждый 10-й день месяца в 10:00
cron.schedule('0 10 10 * *', () => {
  console.log('Отправка писем...');
  sendEmails();
});