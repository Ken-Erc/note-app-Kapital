const router = require('express').Router();
const {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote
} = require('../controllers/noteController');
const protect = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Note management endpoints
 */

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, category]
 *             properties:
 *               title:
 *                 type: string
 *                 example: My first note
 *               description:
 *                 type: string
 *                 example: This is the note description
 *               category:
 *                 type: string
 *                 example: Work
 *     responses:
 *       201:
 *         description: Note created successfully
 */
router.post('/', protect, createNote);

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Get all notes (with optional search and category filter)
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search notes by title
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter notes by category (e.g Work, Class, Daily)
 *     responses:
 *       200:
 *         description: List of notes returned successfully
 */
router.get('/', protect, getNotes);

/**
 * @swagger
 * /api/notes/{id}:
 *   get:
 *     summary: Get a single note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The note ID
 *     responses:
 *       200:
 *         description: Note returned successfully
 *       404:
 *         description: Note not found
 */
router.get('/:id', protect, getNoteById);

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Update a note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The note ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated note title
 *               description:
 *                 type: string
 *                 example: Updated description
 *               category:
 *                 type: string
 *                 example: Class
 *     responses:
 *       200:
 *         description: Note updated successfully
 *       404:
 *         description: Note not found
 */
router.put('/:id', protect, updateNote);

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Delete a note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The note ID
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *       404:
 *         description: Note not found
 */
router.delete('/:id', protect, deleteNote);

module.exports = router;















// const router = require('express').Router();
// const {
//   createNote,
//   getNotes,
//   getNoteById,
//   updateNote,
//   deleteNote
// } = require('../controllers/noteController');
// const protect = require('../middleware/authMiddleware');

// router.post('/',      protect, createNote);
// router.get('/',       protect, getNotes);
// router.get('/:id',    protect, getNoteById);
// router.put('/:id',    protect, updateNote);
// router.delete('/:id', protect, deleteNote);

// module.exports = router;