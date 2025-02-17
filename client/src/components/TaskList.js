import React, { useMemo } from "react";
import { FaTrash, FaCheck, FaUndo, FaStar, FaRegStar } from "react-icons/fa";
import "../App.css";

const taskPriorityColor = {
  High: "red",
  Medium: "orange",
  Low: "green",
};

const TaskList = ({
  tasks,
  markAsComplete,
  revertTask,
  deleteTask,
  toggleStarred,
}) => {
  const renderedTasks = useMemo(
    () =>
      tasks.map(({ _id, task, completed, priority, starred }) => (
        <li
          key={_id}
          style={{ borderLeft: `5px solid ${taskPriorityColor[priority]}` }}
          className="gap-10"
        >
          <div className="task-content">
            <span className={completed ? "completed-task" : ""}>{task}</span>
            <span className={`priority priority-${priority.toLowerCase()}`}>
              {priority}
            </span>
          </div>
          <div className="task-actions flex gap-5">
            <button
              onClick={() => toggleStarred(_id, starred)}
              className="star-button"
              title={starred ? "Unstar Task" : "Star Task"}
              aria-label={starred ? "Unstar Task" : "Star Task"}
            >
              {starred ? <FaStar color="gold" /> : <FaRegStar />}
            </button>
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
    [tasks, markAsComplete, revertTask, deleteTask, toggleStarred]
  );

  return <ul>{renderedTasks}</ul>;
};

export default TaskList;
