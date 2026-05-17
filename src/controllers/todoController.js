const Todo = require('../models/Todo');

// Create a new todo
const createTodo = async (req, res) => {
  try {
    const { title, description,  } = req.body;

    const todo = await Todo.create({
      user: req.user.id,
      title,
      description,
       dueDate: new Date(), // Set current date as default due date
    });

    res.status(201).json({ success: true, data: todo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all todos for logged-in user
const getAllTodos = async (req, res) => {
  try {
    const filter = { user: req.user.id };

    // Optional filter by completion status e.g. ?isCompleted=true
    if (req.query.isCompleted !== undefined) {
      filter.isCompleted = req.query.isCompleted === 'true';
    }

    const todos = await Todo.find(filter).sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: todos.length, data: todos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single todo
const getSingleTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });

    if (!todo) {
      return res.status(404).json({ success: false, message: 'Todo not found' });
    }

    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a todo (edit title, description, dueDate)
const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({ success: false, message: 'Todo not found' });
    }

    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Mark a todo as completed or not completed
const toggleComplete = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });

    if (!todo) {
      return res.status(404).json({ success: false, message: 'Todo not found' });
    }

    todo.isCompleted = !todo.isCompleted;
    await todo.save();

    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!todo) {
      return res.status(404).json({ success: false, message: 'Todo not found' });
    }

    res.status(200).json({ success: true, message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createTodo,
  getAllTodos,
  getSingleTodo,
  updateTodo,
  toggleComplete,
  deleteTodo,
};