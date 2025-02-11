const Task = require("../models/Task");

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new task
const addTask = async (req, res) => {
  const task = new Task({
    task: req.body.task,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete all tasks
const deleteAllTasks = async (req, res) => {
  try {
    await Task.deleteMany({});
    res.json({ message: "All tasks deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a task (mark as complete)
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    task.completed = !task.completed;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllTasks,
  addTask,
  deleteTask,
  deleteAllTasks,
  updateTask,
};
