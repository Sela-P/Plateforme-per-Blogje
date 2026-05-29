const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getUserRoles, assignRole, removeRole } = require('../controllers/userRoleController');

router.get('/', verifyToken, getUserRoles);
router.post('/', verifyToken, assignRole);
router.delete('/:id', verifyToken, removeRole);

module.exports = router;