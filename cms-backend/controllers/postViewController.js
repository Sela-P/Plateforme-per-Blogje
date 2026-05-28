const db = require('../config/db');

const getPostViews = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT COUNT(*) as total FROM PostViews WHERE post_id = ?', [req.params.post_id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addPostView = async (req, res) => {
  try {
    await db.query(
      'INSERT INTO PostViews (post_id, ip_address) VALUES (?,?)',
      [req.body.post_id, req.ip]
    );
    res.status(201).json({ message: 'View u shtua' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getPostViews, addPostView };