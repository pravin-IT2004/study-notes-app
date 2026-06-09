require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes
const noteRoutes = require("./routes/noteRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// ======================
// ENV CHECK
// ======================
console.log("Server starting...");
console.log("JWT loaded:", !!process.env.JWT_SECRET);

// ======================
// MIDDLEWARE
// ======================
app.use(express.json());

// ======================
// CORS
// ======================
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// ======================
// TEST ROUTE
// ======================
app.get("/", (req, res) => {
  res.send("Backend Server Running 🚀");
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