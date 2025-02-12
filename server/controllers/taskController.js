const Task = require("../models/Task");
const asyncHandler = require("../utils/asyncHandler");

// Get all tasks
const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find().sort({
    priority: -1,
    createdAt: -1, // Sort by priority, then newest first
  });
  res.status(200).json(tasks);
});

// Add a new task
const addTask = asyncHandler(async (req, res) => {
  const { task, priority = "Medium" } = req.body;

  if (!task?.trim()) {
    return res.status(400).json({ message: "Task cannot be empty" });
  }

  const newTask = await Task.create({ task, priority }); // Directly use `.create()`
  res.status(201).json(newTask);
});

// Delete a task by ID
const deleteTask = asyncHandler(async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted successfully" });
});

// Delete all tasks
const deleteAllTasks = asyncHandler(async (req, res) => {
  await Task.deleteMany({});
  res.json({ message: "All tasks deleted successfully!" });
});

// Update a task (mark as complete)
const updateTask = asyncHandler(async (req, res) => {
  const { completed, priority } = req.body;

  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    { completed, priority },
    { new: true }
  );

  res.json(updatedTask);
});

module.exports = {
  getAllTasks,
  addTask,
  deleteTask,
  deleteAllTasks,
  updateTask,
};
