require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const projectRoutes = require('./routes/projectRoutes');
const skillRoutes = require('./routes/skillRoutes');

const app = express();

const YOUR_VERCEL_DOMAIN = 'https://website-portofolio-jogi.vercel.app';
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (origin === YOUR_VERCEL_DOMAIN) {
      return callback(null, true);
    }
    if(origin === "http://localhost:3000"){
        return callback(null, true);
    }
    else {
      console.warn(`CORS: Unauthorized origin '${origin}' blocked.`);
      return callback(new Error('Not allowed by CORS'), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

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

app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// Existing API Routes 
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);

app.get('/api', (req, res) => {
    res.send('Welcome to the Serverless MERN Backend!');
});

app.get('/', (req, res) => {
    res.send('This is a Vercel Serverless Function endpoint.');
});

module.exports = app;