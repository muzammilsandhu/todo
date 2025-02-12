import React, { useMemo } from "react";
import { FaTrash, FaCheck } from "react-icons/fa";

const taskPriorityColor = {
  High: "red",
  Medium: "orange",
  Low: "green",
};

const TaskList = ({ tasks, markAsComplete, deleteTask }) => {
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
        </li>
      )),
    [tasks, markAsComplete, deleteTask]
  );

  return <ul>{renderedTasks}</ul>;
};

export default TaskList;
