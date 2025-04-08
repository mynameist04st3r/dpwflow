const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../../knexfile')[process.env.NODE_ENV || 'development']);


const normalizeRoomOrBuilding = (str) => {
  if (!str) return null;
  return str.toUpperCase().replace(/[\s\-]/g, '');
};

router.post('/newRequest', async (req, res) => {
  try {
    let {
      user_id,
      work_order_desc,
      location_id,
      priority = 1,
      building_number,
      room_number,
      location_desc = null
    } = req.body;

    if (!user_id) {
      user_id = 999;
    }

    if (!work_order_desc || !location_id) {
      return res.status(400).json({
        error: 'Missing required fields: work_order_desc, location_id'
      });
    }

    building_number = normalizeRoomOrBuilding(building_number);
    room_number = normalizeRoomOrBuilding(room_number);

    const insertData = {
      user_id,
      work_order_desc,
      location_id,
      priority,
      building_number,
      room_number,
      location_desc
    };

    const [newRequest] = await knex('requests')
      .insert(insertData)
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