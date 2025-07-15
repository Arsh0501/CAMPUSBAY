const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    condition: String,
    category: String,
    location: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    imageUrl: String, // NEW: image URL or path
    sellerName: String, // Optional, for display only
  },
  { timestamps: true }
);

module.exports = mongoose.model("Listing", listingSchema);
