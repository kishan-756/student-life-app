const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    type: {
      type: String, // "income" or "expense"
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
