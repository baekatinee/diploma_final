const { Rental, Payment } = require('../models/models')
const { Ship } = require('../models/models')
const { Client } = require('../models/models')
const apiError = require('../error/apiError')
const { clientController } = require('./clientController')
class rentalController {
  async create(req, res, next) {
    try {
      const { dateStart, dateEnd, clientId, shipId } = req.body;
      const rental = await Rental.create({ dateStart, dateEnd, clientId, shipId });
      if (!rental) {
        return res.status(404).send('Не удалось создать аренду из-за неверно введенных данных');
      }
      await rentalController.checkRentalExpiration;
      return res.json(rental);
    } catch (e) {
      return next(apiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      let { clientId, shipId, limit, page } = req.query;
      page = page || 1;
      limit = limit || 17;
      const offset = (page - 1) * limit;
      let rentals;
      const whereClause = {};
      if (clientId) {
        whereClause.clientId = clientId;
      }
      if (shipId) {
        whereClause.shipId = shipId;
      }
      rentals = await Rental.findAndCountAll({
        where: whereClause,
        limit,
        offset,
        include: [Client, Ship]
      });
      return res.json(rentals);
    } catch (e) {
      return next(apiError.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const rental = await Rental.findOne({
        where: { id },
        include: [Client, Ship]
      });
      if (!rental) {
        return res.status(404).send('Такой аренды не существует в базе');
      }
      return res.json(rental);
    } catch (e) {
      return next(apiError.badRequest(e.message));
    }
  }

  async updateOne(req, res, next) {
    try {
      const { id } = req.params;
      const { dateStart, dateEnd, clientId, shipId } = req.body;
      const rental = await Rental.findOne({
        where: { id },
        include: [Client, Ship]
      });
      if (!rental) {
        return res.status(404).send('Такой аренды не существует в базе');
      }
      if (dateStart) {
        rental.dateStart = dateStart;
      }
      if (dateEnd) {
        rental.dateEnd = dateEnd;
      }
      if (clientId) {
        rental.clientId = clientId;
      }
      if (shipId) {
        rental.shipId = shipId;
      }
      const updatedRental = await rental.save();
      if (!updatedRental) {
        return res.status(400).send('Не удалось сохранить изменения');
      }
      await clientController.updateHasPaidStatus(clientId);
      await rentalController.checkRentalExpiration();
      return res.json(updatedRental);
    } catch (e) {
      return next(apiError.badRequest(e.message));
    }
  }

  async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const rental = await Rental.findOne({
        where: { id },
    });
      if (!rental) {
        return res.status(404).send('Такой аренды не существует в базе');
      }
      const payments = await Payment.findAll({
        where: { rentalId: id },
      });

      if (payments.length === 0) {
        res.status(404).send('Нет оплат, связанных с указанной арендой');
      } else {
        for (const payment of payments) {
          await payment.destroy();
        }
      }
      await rental.destroy();

      res.status(200).send({
        status: 'success',
        message: 'Аренда успешно удалена',
      });
    } catch (error) {
      next(apiError.badRequest(error.message));
    }
  }

  async checkRentalExpiration() {
    try {
      const currentDate = new Date();
      const rentals = await Rental.findAll();
  
      for (const rental of rentals) {
        const { dateEnd, clientId } = rental;
  
        if (currentDate > dateEnd) {
          const client = await Client.findByPk(clientId);
  
          if (client) {
            const isSummer = isSummerSeason(currentDate);
            const ship = await Ship.findByPk(rental.shipId);
            const rentalAmount = isSummer ? ship.priceSummer : ship.priceWinter;
  
            const payments = await Payment.findAll({
              where: {
                rentalId: rental.id,
              },
            });
  
            let totalPaymentAmount = 0;
            const paymentMonths = [];
  
            for (const payment of payments) {
              const paymentMonth = payment.dateStart.getMonth();
  
              if (!paymentMonths.includes(paymentMonth)) {
                totalPaymentAmount += payment.sum;
                paymentMonths.push(paymentMonth);
              }
            }
  
            const hasPaid = totalPaymentAmount >= rentalAmount;
            const debtAmount = hasPaid ? 0 : rentalAmount - totalPaymentAmount;
  
            if (!hasPaid) {
              const interest = rentalAmount * 0.001; // 0.1% of rentalAmount
              const missingPayment = rentalAmount / 30 + interest;
  
              client.debtAmount += missingPayment; // Увеличить сумму задолженности клиента на сумму пени
              await client.save();
  
              totalPaymentAmount += missingPayment; // Увеличить общую сумму оплаты на сумму пени
            }
            client.hasPaid = totalPaymentAmount >= rentalAmount;
            client.debtAmount = debtAmount;
            await client.save();
          }
        }
      }
  
      console.log('Rental expiration checked successfully.');
    } catch (error) {
      console.error('An error occurred while checking rental expiration:', error);
    }
  }
  
  
     
}

module.exports = new rentalController()