const express = require("express");
const {
  getAllTasks,
  addTask,
  deleteTask,
  deleteAllTasks,
  updateTask,
} = require("../controllers/taskController");

const { validateObjectId } = require("../middleware/validateObjectId"); // Add ID validation middleware

const router = express.Router();

// Routes for individual tasks (require task ID)
router
  .route("/:id")
  .patch(validateObjectId, updateTask) // PATCH or PUT based on needs
  .delete(validateObjectId, deleteTask);

// Routes for bulk operations (all tasks)
router.route("/").get(getAllTasks).post(addTask).delete(deleteAllTasks);

module.exports = router;
