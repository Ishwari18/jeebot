const mongoose = require("mongoose");
const { Schema } = mongoose;

const ConversationSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Reference to the 'User' model (assuming you have a 'User' model)
    required: true,
  },
  messages: [
    {
        sender: { type: String, enum: ['user', 'AI'], required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
    },
],
});

module.exports = mongoose.model("Conversation", ConversationSchema);
