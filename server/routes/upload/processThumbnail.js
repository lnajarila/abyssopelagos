const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const processThumbnail = async (req, res, next) => {
    const handleCopyFileError = (err) => {
        if (err) throw err;
    };

    const handleToFileError = (err, info) => {
        if (err) throw err;
    };

    try {
        // Copy image to images/thumbnail
        const thumbnailPath = path.join(__dirname, 'images', 'thumbnail', req.file.filename);
        fs.copyFile(req.file.path, thumbnailPath, handleCopyFileError);

        // Resize image down to thumbnail size: max 200px width and height
        sharp(thumbnailPath)
            .resize(200, 200, { fit: contain })
            .toFile(thumbnailPath, handleToFileError);

        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `${err.message}: Failed to upload image.` });
    }
};

module.exports = processThumbnail;