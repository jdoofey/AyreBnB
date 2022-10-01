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
   await queryInterface.bulkInsert("Bookings", [
    {
      userId:1,
      spotId:3,
      startDate:"2023-9-25",
      endDate:"2023-9-28"
    },
    {
      userId:2,
      spotId:1,
      startDate:"2023-8-25",
      endDate:"2023-8-27"
    },
    {
      userId:3,
      spotId:2,
      startDate:"2023-10-15",
      endDate:"2023-10-17"
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
    await queryInterface.bulkDelete("Bookings")
  }
};
