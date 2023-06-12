// eslint-disable-next-line no-undef
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((transaction) => {
      return Promise.all([
        queryInterface.addColumn(
          'orders',
          'feedbackToken',
          {
            type: Sequelize.STRING
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'orders',
          'comment',
          {
            type: Sequelize.DataTypes.TEXT
          },
          { transaction }
        )
      ])
    })
  },
  async down(queryInterface) {
    return queryInterface.sequelize.transaction((transaction) => {
      return Promise.all([
        queryInterface.removeColumn('orders', 'feedbackToken', { transaction }),
        queryInterface.removeColumn('orders', 'comment', { transaction })
      ])
    })
  }
}
