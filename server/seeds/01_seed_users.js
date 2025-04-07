/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex('users').del();

  await knex('users').insert([
    {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      rank: 'Sergeant',
      password: 'securepass1',
      username: 'johndoe',
      phone_number: '5551234567',
      email: 'john.doe@example.mil'
    },
    {
      id: 2,
      first_name: 'Jane',
      last_name: 'Smith',
      rank: 'Corporal',
      password: 'securepass2',
      username: 'janesmith',
      phone_number: '5559876543',
      email: 'jane.smith@example.mil'
    },
    {
      id: 3,
      first_name: 'Alex',
      last_name: 'Brown',
      rank: 'Private',
      password: 'securepass3',
      username: 'alexbrown',
      phone_number: '5556789012',
      email: 'alex.brown@example.mil'
    }
  ]);

  await knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))`);
};
