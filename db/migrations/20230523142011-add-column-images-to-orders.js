/* eslint-disable no-undef */
'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('orders', 'images', {
      type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.JSONB)
    })
  },
  async down(queryInterface) {
    await queryInterface.removeColumn('orders', 'images')
  }
}
