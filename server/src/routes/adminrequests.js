const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../../knexfile')[process.env.NODE_ENV || 'development']);
const requestsSelect = [
  'id',
  'pending',
  'accepted',
  'priority',
  'work_order_desc',
  'date_created',
  'date_completed',
  'location_id',
  'building_id',
];
const buildPriorityQuery = () =>
  knex('requests')
    .select(requestsSelect)
    .orderBy('priority', 'asc')
    .orderBy('date_created', 'asc')
    .orderBy('complete', 'desc')
    .orderBy('date_completed', 'desc');

router.get('/prioritizedRequests', async (req, res) => {
  try {
    const requests = await buildPriorityQuery().limit(20);
    res.json(requests);
  } catch (err) {
    console.error('Failed to fetch prioritized requests: ', err);
    res.status(500).json({error: 'Failed to fetch prioritized maintenance requests'});
  }
});

module.exports = router;
