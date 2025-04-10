/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('buildings', function(table) {
    table.increments('id').primary();
    table.integer('location_id').unsigned().notNullable();
    table.string('building_number', 50).notNullable();

    table
      .foreign('location_id')
      .references('id')
      .inTable('locations')
      .onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('buildings');
};
