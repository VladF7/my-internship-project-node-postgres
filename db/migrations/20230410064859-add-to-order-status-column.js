// eslint-disable-next-line no-undef
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((transaction) => {
      return Promise.all([
        queryInterface.removeColumn('orders', 'statusId', { transaction }),
        queryInterface.addColumn(
          'orders',
          'status',
          {
            type: Sequelize.DataTypes.ENUM('Confirmed', 'Completed', 'Canceled'),
            allowNull: false
          },
          { transaction }
        )
      ])
    })
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((transaction) => {
      return Promise.all([
        queryInterface.addColumn(
          'orders',
          'statusId',
          {
            type: Sequelize.DataTypes.INTEGER,
            references: { model: 'statuses', key: 'id' }
          },
          { transaction }
        ),
        queryInterface.removeColumn('orders', 'status', { transaction })
      ])
    })
  }
}
