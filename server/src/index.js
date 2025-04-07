const port = 8000;
const express = require('express');
const app = express();
const knex = require('knex')(require('../knexfile.js')['development']);
app.get('/', (req, res) => {
  res.send('Server Operational.');
})
app.get('/dpwflow', (req, res) => {
  knex('dpwflow').select('*').then(DATABASE_HEADER => {
    let VARIABLE = DATABASE_HEADER.map(dpwflow => dpwflow.DATABASE_HEADER)
    res.json(VARIABLE);
  })
});
app.listen(port, () => {
  console.log('Server running at http://localhost:' + port);
});
