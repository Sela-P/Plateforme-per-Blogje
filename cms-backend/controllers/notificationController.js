const db = require('../config/db');

const getNotifications = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Notifications WHERE user_id = ?', [req.user.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createNotification = async (req, res) => {
  try {
    const [r] = await db.query(
      'INSERT INTO Notifications (user_id, mesazhi) VALUES (?,?)',
      [req.body.user_id, req.body.mesazhi]
    );
    res.status(201).json({ message: 'U krijua', id: r.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const markAsRead = async (req, res) => {
  try {
    await db.query('UPDATE Notifications SET lexuar=1 WHERE id=?', [req.params.id]);
    res.json({ message: 'U shënua si lexuar' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteNotification = async (req, res) => {
  try {
    await db.query('DELETE FROM Notifications WHERE id=?', [req.params.id]);
    res.json({ message: 'U fshi' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getNotifications, createNotification, markAsRead, deleteNotification };