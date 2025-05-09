/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('first_name', 50).notNullable();
    table.string('last_name', 50).notNullable();
    table.string('rank', 50);
    table.string('password', 255).notNullable();
    table.string('username', 50).notNullable().unique();
    table.string('phone_number', 50).notNullable();
    table.string('email', 50).notNullable().unique();
    table.integer('role').notNullable().defaultTo(1); // 1 = user, 2 = admin
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
