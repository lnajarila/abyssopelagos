const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const processThumbnail = async (req, res, next) => {
    try {
        const thumbnailPath = path.join(__dirname, '..', '..', 'images', 'thumbnail', req.file.filename);

        sharp(req.file.path)
            .resize(200, 200, { fit: 'inside' })
            .toFile(thumbnailPath, (err, info) => { if (err) throw err; });

        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `${err.message}: Failed to upload image.` });
    }
};

module.exports = processThumbnail;