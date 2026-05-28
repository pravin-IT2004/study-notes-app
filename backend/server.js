require("dotenv").config(); // MUST BE FIRST

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ======================
// DEBUG ENV CHECK
// ======================
console.log("JWT SECRET CHECK:", process.env.JWT_SECRET);

// ======================
// MIDDLEWARE
// ======================
app.use(express.json());

// ✅ Improved CORS (safe for Vercel + Render)
app.use(
  cors({
    origin: "*", // You can replace with your Vercel URL for stricter security
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ======================
// TEST ROUTE
// ======================
app.get("/", (req, res) => {
  res.send("Backend Server Running Successfully 🚀");
});

// Optional health check (GOOD FOR VIVA)
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is healthy" });
});

// ======================
// ROUTES
// ======================
const noteRoutes = require("./routes/noteRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/notes", noteRoutes);
app.use("/api/auth", authRoutes);

// ======================
// MONGODB CONNECTION
// ======================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully ✅");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error ❌:", err.message);
  });

// ======================
// SERVER START
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});