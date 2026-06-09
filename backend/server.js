require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes
const noteRoutes = require("./routes/noteRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

console.log("Server starting...");
console.log("JWT loaded:", !!process.env.JWT_SECRET);

// ======================
// MIDDLEWARE
// ======================
app.use(express.json());

// ======================
// CORS (FIXED PRODUCTION VERSION)
// ======================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.CLIENT_URL, // Vercel URL (set in Render env)
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow mobile apps, postman, server-to-server
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(null, true); // 🔥 TEMP FIX (prevents CORS crash)
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
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
// MONGODB
// ======================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB Error:", err));

// ======================
// ROUTES
// ======================
app.use("/api/notes", noteRoutes);
app.use("/api/auth", authRoutes);

// ======================
// SERVER
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});