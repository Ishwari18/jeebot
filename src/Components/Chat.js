import React, { useContext, useState, useEffect } from "react";
import noteContext from "../context/notes/noteContext"; // Make sure to adjust the import path

export const Chat = () => {
  const host = "http://localhost:5000";
  const context = useContext(noteContext);
  const { chat } = context;

  const [inputValue, setInputValue] = useState(""); // State to hold the user's input value
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    // Fetch chat history when the component mounts
    fetchChatHistory();
  }, []);

  const fetchChatHistory = async () => {
    try {
      const response = await fetch(`${host}/api/chat/history`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"), // Fetch auth-token from localStorage
        },
      });
      const chatHistoryData = await response.json();
      setChatHistory(chatHistoryData);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the inputValue to your backend API for processing
      const response = await fetch(`${host}/api/openai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"), // Fetch auth-token from localStorage
        },
        body: JSON.stringify({ question: inputValue }),
      });

      const data = await response.json();
      const aiResponse = data.result;

      // Update chat history with user's question and AI's response
      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          _id: Date.now(), // Replace with an appropriate unique identifier
          messages: [
            { sender: "user", content: inputValue },
            { sender: "AI", content: aiResponse },
          ],
        },
      ]);

      setInputValue(""); // Clear the input after submission

      console.log("AI Response:", aiResponse); // Log the AI's response
    } catch (error) {
      console.error("Error handling the question:", error);
    }
  };

  return (
    <>
      <div>Chat</div>
      <ul>
        {chatHistory.map((conversation) => (
          <div key={conversation._id}>
            <div>
              {conversation.messages.map((message, index) => (
                <div key={index} className={`message ${message.sender}`}>
                  <strong>{message.sender}:</strong> {message.content}
                </div>
              ))}
            </div>
          </div>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your question..."
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
