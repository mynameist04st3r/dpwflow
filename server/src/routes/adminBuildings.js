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


router.post('/', async (req, res) => {
  const { admin_id, building_id } = req.body;

  if (!admin_id || !building_id) {
    return res.status(400).json({
      error: 'Missing required fields: admin_id and building_id'
    });
  }

  try {
    const admin = await knex('users')
      .where({ id: admin_id })
      .select('role')
      .first();

    if (!admin || (admin.role !== 3 && admin.role !== 4)) {
      return res.status(403).json({
        error: 'User is not authorized to be assigned to a building'
      });
    }

    const existing = await knex('admin_buildings')
      .where({ admin_id, building_id })
      .first();

    if (existing) {
      return res.status(409).json({
        error: 'This admin is already assigned to the specified building'
      });
    }

    const [newAssignment] = await knex('admin_buildings')
      .insert({ admin_id, building_id })
      .returning('*');

    return res.status(201).json({
      message: 'Admin assigned to building successfully',
      assignment: newAssignment
    });

  } catch (err) {
    console.error('Error creating admin-building assignment:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/', async (req, res) => {
  const { admin_id, building_id } = req.query;

  try {
    let query = knex('admin_buildings').select('*');

    if (admin_id && building_id) {
      const relation = await query
        .where({ admin_id, building_id })
        .first();

      if (!relation) {
        return res.status(404).json({ message: 'Relationship not found' });
      }

      return res.status(200).json(relation);
    }

    if (admin_id) {
      const assignments = await query.where({ admin_id });
      return res.status(200).json(assignments);
    }

    if (building_id) {
      const assignments = await query.where({ building_id });
      return res.status(200).json(assignments);
    }

    const allAssignments = await query;
    return res.status(200).json(allAssignments);

  } catch (err) {
    console.error('Error fetching admin-building data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;