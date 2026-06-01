const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
const register = async (req, res) => {
  const { emri, email, password } = req.body;

  try {
    const [existing] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email exists already' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query('INSERT INTO Users (emri, email, password) VALUES (?, ?, ?)', 
      [emri, email, hashedPassword]);

    // Cakto automatikisht rolin 'user'
    const [roles] = await db.query('SELECT id FROM Roles WHERE emertimi = ?', ['user']);
    if (roles.length > 0) {
      await db.query('INSERT INTO UserRoles (user_id, role_id) VALUES (?, ?)', 
        [result.insertId, roles[0].id]);
    }

    res.status(201).json({ message: 'Registration completed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ message: 'Wrong email or password' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (user.statusi === 'inactive') {
      return res.status(403).json({ message: 'Account is deactivated' });
    }
    if (!isMatch) {
      return res.status(400).json({ message: 'Wrong email or password' });
    }

    // Merr rolin e userit
    const [roles] = await db.query(
      'SELECT r.emertimi FROM Roles r JOIN UserRoles ur ON r.id = ur.role_id WHERE ur.user_id = ?',
      [user.id]
    );
    const role = roles.length > 0 ? roles[0].emertimi : 'user';

    const token = jwt.sign(
      { id: user.id, email: user.email, role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    const refreshTokenValue = jwt.sign(
      { id: user.id, email: user.email, role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await db.query(
      'INSERT INTO RefreshTokens (user_id, token, expires_at) VALUES (?,?,?)',
      [user.id, refreshTokenValue, expiresAt]
    );

    res.json({ token, refreshToken: refreshTokenValue, user: { id: user.id, emri: user.emri, email: user.email, role } });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const refreshToken = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    const [rows] = await db.query(
      'SELECT * FROM RefreshTokens WHERE token=? AND expires_at > NOW()',
      [token]
    );
    if (rows.length === 0) return res.status(403).json({ message: 'Invalid or expired token' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const newToken = jwt.sign(
      { id: decoded.id, email: decoded.email, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token: newToken });
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = { register, login, refreshToken };