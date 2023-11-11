const express = require('express');
const multer = require('multer');
const upload = multer();
const router = express.Router();


// Login route
router.post('/login',upload.none(), (req, res) => {
    console.log(req.body);
    res.json({})
});

module.exports = router;