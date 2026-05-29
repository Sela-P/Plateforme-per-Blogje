const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getSubscribers, getSubscriber, createSubscriber, updateSubscriber, deleteSubscriber } = require('../controllers/newsletterController');

router.get('/', verifyToken, getSubscribers);
router.get('/:id', verifyToken, getSubscriber);
router.post('/', createSubscriber);
router.put('/:id', verifyToken, updateSubscriber);
router.delete('/:id', verifyToken, deleteSubscriber);

module.exports = router;