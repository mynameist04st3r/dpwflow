/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex('admin_buildings').del();

  await knex('admin_buildings').insert([
    { admin_id: 1, building_id: 1 },
    { admin_id: 1, building_id: 2 },

    { admin_id: 2, building_id: 2 },
    { admin_id: 2, building_id: 3 },

    { admin_id: 1, building_id: 5 },
    { admin_id: 2, building_id: 5 }
  ]);
};
