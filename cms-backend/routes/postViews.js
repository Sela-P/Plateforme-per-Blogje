const express = require('express');
const router = express.Router();
const { getPostViews, addPostView } = require('../controllers/postViewController');

router.get('/:post_id', getPostViews);
router.post('/', addPostView);

module.exports = router;