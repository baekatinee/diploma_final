const { Client, Rental, Payment, Ship } = require('../models/models')
const apiError = require('../error/apiError')


class clientController {
    async create(req, res, next) {
        try {
            const { surname, name, fathersName, email, phoneNumber, comment, hasPaid } = req.body
            const client = await Client.create({ surname, name, fathersName, email, phoneNumber, comment, hasPaid })
            if (!client) {
                res.status(404).send('Не удалось создать клиента из-за неверно введенных данных')
            }
            return res.json(client)
        } catch (e) {
            next(apiError.badRequest(e.message))
        }
    }
    async getAll(req, res, next) {
        try {
            let { surname, name, limit, page } = req.query;
            page = page || 1
            limit = limit || 15
            let offset = page * limit - limit
            let clients;
            if (!surname && !name) {
                clients = await Client.findAndCountAll({ limit, offset })
            }
            if (surname && !name) {
                clients = await Client.findAndCountAll({ where: { surname }, limit, offset })
            }
            if (!surname && name) {
                clients = await Client.findAndCountAll({ where: { name }, limit, offset })
            }
            if (surname && name) {
                clients = await Client.findAndCountAll({ where: { surname, name }, limit, offset })
            }
            return res.json(clients)
        }
        catch (e) {
            next(apiError.badRequest(e.message))
        }


    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const client = await Client.findOne(
                {
                    where: { id }
                }
            )
            if (!client) {
                res.status(404).send('Нет клиента с указанным id')
            }
            return res.json(client)
        }
        catch (e) {
            next(apiError.badRequest(e.message))
        }

    }

    async updateHasPaidStatus(rental) {
        try {
          const currentDate = new Date();
          const isSummer = isSummerSeason(currentDate);
        
          // Объявление функции isSummerSeason
          function isSummerSeason(date) {
            const month = date.getMonth();
        
            if (month >= 5 && month <= 7) {
              return true;
            }
        
            return false;
          }
        
          const { clientId } = rental;
          let hasPaid = true;
        
          // Получаем все оплаты для аренды
          const payments = await Payment.findAll({
            where: {
              rentalId: rental.id,
            },
          });
        
          // Суммируем стоимость оплат для аренды
          let totalPaymentAmount = 0;
          for (const payment of payments) {
            totalPaymentAmount += payment.sum;
          }
        
          // Получаем судно, связанное с арендой
          const ship = await Ship.findByPk(rental.shipId);
        
          // Получаем стоимость аренды в зависимости от времени года
          const rentalAmount = isSummer ? ship.priceSummer : ship.priceWinter;
        
          // Проверяем, равна ли сумма оплаты стоимости аренды
          if (totalPaymentAmount !== rentalAmount) {
            hasPaid = false;
          }
        
          // Обновляем поле hasPaid для клиента
          await Client.update({ hasPaid }, { where: { id: clientId } });
        
          console.log(`HasPaid status updated for rental with ID ${rental.id}`);
        } catch (error) {
          console.error('An error occurred while updating hasPaid status:', error);
        }
      }


    async updateOne(req, res, next) {
    try {
        const { id } = req.params;
        const { surname, name, fathersName, email, phoneNumber, comment } = req.body
        const findClientById = await Client.findOne(
            {
                where: { id }
            }
        )
        if (!findClientById) {
            res.status(404).send('Нет клиента с указанным id')
        }
        if (surname) findClientById.surname = surname;
        if (fathersName) findClientById.fathersName = fathersName;
        if (name) findClientById.name = name;
        if (phoneNumber) findClientById.phoneNumber = phoneNumber;
        if (email) findClientById.email = email;
        if (comment) findClientById.comment = comment;
        const updatedClient = await findClientById.save()
        if (!updatedClient) {
            res.status(404).send('Не удалось обновить данные клиента')
        }
        return res.json(updatedClient);
    } catch (e) {
        next(apiError.badRequest(e.message))
    }
}
    async destroy(req, res, next) {
    try {
        const { id } = req.params;
        const client = await Client.findOne({
            where: { id },
            include: [{ model: Rental }, { model: Payment }]
        });
        if (!client) {
            res.status(404).send('Нет клиента с указанным id');
        } else {
            for (const rental of client.rentals) {
                await rental.destroy({ cascade: true });
            }
            for (const payment of client.payments) {
                await payment.destroy({ cascade: true });
            }
            await client.destroy({ cascade: true });
            res.status(200).send({
                status: "success",
                message: "successfully"
            });
        }
    } catch (e) {
        next(apiError.badRequest(e.message));
    }
}



}

module.exports = new clientController()