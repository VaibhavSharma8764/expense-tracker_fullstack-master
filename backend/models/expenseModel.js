const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      default: "expense",
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 80,
      trim: true,
    },
  },
  { timestamps: true }
);

ExpenseSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.date = new Date(ret.date).toLocaleDateString("en-GB"); // Format: DD-MM-YYYY
    return ret;
  },
});

module.exports = mongoose.model("Expense", ExpenseSchema);
