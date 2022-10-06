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
      url:"https://images.unsplash.com/photo-1597211833712-5e41faa202ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
      preview:true
    },
    {
      spotId:1,
      url:"https://images.unsplash.com/photo-1543489822-c49534f3271f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80",
      preview:false
    },
    {
      spotId:1,
      url:"https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      preview:false
    },
    {
      spotId:1,
      url:"https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      preview:false
    },
    {
      spotId:1,
      url:"https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
      preview:false
    },
    {
      spotId:2,
      url:"https://images.unsplash.com/photo-1517541866997-ea18e32ea9e9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
      preview:true
    },
    {
      spotId:2,
      url:"https://images.unsplash.com/photo-1625647999883-376f8f48c52a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80",
      preview:false
    },
    {
      spotId:2,
      url:"https://images.unsplash.com/photo-1588854337236-6889d631faa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      preview:false
    },
    {
      spotId:2,
      url:"https://images.unsplash.com/photo-1598928636135-d146006ff4be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      preview:false
    },
    {
      spotId:2,
      url:"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      preview:false
    },
    {
      spotId:3,
      url:"https://i.pinimg.com/564x/e4/3c/17/e43c170b385671f1f0f09626dd61d2f4.jpg",
      preview:true
    },
    {
      spotId:3,
      url:"https://plus.unsplash.com/premium_photo-1661950439212-558fa5cc82e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1151&q=80",
      preview:false
    },
    {
      spotId:3,
      url:"https://images.unsplash.com/photo-1615874959474-d609969a20ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
      preview:false
    },
    {
      spotId:3,
      url:"https://images.unsplash.com/photo-1523772354886-34a1dc2f72e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80",
      preview:false
    },
    {
      spotId:3,
      url:"https://images.unsplash.com/photo-1627257060697-acfbecf5d9a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      preview:false
    },
    {
      spotId:5,
      url:"https://a0.muscache.com/im/pictures/a63e95dd-18ef-455d-ba68-bab023ee384f.jpg?im_w=960",
      preview:true
    },
    {
      spotId:5,
      url:"https://a0.muscache.com/im/pictures/6d0bd4e2-7ac7-49d3-adbb-39f8d76b654f.jpg?im_w=480",
      preview:false
    },
    {
      spotId:5,
      url:"https://a0.muscache.com/im/pictures/648a9e97-d7c4-4130-b807-c9c35f071cf7.jpg?im_w=480",
      preview:false
    },
    {
      spotId:5,
      url:"https://a0.muscache.com/im/pictures/b33be870-359e-4e6a-95e6-419f10e661b9.jpg?im_w=480",
      preview:false
    },
    {
      spotId:5,
      url:"https://a0.muscache.com/im/pictures/6d579c84-e646-4040-ab1a-0cc15abd35ff.jpg?im_w=1200",
      preview:false
    },
    {
      spotId:4,
      url:"https://cdn.onekindesign.com/wp-content/uploads/2022/07/Rustic-Contemporary-Mountain-Home-Pinnacle-Mountain-Homes-01-1-Kindesign.jpg",
      preview:true
    },
    {
      spotId:4,
      url:"https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1157&q=80",
      preview:false
    },
    {
      spotId:4,
      url:"https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      preview:false
    },
    {
      spotId:4,
      url:"https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      preview:false
    },
    {
      spotId:4,
      url:"https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
      preview:false
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
