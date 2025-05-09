const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../../knexfile')[process.env.NODE_ENV || 'development']);


router.get('/allLocations', async (req, res) => {
  try {
    const locations = await knex('locations')
      .select('*')
      .orderBy('id', 'asc');

    res.json(locations);
  } catch (err) {
    console.error('Error fetching locations:', err);
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
});


router.get('/specificState/:state_name', async (req, res) => {
  const { state_name } = req.params;

  try {
    const locations = await knex('locations')
      .select('*')
      .whereILike('state', state_name);

    if (locations.length === 0) {
      return res.status(404).json({ message: `No bases found in ${state_name}` });
    }

    res.json(locations);
  } catch (err) {
    console.error(`Error fetching locations for state ${state_name}:`, err);
    res.status(500).json({ error: 'Failed to fetch locations for given state' });
  }
});



module.exports = router;