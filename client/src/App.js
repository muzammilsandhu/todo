import React, { useState, useEffect, useCallback, useMemo } from "react";
import { ClipLoader } from "react-spinners";
import { debounce } from "lodash";
import { AnimatePresence } from "framer-motion";
import useApi from "./hooks/useApi";
import TaskList from "./components/TaskList";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const { callApi, loading, error } = useApi();

  // Fetch tasks (memoized to prevent unnecessary re-renders)
  const fetchTasks = useCallback(async () => {
    try {
      const data = await callApi({
        method: "get",
        url: `${process.env.REACT_APP_BACKEND_URL}/tasks`,
      });
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, [callApi]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Add task
  const addTask = useCallback(async () => {
    if (!newTask.trim()) return;

    try {
      const data = await callApi({
        method: "post",
        url: `${process.env.REACT_APP_BACKEND_URL}/tasks`,
        data: { task: newTask },
      });
      setTasks((prev) => [...prev, data]);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }, [newTask, callApi]);

  // Debounced version of addTask for better UX
  const debouncedAddTask = useMemo(() => debounce(addTask, 300), [addTask]);

  // Delete task
  const deleteTask = useCallback(
    async (id) => {
      try {
        await callApi({
          method: "delete",
          url: `${process.env.REACT_APP_BACKEND_URL}/tasks/${id}`,
        });
        setTasks((prev) => prev.filter((task) => task._id !== id));
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    },
    [callApi]
  );

  // Mark task as complete
  const markAsComplete = useCallback(
    async (id) => {
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
    },
    [callApi]
  );

  // Handle Enter key press
  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") debouncedAddTask();
    },
    [debouncedAddTask]
  );

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
          onKeyDown={handleKeyPress}
        />
        <button onClick={addTask} className="add-button">
          Add
        </button>
      </div>

      <AnimatePresence>
        <TaskList
          tasks={tasks}
          markAsComplete={markAsComplete}
          deleteTask={deleteTask}
        />
      </AnimatePresence>
    </div>
  );
};

export default App;
