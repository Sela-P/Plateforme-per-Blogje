const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getPostTags, addPostTag, removePostTag } = require('../controllers/postTagController');

router.get('/:post_id', getPostTags);
router.post('/', verifyToken, addPostTag);
router.delete('/:id', verifyToken, removePostTag);

module.exports = router;