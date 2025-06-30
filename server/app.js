// server/app.js (This defines your core Express application)
require('dotenv').config(); // For local development, Vercel injects its own env vars

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Import your route files (paths are relative to this app.js file)
const projectRoutes = require('./routes/projectRoutes');
const skillRoutes = require('./routes/skillRoutes');

const app = express();

// --- Middleware ---
// Configure CORS: IMPORTANT for allowing your frontend to access your backend API.
// For production on Vercel, replace '*' with your actual Vercel frontend domain(s) for security.
// Example: app.use(cors({ origin: 'https://your-frontend-project-name.vercel.app' }));
// For development, '*' is fine.
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] })); // Added OPTIONS for pre-flight requests
app.use(express.json()); // Parses JSON bodies for incoming requests

// --- Database Connection (Serverless-friendly) ---
// Vercel environment variables will automatically expose MONGODB_URI to `process.env`
const MONGODB_URI = process.env.MONGODB_URI;

let isConnected = false; // Flag to track Mongoose connection state

const connectDB = async () => {
    if (isConnected) {
        console.log('Using existing database connection.');
        return;
    }
    if (!MONGODB_URI) {
        console.error('Error: MONGODB_URI is not defined in environment variables.');
        return; // Prevent crash if URI is missing
    }
    try {
        await mongoose.connect(MONGODB_URI, {
            // useNewUrlParser: true, // Deprecated in Mongoose 6+
            // useUnifiedTopology: true, // Deprecated in Mongoose 6+
            serverSelectionTimeoutMS: 5000 // Keep trying to send operations for 5 seconds
        });
        isConnected = true;
        console.log('MongoDB connection established successfully! (Serverless App)');
    } catch (err) {
        console.error('MongoDB connection error (Serverless App):', err);
        isConnected = false; // Reset connection status on error
        // In production, you might want to throw the error to halt the function
        // throw new Error("Database connection failed");
    }
};

// Middleware to ensure DB connection is attempted before any API route handler runs
app.use(async (req, res, next) => {
    await connectDB();
    next(); // Continue to the next middleware/route handler
});

// --- API Routes ---
// All API routes will be mounted under '/api' due to Vercel's convention.
// So, a request to Vercel's domain/api/projects will hit this.
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);

// Basic test route for the root of the API endpoint (e.g., yourdomain.vercel.app/api)
app.get('/api', (req, res) => {
    res.send('Welcome to the Serverless MERN Backend!');
});

// Handle root path / if it reaches here (unlikely for serverless functions, but good to have)
app.get('/', (req, res) => {
    res.send('This is a Vercel Serverless Function endpoint.');
});

// --- Export the Express app ---
// This 'app' instance will be imported by server/api/index.js
module.exports = app;