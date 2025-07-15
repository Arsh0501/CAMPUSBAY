const express = require("express");
const {
  sendMessage,
  getMessagesForUser,
} = require("../controllers/messageController");

const router = express.Router();

router.post("/", sendMessage);
router.get("/:userId", getMessagesForUser);

module.exports = router;
