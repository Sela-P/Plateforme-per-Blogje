const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getAuditLogs, createAuditLog, deleteAuditLog } = require('../controllers/auditLogController');

router.get('/', verifyToken, getAuditLogs);
router.post('/', verifyToken, createAuditLog);
router.delete('/:id', verifyToken, deleteAuditLog);

module.exports = router;