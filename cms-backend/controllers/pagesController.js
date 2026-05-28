const db = require('../config/db');

const getPages = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Pages');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPage = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Pages WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Nuk u gjet' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createPage = async (req, res) => {
  const { titulli, permbajtja, slug, statusi } = req.body;
  try {
    const [r] = await db.query(
      'INSERT INTO Pages (titulli, permbajtja, slug, statusi) VALUES (?,?,?,?)',
      [titulli, permbajtja, slug, statusi || 'draft']
    );
    res.status(201).json({ message: 'U krijua', id: r.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePage = async (req, res) => {
  const { titulli, permbajtja, slug, statusi } = req.body;
  try {
    await db.query(
      'UPDATE Pages SET titulli=?, permbajtja=?, slug=?, statusi=? WHERE id=?',
      [titulli, permbajtja, slug, statusi, req.params.id]
    );
    res.json({ message: 'U ndryshua' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePage = async (req, res) => {
  try {
    await db.query('DELETE FROM Pages WHERE id=?', [req.params.id]);
    res.json({ message: 'U fshi' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getPages, getPage, createPage, updatePage, deletePage };