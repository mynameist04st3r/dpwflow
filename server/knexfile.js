require('dotenv').config();

if (!process.env.DB_CONNECTION_STRING) {
  console.error('Missing DB_CONNECTION_STRING');
  process.exit(1);
}

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgres',
    connection: process.env.DB_CONNECTION_STRING,
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },

  test: {
    client: 'postgres',
    connection: process.env.DB_CONNECTION_STRING, 
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};
