const db = require('../config/db');

const getSettings = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Settings');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSetting = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Settings WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Nuk u gjet' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createSetting = async (req, res) => {
  const { celesi, vlera, pershkrimi } = req.body;
  try {
    const [r] = await db.query(
      'INSERT INTO Settings (celesi, vlera, pershkrimi) VALUES (?,?,?)',
      [celesi, vlera, pershkrimi]
    );
    res.status(201).json({ message: 'U krijua', id: r.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateSetting = async (req, res) => {
  const { celesi, vlera, pershkrimi } = req.body;
  try {
    await db.query(
      'UPDATE Settings SET celesi=?, vlera=?, pershkrimi=? WHERE id=?',
      [celesi, vlera, pershkrimi, req.params.id]
    );
    res.json({ message: 'U ndryshua' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteSetting = async (req, res) => {
  try {
    await db.query('DELETE FROM Settings WHERE id=?', [req.params.id]);
    res.json({ message: 'U fshi' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getSettings, getSetting, createSetting, updateSetting, deleteSetting };