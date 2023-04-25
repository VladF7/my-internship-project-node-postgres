// eslint-disable-next-line no-undef
module.exports = {
  async up(queryInterface) {
    queryInterface.removeColumn('masters', 'rating')
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('masters', 'rating', {
      type: Sequelize.DataTypes.INTEGER
    })
  }
}
