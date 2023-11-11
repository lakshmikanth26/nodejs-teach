const { Expense } = require('../models/expense.modal');
const Joi = require('joi');
const moment = require('moment');


const expenseValidationSchema = Joi.object({
  expenseType: Joi.string().required(),
  // date: Joi.string().required(),
  // expenseRefNo: Joi.string().required(),
  // particulars: Joi.string().required(),
  Amount: Joi.number().min(0).required(),
  // createdBy: Joi.string(),
});

const expenseValidationUpdateSchema = Joi.object({
  id: Joi.string().required(),
  expenseType: Joi.string().required(),
  date: Joi.string().required(),
  expenseRefNo: Joi.string().required(),
  particulars: Joi.string().required(),
  amount: Joi.number().min(0).required(),
  createdBy: Joi.string(),
});

// Create a new expense
async function createExpense(req, res) {
  try {
    const { error, value } = expenseValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const data = req.body;
    const expense = new Expense(data);
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the expense.' });
  }
}

async function updateExpense(req, res) {
  try {
    const { error, value } = expenseValidationUpdateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    const updatedData = req.body;
    const expenseId = req.body.id; 

    const expense = await Expense.findById(expenseId);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found.' });
    }

    // Update the expense properties with the new data
    expense.expenseType = updatedData.expenseType;
    expense.particulars = updatedData.particulars;
    expense.amount = updatedData.amount;

    await expense.save();

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the expense.' });
  }
}

async function deleteExpense(req, res) {
  try {
    const expenseId = req.params.id;
    const deletedExpense = await Expense.findByIdAndRemove(expenseId);

    if (!deletedExpense) {
      return res.status(404).json({ error: 'Expense not found.' });
    }

    res.status(200).json({message: "Successfully Deleted"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while deleting the expense.' });
  }
}

// Get all expenses
async function getAllExpenses(req, res) {
  try {
    const aggregate = [
      {
        $project : {
          expenseType: 1,
          amount: 1,
        }
      },
      {
        $sort:{
          expenseType: -1
        }
      }
    ]
    const expenses = await Expense.aggregate(aggregate);
    const totalRecords = await Expense.countDocuments().exec();
    res.json({
      data: expenses,
      totalCount: totalRecords
    })

  .post('/', async function(req,res){
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'An error occurred while fetching expenses.' });
  }
}

// Other controller functions for updating, deleting, or getting a single expense can be added here.

module.exports = {
  createExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense
};