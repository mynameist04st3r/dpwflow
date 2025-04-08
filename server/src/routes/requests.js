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
        { work_order_first_name: 'users.first_name' },
        { work_order_last_name: 'users.last_name' },
        { work_order_rank: 'users.rank' },
        { work_order_phone_number: 'users.phone_number' },
        'requests.work_order_desc',
        'requests.priority',
        'requests.pending',
        'requests.accepted',
        'requests.complete',
        'requests.building_number',
        'requests.room_number',
        'requests.location_desc',
        { work_order_state: 'locations.state' },
        { work_order_military_base: 'locations.military_base' },
        'requests.date_created'
      )
      .orderBy('requests.date_created', 'desc');

    res.json(requests);
  } catch (err) {
    console.error('Failed to fetch requests:', err);
    res.status(500).json({ error: 'Failed to fetch maintenance requests' });
  }
});


router.get('/acceptedRequests', async (req, res) => {
  try {
    const acceptedRequests = await knex('requests')
      .join('users', 'requests.user_id', '=', 'users.id')
      .join('locations', 'requests.location_id', '=', 'locations.id')
      .where('requests.accepted', true)
      .select(
        'requests.id',
        { work_order_first_name: 'users.first_name' },
        { work_order_last_name: 'users.last_name' },
        { work_order_rank: 'users.rank' },
        { work_order_phone_number: 'users.phone_number' },
        'requests.work_order_desc',
        'requests.priority',
        'requests.pending',
        'requests.accepted',
        'requests.complete',
        'requests.building_number',
        'requests.room_number',
        'requests.location_desc',
        { work_order_state: 'locations.state' },
        { work_order_military_base: 'locations.military_base' },
        'requests.date_created'
      )
      .orderBy('requests.date_created', 'desc');

    res.json(acceptedRequests);
  } catch (err) {
    console.error('Failed to fetch accepted requests:', err);
    res.status(500).json({ error: 'Failed to fetch accepted maintenance requests' });
  }
});


router.post('/newRequest', async (req, res) => {
  try {
    const {
      user_id = 999, // default to anonymous user if not provided
      work_order_desc,
      location_id,
      priority = 1,
      building_number = null,
      room_number = null,
      location_desc = null
    } = req.body;


    if (!work_order_desc || !location_id) {
      return res.status(400).json({
        error: 'Missing required fields: work_order_desc, location_id'
      });
    }

    const [newRequest] = await knex('requests')
      .insert({
        user_id,
        work_order_desc,
        location_id,
        priority,
        building_number,
        room_number,
        location_desc
      })
      .returning('*');

    res.status(201).json(newRequest);
  } catch (err) {
    console.error('Error creating new request:', err);
    res.status(500).json({ error: 'Failed to create maintenance request' });
  }
});


router.patch('/updateRequest/:id', async (req, res) => {
  const { id } = req.params;
  const {
    pending,
    accepted,
    complete,
    priority,
    work_order_desc,
    building_number,
    room_number,
    location_desc
  } = req.body;

  const fieldsToUpdate = {};

  if (pending !== undefined) fieldsToUpdate.pending = pending;
  if (accepted !== undefined) fieldsToUpdate.accepted = accepted;
  if (complete !== undefined) fieldsToUpdate.complete = complete;
  if (priority !== undefined) fieldsToUpdate.priority = priority;
  if (work_order_desc !== undefined) fieldsToUpdate.work_order_desc = work_order_desc;
  if (building_number !== undefined) fieldsToUpdate.building_number = building_number;
  if (room_number !== undefined) fieldsToUpdate.room_number = room_number;
  if (location_desc !== undefined) fieldsToUpdate.location_desc = location_desc;

  if (Object.keys(fieldsToUpdate).length === 0) {
    return res.status(400).json({ error: 'No valid fields provided to update' });
  }

  try {
    const updated = await knex('requests')
      .where({ id })
      .update(fieldsToUpdate)
      .returning('*');

    if (updated.length === 0) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.json(updated[0]);
  } catch (err) {
    console.error(`Failed to update request with id ${id}:`, err);
    res.status(500).json({ error: 'Failed to update request' });
  }
});


module.exports = router;