const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getSettings, getSetting, createSetting, updateSetting, deleteSetting } = require('../controllers/settingController');

router.get('/', getSettings);
router.get('/:id', getSetting);
router.post('/', verifyToken, createSetting);
router.put('/:id', verifyToken, updateSetting);
router.delete('/:id', verifyToken, deleteSetting);

module.exports = router;
