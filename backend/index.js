const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const { PineconeClient } = require('@pinecone-database/pinecone');
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
    startServer(pineconeClient);
  } catch (error) {
    console.error('Error initializing Pinecone client:', error);
  }
}

connectToMongo();
const app = express();
const port = 5000;
app.use(cors()); // Enable CORS

app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use("/api/chat", require('./routes/chat'));

app.get('/', (req, res) => {
  res.send('hello ish');
});

async function startServer(client) {
  app.use('/api/openai', require('./routes/openai')(client)); // Place this line here
  app.listen(port, () => {
    console.log(`iNotebook backend listening at http://localhost:${port}`);
  });
}

initializePineconeClient();
