const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getRoles, createRole, updateRole, deleteRole } = require('../controllers/roleController');

router.get('/', getRoles);
router.post('/', verifyToken, createRole);
router.put('/:id', verifyToken, updateRole);
router.delete('/:id', verifyToken, deleteRole);

module.exports = router;