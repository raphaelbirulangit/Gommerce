'use strict';
var bcrypt = require('bcryptjs');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    userName: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance, options) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(instance.password, salt);
        
        instance.password = hash
        // bcrypt.compareSync("B4c0/\/", hash); // true
        // bcrypt.compareSync("not_bacon", hash);  
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};