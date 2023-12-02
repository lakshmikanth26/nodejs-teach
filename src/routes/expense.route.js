const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const expenseController = require('../controller/expense.controller');
const {verifyToken} = require('../middleware/authMiddleWare')

// Route for creating a new expense
router.post('/createExpense',upload.none(), expenseController.createExpense);

// Route for displaying all expenses
// router.get('/getAllExpenses', verifyToken, expenseController.getAllExpenses);
router.get('/getAllExpenses', expenseController.getAllExpenses);

router.post('/updateExpense', expenseController.updateExpense);

router.delete('/deleteExpense/:id', expenseController.deleteExpense)

// Add more routes as needed, e.g., for updating, deleting, or fetching a single expense
module.exports = router;