/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema
  .createTable('users', (t) => {
    t.uuid('user_id').defaultTo(knex.fn.uuid()).primary()
    t.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
    t.string('first_name')
    t.string('last_name')
    t.string('username').notNullable()
    t.string('password').notNullable()
    t.string('email').notNullable()
    t.timestamp('last_weekly_review')
  })
  await knex.schema
    .createTable('inbox', (t) => {
      t.increments('item_id')
      t.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
      t.uuid('associated_user').notNullable().references('users.user_id')
      t.string('content').notNullable()
    })
  await knex.schema
    .createTable('projects', (t) => {
      t.increments('project_id')
      t.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
      t.uuid('associated_user').notNullable().references('users.user_id')
      t.string('title').notNullable()
      t.string('goal')
      t.date('due_date')
      t.date('start_date')
      t.date('end_date')
      t.time('due_time')
      t.time('start_time')
      t.time('end_time')
      t.timestamp('complete')
  })
  await knex.schema
    .createTable('contexts', (t) => {
      t.increments('context_id')
      t.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
      t.uuid('associated_user').notNullable().references('users.user_id')
      t.string('title').notNullable()
    })
  await knex.schema
    .createTable('next_actions', (t) => {
      t.increments('next_action_id')
      t.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
      t.string('content')
      t.uuid('associated_user').notNullable().references('users.user_id')
      t.integer('next_actions_context_id').references('contexts.context_id')
      t.date('due_date')
      t.date('start_date')
      t.date('end_date')
      t.time('due_time')
      t.time('start_time')
      t.time('end_time')
      t.timestamp('complete')
  })
  await knex.schema
    .createTable('projects_next_actions', (t) => {
      t.integer('project_id').references('projects.project_id').notNullable()
      t.integer('next_action_id').references('next_actions.next_action_id').notNullable()
    })
  await knex.schema
    .createTable('next_actions_contexts', (t) => {
      t.integer('context_id').references('contexts.context_id')
      t.integer('next_action_id').references('next_actions.next_action_id')
    })
  await knex.schema
    .createTable('someday_maybe', (t) => {
      t.uuid('associated_user').notNullable().references('users.user_id')
      t.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
      t.string('content')
      t.timestamp('complete')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('next_actions_contexts')
  await knex.schema.dropTableIfExists('projects_next_actions')
  await knex.schema.dropTableIfExists('next_actions')
  await knex.schema.dropTableIfExists('inbox')
  await knex.schema.dropTableIfExists('projects')
  await knex.schema.dropTableIfExists('contexts')
  await knex.schema.dropTableIfExists('someday_maybe')
  await knex.schema.dropTableIfExists('users')
};
