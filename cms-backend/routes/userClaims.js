const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getUserClaims, createClaim, deleteClaim } = require('../controllers/userClaimController');

router.get('/:user_id', verifyToken, getUserClaims);
router.post('/', verifyToken, createClaim);
router.delete('/:id', verifyToken, deleteClaim);

module.exports = router;