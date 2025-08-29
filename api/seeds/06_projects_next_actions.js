const { getRandomInteger } = require('../utils')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// Associate a random project with a random amount of next actions
exports.seed = async function(knex) {
  let users = await knex.select('*').from('users')

  for (let i = 0; i < users.length; i++){
    let usersNextActions = await knex.select('*').from('next_actions').where('associated_user', users[i].user_id)
    let usersProjects = await knex.select('*').from('projects').where('associated_user', users[i].user_id)

    let numberOfRounds = getRandomInteger(1, usersNextActions.length)

    for (let j = 0; j < numberOfRounds; j++){
      await knex('projects_next_actions').insert([
        {
          "next_action_id": usersNextActions[j].next_action_id,
          "project_id": usersProjects[getRandomInteger(0, usersProjects.length -1)].project_id
        }
      ]);
    }
  }
};
