const db = require('../config/db');

const getSubscribers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM NewsletterSubscribers');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSubscriber = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM NewsletterSubscribers WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Nuk u gjet' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createSubscriber = async (req, res) => {
  const { email } = req.body;
  try {
    const [r] = await db.query(
      'INSERT INTO NewsletterSubscribers (email) VALUES (?)',
      [email]
    );
    res.status(201).json({ message: 'U abonua me sukses', id: r.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateSubscriber = async (req, res) => {
  const { statusi } = req.body;
  try {
    await db.query(
      'UPDATE NewsletterSubscribers SET statusi=? WHERE id=?',
      [statusi, req.params.id]
    );
    res.json({ message: 'U ndryshua' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteSubscriber = async (req, res) => {
  try {
    await db.query('DELETE FROM NewsletterSubscribers WHERE id=?', [req.params.id]);
    res.json({ message: 'U fshi' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getSubscribers, getSubscriber, createSubscriber, updateSubscriber, deleteSubscriber };