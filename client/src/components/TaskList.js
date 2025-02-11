import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { FaTrash, FaCheck } from "react-icons/fa";

const taskVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const TaskList = ({ tasks, markAsComplete, deleteTask }) => {
  const renderedTasks = useMemo(
    () =>
      tasks.map(({ _id, task, completed }) => (
        <motion.li
          key={_id}
          variants={taskVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          style={{ cursor: "pointer" }}
        >
          <span className={completed ? "completed-task" : ""}>{task}</span>
          <div className="task-actions">
            {!completed && (
              <button
                onClick={() => markAsComplete(_id)}
                className="complete-button"
                title="Mark as Complete"
                aria-label="Mark task as complete"
              >
                <FaCheck />
              </button>
            )}
            <button
              onClick={() => deleteTask(_id)}
              className="delete-button"
              title="Delete Task"
              aria-label="Delete task"
            >
              <FaTrash />
            </button>
          </div>
        </motion.li>
      )),
    [tasks, markAsComplete, deleteTask]
  );

  return <ul>{renderedTasks}</ul>;
};

export default TaskList;
