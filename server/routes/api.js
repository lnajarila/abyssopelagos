const express = require('express');
const router = express.Router();
const Image = require('../models/Image');

router.get('/images', async (req, res) => {
    try {
        const images = await Image.find().sort({ createdAt: -1 });
        res.json(images);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;