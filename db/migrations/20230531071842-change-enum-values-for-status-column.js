/* eslint-disable no-undef */
'use strict'

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query("ALTER TYPE enum_orders_status ADD VALUE 'Await Payment'")
    await queryInterface.sequelize.query(
      "ALTER TYPE enum_orders_status ADD VALUE 'Payment Success'"
    )
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query("ALTER TYPE enum_orders_status DROP VALUE 'Await Payment'")
    await queryInterface.sequelize.query(
      "ALTER TYPE enum_orders_status DROP VALUE 'Payment Success'"
    )
  }
}
