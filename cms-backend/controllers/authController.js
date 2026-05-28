const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
const register = async (req, res) => {
  const { emri, email, password } = req.body;

  try {
    const [existing] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email ekziston tashmë' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO Users (emri, email, password) VALUES (?, ?, ?)', 
      [emri, email, hashedPassword]);

    res.status(201).json({ message: 'Regjistrimi u krye me sukses' });
  } catch (err) {
    res.status(500).json({ message: 'Gabim në server', error: err.message });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ message: 'Email ose fjalëkalim i gabuar' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ose fjalëkalim i gabuar' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, user: { id: user.id, emri: user.emri, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Gabim në server', error: err.message });
  }
};

module.exports = { register, login };