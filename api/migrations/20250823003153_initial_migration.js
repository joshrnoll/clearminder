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
    .createTable('stupf', (t) => {
      t.increments('stupf_id')
      t.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
      t.uuid('associated_user').notNullable()
      t.foreign('associated_user').references('users.user_id')
      t.string('content').notNullable()
    })
  await knex.schema
    .createTable('projects', (t) => {
      t.increments('project_id')
      t.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
      t.uuid('associated_user').notNullable()
      t.foreign('associated_user').references('users.user_id')
      t.string('title').notNullable()
      t.string('goal')
      t.date('due_date')
      t.date('start_date')
      t.date('end_date')
      t.time('due_time')
      t.time('start_time')
      t.time('end_time')
      t.boolean('complete').defaultTo('false')
  })
  await knex.schema
    .createTable('next_actions_contexts', (t) => {
      t.increments('next_actions_context_id')
      t.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
      t.uuid('associated_user').notNullable()
      t.foreign('associated_user').references('users.user_id')
      t.string('title').notNullable()
    })
  await knex.schema
    .createTable('next_actions', (t) => {
      t.increments('next_action_id')
      t.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
      t.string('content')
      t.uuid('associated_user').notNullable()
      t.foreign('associated_user').references('users.user_id')
      t.integer('next_actions_context_id')
      t.foreign('next_actions_context_id').references('next_actions_contexts.next_actions_context_id')
      t.integer('linked_project_id')
      t.foreign('linked_project_id').references('projects.project_id')
      t.date('due_date')
      t.date('start_date')
      t.date('end_date')
      t.time('due_time')
      t.time('start_time')
      t.time('end_time')
      t.boolean('complete')
  })
  await knex.schema
    .createTable('someday_maybe', (t) => {
      t.uuid('associated_user').notNullable()
      t.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
      t.foreign('associated_user').references('users.user_id')
      t.string('content')
      t.boolean('complete')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('someday_maybe')
  await knex.schema.dropTableIfExists('next_actions')
  await knex.schema.dropTableIfExists('next_actions_contexts')
  await knex.schema.dropTableIfExists('projects')
  await knex.schema.dropTableIfExists('stupf')
  await knex.schema.dropTableIfExists('users')
};
