const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema(
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
      maxLength: 20,
      trim: true,
    },
    type: {
      type: String,
      default: "income",
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

// Format date before sending JSON response
IncomeSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.date = new Date(ret.date).toLocaleDateString("en-GB"); // Format as DD-MM-YYYY
    return ret;
  },
});

module.exports = mongoose.model("Income", IncomeSchema);
