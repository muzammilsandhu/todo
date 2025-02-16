import React, { useMemo } from "react";
import { FaTrash, FaCheck, FaUndo } from "react-icons/fa";

const taskPriorityColor = {
  High: "red",
  Medium: "orange",
  Low: "green",
};

const TaskList = ({ tasks, markAsComplete, revertTask, deleteTask }) => {
  const renderedTasks = useMemo(
    () =>
      tasks.map(({ _id, task, completed, priority }) => (
        <li
          key={_id}
          style={{ borderLeft: `5px solid ${taskPriorityColor[priority]}` }}
        >
          <div className="task-content">
            <span className={completed ? "completed-task" : ""}>{task}</span>
            <span className={`priority priority-${priority.toLowerCase()}`}>
              {priority}
            </span>
          </div>
          <div className="task-actions">
            {completed ? (
              // Show Revert Button when completed
              <button
                onClick={() => revertTask(_id)}
                className="revert-button"
                title="Revert Task"
                aria-label="Revert task"
              >
                <FaUndo />
              </button>
            ) : (
              // Show Mark as Complete Button when not completed
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
        </li>
      )),
    [tasks, markAsComplete, revertTask, deleteTask]
  );

  return <ul>{renderedTasks}</ul>;
};

export default TaskList;
