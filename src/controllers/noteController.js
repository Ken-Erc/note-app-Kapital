const Note = require('../models/Note');

// Create Note
exports.createNote = async (req, res) => {
  try {
    const { title, description, date, category } = req.body;

    const note = await Note.create({
      title,
      description,
      date,
      category,
      user: req.user._id
    });

    res.status(201).json({
      message: 'Note created successfully',
      note
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Notes
exports.getNotes = async (req, res) => {
  try {
    const { search, category } = req.query;

    const filter = { user: req.user._id };

    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    if (category) {
      filter.category = category;
    }

    const notes = await Note.find(filter)
      .populate('category', 'name description');

    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Single Note
exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('category', 'name description');

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Note
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({
      message: 'Note updated successfully',
      note
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Note
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};