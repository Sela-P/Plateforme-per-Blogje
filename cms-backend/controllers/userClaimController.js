const db = require('../config/db');

const getUserClaims = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM UserClaims WHERE user_id = ?', [req.params.user_id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createClaim = async (req, res) => {
  try {
    const [r] = await db.query(
      'INSERT INTO UserClaims (user_id, claim_type, claim_value) VALUES (?,?,?)',
      [req.body.user_id, req.body.claim_type, req.body.claim_value]
    );
    res.status(201).json({ message: 'U krijua', id: r.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteClaim = async (req, res) => {
  try {
    await db.query('DELETE FROM UserClaims WHERE id=?', [req.params.id]);
    res.json({ message: 'U fshi' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getUserClaims, createClaim, deleteClaim };