const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  date:        { type: Date, required: true },
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category:    { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);