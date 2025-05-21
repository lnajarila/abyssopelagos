const express = require('express');
const multer = require('multer');
const axios = require('axios');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const { v4 } = require('uuid');

const Image = require('../models/Image.js');

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) cb(null, true);
        else cb(new Error('Only image files are allowed.'), false);
    }
});

const imagesRouter = express.Router();

// Get all images
imagesRouter.get('/', async (req, res) => {
    try {
        const images = await Image.find().sort({ createdAt: -1 });
        res.json(images);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `${err.message}: Failed to get image` });
    }
});

// Upload new image
imagesRouter.post('/', upload.single('image'), async (req, res) => {
    const uniqueId = v4();
    let filename, originalPath, thumbnailPath;
    let sourceType, sourceUrl, fileSize, width, height;

    try {
        if (req.file) { // If file is uploaded, multer puts it in req.file
            filename = `${uniqueId}${path.extname(req.file.originalname)}`;
            originalPath = path.join('images', 'original', filename);
            thumbnailPath = path.join('images', 'thumbnail', filename);
            await fs.writeFile(originalPath, req.file.buffer, (err) => { if (err) throw err; });

            sourceType = 'local';
            sourceUrl = '';
            fileSize = req.file.size;

            const metadata = await sharp(req.file.buffer).metadata();
            width = metadata.width;
            height = metadata.height;
        } else { // Otherwise, if URL is sent, download the image
            const response = await axios.get(req.body.url, {
                responseType: 'arraybuffer',
                timeout: 10000
            });

            const fileExt = response.headers['content-type'].split('/')[1] || 'jpg';
            filename = `${uniqueId}${fileExt}`;
            originalPath = path.join('images', 'original', filename);
            thumbnailPath = path.join('images', 'thumbnail', filename);
            await fs.writeFile(originalPath, response.data, (err) => { if (err) throw err; });

            sourceType = 'url';
            sourceUrl = req.body.url;

            const buffer = Buffer.from(response.data, 'binary');
            const metadata = await sharp(buffer).metadata();
            fileSize = buffer.byteLength;
            width = metadata.width;
            height = metadata.height;
        }

        sharp(originalPath)
            .resize(200, 200, { fit: 'inside' })
            .toFile(thumbnailPath, (err, info) => { if (err) throw err; });

        const newImage = new Image({
            filename: filename,
            sourceType: sourceType,
            sourceUrl: sourceUrl,
            fileSize: fileSize,
            width: width,
            height: height
        });

        await newImage.save();
        res.status(201).json({ message: 'Your image was successfully uploaded!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `${err.message}: Failed to upload image` });
    }
});

// Get specific image
imagesRouter.get('/:imageId', async (req, res) => {
    try {
        const image = await Image.findById(req.params.imageId);
        res.json(image);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `${err.message}: Failed to get image` });
    }
});

// Delete image
imagesRouter.delete('/:imageId', async (req, res) => {
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

module.exports = imagesRouter;