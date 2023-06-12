/* eslint-disable no-undef */
'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'password', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true
    })
  },
  async down(queryInterface) {
    await queryInterface.changeColumn('users', 'password', {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    })
  }
}
