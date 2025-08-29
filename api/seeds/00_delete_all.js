/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('projects_next_actions').del()
  await knex('next_actions_contexts').del()
  await knex('next_actions').del()
  await knex('contexts').del()
  await knex('projects').del()
  await knex('inbox').del()
  await knex('someday_maybe').del()
  await knex('users').del()
};
