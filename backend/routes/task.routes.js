const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// Add new task (with deadline)
router.post("/", async (req, res) => {
  try {
    const { text, userEmail, deadline } = req.body;

    const task = new Task({
      text,
      userEmail,
      deadline,
    });

    await task.save();

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Error adding task", err });
  }
});

// Get all tasks of a user
router.get("/:email", async (req, res) => {
  try {
    const tasks = await Task.find({ userEmail: req.params.email });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks", err });
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task", err });
  }
});

// Update task (completed or text)
router.put("/:id", async (req, res) => {
  try {
    const { completed, text } = req.body;

    const updateData = {};
    if (completed !== undefined) updateData.completed = completed;
    if (text !== undefined) updateData.text = text;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Error updating task", err });
  }
});

module.exports = router;
