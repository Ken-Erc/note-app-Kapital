// const Category = require('../models/category');

// // Create Category
// exports.createCategory = async (req, res) => {
//   try {
//     const { name, description } = req.body;

//     const category = await Category.create({
//       name,
//       description,
//       user: req.user._id
//     });

//     res.status(201).json({
//       message: 'Category created successfully',
//       category
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get All Categories
// exports.getCategories = async (req, res) => {
//   try {
//     const categories = await Category.find({ user: req.user._id });
//     res.json(categories);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get Single Category
// exports.getCategoryById = async (req, res) => {
//   try {
//     const category = await Category.findOne({
//       _id: req.params.id,
//       user: req.user._id
//     });

//     if (!category) {
//       return res.status(404).json({ message: 'Category not found' });
//     }

//     res.json(category);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update Category
// exports.updateCategory = async (req, res) => {
//   try {
//     const category = await Category.findOneAndUpdate(
//       { _id: req.params.id, user: req.user._id },
//       req.body,
//       { new: true }
//     );

//     if (!category) {
//       return res.status(404).json({ message: 'Category not found' });
//     }

//     res.json({
//       message: 'Category updated successfully',
//       category
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Delete Category
// exports.deleteCategory = async (req, res) => {
//   try {
//     const category = await Category.findOneAndDelete({
//       _id: req.params.id,
//       user: req.user._id
//     });

//     if (!category) {
//       return res.status(404).json({ message: 'Category not found' });
//     }

//     res.json({ message: 'Category deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };