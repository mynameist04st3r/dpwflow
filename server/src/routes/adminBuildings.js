const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../../knexfile')[process.env.NODE_ENV || 'development']);


router.patch('/', async (req, res) => {
  const { current_admin_id, building_id, new_admin_id } = req.body;

  if (!current_admin_id || !building_id || !new_admin_id) {
    return res.status(400).json({
      error: 'Missing required fields: current_admin_id, building_id, new_admin_id'
    });
  }

  try {
    const existing = await knex('admin_buildings')
      .where({ admin_id: current_admin_id, building_id })
      .first();

    if (!existing) {
      return res.status(404).json({
        error: `No admin-building assignment found for admin_id ${current_admin_id} and building_id ${building_id}`
      });
    }

    await knex('admin_buildings')
      .where({ admin_id: current_admin_id, building_id })
      .del();

    const [updated] = await knex('admin_buildings')
      .insert({ admin_id: new_admin_id, building_id })
      .returning('*');

    res.status(200).json({
      message: 'Admin-building assignment updated successfully',
      admin_building: updated
    });

  } catch (err) {
    console.error('Error updating admin-building assignment:', err);
    res.status(500).json({ error: 'Failed to update admin-building assignment' });
  }
});


router.delete('/', async (req, res) => {
  const { admin_id, building_id } = req.body;

  if (!admin_id || !building_id) {
    return res.status(400).json({
      error: 'Missing required fields: admin_id and building_id'
    });
  }

  try {
    const existing = await knex('admin_buildings')
      .where({ admin_id, building_id })
      .first();

    if (!existing) {
      return res.status(404).json({
        error: `No admin-building assignment found for admin_id ${admin_id} and building_id ${building_id}`
      });
    }

    await knex('admin_buildings')
      .where({ admin_id, building_id })
      .del();

    res.status(200).json({
      message: 'Admin-building assignment deleted successfully'
    });

  } catch (err) {
    console.error('Error deleting admin-building assignment:', err);
    res.status(500).json({ error: 'Failed to delete admin-building assignment' });
  }
});


module.exports = router;