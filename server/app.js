// server/app.js

require('dotenv').config(); // Load environment variables from server/.env for local development

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer'); // NEW: Nodemailer for email sending

// Assuming these are your existing route modules
const projectRoutes = require('./routes/projectRoutes'); // Adjust path if necessary
const skillRoutes = require('./routes/skillRoutes');     // Adjust path if necessary

const app = express();

// --- START CORS Configuration for YOUR Vercel Domain ---
// Your Vercel frontend domain:
const YOUR_VERCEL_DOMAIN = 'https://website-portofolio-jogi.vercel.app';

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like direct API calls, or sometimes for local development)
    // This is important for Vercel's build process or tools that don't send an Origin header.
    if (!origin) return callback(null, true);

    // Check if the origin is exactly your Vercel domain
    if (origin === YOUR_VERCEL_DOMAIN) {
      return callback(null, true);
    } else {
      // Log for debugging if an unauthorized origin tries to access
      console.warn(`CORS: Unauthorized origin '${origin}' blocked.`);
      return callback(new Error('Not allowed by CORS'), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true // Important if your frontend needs to send cookies/auth headers
}));
// --- END CORS Configuration ---

app.use(express.json()); // Middleware to parse JSON request bodies


// MongoDB Connection Setup
const MONGODB_URI = process.env.MONGODB_URI;
let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        console.log('Using existing database connection.');
        return;
    }
    if (!MONGODB_URI) {
        console.error('Error: MONGODB_URI is not defined in environment variables.');
        return;
    }
    try {
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000
        });
        isConnected = true;
        console.log('MongoDB connection established successfully! (Serverless App)');
    } catch (err) {
        console.error('MongoDB connection error (Serverless App):', err);
        isConnected = false;
    }
};

// Middleware to ensure DB connection for all API routes
app.use(async (req, res, next) => {
    await connectDB();
    next();
});


// Existing API Routes (mounted as /api/projects and /api/skills)
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);


// --- NEW: Email Sending API Endpoint ---
// This route will be accessible at /api/send-email
app.post('/api/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    // 1. Validate incoming data
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Missing required form fields.' });
    }

    // Retrieve email credentials from environment variables (from Vercel settings)
    const EMAIL_HOST = process.env.EMAIL_HOST;
    const EMAIL_PORT = parseInt(process.env.EMAIL_PORT, 10);
    const EMAIL_SECURE = process.env.EMAIL_SECURE === 'true';
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;
    const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL;

    // Basic validation for email credentials
    if (!EMAIL_USER || !EMAIL_PASS || !RECEIVER_EMAIL || !EMAIL_HOST || isNaN(EMAIL_PORT)) {
        console.error("Missing or invalid email environment variables!");
        return res.status(500).json({ message: 'Server configuration error: Email service not properly set up.' });
    }

    try {
        const transporter = nodemailer.createTransport({
            host: EMAIL_HOST,
            port: EMAIL_PORT,
            secure: EMAIL_SECURE,
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS
            }
        });

        const mailOptions = {
            from: `"${name}" <${email}>`, // Sender's name and email will appear in your inbox
            to: RECEIVER_EMAIL, // Your email address to receive messages
            subject: `Portfolio Contact: ${name}`,
            html: `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Sender Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully via Vercel function!');
        res.status(200).json({ message: 'Message sent successfully!' });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});
// --- END NEW: Email Sending API Endpoint ---


// Existing root routes for /api and /
// Note: These will be accessed via /api/ and / respectively due to Vercel rewrites
app.get('/api', (req, res) => {
    res.send('Welcome to the Serverless MERN Backend!');
});

app.get('/', (req, res) => {
    res.send('This is a Vercel Serverless Function endpoint.');
});


module.exports = app; // Export the Express app