// eslint-disable-next-line no-undef
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('customers', 'userId', {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' }
    })
  },
  async down(queryInterface) {
    queryInterface.removeColumn('customers', 'userId')
  }
}
