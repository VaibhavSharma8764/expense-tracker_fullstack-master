const ExpenseSchema = require("../models/expenseModel.js");

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const expense = ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
  });
  //   console.log(income);
  try {
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number" });
    }
    await expense.save();
    res.status(200).json({
      message: "Expense added",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    // Attempt to find and delete the expense by its ID
    const expense = await ExpenseSchema.findByIdAndDelete(id);

    if (!expense) {
      // If no expense was found, return a 404 error
      return res.status(404).json({ message: "Expense not found" });
    }

    // If the expense was deleted, return a success message
    res.status(200).json({
      message: "Expense deleted",
    });
  } catch (err) {
    // Handle any errors that occurred during the delete operation
    res.status(500).json({
      message: "Server Error",
    });
  }
};
