const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getNotifications, createNotification, markAsRead, deleteNotification } = require('../controllers/notificationController');

router.get('/', verifyToken, getNotifications);
router.post('/', verifyToken, createNotification);
router.put('/:id', verifyToken, markAsRead);
router.delete('/:id', verifyToken, deleteNotification);

module.exports = router;