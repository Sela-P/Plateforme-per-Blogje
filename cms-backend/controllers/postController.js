const db = require('../config/db');

const getPosts = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Posts');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPost = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Posts WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Not found!' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createPost = async (req, res) => {
  const { titulli, permbajtja, category_id, statusi, imazhi } = req.body;
  try {
    const [r] = await db.query(
      'INSERT INTO Posts (titulli, permbajtja, user_id, category_id, statusi, imazhi) VALUES (?,?,?,?,?,?)',
      [titulli, permbajtja, req.user.id, category_id, statusi || 'draft', imazhi]
    );
    res.status(201).json({ message: 'Created successfully!', id: r.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePost = async (req, res) => {
  const { titulli, permbajtja, category_id, statusi, imazhi } = req.body;
  try {
    await db.query(
      'UPDATE Posts SET titulli=?, permbajtja=?, category_id=?, statusi=?, imazhi=? WHERE id=?',
      [titulli, permbajtja, category_id, statusi, imazhi, req.params.id]
    );
    res.json({ message: 'Changed successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    await db.query('DELETE FROM Posts WHERE id=?', [req.params.id]);
    res.json({ message: 'Deleted successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getPosts, getPost, createPost, updatePost, deletePost };