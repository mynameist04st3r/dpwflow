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

    const admin = await knex('users')
    .where({ id: admin_id })
    .select('role')
    .first();

    if (!admin || (admin.role !== 3 && admin.role !== 4)) {
    return res.status(403).json({
      error: 'User is not authorized to manage buildings'
    });
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

router.get('/get-buildings', async (req, res) => {
  try {
    const buildings = await knex('buildings').select('*');
    res.status(200).json(buildings);
  } catch (error) {
    console.error('Error in GET /buildings', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/get-buildings/id/:building_id', async (req, res) => {
  try {
    const { building_id } = req.params;
    const building = await knex('buildings').where('id', building_id).first();
    if (!building) {
      return res.status(404).json({ error: 'Building not found' });
    }
    res.status(200).json(building);
  } catch (error) {
    console.error('Error in GET /buildings/:building_id', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/get-buildings/building-number/:building_number', async (req, res) => {
  try {
    const { building_number } = req.params;
    const normalized = building_number.toUpperCase().replace(/[\s\-]/g, '');

    const building = await knex('buildings')
      .whereRaw(
        "REPLACE(REPLACE(UPPER(building_number), ' ', ''), '-', '') = ?",
        [normalized]
      )
      .first();

    if (!building) {
      return res.status(404).json({ error: 'Building not found' });
    }

    res.status(200).json(building);
  } catch (err) {
    console.error('Error fetching building by number:', err);
    res.status(500).json({ error: 'Failed to fetch building' });
  }
});


module.exports = router;
