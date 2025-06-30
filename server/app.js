
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const projectRoutes = require('./routes/projectRoutes');
const skillRoutes = require('./routes/skillRoutes');

const app = express();


app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] }));
app.use(express.json()); 


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


app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);


app.get('/api', (req, res) => {
    res.send('Welcome to the Serverless MERN Backend!');
});


app.get('/', (req, res) => {
    res.send('This is a Vercel Serverless Function endpoint.');
});


module.exports = app;