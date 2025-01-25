const express = require('express');
const router = express.Router();
const { getUserData, joinWaitlist } = require('../controllers/userController');
const { requireJwtAuth } = require('../middlewares/jwtAuth');

router.get('/user', requireJwtAuth, getUserData);
router.post('/join', joinWaitlist);

module.exports = router;
