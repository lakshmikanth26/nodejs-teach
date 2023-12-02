const express = require('express');
const authController = require('../controller/auth.controller');
const multer = require('multer');
const upload = multer();
const router = express.Router();

router.post('/login', upload.none(),authController.login);
router.post('/register', upload.none(),authController.register);

module.exports = router;