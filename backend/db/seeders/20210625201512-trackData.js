'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
   return queryInterface.bulkInsert('Tracks', [
  {
    userId: 1,
    title: 'For The People of The Desert',
    url: 'https://newdawn.s3.us-east-2.amazonaws.com/for-the-people-of-the-desert.mp3'
  },
  {
    userId: 2,
    title: 'Outer Space',
    url: 'https://newdawn.s3.us-east-2.amazonaws.com/outer-space.mp3'
  },
  {
    userId: 1,
    title: 'The Sea Wasn\'t Intended For You',
    url: 'https://newdawn.s3.us-east-2.amazonaws.com/the-sea-wasnt-intended-for-you.mp3'
  },
  {
    userId: 3,
    title: 'Synesthesia',
    url: 'https://newdawn.s3.us-east-2.amazonaws.com/synesthesia.mp3'
  },
  {
    userId: 2,
    title: 'Caught You Lookin',
    url: 'https://newdawn.s3.us-east-2.amazonaws.com/caught-you-lookin.mp3'
  },
  {
    userId: 1,
    title: 'The Definition of Insanity',
    url: 'https://newdawn.s3.us-east-2.amazonaws.com/the-definition-of-insanity.mp3'
  },
  {
    userId: 4,
    title: 'T.N.B.S',
    url: 'https://newdawn.s3.us-east-2.amazonaws.com/TNBS.mp3'
  },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    
   return queryInterface.bulkDelete('Tracks', null, {});
  }
};