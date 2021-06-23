'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
   return queryInterface.bulkInsert('Tracks', [
  {
    userId: 1,
    title: 'For The People of The Desert',
    url: '/media/for-the-people-of-the-desert.mp3'
  },
  {
    userId: 1,
    title: 'Outer Space',
    url: '/media/outer-space.mp3'
  },
  {
    userId: 1,
    title: 'The Sea Wasn\'t Intended For You',
    url: '/media/the-sea-wasnt-intended-for-you.mp3'
  },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    
   return queryInterface.bulkDelete('Tracks', null, {});
  }
};