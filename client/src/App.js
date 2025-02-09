import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/tasks");
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      const { data } = await axios.post("http://localhost:5000/tasks", {
        task: newTask,
      });
      setTasks((prev) => [...prev, data]);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const markAsComplete = async (id) => {
    try {
      const { data } = await axios.patch(`http://localhost:5000/tasks/${id}`, {
        completed: true,
      });
      setTasks((prev) => prev.map((task) => (task._id === id ? data : task)));
    } catch (error) {
      console.error("Error marking task as complete:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") addTask();
  };

  return (
    <div className="todo-container">
      <h1>To-Do App</h1>
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
    </div>
  );
};

export default App;
