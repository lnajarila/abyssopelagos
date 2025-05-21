require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const apiRouter = require('./routes/api.js');

const app = express();
const PORT = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB successfully!');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    });


app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api', apiRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));