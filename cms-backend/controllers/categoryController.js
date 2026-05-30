const db = require('../config/db');

const getCategories = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Categories');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Categories WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Nuk u gjet' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createCategory = async (req, res) => {
  const { emertimi, pershkrimi, slug } = req.body;
  try {
    const [r] = await db.query(
      'INSERT INTO Categories (emertimi, pershkrimi, slug) VALUES (?,?,?)',
      [emertimi, pershkrimi, slug]
    );
    res.status(201).json({ message: 'U krijua', id: r.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCategory = async (req, res) => {
  const { emertimi, pershkrimi, slug } = req.body;
  try {
    await db.query(
      'UPDATE Categories SET emertimi=?, pershkrimi=?, slug=? WHERE id=?',
      [emertimi, pershkrimi, slug, req.params.id]
    );
    res.json({ message: 'U ndryshua' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    await db.query('DELETE FROM Categories WHERE id=?', [req.params.id]);
    res.json({ message: 'U fshi' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getCategories, getCategory, createCategory, updateCategory, deleteCategory };