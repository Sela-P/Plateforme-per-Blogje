const db = require('../config/db');

const getAuditLogs = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT al.*, u.emri FROM AuditLog al LEFT JOIN Users u ON al.user_id = u.id ORDER BY al.created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createAuditLog = async (req, res) => {
  try {
    await db.query(
      'INSERT INTO AuditLog (user_id, veprimi, tabela, record_id) VALUES (?,?,?,?)',
      [req.body.user_id, req.body.veprimi, req.body.tabela, req.body.record_id]
    );
    res.status(201).json({ message: 'U regjistrua' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteAuditLog = async (req, res) => {
  try {
    await db.query('DELETE FROM AuditLog WHERE id=?', [req.params.id]);
    res.json({ message: 'U fshi' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAuditLogs, createAuditLog, deleteAuditLog };