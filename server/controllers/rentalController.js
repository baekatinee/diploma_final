const { Rental } = require('../models/models')
const { Ship } = require('../models/models')
const { Client } = require('../models/models')
const apiError = require('../error/apiError')
class rentalController {
    async create(req, res, next) {
        try {
          const { dateStart, dateEnd, clientId, shipId } = req.body;
          const rental = await Rental.create({ dateStart, dateEnd, clientId, shipId });
          if (!rental) {
            return res.status(404).send('Не удалось создать аренду из-за неверно введенных данных');
          }
          return res.json(rental);
        } catch (e) {
          return next(apiError.badRequest(e.message));
        }
      }
    
      async getAll(req, res, next) {
        try {
          let { clientId, shipId, limit, page } = req.query;
          page = page || 1;
          limit = limit || 9;
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
          return res.json(updatedRental);
        } catch (e) {
          return next(apiError.badRequest(e.message));
        }
      }
    
      async destroy(req, res, next) {
        try {
          const { id } = req.params;
          
          const rental = await Rental.findByPk(id);
      
          if (!rental) {
            return res.status(404).send('Такой аренды не существует в базе');
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

}

module.exports = new rentalController()