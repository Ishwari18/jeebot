const express = require("express");
const router = express.Router();
const { processQuestion } = require("../utils/main");
const Conversation = require("../models/Conversation");

module.exports = (client) => {
// Define a post request handler that takes the question from the request body and invokes the main function in main.js
router.post("/", async (req, res) => {
  try {
    const { question } = req.body;
    const indexName = "your-pinecone-index-name"; // Adjust the index name if needed
    const vectorDimension = 1536; // Adjust the vector dimension if needed

    // Save the user's question in the MongoDB collection
    const userMessage = { sender: "user", content: question };
    const conversation = await Conversation.findOneAndUpdate(
      { userId: req.userId }, // Assuming you have a unique userId for each user
      { $push: { messages: userMessage } },
      { upsert: true, new: true }
    );

    // Pass the question to main.js to handle document loading and function calls
    const result = await processQuestion(client, indexName, vectorDimension, question);

    // Save the AI's response in the MongoDB collection
    const aiMessage = { sender: "AI", content: result };
    await Conversation.findByIdAndUpdate(
      conversation._id,
      { $push: { messages: aiMessage } }
    );

    // Send the result as the response
    res.json({ result });
  } catch (error) {
    console.error("Error handling the question:", error);
    res.status(500).json({ error: "Error handling the question" });
  }
});

  return router;
};