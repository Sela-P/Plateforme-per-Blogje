const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getComments, getComment, createComment, updateComment, deleteComment } = require('../controllers/commentController');

router.get('/', getComments);
router.get('/:id', getComment);
router.post('/', verifyToken, createComment);
router.put('/:id', verifyToken, updateComment);
router.delete('/:id', verifyToken, deleteComment);

module.exports = router;