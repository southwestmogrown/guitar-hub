'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
   return queryInterface.bulkInsert('Tracks', [{
     userId: 1,
     songId: null,
     title: 'For The People of The Desert',
     url: 'backend/music-assets/for the people of the desert.mp3'
   }], {});
  },

  down: (queryInterface, Sequelize) => {
    
   return queryInterface.bulkDelete('Tracks', null, {});
  }
};
