/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex('locations').del();

  await knex('locations').insert([
    { id: 1, state: 'North Carolina', military_base: 'Fort Bragg' },
    { id: 2, state: 'Virginia', military_base: 'Fort Eustis' },
    { id: 3, state: 'Texas', military_base: 'Fort Cavazos' }
  ]);

  await knex.raw(`SELECT setval('locations_id_seq', (SELECT MAX(id) FROM locations))`);
};
