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
        console.log(faker.date.future().toLocaleTimeString())
        await knex('projects').insert([
          {
            associated_user: users[i].user_id,
            title: faker.word.adjective() + " " + faker.word.noun(),
            goal: faker.lorem.lines(1),
            due_date: faker.date.future().toLocaleDateString("en-US"),
            start_date: faker.date.future().toLocaleDateString("en-US"),
            end_date: faker.date.future().toLocaleDateString("en-US"),
            due_time: faker.date.future().toLocaleTimeString("en-US"),
            start_time: faker.date.future().toLocaleTimeString("en-US"),
            end_time: faker.date.future().toLocaleTimeString("en-US"),
            complete: faker.datatype.boolean()
          }
        ])
      }
    }
  })
};
