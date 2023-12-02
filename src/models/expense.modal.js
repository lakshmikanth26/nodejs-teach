const mongoose = require("mongoose");
const newExpenseSchema = new mongoose.Schema({
    expenseType: String,
    Amount: Number
})
const expenseSchema = new mongoose.Schema({
    expenseType: String,
    date: String,
    expenseRefNo: String,
    particulars: String,
    amount: Number,
    createdBy: String,
});
// const Expense = mongoose.model('Expense', expenseSchema);
const Expense = mongoose.model('Expense',expenseSchema)

module.exports = {
    Expense
}