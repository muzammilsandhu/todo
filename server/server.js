const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet()); // Security headers
app.use(morgan("dev")); // Logging
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Routes
const taskRoutes = require("./routes/taskRoutes"); // Import Routes
app.use("/tasks", taskRoutes); // Use Routes

app.get("/", (req, res) => {
  res.send("Hello from the To-Do App backend!");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  process.exit(1);
});

// Shutdown Handling
process.on("SIGINT", () => {
  console.log("Server shutting down...");
  process.exit(0);
});
