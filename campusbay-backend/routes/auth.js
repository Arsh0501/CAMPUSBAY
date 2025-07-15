// routes/auth.js
const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/authController");

router.post("/signup", register); // ✅ this is what’s missing or misconfigured
router.post("/login", login);

module.exports = router;
