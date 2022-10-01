'use strict';

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
   await queryInterface.bulkInsert("SpotImages",[
    {
      spotId:1,
      url:"placeholder1",
      preview:true
    },
    {
      spotId:1,
      url:"placeholder2",
      preview:true
    },
    {
      spotId:1,
      url:"placeholder3",
      preview:true
    },
    {
      spotId:2,
      url:"placeholder4",
      preview:true
    },
    {
      spotId:3,
      url:"placeholder5",
      preview:true
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
    await queryInterface.bulkDelete("SpotImages")
  }
};
