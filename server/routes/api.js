const express = require('express');
const Image = require('../models/Image');

const imagesUpload = require('./apiImages/configMulter.js');
const createThumbnail = require('./apiImages/createThumbnail.js');
const deleteFiles = require('./apiImages/deleteFiles.js');

const router = express.Router();

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
router.post('/images', imagesUpload.single('image'), createThumbnail, async (req, res) => {
    try {
        const image = new Image({ filename: req.file.filename, artist: 'foo' });
        await image.save();
        res.status(201).json({ message: 'Your image was successfully uploaded!' });
    } catch (err) {
        res.status(500).json({ message: `${err.message}: Failed to upload image` });
    }
});

// Get specific image
router.get('/images/:imageId', async (req, res) => {
    try {
        const image = await Image.findById(req.params.imageId);
        res.json(image);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `${err.message}: Failed to get image` });
    }
});

// Update image details
/*router.put('/images/:imageId', async (req, res) => {
    try {

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `${err.message}: Failed to update image` });
    }
});*/

// Delete image
router.delete('/images/:imageId', deleteFiles, async (req, res) => {
    try {
        await Image.findByIdAndDelete(req.params.imageId);
        res.status(200).json({ message: 'The image has been deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `${err.message}: Failed to delete image` });
    }
});

module.exports = router;