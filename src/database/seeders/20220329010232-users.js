'use strict';
const bcrypt = require("bcryptjs");

const getPasswordHash = (password) => {
  return bcrypt.hash(password, 8);
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const password_hash = await getPasswordHash('nodeERP2803');
  
    const user = {
      name: 'John Doe',
      email: 'teste@gmail.com',
      password_hash,
      is_admin: 1,
      created_at: '2022-03-28 22:16:56.146-03',
      updated_at: '2022-03-28 22:16:56.146-03'
    }
  
    await queryInterface.bulkInsert('users', [user], {});
 
  },

  async down (queryInterface, Sequelize) { //  revert seed here.
     await queryInterface.bulkDelete('users', null, {});
  }
};
