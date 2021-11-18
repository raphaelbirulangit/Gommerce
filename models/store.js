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

    static getProductsbyStoreId(StoreId){
      return new Promise((res, rej) => {
        Store.findOne({where: {id:StoreId}, include: "Products"})
        .then(data => res(data))
        .catch(err => res(err))
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