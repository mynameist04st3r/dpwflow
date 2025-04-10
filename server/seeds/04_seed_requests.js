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
      building_id: 1,
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
      building_id: 2,
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
      building_id: 3,
      building_number: '89',
      room_number: 'C303',
      location_desc: 'Top Floor'
    },
    {
      id: 4,
      user_id: 999,
      pending: true,
      accepted: false,
      complete: false,
      priority: 4,
      work_order_desc: 'Overflowing toilet in shared restroom.',
      location_id: 1,
      building_id: 4,
      building_number: 'B5',
      room_number: '101',
      location_desc: 'First floor restroom',
      anon_name: 'A. Walker',
      anon_email: 'anon.walker@example.com',
      anon_phone: '5550001111'
    },
    {
      id: 5,
      user_id: 999,
      pending: true,
      accepted: false,
      complete: false,
      priority: 5,
      work_order_desc: 'Flickering light in hallway.',
      location_id: 2,
      building_id: 5,
      building_number: 'C2',
      room_number: '2E',
      location_desc: 'End of corridor',
      anon_name: 'C. Ray',
      anon_email: 'ray.anon@example.com',
      anon_phone: '5552223333'
    },
    {
      id: 6,
      user_id: 999,
      pending: true,
      accepted: false,
      complete: false,
      priority: 5,
      work_order_desc: 'Oven sounds like a cammed V8 on start-up.',
      location_id: 2,
      building_id: null,
      building_number: '321B',
      room_number: '2E',
      location_desc: 'Kitchen',
      anon_name: 'John Wick',
      anon_email: 'boogieman.anon@example.com',
      anon_phone: '9102911111'
    }
  ]);

  await knex.raw(`SELECT setval('requests_id_seq', (SELECT MAX(id) FROM requests))`);
};
