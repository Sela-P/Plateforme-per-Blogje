const db = require('../config/db');

const getRoles = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Roles');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createRole = async (req, res) => {
  const { emertimi } = req.body;
  try {
    const [r] = await db.query('INSERT INTO Roles (emertimi) VALUES (?)', [emertimi]);
    res.status(201).json({ message: 'U krijua', id: r.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateRole = async (req, res) => {
  const { emertimi } = req.body;
  try {
    await db.query('UPDATE Roles SET emertimi=? WHERE id=?', [emertimi, req.params.id]);
    res.json({ message: 'U ndryshua' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteRole = async (req, res) => {
  try {
    await db.query('DELETE FROM Roles WHERE id=?', [req.params.id]);
    res.json({ message: 'U fshi' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getRoles, createRole, updateRole, deleteRole };