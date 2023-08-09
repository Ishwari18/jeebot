const express = require("express");
const router = express.Router();
const Conversation = require("../models/Conversation");
const fetchuser = require("../middleware/fetchuser");

// Get the conversation history for the authenticated user
router.get("/history", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the conversation history for the user
    const conversationHistory = await Conversation.find({ user: userId });

    res.json(conversationHistory);
  } catch (error) {
    console.error("Error getting conversation history:", error);
    res.status(500).json({ error: "Error getting conversation history" });
  }
});

module.exports = router;
