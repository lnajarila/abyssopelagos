const express = require('express');
const router = express.Router();

const Image = require('../models/Image');
const uploadRouter = require('./upload/router.js');

// Get all images
router.get('/images', async (req, res) => {
    try {
        const images = await Image.find().sort({ createdAt: -1 });
        res.json(images);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `${err.message}: Failed to get image` });
    }
});

// Upload new image
router.post('/images', uploadRouter, async (req, res) => {
    res.status(201).json({ message: 'Your image was successfully uploaded!' });
})

// Get specific image
router.get('/images/:id', async (req, res) => {
    try {
        const image = await Image.find({ _id: req._id });
        res.json(image);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `${err.message}: Failed to get image `});
    }
});

module.exports = router;