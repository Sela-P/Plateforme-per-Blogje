const db = require('../config/db');

const getTags = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Tags');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTag = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Tags WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Nuk u gjet' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createTag = async (req, res) => {
  const { emertimi, slug } = req.body;
  try {
    const [r] = await db.query(
      'INSERT INTO Tags (emertimi, slug) VALUES (?,?)',
      [emertimi, slug]
    );
    res.status(201).json({ message: 'U krijua', id: r.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTag = async (req, res) => {
  const { emertimi, slug } = req.body;
  try {
    await db.query(
      'UPDATE Tags SET emertimi=?, slug=? WHERE id=?',
      [emertimi, slug, req.params.id]
    );
    res.json({ message: 'U ndryshua' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTag = async (req, res) => {
  try {
    await db.query('DELETE FROM Tags WHERE id=?', [req.params.id]);
    res.json({ message: 'U fshi' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getTags, getTag, createTag, updateTag, deleteTag };