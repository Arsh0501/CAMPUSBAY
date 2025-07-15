// seedListings.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Listing = require("./models/listing");

dotenv.config();

const sampleListings = [
  {
    title: "MacBook Air M1",
    description: "Used MacBook Air M1, excellent battery and performance.",
    price: 650,
    condition: "Like New",
    category: "Electronics",
    location: "Campus",
    imageUrl: "images/macbook.jpg", // ✅ add image path
    userId: "64fc2e7a53d1cd5b7fc9b8d1",
  },
  {
    title: "Electric Kettle",
    description: "Fast-boiling electric kettle, lightly used.",
    price: 20,
    condition: "Good",
    category: "Home Appliance",
    location: "North Side",
    imageUrl: "images/kettle.jpg",
    userId: "64fc2e7a53d1cd5b7fc9b8d1",
  },
  {
    title: "Introduction to Algorithms",
    description: "CLRS book, hardcover edition, great condition.",
    price: 45,
    condition: "Good",
    category: "Books",
    location: "Downtown",
    imageUrl: "images/clrs.jpg",
    userId: "64fc2e7a53d1cd5b7fc9b8d1",
  },
  {
    title: "Acoustic Guitar",
    description: "Yamaha F280 full-size acoustic guitar.",
    price: 130,
    condition: "Fair",
    category: "Music",
    location: "South Side",
    imageUrl: "images/guitar.jpg",
    userId: "64fc2e7a53d1cd5b7fc9b8d1",
  },
  {
    title: "Football Cleats (Size 10)",
    description: "Nike cleats used for 1 season, still in great shape.",
    price: 30,
    condition: "Good",
    category: "Sports gear",
    location: "Campus",
    imageUrl: "images/cleats.jpg",
    userId: "64fc2e7a53d1cd5b7fc9b8d1",
  },
  {
    title: "Casio Calculator FX-991ES Plus",
    description: "Perfect for engineering exams, barely used.",
    price: 12,
    condition: "Like New",
    category: "Stationary",
    location: "Campus",
    imageUrl: "images/calculator.jpg",
    userId: "64fc2e7a53d1cd5b7fc9b8d1",
  },
  {
    title: "Whiteboard + Markers",
    description: "Medium-sized whiteboard with free set of markers.",
    price: 25,
    condition: "Good",
    category: "Other",
    location: "North Side",
    imageUrl: "images/whiteboard.jpg",
    userId: "64fc2e7a53d1cd5b7fc9b8d1",
  },
  {
    title: "Hoodie - Medium Size",
    description: "Warm and stylish hoodie, perfect for winters.",
    price: 18,
    condition: "New",
    category: "Clothing",
    location: "South Side",
    imageUrl: "images/hoodie.jpg",
    userId: "64fc2e7a53d1cd5b7fc9b8d1",
  },
];


async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await Listing.deleteMany({});
    console.log("Old listings deleted.");

    await Listing.insertMany(sampleListings);
    console.log("✅ Sample listings inserted successfully.");

    process.exit();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
