/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('admin_buildings', function(table) {
    table.integer('admin_id').unsigned().notNullable();
    table.integer('building_id').unsigned().notNullable();

    table
      .foreign('admin_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    table
      .foreign('building_id')
      .references('id')
      .inTable('buildings')
      .onDelete('CASCADE');

    table.primary(['admin_id', 'building_id']); // Composite primary key
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('admin_buildings');
};
