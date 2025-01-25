const express = require('express');
const router = express.Router();
const { requireJwtAuth } = require('../middlewares/jwtAuth');
const { processReferral } = require('../controllers/referralController');

router.post('/referral', requireJwtAuth, processReferral);

module.exports = router;
