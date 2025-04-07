require('dotenv').config();

const port = process.env.API_PORT;
const express = require('express');
const app = express();
const knex = require('knex')(require('../knexfile.js')['development']);
const cors = require('cors')

if (!process.env.NODE_ENV) {
  console.error('Missing NODE_ENV');
  process.exit(1);
}

const requestsRoutes = require('./routes/requests');
const locationsRoutes = require('./routes/locations');

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use('/requests', requestsRoutes);
app.use('/locations', locationsRoutes);

app.listen(port, (req, res) => {
  console.log(`Your server is up at http://localhost:${port}/`)
})
