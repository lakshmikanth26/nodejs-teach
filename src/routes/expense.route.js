const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const expenseController = require('../controller/expense.controller');

// Route for creating a new expense
router.post('/createExpense',upload.none(), expenseController.createExpense);

// Route for displaying all expenses
router.get('/getAllExpenses', expenseController.getAllExpenses);

router.post('/updateExpense', expenseController.updateExpense);

router.delete('/deleteExpense/:id', expenseController.deleteExpense)

// Add more routes as needed, e.g., for updating, deleting, or fetching a single expense
module.exports = router;