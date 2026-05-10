const router = require('express').Router();
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../controllers/CategoryController');
const protect = require('../middleware/authMiddleware');

router.post('/',     protect, createCategory);
router.get('/',      protect, getCategories);
router.get('/:id',   protect, getCategoryById);
router.put('/:id',   protect, updateCategory);
router.delete('/:id',protect, deleteCategory);

module.exports = router;