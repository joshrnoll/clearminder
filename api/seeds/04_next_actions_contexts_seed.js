const { faker } = require('@faker-js/faker')

function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function(knex) {
  await knex.select('*').from('users')
  .then(async (users) => {
    for (let i = 0; i < users.length; i++){
      let randomNumber = getRandomInteger(1, 5)
      for (let j = 0; j < randomNumber; j ++){
        await knex('next_actions_contexts').insert([
          {
            associated_user: users[i].user_id,
            title: faker.word.preposition() + " " + faker.word.noun(),
          }
        ])
      }
    }
  })
};
