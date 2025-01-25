const express = require('express');
const router = express.Router();
const { handleChat } = require('../controllers/chatController');
const { requireJwtAuth } = require('../middlewares/jwtAuth');

router.post('/chat', requireJwtAuth, handleChat);

module.exports = router;
