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
    const {state, military_base, building_number} = req.body;
    const existingLocation = await knex('locations').where('state', state).first();
    if (existingLocation) {
      const existingBase = await knex('locations').where('state', state).where('military_base', military_base).first();
      if (existingBase) {
        const existingBuilding = await knex('buildings').where('location_id', existingLocation.id).where('building_number', building_number).first();
        if (existingBuilding) {
          res.status(400).json({error: 'Building number already exists for this location'});
        } else {
          await knex('buildings').insert({location_id: existingLocation.id, building_number: building_number});
          res.json({message: 'Building added to existing location', id: existingLocation.id});
        }
      } else {
        const newBase = await knex('locations').insert({state: state, military_base: military_base}).returning('id');
        const newBaseId = newBase[0].id;
        if (building_number) {
          await knex('buildings').insert({location_id: newBaseId, building_number: building_number});
        }
        res.json({message: 'New military base added to existing state', id: newBaseId});
      }
    } else {
      const newLocation = await knex('locations').insert({state: state, military_base: military_base}).returning('id');
      const locationId = newLocation[0].id;
      if (building_number) {
        await knex('buildings').insert({location_id: locationId, building_number: building_number});
      }
      res.json({message: 'New location and military base added', id: locationId});
    }
  } catch (err) {
    console.error('Failed to add location or building:', err);
    res.status(500).json({error: 'Failed to add location or building'});
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

router.get('/buildings', async (req, res) => {
  try {
    const locationId = req.query.locationId;
    const buildingNumber = req.query.buildingNumber;
    const buildings = await knex('buildings')
      .where('location_id', locationId)
      .where('building_number', 'ilike', `%${buildingNumber}%`)
      .select('id', 'building_number')
      .distinct();
    res.json(buildings);
  } catch (err) {
    console.error('Failed to fetch buildings: ', err);
    res.status(500).json({error: 'Failed to fetch buildings'});
  }
});

router.delete('/buildings/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await knex('buildings').where('id', id).del();
    res.json({message: 'Building deleted successfully'});
  } catch (err) {
    console.error('Failed to delete building:', err);
    res.status(500).json({error: 'Failed to delete building'});
  }
});

module.exports = router;
