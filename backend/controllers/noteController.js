const Note = require("../models/Note");

// ======================
// CREATE NOTE
// ======================
const createNote = async (req, res) => {
  try {
    const {
      subject,
      topic,
      type,
      generatedText,
    } = req.body;

    // VALIDATION
    if (!subject || !topic || !type) {
      return res.status(400).json({
        message: "Subject, topic and type are required",
      });
    }

    // CREATE NOTE
    const note = await Note.create({
      subject,
      topic,
      type,
      generatedText:
        generatedText ||
        `Generated ${type} notes for ${topic}`,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// GET NOTES
// ======================
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({
      createdAt: -1,
    });

    res.json(notes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// DELETE NOTE
// ======================
const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(
      req.params.id
    );

    if (!deletedNote) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createNote,
  getNotes,
  deleteNote,
};