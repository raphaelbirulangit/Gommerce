'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static getProducts(){
      return new Promise((res, rej) => {
        
      })
    }

    static associate(models) {
      // define association here
    }
  };
  Store.init({
    storeName: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};