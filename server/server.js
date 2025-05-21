/**
 * TO DO: Image upload
 * [ ] Give client option to upload local image file
 * [ ] Store image file in server directory
 * [ ] Create thumbnail of image and store in server directory
 * [ ] Save file metadata in database
 * [X] Change Image model and path retrieval to be more straightforward (use virtual properties?)
 * 
 */

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const apiRouter = require('./routes/api.js');

const app = express();
const PORT = process.env.PORT;


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB successfully!');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit with error code
    });


// Configure CORS
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}));


// Parse incoming JSON requests
app.use(express.json());


// Static file serving for images
app.use('/images', express.static(path.join(__dirname, 'images')));


// Set response headers to access static files on API routes
app.use('/api', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


// Mount API routes
app.use('/api', apiRouter);


// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));