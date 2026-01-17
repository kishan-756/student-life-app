const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// Add new expense / income
router.post("/", async (req, res) => {
  try {
    const { amount, note, type, userEmail, date } = req.body;

    const exp = new Expense({
      amount,
      note,
      type,
      userEmail,
      date,
    });

    await exp.save();
    res.status(201).json(exp);
  } catch (err) {
    res.status(500).json({ message: "Error adding expense", err });
  }
});

// Get all expenses of a user
router.get("/:email", async (req, res) => {
  try {
    const data = await Expense.find({ userEmail: req.params.email });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching expenses", err });
  }
});

// Delete an expense
router.delete("/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting expense", err });
  }
});

module.exports = router;
