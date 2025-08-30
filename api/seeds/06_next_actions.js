const { faker } = require('@faker-js/faker')
const { getRandomInteger } = require('../utils')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function(knex) {

  async function getRandomContext(user){
    let thisUsersContexts = await knex('contexts').select('context_id').where({ associated_user: user.user_id })
    let randomIndex = getRandomInteger(0, thisUsersContexts.length -1)
    return thisUsersContexts[randomIndex].next_actions_context_id
  }

  await knex.select('*').from('users')
  .then(async (users) => {
    for (let i = 0; i < users.length; i++){
      let randomNumber = getRandomInteger(1, 5)
      for (let j = 0; j < randomNumber; j ++){
        let nextActionsContext = await getRandomContext(users[i])
        await knex('next_actions').insert([
          {
            associated_user: users[i].user_id,
            content: faker.lorem.lines(1),
            next_actions_context_id: nextActionsContext,
            due_date: faker.date.future().toLocaleDateString("en-US"),
            start_date: faker.date.future().toLocaleDateString("en-US"),
            end_date: faker.date.future().toLocaleDateString("en-US"),
            due_time: faker.date.future().toLocaleTimeString("en-US"),
            start_time: faker.date.future().toLocaleTimeString("en-US"),
            end_time: faker.date.future().toLocaleTimeString("en-US"),
          }
        ])
      }
    }
  })
};