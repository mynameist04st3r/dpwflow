const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../../knexfile')[process.env.NODE_ENV || 'development']);


const baseRequestSelect = [
  'requests.id',
  { work_order_first_name: 'users.first_name' },
  { work_order_last_name: 'users.last_name' },
  { work_order_rank: 'users.rank' },
  { work_order_phone_number: 'users.phone_number' },
  { work_order_email: 'users.email' },
  { work_order_user_id: 'users.id' },
  'requests.work_order_desc',
  'requests.priority',
  'requests.pending',
  'requests.accepted',
  'requests.complete',
  'requests.building_id',
  'requests.building_number',
  'requests.room_number',
  'requests.location_desc',
  { work_order_location_id: 'locations.id' },
  { work_order_state: 'locations.state' },
  { work_order_military_base: 'locations.military_base' },
  'requests.date_created',
  'requests.date_completed'
];


const buildRequestQuery = () =>
  knex('requests')
    .join('users', 'requests.user_id', '=', 'users.id')
    .join('locations', 'requests.location_id', '=', 'locations.id')
    .select(baseRequestSelect)
    .orderBy('requests.date_created', 'desc');


router.get('/AllRequests', async (req, res) => {
  try {
    const requests = await buildRequestQuery();
    res.json(requests);
  } catch (err) {
    console.error('Failed to fetch requests:', err);
    res.status(500).json({ error: 'Failed to fetch maintenance requests' });
  }
});


router.get('/acceptedRequests', async (req, res) => {
  try {
    const acceptedRequests = await buildRequestQuery().where('requests.accepted', true);
    res.json(acceptedRequests);
  } catch (err) {
    console.error('Failed to fetch accepted requests:', err);
    res.status(500).json({ error: 'Failed to fetch accepted maintenance requests' });
  }
});


router.get('/byBuilding/:building_number', async (req, res) => {
  const { building_number } = req.params;
  const normalized = building_number.toUpperCase().replace(/[\s\-]/g, '');

  try {
    const buildingRequests = await buildRequestQuery().where('requests.building_number', normalized);
    res.json(buildingRequests);
  } catch (err) {
    console.error('Failed to fetch building-based requests:', err);
    res.status(500).json({ error: 'Failed to fetch building requests' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const request = await buildRequestQuery()
      .where('requests.id', id)
      .first(); // only get one record

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.json(request);
  } catch (err) {
    console.error('Failed to fetch request by ID:', err);
    res.status(500).json({ error: 'Failed to fetch maintenance request by ID' });
  }
});

module.exports = router;
