const Note = require("../models/Note");

// ======================
// CREATE NOTE
// ======================
const createNote = async (req, res) => {
  try {
    const { subject, topic, type, generatedText } = req.body;

    if (!subject || !topic || !type) {
      return res.status(400).json({
        message: "Subject, topic and type are required",
      });
    }

    const note = await Note.create({
      subject,
      topic,
      type,
      generatedText: generatedText || `Generated ${type} notes for ${topic}`,

      // 🔐 IMPORTANT: link note to user
      userId: req.user.id,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

// ======================
// GET NOTES (USER ONLY)
// ======================
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(notes);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

// ======================
// DELETE NOTE (USER ONLY)
// ======================
const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id, // 🔐 ensures user can delete only their own note
    });

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
      message: "Server error",
    });
  }
};

module.exports = {
  createNote,
  getNotes,
  deleteNote,
};