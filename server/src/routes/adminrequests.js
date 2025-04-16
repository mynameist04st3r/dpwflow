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

router.get('/locations', async (req, res) => {
  try {
    const locations = await knex('locations').select('state');
    res.json(locations);
  } catch (err) {
    console.error('Failed to fetch locations: ', err)
    res.status(500).json({error: 'Failed to fetch locations'});
  }
});

router.get('/locations/:state', async (req, res) => {
  try {
    const state = req.params.state;
    const location = await knex('locations').where('state', state).first();
    if (location) {
      res.json([location]);
    } else {
      res.json([]);
    }
  } catch (err) {
    console.error('Failed to fetch location: ', err);
    res.status(500).json({error: 'Failed to fetch location'});
  }
});

router.post('/locations', async (req, res) => {
  try {
    const {state, military_base} = req.body;
    const existingLocation = await knex('locations').where('state', state).first();
    if (existingLocation) {
      res.status(400).json({error: 'Location already exists'});
    } else {
      const newLocation = await knex('locations').insert({state, military_base}).returning('id');
      res.json({message: 'Location added successfully', id: newLocation[0].id});
    }
  } catch (err) {
    console.error('Failed to add location: ', err);
    res.status(500).json({error: 'Failed to add location'});
  }
});

router.get('/militaryBases', async (req, res) => {
  try {
    const state = req.query.state;
    const militaryBase = req.query.militaryBase;
    const bases = await knex('locations')
      .where('state', state)
      .where('military_base', 'ilike', `%${militaryBase}%`)
      .select('military_base')
      .distinct();
    res.json(bases);
  } catch (err) {
    console.error('Failed to fetch military bases: ', err);
    res.status(500).json({error: 'Failed to fetch military bases'});
  }
});

module.exports = router;
