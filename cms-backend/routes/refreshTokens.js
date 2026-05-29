const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getRefreshTokens, createRefreshToken, deleteRefreshToken } = require('../controllers/refreshTokenController');

router.get('/', verifyToken, getRefreshTokens);
router.post('/', verifyToken, createRefreshToken);
router.delete('/:id', verifyToken, deleteRefreshToken);

module.exports = router;