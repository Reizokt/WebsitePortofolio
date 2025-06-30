// Load environment variables from .env file immediately
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000; // Use port from .env or default to 5000

// --- Middleware ---
// Enable CORS for all origins during development.
// In production, restrict this to your frontend's deployed domain for security.
// Example for production: app.use(cors({ origin: 'https://your-frontend-domain.com' }));
app.use(cors());
// Parse JSON bodies of incoming requests (e.g., for POST/PUT data)
app.use(express.json());

// --- Database Connection ---
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connection established successfully!'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit if DB connection fails
    });

// ... (existing code: dotenv, express, cors, mongoose, etc.)

// --- Import API Routes ---
const projectRoutes = require('./routes/projectRoutes');
const skillRoutes = require('./routes/skillRoutes'); // Import skill routes

// --- Routes ---
app.get('/', (req, res) => {
    res.send('Welcome to the MERN Backend!');
});

app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes); // Use skill routes, prefixed with '/api/skills'

// ... (rest of index.js)

// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    console.log(`Access it at http://localhost:${PORT}`);
});