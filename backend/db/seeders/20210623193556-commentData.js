'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [
      {
        userId: 1,
        trackId: null,
        mixId: 1,
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        userId: 2,
        trackId: null,
        mixId: 2,
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
