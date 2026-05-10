const express = require('express');
const router = express.Router();
const {
  createTodo,
  getAllTodos,
  getSingleTodo,
  updateTodo,
  toggleComplete,
  deleteTodo,
} = require('../controllers/todoController');
const  protect  = require('../middleware/authMiddleware');

router.post('/',      protect, createTodo);
router.get('/',       protect, getAllTodos);
router.get('/:id',    protect, getSingleTodo);
router.put('/:id',    protect, updateTodo);
router.delete('/:id', protect, deleteTodo);
router.patch('/:id/toggle', protect, toggleComplete);

module.exports = router;