const express = require('express');
const router = express.Router();
const expenseRoutes = require("./expense.route")
const authentication = require("./auth.route")
const chatGpt = require("./chatgpt.route")

router.use('/chat',chatGpt)
router.use('/expense', expenseRoutes);
router.use('/auth', authentication)
router.use('/',(req,res)=>{
    res.send({message:"API IS CALLING"})
})
//use middleware
module.exports = router;