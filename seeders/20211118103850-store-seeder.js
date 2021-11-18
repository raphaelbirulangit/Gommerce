'use strict';
const fs = require('fs')

module.exports = {
  up:  (queryInterface, Sequelize) => {
    let data = JSON.parse(fs.readFileSync("./data/store.json", "utf-8"))
    data.forEach((e) => {
      e.createdAt = new Date()
      e.updatedAt = new Date()
    })
    return queryInterface.bulkInsert('Stores', data, {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down:  (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Stores', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
