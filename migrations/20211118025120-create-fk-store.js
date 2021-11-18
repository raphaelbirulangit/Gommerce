'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Stores", "userId", {
      type : Sequelize.INTEGER,
      references : {model:{tableName:"Users"}, key : "id"},
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down:  (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Stores", "userId", {})

    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
