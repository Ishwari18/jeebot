const createPineconeIndex = async (client, indexName, vectorDimension) => {
  try {
    console.log(`Checking "${indexName}"...`);
    const existingIndexes = await client.listIndexes();
    if (!existingIndexes.includes(indexName)) {
      console.log(`Creating "${indexName}"...`);
      const createClient = await client.createIndex({
        createRequest: {
          name: indexName,
          dimension: vectorDimension,
          metric: "cosine",
        },
      });
      console.log(`Created with client:`, createClient);
      await new Promise((resolve) => setTimeout(resolve, 60000));
    } else {
      console.log(`"${indexName}" already exists.`);
    }
  } catch (error) {
    console.error("Error creating Pinecone index:", error.message);
    throw new Error("Failed to create Pinecone index.");
  }
};

module.exports = {
  createPineconeIndex,
};
