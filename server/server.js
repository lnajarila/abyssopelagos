require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
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


// Parse incoming JSON requests
app.use(express.json());


// Static file serving for images
app.use('/images', express.static(path.join(__dirname, 'images')));


// Mount API routes
app.use('/api', apiRouter);


// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));