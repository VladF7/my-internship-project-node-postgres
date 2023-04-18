// eslint-disable-next-line no-undef
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((transaction) => {
      return Promise.all([
        queryInterface.addColumn(
          'masters',
          'userId',
          {
            type: Sequelize.INTEGER,
            references: { model: 'users', key: 'id' },
            allowNull: false
          },
          { transaction }
        ),
        queryInterface.addColumn(
          'masters',
          'isActivated',
          {
            type: Sequelize.DataTypes.BOOLEAN,
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
        queryInterface.removeColumn('masters', 'userId', { transaction }),
        queryInterface.removeColumn('masters', 'isActivated', { transaction })
      ])
    })
  }
}
