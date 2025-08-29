const { getRandomInteger } = require('../utils')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// Associate 1-3 contexts for each next action
exports.seed = async function(knex) {
  let users = await knex.select('*').from('users')

  for (let i = 0; i < users.length; i++){
    let usersNextActions = await knex.select('*').from('next_actions').where({ 'associated_user': users[i].user_id })
    let usersContexts = await knex.select('*').from('contexts').where({ 'associated_user': users[i].user_id })

    for (let j = 0; j < usersNextActions.length; j++){
      let numberOfContexts = getRandomInteger(1, 3)

      for (let k = 0; k < numberOfContexts; k++){
        await knex('next_actions_contexts').insert([
          {
            "next_action_id": usersNextActions[j].next_action_id,
            "context_id": usersContexts[getRandomInteger(0, usersContexts.length - 1)].context_id
          }
        ]);
      }
    }
  }
};

