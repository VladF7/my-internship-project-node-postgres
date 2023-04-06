// eslint-disable-next-line no-undef
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'statuses',
      [
        {
          name: 'Confirmed',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Canceled',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Done',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('statuses', null, {})
  }
}
