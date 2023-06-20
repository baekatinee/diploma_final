const { Op } = require('sequelize');
const { Client, Ship, Rental } = require('../models/models');
const apiError = require('../error/apiError');

class searchController {
  async searchAll(req, res, next) {
    try {
      const { query } = req.query;

      const shipResults = await Ship.findAll({
        where: {
          [Op.or]: [
            { number: { [Op.like]: `%${query}%` } },
            { name: { [Op.like]: `%${query}%` } },
          ],
        },
      });

      const shipIds = shipResults.map(ship => ship.id);

      const rentalResults = await Rental.findAll({
        where: {
          shipId: { [Op.in]: shipIds },
        },
      });

      const clientResults = await Client.findAll({
        where: {
          [Op.or]: [
            { surname: { [Op.like]: `%${query}%` } },
            { name: { [Op.like]: `%${query}%` } },
            { fathersName: { [Op.like]: `%${query}%` } },
            { phoneNumber: { [Op.like]: `%${query}%` } },
          ],
        },
      });

      const results = [
        ...clientResults.map(client => ({ ...client.toJSON(), tableName: 'Client' })),
        ...shipResults.map(ship => ({ ...ship.toJSON(), tableName: 'Ship' })),
      ];

      rentalResults.forEach(rental => {
        const ship = shipResults.find(ship => ship.id === rental.shipId);
        if (ship) {
          const rentalClientId = rental.clientId;
          const shipIndex = results.findIndex(result => result.id === ship.id);
          if (shipIndex !== -1) {
            if (!results[shipIndex].rentals) {
              results[shipIndex].rentals = [];
            }
            results[shipIndex].rentals.push(rentalClientId);
          }
        }
      });

      return res.json(results);
    } catch (e) {
      next(apiError.badRequest(e.message));
    }
  }
}

module.exports = new searchController();
