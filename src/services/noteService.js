const Note = require('../models/Note');

exports.createNote = (data) => Note.create(data);

exports.getAllNotes = (userId, search, category) => {
  const filter = { user: userId };

  if (search) {
    filter.title = { $regex: search, $options: 'i' };
  }

  if (category) {
    filter.category = category;
  }

  return Note.find(filter).populate('category', 'name description');
};

exports.getNoteById = (id, userId) =>
  Note.findOne({ _id: id, user: userId })
    .populate('category', 'name description');

exports.updateNote = (id, userId, data) =>
  Note.findOneAndUpdate({ _id: id, user: userId }, data, { new: true });

exports.deleteNote = (id, userId) =>
  Note.findOneAndDelete({ _id: id, user: userId });