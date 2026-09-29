require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./db");

const authRoutes = require("./routes/authRoutes");
const opportunityRoutes = require(
  "./routes/opportunityRoutes"
);

const app = express();

// ===============================
// Database
// ===============================

connectDB();

// ===============================
// Middleware
// ===============================

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "10kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
  })
);
app.use(
  "/api/opportunities",
  opportunityRoutes
);

// ===============================
// Health Check
// ===============================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Student Platform API is running 🚀",
  });
});

// ===============================
// Routes
// ===============================

app.use(
  "/api/auth",
  authRoutes
);

// ===============================
// 404
// ===============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ===============================
// Global Error Handler
// ===============================

app.use((error, req, res, next) => {
  console.error(error);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// ===============================
// Server
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});