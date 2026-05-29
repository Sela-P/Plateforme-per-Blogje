const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');

router.get('/', verifyToken, getUsers);
router.get('/:id', verifyToken, getUser);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);

module.exports = router;