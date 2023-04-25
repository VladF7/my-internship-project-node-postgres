// eslint-disable-next-line no-undef
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('orders', 'rating', {
      type: Sequelize.INTEGER
    })
  },
  async down(queryInterface) {
    queryInterface.removeColumn('orders', 'rating')
  }
}
