/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { hash } = require('@uswriting/bcrypt');

exports.seed = async function(knex) {
  await knex('users').del();

  await knex('users').insert([
    {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      rank: 'Sergeant',
      password: await hash('securepass1', 10),
      username: 'johndoe',
      phone_number: '5551234567',
      email: 'john.doe@example.mil',
      role: 3
    },
    {
      id: 2,
      first_name: 'Jane',
      last_name: 'Smith',
      rank: 'Corporal',
      password: await hash('securepass2', 10),
      username: 'janesmith',
      phone_number: '5559876543',
      email: 'jane.smith@example.mil',
      role: 2
    },
    {
      id: 3,
      first_name: 'Alex',
      last_name: 'Brown',
      rank: 'Private',
      password: await hash('securepass3'),
      username: 'alexbrown',
      phone_number: '5556789012',
      email: 'alex.brown@example.mil',
      role: 1
    },
    {
      id: 999,
      first_name: 'Anonymous',
      last_name: 'Submitter',
      rank: 'N/A',
      password: await hash('nopassword'),
      username: 'anonymoussubmitter',
      phone_number: '',
      email: '',
      role: 1
    },
     {
      id: 4,
      first_name: 'admin',
      last_name: 'admin',
      rank: 'N/A',
      password: await hash('password'),
      username: 'admin',
      phone_number: '1234567890',
      email: 'admin@dpwflow.com',
      role: 4
    }
  ]);

  await knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))`);
};
