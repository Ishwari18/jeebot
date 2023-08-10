const express = require("express");
const router = express.Router();
const { processQuestion } = require("../utils/main");
const Conversation = require("../models/Conversation");
const fetchuser = require('../middleware/fetchuser');

module.exports = (client) => {
  router.post("/", fetchuser, async (req, res) => {
    try {
      // Check if the user is authenticated
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { question } = req.body;
      const indexName = "your-pinecone-index-name"; // Adjust the index name if needed
      const vectorDimension = 1536; // Adjust the vector dimension if needed

      // Retrieve conversation history from the MongoDB collection
      const conversation = await Conversation.findOne({ user: req.user.id }).sort({ timestamp: -1 });

      // Extract conversation context from messages
      const context = conversation ? conversation.messages.map(msg => msg.content).join("\n") : "";

      // Pass the question and conversation context to processQuestion
      const result = await processQuestion(client, indexName, vectorDimension, question, context);

      // Save the user's question in the MongoDB collection
      const userMessage = {
        sender: "user",
        content: question,
      };

      // Save the AI's response in the MongoDB collection
      const aiMessage = {
        sender: "AI",
        content: result,
      };

      // Create a new conversation instance
      const updatedConversation = new Conversation({
        user: req.user.id, // Assuming fetchuser middleware sets req.user
        messages: [userMessage, aiMessage], // Include both user's question and AI's response
      });

      // Save the updated conversation to the database
      await updatedConversation.save();

      // Send the result as the response
      res.json({ result });
    } catch (error) {
      console.error("Error handling the question:", error);
      res.status(500).json({ error: "Error handling the question" });
    }
  });

  return router;
};
