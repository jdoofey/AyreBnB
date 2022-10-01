'use strict';

const { QueryError } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert("Reviews",[
    {
      userId:1,
      spotId: 2,
      review: "This was great for my vacation with my fiance!",
      stars:5
    },
    {
      userId:2,
      spotId: 3,
      review: "The host was nice, but the house was really messy and some of the ammenities weren't working",
      stars:1
    },
    {
      userId:3,
      spotId: 1,
      review: "Place was super clean and the hosts were friendly! Very accomodating I'd stay here again",
      stars:4
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Reviews")
  }

};
