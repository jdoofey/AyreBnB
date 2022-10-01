'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.Spot, {foreignKey:"spotId"}),
      Booking.belongsTo(models.User, {foreignKey:"userId"})
    }
  }
  Booking.init({
    spotId: {type: DataTypes.INTEGER, onDelete:"CASCADE", references:{model:"Spots", key:"id"}},
    userId: {type: DataTypes.INTEGER, onDelete:"CASCADE", references:{model:"Users", key:"id"}},
    startDate: {type: DataTypes.DATEONLY, allowNull:false,},
    endDate: {type: DataTypes.DATEONLY, allowNull:false,
      validate: {startDateConflict(){
        if(this.startDate >= this.endDate) throw new Error("endDate must be after startDate")
      }}
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
