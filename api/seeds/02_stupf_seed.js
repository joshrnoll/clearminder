const { faker } = require('@faker-js/faker')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
*/
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('stupf').del()
  await knex.select('*').from('users')
  .then( async (users) => {
    for (let i = 0; i < users.length; i++){
      await knex('stupf').insert([
        {
          associated_user: users[i].user_id,
          content: faker.lorem.lines(2)
        },
      ]);
    }
  })
};
