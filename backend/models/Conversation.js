const mongoose = require("mongoose");
const { Schema } = mongoose;

const ConversationSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the 'User' model (assuming you have a 'User' model)
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  interactions: [
    {
      question: { type: String, required: true },
      answer: { type: String, required: true }
    },
  ],
  // Add any additional fields specific to your conversation requirements
});

module.exports = mongoose.model("Conversation", ConversationSchema);
