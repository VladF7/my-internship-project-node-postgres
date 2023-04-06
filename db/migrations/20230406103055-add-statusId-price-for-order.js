// eslint-disable-next-line no-undef
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((transaction) => {
      return Promise.all([
        queryInterface.addColumn(
          'orders',
          'statusId',
          {
            type: Sequelize.DataTypes.INTEGER,
            references: { model: 'statuses', key: 'id' },
            allowNull: false
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'orders',
          'price',
          {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
          },
          { transaction }
        )
      ])
    })
  },
  async down(queryInterface) {
    return queryInterface.sequelize.transaction((transaction) => {
      return Promise.all([
        queryInterface.removeColumn('orders', 'statusId', { transaction }),
        queryInterface.removeColumn('orders', 'price', { transaction })
      ])
    })
  }
}
