/* eslint-disable no-undef */
'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('orders', 'transactionId', {
      type: Sequelize.DataTypes.STRING
    })
  },
  async down(queryInterface) {
    await queryInterface.removeColumn('orders', 'transactionId')
  }
}
