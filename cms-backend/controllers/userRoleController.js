const db = require('../config/db');

const getUserRoles = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT ur.*, u.emri, r.emertimi FROM UserRoles ur LEFT JOIN Users u ON ur.user_id = u.id LEFT JOIN Roles r ON ur.role_id = r.id'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const assignRole = async (req, res) => {
  try {
    const [r] = await db.query('INSERT INTO UserRoles (user_id, role_id) VALUES (?,?)', [req.body.user_id, req.body.role_id]);
    res.status(201).json({ message: 'Roli u caktua', id: r.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeRole = async (req, res) => {
  try {
    await db.query('DELETE FROM UserRoles WHERE id=?', [req.params.id]);
    res.json({ message: 'Roli u hoq' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getUserRoles, assignRole, removeRole };