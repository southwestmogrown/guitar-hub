'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
   return queryInterface.bulkInsert('Songs', [
  {
    userId: 1,
    title: 'Caught You Lookin',
    imageUrl: '/images/Bill-Murray-Golf.jpg',
    songUrl: '/media/caught-you-lookin.mp3'
  },
  {
    userId: 1,
    title: 'The Definition of Insanity',
    imageUrl: '/images/Bill-Murray-Golf.jpg',
    songUrl: '/media/the-definition-of-insanity.mp3'
  },
  {
    userId: 1,
    title: 'Synesthesia',
    imageUrl: '/images/Bill-Murray-Golf.jpg',
    songUrl: '/media/synesthesia.mp3'
  },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    
   return queryInterface.bulkDelete('Songs', null, {});
  }
};
