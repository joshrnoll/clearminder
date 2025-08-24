/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema
  .createTable('users', (t) => {
    t.uuid('user_id').defaultTo(knex.fn.uuid()).primary()
    t.string('first_name').notNullable()
    t.string('last_name').notNullable()
    t.string('username').notNullable()
    t.string('password').notNullable()
    t.string('email').notNullable()
    t.timestamp('last_weekly_review')
    t.timestamp('created_at').defaultTo(knex.fn.now())
  })
  await knex.schema
    .createTable('stupf', (t) => {
      t.increments('stupf_id')
      t.uuid('associated_user').notNullable()
      t.foreign('associated_user').references('users.user_id')
      t.string('content').notNullable()
    })
  await knex.schema
    .createTable('projects', (t) => {
      t.increments('project_id')
      t.uuid('associated_user').notNullable()
      t.foreign('associated_user').references('users.user_id')
      t.string('title')
      t.string('goal')
      t.date('due_date')
      t.time('due_time')
      t.boolean('complete').defaultTo('false')
  })
  await knex.schema
    .createTable('next_actions_contexts', (t) => {
      t.increments('next_actions_context_id')
      t.uuid('associated_user').notNullable()
      t.foreign('associated_user').references('users.user_id')
      t.string('title')
    })
  await knex.schema
    .createTable('next_actions', (t) => {
      t.increments('project_id')
      t.uuid('associated_user').notNullable()
      t.foreign('associated_user').references('users.user_id')
      t.integer('next_actions_context_id')
      t.foreign('next_actions_context_id').references('next_actions_context_id').inTable('next_actions_contexts')
      t.integer('linked_project')
      t.foreign('linked_project').references('projects.project_id')
      t.date('due_date')
      t.time('due_time')
      t.boolean('complete')
  })
  await knex.schema
    .createTable('someday_maybe', (t) => {
      t.uuid('associated_user').notNullable()
      t.foreign('associated_user').references('users.user_id')
      t.string('content')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
