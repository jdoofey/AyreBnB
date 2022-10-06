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
      description:"Beach cottage 3 blocks walking distance to beautiful La Jolla Shores beach. Large serene back yard with patio, hot tub, outdoor shower and beautiful plants and trees. Near shopping and restaurants but a quiet setting.",
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
      description:"A short nature path guides you gently down to your cottage in the redwoods. Wake to find yourself looking up through the glass ceiling at the trees above. Cool mountain air makes for great snuggle weather encouraging relaxing mornings in bed.",
      price:415
    },
    {
      ownerId:6,
      address:"253 Pleasant Drive",
      city:"Aspen",
      state:"CO",
      country:"United States of America",
      lat:39.1911,
      lng:106.8175,
      name:"Mountain Home",
      description:"An authentic mountain cabin that truly says Colorado! Set on 5+ acres with beautiful views and privacy. Enjoy the relaxing sounds of the nature from the deck, soak in the hot tub, and just relax.",
      price:415
    },
    {
      ownerId:4,
      address:"129 9th St",
      city:"New York",
      state:"New York",
      country:"United States of America",
      lat:40.7128,
      lng:74.0060,
      name:"Skyline Studio",
      description:"One of the best views of the city if not the best view of the city. A luxury studio in the heart of the city. Enjoyed everything the city has to offer, Broadway plays walk to with in mins, Madison Square Garden, and more!",
      price:915
    },
    {
      ownerId:6,
      address:"",
      city:"",
      state:"CO",
      country:"",
      lat:39.1911,
      lng:106.8175,
      name:"",
      description:"",
      price:215
    },
    {
      ownerId:6,
      address:"",
      city:"",
      state:"CO",
      country:"",
      lat:39.1911,
      lng:106.8175,
      name:"",
      description:"",
      price:215
    },
    {
      ownerId:6,
      address:"",
      city:"",
      state:"CO",
      country:"",
      lat:39.1911,
      lng:106.8175,
      name:"",
      description:"",
      price:215
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
