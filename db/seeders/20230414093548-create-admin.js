// eslint-disable-next-line no-undef
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
          role: 'Admin',
          isEmailActivated: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('users', { email: 'admin@example.com' })
  }
}
