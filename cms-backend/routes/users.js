const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getUsers, getUser, updateUser, deleteUser, uploadProfilePhoto, removeProfilePhoto } = require('../controllers/userController');

router.get('/', verifyToken, getUsers);
router.get('/:id', verifyToken, getUser);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);
router.post('/:id/photo', verifyToken, (req, res, next) => {
  req.app.locals.upload.single('file')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    next();
  });
}, uploadProfilePhoto);

router.delete('/:id/photo', verifyToken, removeProfilePhoto);

module.exports = router;