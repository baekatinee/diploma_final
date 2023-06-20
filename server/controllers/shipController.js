const { Ship, Rental, Payment } = require('../models/models')
const { Type } = require('../models/models')
const apiError = require('../error/apiError')
const clientController = require('./clientController')

class shipController {
    async create(req, res, next) {
        try {
            const { length, name, typeId, priceSummer, priceWinter, number, parkingNumber } = req.body
            const ship = await Ship.create({ length, name, typeId, priceSummer, priceWinter, number, parkingNumber })
            if (!ship) {
                res.status(404).send('Не удалось создать судно из-за неверно введенных данных')
            }
            return res.json(ship)
        } catch (e) {
            next(apiError.badRequest(e.message))
        }
    }
    async getAll(req, res, next) {
        try {
            let { name, typeId, limit, page } = req.query;
            page = page || 1
            limit = limit || 19
            let offset = page * limit - limit
            let ships;
            if (!name && !typeId) {
                ships = await Ship.findAndCountAll({
                    limit, offset,
                })
            }
            if (name && !typeId) {
                ships = await Ship.findAndCountAll({
                    where: { name }, limit, offset,
                })
            }
            if (!name && typeId) {
                ships = await Ship.findAndCountAll({
                    where: { typeId }, limit, offset,
                    include: [
                        { model: Type },
                    ]
                })
            }
            if (name && typeId) {
                ships = await Ship.findAndCountAll({
                    where: { name, typeId }, limit, offset,
                    include: [
                        { model: Type },
                    ]
                })
            }

            return res.json(ships)
        } catch (e) {
            next(apiError.badRequest(e.message))
        }

    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const ship = await Ship.findOne(
                {
                    where: { id }
                }
            )
            if (!ship) {
                res.status(404).send('Такого судна не существует в базе')
            }
            return res.json(ship)
        }
        catch (e) {
            next(apiError.badRequest(e.message))
        }
    }
    async updateOne(req, res, next) {
        try {
            const { id } = req.params;
            const { length, name, typeId, priceSummer, priceWinter, number, parkingNumber } = req.body;

            const findShipById = await Ship.findOne({ where: { id } });

            if (!findShipById) {
                return res.status(404).send('Такого судна не существует в базе');
            }

            if (name) findShipById.name = name;
            if (length) findShipById.length = length;
            if (typeId) findShipById.typeId = typeId;
            if (number) findShipById.number = number;
            if (priceSummer) findShipById.priceSummer = priceSummer;
            if (priceWinter) findShipById.priceWinter = priceWinter;
            if (parkingNumber) findShipById.parkingNumber = parkingNumber;

            const updatedShip = await findShipById.save();

            if (!updatedShip) {
                return res.status(400).send('Не удалось сохранить изменения');
            }
            return res.json(updatedShip);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }
    async destroy(req, res, next) {
        try {
          const { id } = req.params;
          const rentals = await Rental.findAll({
            where: { shipId: id },
          });
      
          if (rentals.length === 0) {
            // Удаление судна, даже если нет связанных аренд
            await Ship.destroy({ where: { id } });
          
            res.status(404).send('Нет аренд, связанных с указанным судном');
          } else {
            for (const rental of rentals) {
              // Удаление связанных платежей для каждой аренды
              await Payment.destroy({ where: { rentalId: rental.id } });
              // Удаление аренды
              await rental.destroy();
            }
          
            // Удаление судна
            await Ship.destroy({ where: { id } });
          
            res.status(200).send({
              status: "success",
              message: "successfully",
            });
          }
        } catch (e) {
          next(apiError.badRequest(e.message));
        }
      }
      
      

}

module.exports = new shipController()