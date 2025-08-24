const { faker } = require('@faker-js/faker')

function create_projects(num){
  let projects = []
  for (i = 0; i < num; i++){
    projects.push({
      
    })
  }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('projects').del()
  await knex('projects').insert([
    {}
  ]);
};
