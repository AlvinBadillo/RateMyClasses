// Import dependencies
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');

// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection URI from .env
const uri = process.env.MONGODB_URI;

// Create a MongoClient instance with server API versioning
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Function to establish a connection to MongoDB 
async function connectToMongoDB() {
    try {
        // Connect the client to the server
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1});
        console.log("Pinged your deployment. You have successfully connected to MongoDB!");
    } catch (err) {
        console.error("Error connecting to MongoDB", err)
    }
}

// Connect to MongoDB when the server starts 
connectToMongoDB();

// Basic route
app.get('/', (req, res) => {
    res.send('RateMyClasses Backend is Running');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Close the MongoDB connection when the server is stopped
process.on('SIGINT', async () => {
    console.log("Closing MongoDB connection...");
    await client.close();
    process.exit();
});