'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Mixes', [
      {
        userId: 1,
        title: 'For The People of The Desert',
        mixUrl: '/media/for-the-people-of-the-desert.mp3'
      },
      {
        userId: 1,
        title: 'Outer Space',
        mixUrl: '/media/outer-space.mp3'
      },
      {
        userId: 1,
        title: "The Sea Wasn't Intended For You",
        mixUrl: '/media/the-sea-wasnt-intended-for-you.mp3'
      },
      {
        userId: 1,
        title: 'Caught You Lookin',
        mixUrl: '/media/caught-you-lookin.mp3'
      },
      {
        userId: 1,
        title: 'The Definition of Insanity',
        mixUrl: '/media/the-definition-of-insanity.mp3'
      },
      {
        userId: 1,
        title: 'Synesthesia',
        mixUrl: '/media/synesthesia.mp3'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Mixes', null, {});
  }
};
