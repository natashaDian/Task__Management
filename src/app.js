const setupSwagger = require('./config/swagger');

const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/task.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes); // Connect route

app.get('/', (req, res) => {
  res.send('Task Management API is running!');
});

setupSwagger(app);

module.exports = app;
