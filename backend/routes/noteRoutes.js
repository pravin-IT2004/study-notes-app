const express = require("express");

const {
  createNote,
  getNotes,
  deleteNote,
} = require("../controllers/noteController");

const router = express.Router();

// CREATE NOTE (manual content)
router.post("/", createNote);

// GET ALL NOTES
router.get("/", getNotes);

// DELETE NOTE BY ID
router.delete("/:id", deleteNote);

module.exports = router;