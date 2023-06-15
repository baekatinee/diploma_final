'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('clients', 'hasPaid', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    });
   
  },
  

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('clients', 'hasPaid');
   
  },
};
