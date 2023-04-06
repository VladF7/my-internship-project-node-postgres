// eslint-disable-next-line no-undef
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'cities',
      [
        {
          name: 'Dnipro',
          priceForHour: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Uzhgorod',
          priceForHour: 15,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Kharkiv',
          priceForHour: 20,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('cities', null, {})
  }
}
