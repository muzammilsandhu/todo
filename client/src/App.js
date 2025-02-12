import React, { useState, useEffect, useCallback, useMemo } from "react";
import { ClipLoader } from "react-spinners";
import { debounce } from "lodash";
import { FaPlus, FaTimes } from "react-icons/fa";
import useApi from "./hooks/useApi";
import TaskList from "./components/TaskList";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Medium");

  const { callApi, loading, error } = useApi();

  // Priority levels and colors
  const priorityLevels = ["Low", "Medium", "High"];
  const priorityColors = useMemo(
    () => ({
      High: "#c82333", // Red
      Medium: "#ff9800", // Orange
      Low: "#218838", // Green
    }),
    []
  );

  // Fetch tasks
  useEffect(() => {
    (async () => {
      try {
        const data = await callApi({
          method: "get",
          url: `${process.env.REACT_APP_BACKEND_URL}/tasks`,
        });
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    })();
  }, [callApi]);

  // Add task
  const addTask = useCallback(async () => {
    if (!newTask.trim()) return;

    try {
      const data = await callApi({
        method: "post",
        url: `${process.env.REACT_APP_BACKEND_URL}/tasks`,
        data: { task: newTask, priority },
      });
      setTasks((prev) => [...prev, data]);
      setNewTask("");
      setPriority("Medium");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }, [newTask, priority, callApi]);

  // Debounced version of addTask for better UX
  const debouncedAddTask = useMemo(() => debounce(addTask, 300), [addTask]);

  // Delete task
  const deleteTask = async (id) => {
    try {
      await callApi({
        method: "delete",
        url: `${process.env.REACT_APP_BACKEND_URL}/tasks/${id}`,
      });
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Mark task as complete
  const markAsComplete = async (id) => {
    try {
      const data = await callApi({
        method: "patch",
        url: `${process.env.REACT_APP_BACKEND_URL}/tasks/${id}`,
        data: { completed: true },
      });
      setTasks((prev) => prev.map((task) => (task._id === id ? data : task)));
    } catch (error) {
      console.error("Error marking task as complete:", error);
    }
  };

  // Clear all tasks
  const clearAllTasks = async () => {
    if (!window.confirm("Are you sure you want to clear all tasks?")) return;

    try {
      await callApi({
        method: "delete",
        url: `${process.env.REACT_APP_BACKEND_URL}/tasks`,
      });
      setTasks([]);
    } catch (error) {
      console.error("Error clearing tasks:", error);
    }
  };

  // Handle keyboard events for Enter, ArrowUp, ArrowDown
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      debouncedAddTask();
    } else if (e.key === "ArrowUp") {
      // Increase priority
      setPriority((prevPriority) => {
        const index = priorityLevels.indexOf(prevPriority);
        // return index < priorityLevels.length - 1
        //   ? priorityLevels[index + 1]
        //   : prevPriority;
        return priorityLevels[(index + 1) % priorityLevels.length]; // Loop forward
      });
    } else if (e.key === "ArrowDown") {
      // Decrease priority
      setPriority((prevPriority) => {
        const index = priorityLevels.indexOf(prevPriority);
        // return index > 0 ? priorityLevels[index - 1] : prevPriority;
        return priorityLevels[
          (index - 1 + priorityLevels.length) % priorityLevels.length
        ]; // Loop backward
      });
    }
  };

  return (
    <div className="todo-container">
      <h1>To-Do App</h1>

      {loading && <ClipLoader color="#28a745" size={30} />}
      {error && <p className="error">{error}</p>}

      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          onKeyDown={handleKeyPress} // Handle Enter, ArrowUp, ArrowDown
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
          style={{ backgroundColor: priorityColors[priority] }}
        >
          {priorityLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        <div className="task-buttons">
          <button onClick={addTask} className="add-button" title="Add Task">
            <FaPlus />
          </button>
          <button
            onClick={clearAllTasks}
            disabled={!tasks.length}
            className="clear-button"
            title="Clear All Tasks"
          >
            <FaTimes />
          </button>
        </div>
      </div>

      <TaskList
        tasks={tasks}
        markAsComplete={markAsComplete}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default App;
