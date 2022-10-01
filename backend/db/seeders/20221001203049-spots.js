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
   await queryInterface.bulkInsert("Spots", [
    {
      ownerId:1,
      address:"123 Main St",
      city:"Santa Monica",
      state:"CA",
      country:"United States of America",
      lat:34.0195,
      lng:118.49,
      name:"Ocean Front Villa",
      description:"Ocean Front Villa is located in Santa Monica, California, just steps from the sea, shopping, restaurants, and the famous Santa Monica Pier.",
      price:499
    },
    {
      ownerId:3,
      address:"456 Prince St",
      city:"La Jolla",
      state:"CA",
      country:"United States of America",
      lat:32.8328,
      lng:117.2713,
      name:"La Jolla Shores Beach Cottage",
      description:"Redwood cottage 3 blocks walking distance to beautiful La Jolla Shores beach. Large serene back yard with patio, hot tub, outdoor shower and beautiful plants and trees. Near shopping and restaurants but a quiet setting.",
      price:559
    },
    {
      ownerId:2,
      address:"789 Oak Ave",
      city:"Silicon Valley",
      state:"CA",
      country:"United States of America",
      lat:37.3875,
      lng:122.0575,
      name:"Romantic Redwoods Cottage",
      description:"Relax and unplug in this romantic, unique, and tranquil getaway spot. A short nature path guides you gently down to your own cottage in the redwoods. Wake to find yourself looking up through the glass ceiling at the trees above. Our cool mountain air makes for great snuggle weather encouraging long relaxing mornings in bed.",
      price:415
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
    await queryInterface.bulkDelete("Spots")
  }
};
