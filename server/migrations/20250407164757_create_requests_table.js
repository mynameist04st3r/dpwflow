/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('requests', function(table) {
    table.increments('id').primary();

    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');

    table.boolean('pending').defaultTo(true);
    table.boolean('accepted').defaultTo(false);
    table.boolean('complete').defaultTo(false);

    table.integer('priority').defaultTo(1);
    table.text('work_order_desc');

    table.integer('location_id').unsigned().notNullable();
    table.foreign('location_id').references('id').inTable('locations').onDelete('CASCADE');

    table.timestamp('date_created').defaultTo(knex.fn.now());

    table.string('building_number', 50);
    table.string('room_number', 50);
    table.string('location_desc', 50);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('requests');
};
