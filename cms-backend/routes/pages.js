const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getPages, getPage, createPage, updatePage, deletePage } = require('../controllers/pagesController');

router.get('/', getPages);
router.get('/:id', getPage);
router.post('/', verifyToken, createPage);
router.put('/:id', verifyToken, updatePage);
router.delete('/:id', verifyToken, deletePage);

module.exports = router;
