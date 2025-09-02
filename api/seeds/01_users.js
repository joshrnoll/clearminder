const { faker } = require('@faker-js/faker')
const bcrypt = require('bcrypt')
const fs = require('node:fs')

function createUsers(num){
  let users = []
  fs.writeFileSync('testcreds.txt', "", { flag: 'w' })
  for (i = 0; i < num; i++){

    let firstName = faker.person.firstName()
    let lastName = faker.person.lastName()

    let username = faker.internet.username({ firstName: firstName, lastName: lastName })
    let password = faker.internet.password()
    let hashedPassword = bcrypt.hashSync(password, 10)
    let creds = `username: ${username} -- password: ${password}\n`
    fs.appendFileSync('testcreds.txt', creds)

    users.push({
      first_name: firstName,
      last_name: lastName,
      username: username,
      password: hashedPassword,
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
  await knex('users').insert(createUsers(10));
};
