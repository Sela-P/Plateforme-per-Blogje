const db = require('../config/db');

const getMedia = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Media');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMediaById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Media WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Nuk u gjet' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createMedia = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'Nuk u ngarkua skedari' });
    
    const [r] = await db.query(
      'INSERT INTO Media (emri_skedarit, lloji, rruga, user_id) VALUES (?,?,?,?)',
      [file.originalname, file.mimetype, `/uploads/${file.filename}`, req.user.id]
    );
    res.status(201).json({ message: 'U ngarkua', id: r.insertId, rruga: `/uploads/${file.filename}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateMedia = async (req, res) => {
  const { emri_skedarit, lloji, rruga } = req.body;
  try {
    await db.query(
      'UPDATE Media SET emri_skedarit=?, lloji=?, rruga=? WHERE id=?',
      [emri_skedarit, lloji, rruga, req.params.id]
    );
    res.json({ message: 'U ndryshua' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteMedia = async (req, res) => {
  try {
    await db.query('DELETE FROM Media WHERE id=?', [req.params.id]);
    res.json({ message: 'U fshi' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getMedia, getMediaById, createMedia, updateMedia, deleteMedia };