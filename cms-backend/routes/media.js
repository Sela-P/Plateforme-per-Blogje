const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getMedia, getMediaById, createMedia, updateMedia, deleteMedia } = require('../controllers/mediaController');

router.get('/', getMedia);
router.get('/:id', getMediaById);

router.post('/', verifyToken, (req, res, next) => {
  req.app.locals.upload.single('file')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    next();
  });
}, createMedia);

router.put('/:id', verifyToken, updateMedia);
router.delete('/:id', verifyToken, deleteMedia);

module.exports = router;