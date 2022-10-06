'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        firstName: "Demo",
        lastName:"Guy",
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'jadeybug',
        firstName: "Jade",
        lastName:"Michelle",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user2@user.io',
        username: '9ziggy9',
        firstName: "David",
        lastName:"Rogers",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user3@user.io',
        username: 'suhspect',
        firstName: "Samuel",
        lastName:"Sammyson",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user4@user.io',
        username: 'garebare',
        firstName: "Gary",
        lastName:"Garard",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user5@user.io',
        username: 'goodreg',
        firstName: "John",
        lastName:"Johnestan",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user6@user.io',
        username: 'log(n)',
        firstName: "Logan",
        lastName:"Richardson",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user7@user.io',
        username: 'duhmanda',
        firstName: "Amanda",
        lastName:"Amananda",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user8@user.io',
        username: 'GwaiPut',
        firstName: "Alex",
        lastName:"Alexandria",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user9@user.io',
        username: '5two1FTW',
        firstName: "Brandon",
        lastName:"Brandy",
        hashedPassword: bcrypt.hashSync('password')
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'jadeybug', '9ziggy9'] }
    }, {});
  }
};
