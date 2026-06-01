const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getPosts, getPost, createPost, updatePost, deletePost, searchPosts, getPostsByCategory, getPostsByTag } = require('../controllers/postController');

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', verifyToken, createPost);
router.put('/:id', verifyToken, updatePost);
router.delete('/:id', verifyToken, deletePost);
router.get('/search', searchPosts);
router.get('/category/:id', getPostsByCategory);
router.get('/tag/:id', getPostsByTag);

module.exports = router;