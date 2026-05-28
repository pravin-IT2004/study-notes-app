require("dotenv").config(); // MUST BE FIRST LINE

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// DEBUG: check env loading
console.log("JWT SECRET CHECK:", process.env.JWT_SECRET);

// Routes
const noteRoutes = require("./routes/noteRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// ======================
// MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());

// ======================
// TEST ROUTE
// ======================
app.get("/", (req, res) => {
  res.send("Backend Server Running");
});

// ======================
// MONGODB CONNECTION
// ======================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

// ======================
// ROUTES
// ======================
app.use("/api/notes", noteRoutes);
app.use("/api/auth", authRoutes);

// ======================
// SERVER START
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});