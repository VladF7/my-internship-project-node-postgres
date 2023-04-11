// eslint-disable-next-line no-undef
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'cities',
      [
        {
          name: 'Dnipro',
          priceForHour: 1000,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Uzhgorod',
          priceForHour: 1533,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Kharkiv',
          priceForHour: 2050,
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
