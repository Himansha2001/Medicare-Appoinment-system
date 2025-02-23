require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://himanshahishan:<XXnwxtyraKGoN77S>@backend.pu6zt.mongodb.net/?retryWrites=true&w=majority&appName=backend"; // Use environment variable for the URI

if (!uri) {
    throw new Error("MONGODB_URI is not defined in the environment variables.");
}

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let isConnected = false; // Track connection status

async function connectToDatabase() {
    if (isConnected) {
        console.log("Already connected to MongoDB.");
        return client; // Return the existing client if already connected
    }
    
    try {
        // Connect the client to the server
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        isConnected = true; // Set connection status to true
        return client; // Return the client for further operations
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
        throw error; // Re-throw the error for handling by the caller
    }
}

async function closeConnection() {
    if (isConnected) {
        await client.close();
        isConnected = false; // Reset connection status
        console.log("MongoDB connection closed.");
    } else {
        console.log("No connection to close.");
    }
}

module.exports = { connectToDatabase, closeConnection };