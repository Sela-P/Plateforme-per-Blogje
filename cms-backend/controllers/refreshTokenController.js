const db = require('../config/db');
const jwt = require('jsonwebtoken');

const getRefreshTokens = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM RefreshTokens WHERE user_id = ?', [req.user.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createRefreshToken = async (req, res) => {
  try {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    const expires_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await db.query(
      'INSERT INTO RefreshTokens (user_id, token, expires_at) VALUES (?,?,?)',
      [req.user.id, token, expires_at]
    );
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteRefreshToken = async (req, res) => {
  try {
    await db.query('DELETE FROM RefreshTokens WHERE id=?', [req.params.id]);
    res.json({ message: 'U fshi' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getRefreshTokens, createRefreshToken, deleteRefreshToken };