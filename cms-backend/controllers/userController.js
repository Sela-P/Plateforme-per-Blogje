const db = require('../config/db');
const bcrypt = require('bcryptjs');

const getUsers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, emri, email, created_at FROM Users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, emri, email, created_at FROM Users WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Nuk u gjet' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  const { emri, email, password } = req.body;
  try {
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      await db.query('UPDATE Users SET emri=?, email=?, password=? WHERE id=?', [emri, email, hashed, req.params.id]);
    } else {
      await db.query('UPDATE Users SET emri=?, email=? WHERE id=?', [emri, email, req.params.id]);
    }
    res.json({ message: 'U ndryshua' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await db.query('DELETE FROM Users WHERE id=?', [req.params.id]);
    res.json({ message: 'U fshi' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const uploadProfilePhoto = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'Nuk u ngarkua foto' });
    
    await db.query('UPDATE Users SET foto_profili=? WHERE id=?', 
      [`/uploads/${file.filename}`, req.params.id]);
    
    res.json({ message: 'Foto u ndryshua', foto_profili: `/uploads/${file.filename}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeProfilePhoto = async (req, res) => {
  try {
    await db.query('UPDATE Users SET foto_profili=NULL WHERE id=?', [req.params.id]);
    res.json({ message: 'Foto u hoq' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getUsers, getUser, updateUser, deleteUser, uploadProfilePhoto, removeProfilePhoto };