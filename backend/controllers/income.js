const IncomeSchema = require("../models/incomeModel");

exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const income = IncomeSchema({
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
    await income.save();
    res.status(200).json({
      message: "Income added",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;

  try {
    // Attempt to find and delete the expense by its ID
    const income = await IncomeSchema.findByIdAndDelete(id);

    if (!income) {
      // If no expense was found, return a 404 error
      return res.status(404).json({ message: "Income not found" });
    }

    // If the expense was deleted, return a success message
    res.status(200).json({
      message: "Income deleted",
    });
  } catch (err) {
    // Handle any errors that occurred during the delete operation
    res.status(500).json({
      message: "Server Error",
    });
  }
};
