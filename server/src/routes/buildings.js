const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../../knexfile')[process.env.NODE_ENV || 'development']);

const normalizeBuildingNumber = (str) => {
  return str ? str.toUpperCase().replace(/[\s\-]/g, '') : null;
};

router.post('/new-building', async (req, res) => {
  try {
    const {
      building_number,
      location_id,
      admin_id
    } = req.body;

    if (!building_number || !location_id || !admin_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const normalizedBuildingNumber = normalizeBuildingNumber(building_number);

    let building = await knex('buildings')
      .where({
        building_number: normalizedBuildingNumber,
        location_id
      })
      .first();

    if (building) {
      return res.status(200).json({ message: 'Building already exists' });
    }

    const [newBuilding] = await knex('buildings')
      .insert({
        building_number: normalizedBuildingNumber,
        location_id
      })
      .returning('*');

    const [newAdminBuilding] = await knex('admin_buildings').insert({
      admin_id,
      building_id: newBuilding.id
    }).returning('*');

    return res.status(201).json({
      message: 'Building and admin assignment created successfully',
      building: newBuilding,
      admin_building: newAdminBuilding
    });

  } catch (error) {
    console.error('Error in POST /buildings/new-building', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
