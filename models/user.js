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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {notEmpty: {msg: 'Please insert your working email'}}
      },
    password: {
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {notEmpty: {msg: 'Please insert password'}}
      },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {notEmpty: {msg : 'Please input username'}}
    }, }, {
    
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (instance, options) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(instance.password, salt);
        
        instance.password = hash
        
      },
    },
  });
  return User;
};