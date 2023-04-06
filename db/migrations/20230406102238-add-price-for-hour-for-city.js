// eslint-disable-next-line no-undef
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('cities', 'priceForHour', {
      type: Sequelize.INTEGER,
      allowNull: false
    })
  },
  async down(queryInterface) {
    await queryInterface.removeColumn('cities', 'priceForHour')
  }
}
