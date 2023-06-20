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


// Настройки для отправки почты
const transporter = nodemailer.createTransport({
  service: 'mail',
  auth: {
    user: 'katezhuravlevich@gmail.com', // email адрес отправителя
    pass: 'k5a6t5e6zhur8avlevich', // пароль от email отправителя
  },
});

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

const getEmailsFromDB = async () => {
  const result = await sequelize.query('SELECT email FROM clients', { type: Sequelize.QueryTypes.SELECT });
  return result.map(row => row.email);
};

const sendEmails = async () => {
  const emails = await getEmailsFromDB();
  const message = {
    from: 'katezhuravlevich@gmail.com', // email адрес отправителя
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

cron.schedule('* * * * *', () => {
  console.log('Отправка писем...');
  sendEmails();
});