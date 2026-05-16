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
const protect = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo management endpoints
 */

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *                 example: Buy groceries
 *               description:
 *                 type: string
 *                 example: Get milk, eggs and bread
 *               dueDate:
 *                 type: string
 *                 example: 2026-05-10
 *     responses:
 *       201:
 *         description: Todo created successfully
 */
router.post('/', protect, createTodo);

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos (with optional filter by completion status)
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: isCompleted
 *         schema:
 *           type: boolean
 *         description: Filter by completion status (true = completed, false = incomplete)
 *     responses:
 *       200:
 *         description: List of todos returned successfully
 */
router.get('/', protect, getAllTodos);

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Get a single todo by ID
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The todo ID
 *     responses:
 *       200:
 *         description: Todo returned successfully
 *       404:
 *         description: Todo not found
 */
router.get('/:id', protect, getSingleTodo);

/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Update a todo by ID
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The todo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated task title
 *               description:
 *                 type: string
 *                 example: Updated description
 *               dueDate:
 *                 type: string
 *                 example: 2026-05-15
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *       404:
 *         description: Todo not found
 */
router.put('/:id', protect, updateTodo);

/**
 * @swagger
 * /api/todos/{id}/toggle:
 *   patch:
 *     summary: Toggle todo complete or incomplete
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The todo ID
 *     responses:
 *       200:
 *         description: Todo status toggled successfully
 *       404:
 *         description: Todo not found
 */
router.patch('/:id/toggle', protect, toggleComplete);

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a todo by ID
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The todo ID
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *       404:
 *         description: Todo not found
 */
router.delete('/:id', protect, deleteTodo);

module.exports = router;













// const express = require('express');
// const router = express.Router();
// const {
//   createTodo,
//   getAllTodos,
//   getSingleTodo,
//   updateTodo,
//   toggleComplete,
//   deleteTodo,
// } = require('../controllers/todoController');
// const  protect  = require('../middleware/authMiddleware');

// router.post('/',      protect, createTodo);
// router.get('/',       protect, getAllTodos);
// router.get('/:id',    protect, getSingleTodo);
// router.put('/:id',    protect, updateTodo);
// router.delete('/:id', protect, deleteTodo);
// router.patch('/:id/toggle', protect, toggleComplete);

// module.exports = router;