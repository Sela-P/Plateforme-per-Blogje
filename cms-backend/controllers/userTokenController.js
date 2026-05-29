const db = require('../config/db');

const getUserTokens = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM UserTokens WHERE user_id = ?', [req.user.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createUserToken = async (req, res) => {
  try {
    const [r] = await db.query(
      'INSERT INTO UserTokens (user_id, token, expires_at) VALUES (?,?,?)',
      [req.user.id, req.body.token, req.body.expires_at]
    );
    res.status(201).json({ message: 'U krijua', id: r.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUserToken = async (req, res) => {
  try {
    await db.query('DELETE FROM UserTokens WHERE id=?', [req.params.id]);
    res.json({ message: 'U fshi' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getUserTokens, createUserToken, deleteUserToken };