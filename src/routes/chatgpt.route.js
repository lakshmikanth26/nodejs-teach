const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const chatGptController = require('../controller/chatGpt.controller');

router.post('/gpt',upload.none(), chatGptController.chatRequest);

module.exports = router;