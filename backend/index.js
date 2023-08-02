const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const { PineconeClient } = require('@pinecone-database/pinecone'); // Import PineconeClient
const dotenv = require('dotenv');
dotenv.config();

async function initializePineconeClient() {
  try {
    const pineconeClient = new PineconeClient();
    await pineconeClient.init({
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_ENVIRONMENT,
    });
    console.log('Pinecone client initialized.');
    startServer(pineconeClient); // Pass pineconeClient as an argument to the startServer function
  } catch (error) {
    console.error('Error initializing Pinecone client:', error);
  }
}
connectToMongo();
const app = express();
const port = 5000;

// app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));

async function startServer(client) {
  app.listen(port, () => {
    console.log(`iNotebook backend listening at http://localhost:${port}`);
  });
  // Pass the pineconeClient as an argument to the openai.js route
  app.use('/api/openai', require('./routes/openai')(client));
}

// Call the async function to initialize the Pinecone client and start the server
initializePineconeClient();
app.use(cors());