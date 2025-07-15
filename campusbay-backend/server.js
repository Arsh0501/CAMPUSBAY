const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const listingRoutes = require("./routes/listings");
const offerRoutes = require("./routes/offers");
const messageRoutes = require("./routes/messages");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ JWT-based auth guard for all frontend routes except public ones
app.use((req, res, next) => {
  const publicPaths = [
    "/login.html",
    "/signup.html",
    "/",
    "/api/auth/login",
    "/api/auth/signup"
  ];

  const isStaticAsset =
    req.path.match(/\.(css|js|png|jpg|jpeg|svg|webp|ico)$/i) ||
    req.path.startsWith("/uploads/");

  // Allow public pages and static assets
  if (publicPaths.includes(req.path) || isStaticAsset || req.path.startsWith("/api/")) {
    return next();
  }

  // Check JWT token in Authorization header
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.redirect("/login.html");
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.redirect("/login.html");
  }
});

// ✅ Serve frontend HTML/CSS from 'components' folder
app.use(express.static(path.join(__dirname, "components")));

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/messages", messageRoutes);

// ✅ Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Default route to serve the home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "components", "login.html"));
});

// ✅ MongoDB Connection & Server Startup
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running at http://0.0.0.0:${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});
