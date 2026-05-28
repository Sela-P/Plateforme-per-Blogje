const db = require('../config/db');

const getComments = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Comments');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getComment = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Comments WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Nuk u gjet' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createComment = async (req, res) => {
  const { post_id, permbajtja } = req.body;
  try {
    const [r] = await db.query(
      'INSERT INTO Comments (post_id, user_id, permbajtja) VALUES (?,?,?)',
      [post_id, req.user.id, permbajtja]
    );
    res.status(201).json({ message: 'U krijua', id: r.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateComment = async (req, res) => {
  const { permbajtja, statusi } = req.body;
  try {
    await db.query(
      'UPDATE Comments SET permbajtja=?, statusi=? WHERE id=?',
      [permbajtja, statusi, req.params.id]
    );
    res.json({ message: 'U ndryshua' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    await db.query('DELETE FROM Comments WHERE id=?', [req.params.id]);
    res.json({ message: 'U fshi' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getComments, getComment, createComment, updateComment, deleteComment };