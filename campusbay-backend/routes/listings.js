const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listingController");
const multer = require("multer");
const path = require("path");
const Listing = require("../models/listing");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// ✅ Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ✅ JWT auth middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ✅ Save to req.user
    req.userId = decoded.id; // ✅ For compatibility
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};


// ✅ Routes

// Create a new listing with optional image (secured)
router.post("/create", authenticate, upload.single("image"), listingController.createListingWithImage);

// Get all listings (My Listings page)
router.get("/", listingController.getAllListings);

// Search listings (Browse + Home)
router.get("/search", listingController.searchListings);

// Get listing by ID with seller name
router.get("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).lean();
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    const user = await User.findById(listing.userId).lean();
    listing.sellerName = user?.username || "Anonymous";

    res.json(listing);
  } catch (err) {
    console.error("Error fetching listing:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a listing
router.delete("/:id", listingController.deleteListing);

module.exports = router;
