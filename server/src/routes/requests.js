const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../../knexfile')[process.env.NODE_ENV || 'development']);


const normalizeBuildingNumber = (str) => {
  return str ? str.toUpperCase().replace(/[\s\-]/g, '') : null;
};

router.post('/newRequest', async (req, res) => {
  try {
    const {
      user_id,
      location_id,
      building_number,
      room_number,
      location_desc,
      work_order_desc,
      priority = 1,
      first_name,
      last_name,
      anon_email,
      anon_phone
    } = req.body;

    if (!user_id || !location_id || !building_number || !work_order_desc) {
      return res.status(400).json({
        error: 'Missing required fields: user_id, location_id, building_number, work_order_desc'
      });
    }

    const normalizedBuildingNumber = normalizeBuildingNumber(building_number);

    let building = await knex('buildings')
      .where({
        building_number: normalizedBuildingNumber,
        location_id
      })
      .first();

    if (!building) {
      const [newBuilding] = await knex('buildings')
        .insert({
          building_number: normalizedBuildingNumber,
          location_id
        })
        .returning('*');
      building = newBuilding;
    }

    const isGuest = user_id === 999;

    const insertData = {
      user_id,
      building_id: building.id,
      location_id,
      building_number: normalizedBuildingNumber,
      room_number: room_number || null,
      location_desc: location_desc || null,
      work_order_desc,
      priority,
      anon_name: isGuest && first_name && last_name ? `${first_name} ${last_name}` : null,
      anon_email: isGuest ? anon_email || null : null,
      anon_phone: isGuest ? anon_phone || null : null
    };

    const [newRequest] = await knex('requests').insert(insertData).returning('*');

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