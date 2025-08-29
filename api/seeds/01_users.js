const { faker } = require('@faker-js/faker')

function create_users(num){
  let users = []
  for (i = 0; i < num; i++){

    let firstName = faker.person.firstName()
    let lastName = faker.person.lastName()

    users.push({
      first_name: firstName,
      last_name: lastName,
      username: faker.internet.username({ firstName: firstName, lastName: lastName }),
      password: faker.internet.password(),
      email: faker.internet.email({ firstName: firstName, lastName: lastName })
    })
  }
  return users
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').insert(create_users(10));
};
