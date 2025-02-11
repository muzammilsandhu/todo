import React from "react";
import { motion } from "framer-motion";
import { FaTrash, FaCheck } from "react-icons/fa";

const TaskList = ({ tasks, markAsComplete, deleteTask }) => {
  return (
    <ul>
      {tasks.map(({ _id, task, completed }) => (
        <motion.li
          key={_id}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <span className={completed ? "completed-task" : ""}>{task}</span>
          <div className="task-actions">
            {!completed && (
              <button
                onClick={() => markAsComplete(_id)}
                className="complete-button"
              >
                <FaCheck />
              </button>
            )}
            <button onClick={() => deleteTask(_id)} className="delete-button">
              <FaTrash />
            </button>
          </div>
        </motion.li>
      ))}
    </ul>
  );
};

export default TaskList;
