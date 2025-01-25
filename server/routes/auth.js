const express = require('express');
const router = express.Router();
const {
  twitterOAuth2Start,
  twitterOAuth2Callback,
} = require('../controllers/authController');

router.get('/auth/twitter/start', twitterOAuth2Start);
router.get('/auth/twitter/callback', twitterOAuth2Callback);

module.exports = router;
