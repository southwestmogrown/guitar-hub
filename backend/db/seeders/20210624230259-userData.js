'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');


module.exports = {
  up: (queryInterface, Sequelize) => {
    
   return queryInterface.bulkInsert('Users', [
    {
      email: 'demo@user.io',
      username: 'Bill',
      hashedPassword: bcrypt.hashSync('password'),
      photoUrl: 'https://newdawn.s3.us-east-2.amazonaws.com/Bill-Murray-Golf.jpg'
    },
    {
      email: faker.internet.email(),
      username: 'Flash',
      hashedPassword: bcrypt.hashSync('password'),
      photoUrl: 'https://newdawn.s3.us-east-2.amazonaws.com/flashbot.jpg'

    },
    {
      email: faker.internet.email(),
      username: 'Euch',
      hashedPassword: bcrypt.hashSync('password'),
      photoUrl: 'https://newdawn.s3.us-east-2.amazonaws.com/euch.jpg'

    },
    {
      email: faker.internet.email(),
      username: 'Harry',
      hashedPassword: bcrypt.hashSync('password'),
      photoUrl: 'https://newdawn.s3.us-east-2.amazonaws.com/5a8c83d342e1cc57810ba9ee-750-563.jpg'

    },

   ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Bill', 'Flash', 'Euch', 'Harry'] }
    }, {});
  }
}

