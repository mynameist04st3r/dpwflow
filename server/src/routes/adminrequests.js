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

router.put('/updatePriorityOrder', async (req, res) => {
  try {
    const requests = req.body;
    const updates = requests.map((request, index) => {
      return {
        id: request.id,
        priority: index + 1,
      };
    });
    for (const update of updates) {
      await knex('requests')
        .where('id', update.id)
        .update('priority', update.priority);
    }
    res.json({message: 'Priority order updated successfully'});
  } catch (err) {
    console.error('Failed to updatepriority order: ', err);
    res.status(500).json({error: 'Failed to update priority order'});
  }
});

module.exports = router;
