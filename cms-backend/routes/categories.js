const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getCategories, getCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');

router.get('/', getCategories);
router.get('/:id', getCategory);
router.post('/', verifyToken, createCategory);
router.put('/:id', verifyToken, updateCategory);
router.delete('/:id', verifyToken, deleteCategory);

module.exports = router;