'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Comments', [
    {
      userId: 1,
      trackId: 1,
      songId: null,
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      userId: 1,
      trackId: 2,
      songId: null,
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      userId: 1,
      trackId: null,
      songId: 1,
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      userId: 2,
      trackId: 1,
      songId: null,
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
  ], {});
  },

  down: (queryInterface, Sequelize) => {

   return queryInterface.bulkDelete('Comments', null, {});
  }
};
