const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  college: { type: String, required: true }  // ✅ Required
});

module.exports = mongoose.model("User", userSchema);
