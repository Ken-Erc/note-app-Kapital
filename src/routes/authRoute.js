const router = require('express').Router();
const {
  register,
  login,
  updateProfile,
  changePassword
} = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');

router.post('/register',         register);
router.post('/login',            login);
router.put('/update-profile',    protect, updateProfile);
router.put('/change-password',   protect, changePassword);

module.exports = router;