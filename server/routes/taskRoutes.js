const express = require("express");
const {
  getAllTasks,
  addTask,
  deleteTask,
  deleteAllTasks,
  updateTask,
} = require("../controllers/taskController");

const router = express.Router();

// Routes
router.get("/", getAllTasks);
router.post("/", addTask);
router.delete("/:id", deleteTask);
router.delete("/", deleteAllTasks);
router.patch("/:id", updateTask);

module.exports = router;
