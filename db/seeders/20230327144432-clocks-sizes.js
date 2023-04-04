// eslint-disable-next-line no-undef
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'clocks',
      [
        {
          size: 'Small',
          timeToFix: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          size: 'Medium',
          timeToFix: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          size: 'Big',
          timeToFix: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('clocks', null, {})
  }
}
