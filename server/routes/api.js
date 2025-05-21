const express = require('express');
const multer = require('multer');
const axios = require('axios');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const { v4 } = require('uuid');

const Image = require('../models/Image.js');

const storage = multer.diskStorage({
    destination: path.join('images', 'original'),
    filename: (req, file, cb) => {
        cb(null, `temp-image${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) cb(null, true);
        else cb(new Error('Only image files are allowed.'), false);
    }
});

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
router.post('/images', upload.single('image'), async (req, res) => {
    const uniqueId = v4();
    let filename, originalPath, thumbnailPath;

    try {
        if (req.file) { // If file is uploaded, multer puts it in req.file
            const oldPath = path.join('images', 'original', req.file.filename);
            filename = `${uniqueId}${path.extname(req.file.filename)}`;
            originalPath = path.join('images', 'original', filename);
            thumbnailPath = path.join('images', 'thumbnail', filename);
            fs.renameSync(oldPath, originalPath);
        } else { // Otherwise, if URL is sent, download the image
            const response = await axios.get(req.body.url, {
                responseType: 'stream',
                timeout: 10000
            });

            const fileExt = response.headers['content-type'].split('/')[1] || 'jpg';
            filename = `${uniqueId}${fileExt}`;
            originalPath = path.join('images', 'original', filename);
            thumbnailPath = path.join('images', 'thumbnail', filename);

            await new Promise((resolve, reject) => {
                response.data
                    .pipe(fs.createWriteStream(originalPath))
                    .on('finish', resolve)
                    .on('error', reject);
            });
        }

        sharp(originalPath)
            .resize(200, 200, { fit: 'inside' })
            .toFile(thumbnailPath, (err, info) => { if (err) throw err; });

        const newImage = new Image({ filename: filename });
        await newImage.save();
        res.status(201).json({ message: 'Your image was successfully uploaded!' });
    } catch (err) {
        console.error(err);
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

// Delete image
router.delete('/images/:imageId', async (req, res) => {
    try {
        const image = await Image.findById(req.params.imageId);
        fs.unlinkSync(path.join('images', 'original', image.filename));
        fs.unlinkSync(path.join('images', 'thumbnail', image.filename));
        await Image.findByIdAndDelete(req.params.imageId);
        res.status(200).json({ message: 'The image has been deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `${err.message}: Failed to delete image` });
    }
});

module.exports = router;