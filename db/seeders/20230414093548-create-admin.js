// eslint-disable-next-line no-undef
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'admin@example.com',
          password: '$2b$04$TfvNGX8bxNNNhZ9ikK2e4u1SiwpbAox4OD.zgk8AB6j2SEH0HfUSm',
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
