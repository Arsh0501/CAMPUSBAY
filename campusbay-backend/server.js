const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const listingRoutes = require("./routes/listings");
const offerRoutes = require("./routes/offers");
const messageRoutes = require("./routes/messages");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middlewares
app.use(cors());
app.use(express.json()); // equivalent to bodyParser.json()

// ✅ Serve frontend HTML/CSS from 'components' folder
app.use(express.static(path.join(__dirname, "components")));

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/messages", messageRoutes);

// ✅ Default route to serve the home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "components", "home.html"));
});

// ✅ Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// ✅ MongoDB Connection & Server Startup
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});
