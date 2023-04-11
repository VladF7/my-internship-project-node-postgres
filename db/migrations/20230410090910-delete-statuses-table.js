// eslint-disable-next-line no-undef
module.exports = {
  async up(queryInterface) {
    await queryInterface.dropTable('statuses')
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.createTable('statuses', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  }
}
