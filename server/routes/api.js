const express = require('express');
const router = express.Router();

const uploadRouter = require('./upload/router.js');

router.get('/images', async (req, res) => {
    try {
        const images = await ImageModel.find().sort({ createdAt: -1 });
        res.json(images);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `${err.message}: Failed to get image` }); // 500: Internal server error
    }
});

router.post('/upload', uploadRouter, async (req, res) => {
    res.send(201).json({ message: 'Your image was successfully uploaded!' });
})

module.exports = router;