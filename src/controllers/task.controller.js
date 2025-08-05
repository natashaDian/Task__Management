const Task = require('../models/task.model');


exports.createTask = async (req, res) => {
  console.log('Request received:', req.body);
  // Debug log removed to avoid exposing sensitive data
  try {
    const { title, description, category, priority, deadline } = req.body;

    

    const newTask = await Task.create({
      title,
      description,
      category,
      priority,
      deadline
    });

    res.status(201).json({
      message: 'Task created successfully',
      task: newTask
    });
  } catch (error) {
  console.error('Create task error:', error);
  res.status(500).json({ message: 'Server error', error: error.message });
}
};

exports.getTasks = async (req, res) => {
  try {
    const { category, priority, deadlineFrom, deadlineTo, sortBy } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (priority) filter.priority = priority;
    if (deadlineFrom || deadlineTo) {
      filter.deadline = {};
      if (deadlineFrom) filter.deadline.$gte = new Date(deadlineFrom);
      if (deadlineTo) filter.deadline.$lte = new Date(deadlineTo);
    }

    let query = Task.find(filter);

    if (sortBy) {
      const sortOptions = {};
      const fields = sortBy.split(',');
      fields.forEach(field => {
        let order = 1;
        if (field.startsWith('-')) {
          order = -1;
          field = field.substring(1);
        }
        sortOptions[field] = order;
      });
      query = query.sort(sortOptions);
    }

    const tasks = await query.exec();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: 'Invalid task ID' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedTask = await Task.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({
      message: 'Task updated successfully',
      task: updatedTask,
    });
  } catch (error) {
    res.status(400).json({ message: 'Invalid task ID or data', error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid task ID', error: error.message });
  }
};


