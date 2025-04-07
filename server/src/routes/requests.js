const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../../knexfile')[process.env.NODE_ENV || 'development']);

router.get('/AllRequests', async (req, res) => {
  try {
    const requests = await knex('requests')
      .join('users', 'requests.user_id', '=', 'users.id')
      .join('locations', 'requests.location_id', '=', 'locations.id')
      .select(
        'requests.id',
        'users.first_name',
        'users.last_name',
        'users.rank',
        'users.phone_number',
        'requests.work_order_desc',
        'requests.priority',
        'requests.pending',
        'requests.accepted',
        'requests.complete',
        'requests.building_number',
        'requests.room_number',
        'requests.location_desc',
        'locations.state',
        'locations.military_base',
        'requests.date_created'
      )
      .orderBy('requests.date_created', 'desc');

    res.json(requests);
  } catch (err) {
    console.error('Failed to fetch requests:', err);
    res.status(500).json({ error: 'Failed to fetch maintenance requests' });
  }
});




module.exports = router;