import React, { useState } from 'react';
import { PineconeClient } from '@pinecone-database/pinecone';
import { DirectoryLoader, TextLoader, PDFLoader } from 'langchain/document_loaders/fs';
import * as dotenv from 'dotenv';
import { createPineconeIndex } from "./1-createPineconeIndex.js";
import { updatePinecone } from "./2-updatePinecone.js";
import { queryPineconeVectorStoreAndQueryLLM } from "./3-queryPineconeAndQueryGPT.js";

dotenv.config();

const Chatbot = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const loader = new DirectoryLoader('./documents', {
      '.txt': (path) => new TextLoader(path),
      '.pdf': (path) => new PDFLoader(path),
    });
    const docs = await loader.load();

    const question = inputText;
    const indexName = 'your-pinecone';
    const vectorDimension = 1536;
    const client = new PineconeClient();

    await client.init({
      apiKey: process.env.REACT_APP_PINECONE_API_KEY,
      environment: process.env.REACT_APP_PINECONE_ENVIRONMENT,
    });

    await createPineconeIndex(client, indexName, vectorDimension);
    await updatePinecone(client, indexName, docs);
    const response = await queryPineconeVectorStoreAndQueryLLM(client, indexName, question);

    setOutputText(response); // Set the response from the chatbot
  };

  return (
    <div>
      <h1>Chatbot</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={inputText} onChange={handleInputChange} />
        <button type="submit">Ask</button>
      </form>
      {outputText && <p>Chatbot Response: {outputText}</p>}
    </div>
  );
};

export default Chatbot;
