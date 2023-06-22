const { Sequelize } = require('sequelize')
module.exports = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
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
    const clients = await Client.findAll();

    for (const client of clients) {
      await clientController.updateHasPaidStatus(client.id);
    }
  } catch (error) {
    console.error('An error occurred while executing the cron task:', error);
  }
}, {
  scheduled: true,
  timezone: 'Europe/Minsk' 
});
let transporter = nodemailer.createTransport({
  service: 'mail',
  host: 'smtp.mail.ru',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_LOGIN, 
    pass:  process.env.MAIL_PASSWORD, 
  },

});

// const getEmailsFromDB = async () => {
//   const clients = await Client.findAll();
//   return clients.map(client => client.email);
// };


// const sendEmails = async () => {
//   try {
//     const emails = await getEmailsFromDB();

//     const message = {
//       from: 'katezhuravlevich1@mail.ru', 
//       to: 'katezhuravlevich@gmail.com', 
//       subject: 'Напоминание о задолженности за стоянку в РОО "БФПС"', 
//       html: `
//           <div style="font-family: Arial, sans-serif;">
  
//             <h2 style="color: #333333;">Уважаемая Журавлевич Екатерина Александровна,</h2>
  
//             <p style="color: #333333;">Согласно нашим записям, мы хотели бы напомнить вам о задолженности перед РОО "БФПС", возникшей по договору №41 от 1 июня 2023 года.</p>
  
//             <p style="color: #333333;">Размер задолженности составляет <strong>103,00 белорусских рубля 00 копеек</strong>.</p>
  
//             <p style="color: #333333;">Просим вас внести оплату до <strong>12 июня 2023 года</strong>, чтобы избежать начисления пени за неуплату, согласно пункту 3.2 нашего договора.</p>
  
//             <p style="color: #333333;">Если у вас возникли вопросы или вам требуется дополнительная информация, пожалуйста, свяжитесь с нашим администратором:</p>
  
//             <p style="color: #333333;">Телефон: <strong>+375 44 789 89 25</strong></p>
  
//             <p style="color: #333333;">С уважением,<br>РОО "БФПС"</p>
  
//           </div>
//         `,
//     };

//     await transporter.sendMail(message);
//     console.log('Письма успешно отправлены');
//   } catch (error) {
//     console.error('Ошибка при отправке писем:', error);
//   }
// };

// cron.schedule('* * * * *', () => {
//   console.log('Отправка писем...');
//   sendEmails();
// });

