/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex('buildings').del();

  await knex('buildings').insert([
    { id: 1, building_number: '123', location_id: 1 },
    { id: 2, building_number: '45B', location_id: 2 },
    { id: 3, building_number: '89', location_id: 3 },
    { id: 4, building_number: 'B5', location_id: 1 },
    { id: 5, building_number: 'C2', location_id: 2 }
  ]);

  await knex.raw(`SELECT setval('buildings_id_seq', (SELECT MAX(id) FROM buildings))`);
};
