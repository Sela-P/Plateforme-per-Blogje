const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getTags, getTag, createTag, updateTag, deleteTag } = require('../controllers/tagController');

router.get('/', getTags);
router.get('/:id', getTag);
router.post('/', verifyToken, createTag);
router.put('/:id', verifyToken, updateTag);
router.delete('/:id', verifyToken, deleteTag);

module.exports = router;