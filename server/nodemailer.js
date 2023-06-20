const cron = require('node-cron');
const nodemailer = require('nodemailer');
const { Pool } = require('pg');
const sequelize = require('./db'); // Путь к файлу с настройками базы данных
const { QueryTypes } = require('sequelize');

// Настройки для отправки почты
const transporter = nodemailer.createTransport({
  service: 'mail',
  auth: {
    user: 'katezhuravlevich@gmail.com', // email адрес отправителя
    pass: 'k5a6t5e6zhur8avlevich', // пароль от email отправителя
  },
});

const getEmailsFromDB = async () => {
  const clients = await Client.findAll();
  return clients.map(client => client.email);
};


const sendEmails = async () => {

  try {

    const emails = await getEmailsFromDB();
    const message = {
      from: 'katezhuravlevich@gmail.com', // email адрес отправителя
      to: emails.join(','), // email адреса получателей, разделенные запятой
      subject: 'Тестовое письмо', // тема письма
      text: 'Привет, это тестовое письмо!', // текст письма
    };
    await transporter.sendMail(message);
    console.log('Письма отправлены');
  } catch (error) {
    console.error('Ошибка при отправке писем:', error);
  }
};

cron.schedule('* * * * *', () => {
  console.log('Отправка писем...');
  sendEmails();
});