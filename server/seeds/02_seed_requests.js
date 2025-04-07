/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex('requests').del();

  await knex('requests').insert([
    {
      id: 1,
      user_id: 1,
      pending: true,
      accepted: false,
      complete: false,
      priority: 2,
      work_order_desc: 'Leaky faucet in bathroom.',
      location_id: 1,
      building_number: '123',
      room_number: 'A101',
      location_desc: 'South Wing'
    },
    {
      id: 2,
      user_id: 2,
      pending: false,
      accepted: true,
      complete: false,
      priority: 3,
      work_order_desc: 'Heater not working.',
      location_id: 2,
      building_number: '45B',
      room_number: '2F',
      location_desc: 'East Barracks'
    },
    {
      id: 3,
      user_id: 3,
      pending: false,
      accepted: true,
      complete: true,
      priority: 1,
      work_order_desc: 'Window cracked.',
      location_id: 3,
      building_number: '89',
      room_number: 'C303',
      location_desc: 'Top Floor'
    }
  ]);

  await knex.raw(`SELECT setval('requests_id_seq', (SELECT MAX(id) FROM requests))`);
};
