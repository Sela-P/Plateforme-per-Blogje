const db = require('../config/db');

const getPostTags = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT pt.*, t.emertimi FROM PostTags pt LEFT JOIN Tags t ON pt.tag_id = t.id WHERE pt.post_id = ?',
      [req.params.post_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addPostTag = async (req, res) => {
  try {
    const [r] = await db.query(
      'INSERT INTO PostTags (post_id, tag_id) VALUES (?,?)',
      [req.body.post_id, req.body.tag_id]
    );
    res.status(201).json({ message: 'Etiketa u shtua', id: r.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removePostTag = async (req, res) => {
  try {
    await db.query('DELETE FROM PostTags WHERE id=?', [req.params.id]);
    res.json({ message: 'Etiketa u hoq' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getPostTags, addPostTag, removePostTag };