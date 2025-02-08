const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });


const taskRoutes = require('./routes/taskRoutes'); // Import Routes
app.use('/tasks', taskRoutes); // Use Routes

// Routes
app.get('/', (req, res) => {
  res.send('Hello from the To-Do App backend!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
