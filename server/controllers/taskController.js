const Task = require("../models/Task");
const asyncHandler = require("../utils/asyncHandler");

// Get all tasks
const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
});

// Add a new task
const addTask = asyncHandler(async (req, res) => {
  const { task } = req.body;

  const newTask = new Task({ task });
  const savedTask = await newTask.save();
  res.status(201).json(savedTask);
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
  const task = await Task.findById(req.params.id);
  task.completed = !task.completed;
  const updatedTask = await task.save();
  res.json(updatedTask);
});

module.exports = {
  getAllTasks,
  addTask,
  deleteTask,
  deleteAllTasks,
  updateTask,
};
