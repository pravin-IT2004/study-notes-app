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

    // 🔐 SAFE USER ID HANDLING (IMPORTANT FIX)
    const userId = req.user?.id || req.user?._id;

    const note = await Note.create({
      subject,
      topic,
      type,
      generatedText:
        generatedText || `Generated ${type} notes for ${topic}`,
      userId,
    });

    res.status(201).json(note);
  } catch (error) {
    console.log("CREATE NOTE ERROR:", error);
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
    const userId = req.user?.id || req.user?._id;

    const notes = await Note.find({ userId }).sort({
      createdAt: -1,
    });

    res.json(notes);
  } catch (error) {
    console.log("GET NOTES ERROR:", error);
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
    const userId = req.user?.id || req.user?._id;

    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.id,
      userId,
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
    console.log("DELETE NOTE ERROR:", error);
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