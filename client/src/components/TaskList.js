import React from "react";
import { FaTrash } from "react-icons/fa";

const TaskList = ({ tasks, markAsComplete, deleteTask }) => {
  return (
    <ul>
      {tasks.map(({ _id, task, completed }) => (
        <li key={_id}>
          <span className={completed ? "completed-task" : ""}>{task}</span>
          <div className="task-actions">
            {!completed && (
              <button
                onClick={() => markAsComplete(_id)}
                className="complete-button"
              >
                Mark as Completed
              </button>
            )}
            <button onClick={() => deleteTask(_id)} className="delete-button">
              <FaTrash />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
