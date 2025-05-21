const fs = require('fs');
const path = require('path');

const deleteFiles = async (req, res, next) => {
    try {
        const image = await Image.findById(req.params.imageId);
        fs.unlink(path.join('images', 'original', image.filename));
        fs.unlink(path.join('images', 'thumbnail', image.filename));
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `${err.message}: Failed to delete image.` });
    }
};

module.exports = deleteFiles;