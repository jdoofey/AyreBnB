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
    }
  }
  Booking.init({
    spotId: {type: DataTypes.INTEGER, onDelete:"CASCADE",},
    userId: {type: DataTypes.INTEGER, onDelete:"CASCADE",},
    startDate: {type: DataTypes.DATEONLY, allowNull:false,},
    endDate: {type: DataTypes.DATEONLY, allowNull:false,
      valideate: {startDateConflict(){
        if(this.startDate >= this.endDate) throw new Error("endDate must be after startDate")
      }}
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
