const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getUserTokens, createUserToken, deleteUserToken } = require('../controllers/userTokenController');

router.get('/', verifyToken, getUserTokens);
router.post('/', verifyToken, createUserToken);
router.delete('/:id', verifyToken, deleteUserToken);

module.exports = router;