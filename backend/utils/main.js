// main.js
const { createPineconeIndex } = require("./pinecone-utils");
const { queryOpenAI } = require("./openai-utils");
const { updateLangchain } = require("./langchain-utils");
const { PDFLoader } = require("langchain/document_loaders/fs/pdf");
const { DirectoryLoader } = require("langchain/document_loaders/fs/directory");
const { TextLoader } = require("langchain/document_loaders/fs/text");

const processQuestion = async (
  pineconeClient,
  indexName,
  vectorDimension,
  question
) => {
  // Check if Pinecone index exists and create if necessary
  //await createPineconeIndex(pineconeClient, indexName, vectorDimension);
  const loader = new DirectoryLoader("./documents", {
    ".txt": (path) => new TextLoader(path),
    ".pdf": (path) => new PDFLoader(path),
  });
  const docs = await loader.load();
  // Update Pinecone vector store with document embeddings
  //await updateLangchain(pineconeClient, indexName, docs);
  // Query Pinecone vector store and GPT model for an answer
  const result = await queryOpenAI(pineconeClient, indexName, question);

  return result;
};

module.exports = {
  processQuestion,
};
