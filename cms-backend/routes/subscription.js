const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getPlans, createPlan, updatePlan, deletePlan, getUserSubscriptions, createSubscription } = require('../controllers/subscriptionController');

router.get('/plans', getPlans);
router.post('/plans', verifyToken, createPlan);
router.put('/plans/:id', verifyToken, updatePlan);
router.delete('/plans/:id', verifyToken, deletePlan);
router.get('/my', verifyToken, getUserSubscriptions);
router.post('/', verifyToken, createSubscription);

module.exports = router;