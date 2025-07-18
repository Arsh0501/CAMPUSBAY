const Listing = require("../models/listing");

// Create a new listing
exports.createListing = async (req, res) => {
  try {
    const listing = new Listing(req.body);
    await listing.save();
    res.status(201).json(listing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all listings or filter by userId
exports.getAllListings = async (req, res) => {
  try {
    const listings = req.userId
      ? await Listing.find({ userId: req.userId }).sort({ createdAt: -1 })
      : await Listing.find().sort({ createdAt: -1 });

    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get listing by ID
exports.getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a listing
exports.deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.json({ message: "Listing deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update listing status (Sold, Bartered, etc.)
exports.updateStatus = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(listing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Enhanced Search with filters, sort, and pagination
exports.createListingWithImage = async (req, res) => {
  try {
    console.log("🧾 Request body:", req.body);
    console.log("🖼️ Uploaded file:", req.file);

    const { title, description, price, condition, category, location } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const userId = req.user?.id || req.userId;
    const sellerName = req.user?.username || "Unknown Seller";

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: Missing user ID" });
    }

    const newListing = new Listing({
      title,
      description,
      price,
      condition,
      category,
      location,
      imageUrl,
      userId,
      sellerName,
    });

    await newListing.save();
    console.log("✅ Listing saved:", newListing);
    res.status(201).json(newListing);
  } catch (err) {
    console.error("❌ Error creating listing:", err.message);
    console.error("🔥 Full error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Enhanced Search with filters, sort, and pagination
exports.searchListings = async (req, res) => {
  try {
    const {
      q,
      category,
      condition,
      location,
      sort = "newest",
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (q) query.title = { $regex: q, $options: "i" };
    if (category) query.category = category;
    if (condition) query.condition = { $in: condition.split(",") };
    if (location) query.location = location;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const skip = (page - 1) * limit;
    const total = await Listing.countDocuments(query);

    let sortBy = { createdAt: -1 };
    if (sort === "price-asc") sortBy = { price: 1 };
    if (sort === "price-desc") sortBy = { price: -1 };

    const results = await Listing.find(query)
      .sort(sortBy)
      .skip(Number(skip))
      .limit(Number(limit))
      .lean();

    res.json({ total, results });
  } catch (err) {
    console.error("❌ Error in searchListings:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
