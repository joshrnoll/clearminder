/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('next_actions').del()
  await knex('next_actions_contexts').del()
  await knex('projects').del()
  await knex('stupf').del()
  await knex('users').del()
};
